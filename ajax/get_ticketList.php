<?Php

include_once("../small_header.php");
include_once("../smarty.inc.php");
//header('Content-type: application/json');
header("Cache-Control: max-age=60, must-revalidate");
  $offset = 3600 * 24;  
// calc the string in GMT not localtime and add the offset
  $expire = "Expires: " . gmdate("D, d M Y H:i:s", time() + $offset) . " GMT";
//output the HTTP header
  Header($expire);
  
  $db = db::getInstance();
  $sql = "";
  $wc = array();
  $limit = 0;
  $sc = array();
  $start = 0;
  $end = 0;
  
  $count = 20; // The amount of records returned
  if(isset($_GET["count"])){
    $count = $_GET["count"];
  }
  $page = 0; // the default page to return incase one is not passed
  if(isset($_GET["page"])){
    $page = $_GET["page"];
  }  
  
  if($page>0){
    $page = $page*$count+1;
    $amount = $page+$count-1;  
  }else{
    $page = $page*$count;
    $amount = $page+$count;
  }
  
  
  $usr = unserialize($_SESSION['user']);
  
function searchTickets($user_id,$area,$amount=100,$page=0,$search=array()){
  $db = db::getInstance();
  switch ($area) {
    case "favorite":
      $sc[]="t.description AS description";
      $sc[]="t.status";
      $sc[]="t.tickettype_id";
      $sql = "SELECT ".join(",",$sc).",t.id,t.subject,
      DATE_FORMAT(t.created_on,'%c.%d.Y%') AS created_on,
      DATE_FORMAT(t.due_on,'%c.%d.Y%') AS due_on,
      TIMESTAMPDIFF(SECOND ,t.created_on, now( ) ) AS dago,
      TIMESTAMPDIFF(SECOND ,t.created_on, t.closed_on ) AS timeTaken,     
      TIMESTAMPDIFF(SECOND ,t.due_on, now( ) ) AS timeRemaining 
      FROM tcview AS t JOIN favorite AS f ON (t.id=f.ticket_id) WHERE f.user_id=".$user_id." ORDER BY  created_on  LIMIT 0,$amount";
      break;
    case "search":
      
      break;
  }
}
function getTickets($user_id,$type,$amount=100,$style=1,$search=array()){

  $sql = "";
  $wc = array();
  $limit = 0;
  $sc = array();
  $start = 0;
  $end = 0;
  $usr = unserialize($_SESSION['user']);
  switch ($type) {
    case "favorite":
      $sc[]="t.description AS description";
      $sc[]="t.status";
      $sc[]="t.tickettype_id";
      $sql = "SELECT ".join(",",$sc).",t.id,t.subject,
      DATE_FORMAT(t.created_on,'%c.%d.Y%') AS created_on,
      DATE_FORMAT(t.due_on,'%c.%d.Y%') AS due_on,
      TIMESTAMPDIFF(SECOND ,t.created_on, now( ) ) AS dago,
      TIMESTAMPDIFF(SECOND ,t.created_on, t.closed_on ) AS timeTaken,     
      TIMESTAMPDIFF(SECOND ,t.due_on, now( ) ) AS timeRemaining 
      FROM tcview AS t JOIN favorite AS f ON (t.id=f.ticket_id) WHERE f.user_id=".$user_id." ORDER BY  created_on  LIMIT 0,$amount";
    break;
    case "search":
      foreach ($search as $k=>$s){
        switch($k){
          default:break;
          case "location":
            $wc[]="t.locationId=\"".$s."\"";
          break;
          case "dateTime":
            switch($s){
              case "0":
                if(isset($_SESSION["lastlogon"]) && $_SESSION["lastlogon"]>0 ){
                  $dt = date("Y-m-d H:m:s",$_SESSION["lastlogon"]);
                }else{ 
                  $dt = date("Y-m-d H:m:s");
                }
              break;
              default:
                $dt = date("Y-m-d H:m:s",$s-60);
              break;
              case "today":
                $dt = date("Y-m-d H:m:s",strtotime("today"));
              break;
            }
            //new tickets
            $sql = "SELECT t.id FROM tcview Atcv WHERE TIMESTAMPDIFF(SECOND,'$dt',t.created_on)>0 AND (assigned_id=".$usr->User_id." OR created_by_id=".$usr->User_id.")";
            //die($sql);
            $db->Query($sql);
            $ticketIds = $db->Fetch("row",false,false);
            //new replies
            $sql = "SELECT t.id FROM tcview AS t WHERE assigned_id=".$usr->User_id." OR created_by_id=".$usr->User_id;
            $db->Query($sql);
            $replyTicketids = $db->Fetch("row",false,false);
            if(!is_array($replyTicketids)){$replyTicketids = array(0=>$replyTicketids);}else{$replyTicketids = array_implode($replyTicketids);}
            
            
            $sql = "SELECT ticket_id FROM responses AS r WHERE TIMESTAMPDIFF(SECOND,'$dt',r.created_on)>0 AND ticket_id IN (".join(",",$replyTicketids).")";
            $db->Query($sql);
            $response = $db->Fetch("row",false,false);

            //some simple error checking.
            if(!is_array($ticketIds)){if($ticketIds == ""){$ticketIds = 0;}$ticketIds = array(0=>$ticketIds);}else{$ticketIds = array_implode($ticketIds);}
            
            if(!is_array($response)){if($response == ""){$response = 0;}$response = array(0=>$response);}else{$response = array_implode($response);}
            
            $ticketIds = array_merge($ticketIds,$response);
            if($ticketIds){
              $wc[]="t.id IN(".join(",",$ticketIds).")";
            }else{
              $wc[]="t.id in(0,0)";
            }
          break;
          case "open":
            $wc[]="t.open=\"".$s."\"";
          case "new":
            //$wc[]="t.assigned_id=".$usr->User_id;
          break;
          case "page":
            $end = 30;
            $start = ($k*$end);
            $limit = $amount*$s;
            $amount = $limit+$amount;
            break;
          case "sFavorite":
            $favIds = $db->Query("SELECT ticket_id FROM favorite WHERE user_id=".$usr->User_id,false,"row",false,false);
            $response["favIds"] = json_encode($favIds);
            if(is_array($favIds)){
              $favIds = array_implode($favIds);
            }else{//This is only one result
              $favIds = array(0=>$favIds);
            }
            $wc[]="t.id in(".join(",",$favIds).")";
          break;
          case "title":
            if($s!=""){$wc[]="t.subject LIKE \"%".$s."%\"";}
          break;

        //New right pannel list. 
          case "sOdepartment":$idList = getDepartmentMembers_by_userid($usr -> User_id);$wc[]="(t.assigned_id IN (".join(",",$idList)."))";$wc[]="t.open=1";$wc[]="t.tickettype_id=1";break;
          case "sAdepartment":$idList = getDepartmentMembers_by_userid($usr -> User_id);$wc[]="(t.created_by_id IN (".join(",",$idList)."))";$wc[]="t.open=1";$wc[]="t.tickettype_id=1";break;
          case "sAssigned":$wc[]="t.created_by_id=".$usr->User_id;$wc[]="t.open=1";$wc[]="t.tickettype_id=1";break;
          case "sClosed":$wc[]="t.open=0";$wc[]="t.assigned_id=".$usr->User_id." OR t.created_by_id=".$usr->User_id;$wc[]="t.tickettype_id=1";break;
          case "sOpen":$wc[]="t.open=1";$wc[]="t.assigned_id=".$usr->User_id;$wc[]="t.tickettype_id=1";break;
          case "bugs_open": $wc[]="t.open=1";$wc[]="t.tickettype_id=2";break;  
          case "bugs_closed": $wc[]="t.open=0";$wc[]="t.tickettype_id=2";break;
        }       
      }
      if($type!="favorite"){
        $sc[]="t.description AS description";
        $sc[]="t.status";
        $sc[]="t.tickettype_id";
        $sql = 'SELECT '.join(",",$sc).',t.open,t.id,t.assigned_id,t.subject,
            DATE_FORMAT(t.created_on,"%c.%d.%Y") AS created_on,
            DATE_FORMAT(t.due_on,"%c.%d.%Y") AS due_on,
            t.closed_on,
            t.project_id,           
            c.name AS category,
            t.category_id,
            t.created_by_id, 
            TIMESTAMPDIFF(SECOND ,t.created_on, now( ) ) AS dago,
            lhu.username,lhu.firstname,lhu.lastname, lhu2.firstname AS firstname2,lhu2.lastname AS lastname2,lhu2.username AS username2,
            TIMESTAMPDIFF(SECOND ,t.due_on, now( ) ) AS timeRemaining,
            TIMESTAMPDIFF(SECOND ,t.created_on, t.closed_on ) AS timeTaken,
            TIMESTAMPDIFF(SECOND ,t.created_on, t.due_on ) AS timeAllowed,
            t.location AS locationId,
            ln.name AS locationName,
            t.priority
            FROM tickets AS t 
            JOIN category AS c ON (c.id=t.category_id)
            JOIN library_names AS ln ON (ln.ID=t.location)
            JOIN lapcat.hex_users AS lhu ON (t.assigned_id=lhu.id)
            JOIN lapcat.hex_users AS lhu2 ON (t.created_by_id=lhu2.id)
            WHERE '.join(" AND ",$wc).' GROUP BY t.id ORDER BY t.priority DESC,t.due_on ';  
      }
      
    break;
    default: 
    break;
  }
  $db->Query($sql);
  //die($sql);
  //$count = @$db->Count_res();
  if($type=="search"){$db->Query($sql." LIMIT ".$start.",".$end.";");}
  $return = $db->Fetch("assoc_array",false,false);
  if(is_array($return)){
    foreach($return as $ke =>$re){
      if(@unserialize($return[$ke]["status"])){
        $return[$ke]["status"]=unserialize($return[$ke]["status"]);}
    }
  }
  if(count($db->Error)==2){return false;}
  return $return;
}



if(isset($_GET["area"]) ){
  switch($_GET["area"]){
    case "sOpen":
      break;
    case "sClosed":
      break;
    case "sOdepartment":
      break;
    case "sClosed":
      break;
    case "sAssigned":
      break;
    case "sFavorite":
      $sql = "SELECT 
      f.ticket_id
      FROM favorite AS f 
      WHERE f.user_id=".$usr->User_id; 
      $favIds = array_implode($db->Query($sql,false,"row"));
      $wc[] = "t.id IN(".join(",",$favIds).")";
      break;
    default:
      $response["tickets"] = searchTickets($usr->User_id,$_GET["type"],100,$_GET["page"],$_GET["search"]);
      break;    
  }
  // Lets take the switch statement above and use it to determain the where clause of the sql that needs to get ran.  Even favorites should be able to be done this way.
 
      $sql = '
      SELECT 
        t.open,
        t.id,
        t.assigned_id,
        t.subject,
        t.tickettype_id,
        t.status,
        t.description AS description,
        t.location AS locationId,
        t.priority,
        t.closed_on,
        t.project_id,
        t.category_id,
        t.created_by_id, 
        DATE_FORMAT(t.created_on,"%c.%d.%Y") AS created_on,
        DATE_FORMAT(t.due_on,"%c.%d.%Y") AS due_on,
        ln.name AS locationName,
        c.name AS category,
        TIMESTAMPDIFF(SECOND ,t.created_on, now( ) ) AS dago,
        lhu.username,lhu.firstname,lhu.lastname, lhu2.firstname AS firstname2,lhu2.lastname AS lastname2,lhu2.username AS username2,
        TIMESTAMPDIFF(SECOND ,t.due_on, now( ) ) AS timeRemaining,
        TIMESTAMPDIFF(SECOND ,t.created_on, t.closed_on ) AS timeTaken,
        TIMESTAMPDIFF(SECOND ,t.created_on, t.due_on ) AS timeAllowed
      FROM tickets AS t 
      JOIN category AS c ON (c.id=t.category_id)
      JOIN library_names AS ln ON (ln.ID=t.location)
      JOIN lapcat.hex_users AS lhu ON (t.assigned_id=lhu.id)
      JOIN lapcat.hex_users AS lhu2 ON (t.created_by_id=lhu2.id)
      WHERE '.join(" AND ",$wc).' GROUP BY t.id ORDER BY t.priority DESC,t.due_on 
      LIMIT '.$page.','.$amount.';';
      $response["tickets"] = $db->Query($sql,false,"assoc_array");
}



if(isset($response["tickets"])){
  if($db->ResultsCount == 0){
    $response["tickets"] = "No tickets found";
  }else{
    $response["tickets"] = aTcode($response["tickets"]);  
  }
  $response["ticketCount"] = $db->ResultsCount;
}
echo json_encode($response);
?>