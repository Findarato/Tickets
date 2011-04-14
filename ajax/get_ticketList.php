<?Php

include_once("../small_header.php");
include_once("../smarty.inc.php");
//header('Content-type: application/json');
header("Cache-Control: max-age=60, must-revalidate");
  $offset = 3600 * 24;  
  $expire = "Expires: " . gmdate("D, d M Y H:i:s", time() + $offset) . " GMT"; // calc the string in GMT not localtime and add the offset
  Header($expire); //output the HTTP header

  // Define some global variables
  $usr = unserialize($_SESSION['user']);
  //print_r($usr);die();
  $db = db::getInstance();
  $wc = array();
  $count = 20; // The amount of records returned
  $page = 0; // the default page to return incase one is not passed

  if(isset($_GET["count"])){ $count = $_GET["count"]; }
  if(isset($_GET["page"])){ $page = $_GET["page"];  }  
  
  if($page>0){
    $page = $page*$count+1;
    $amount = $count;  
  }else{
    $page = $page*$count;
    $amount = $count;
  }
  
if(isset($_GET["area"]) ){
  switch($_GET["area"]){
    case "bugs_open": // Tickets assigned to the user {To Me}
      $sql = "SELECT 
      t.id
      FROM tickets AS t 
      WHERE (t.open=1
      AND t.tickettype_id=2)
      ";
      $Ids = array_implode($db->Query($sql,false,"row"));
      $wc = "t.id IN(".join(",",$Ids).")";
      break;
    case "bugs_closed": // Tickets assigned to the user {To Me}
      $sql = "SELECT 
      t.id
      FROM tickets AS t 
      WHERE (t.open=0
      AND t.tickettype_id=2)
      ";
      $Ids = array_implode($db->Query($sql,false,"row"));
      $wc = "t.id IN(".join(",",$Ids).")";
      break;

/*
 * Ticket area
 * 
 */
    case "all": // Tickets assigned to the user {To Me}
      $sql = "SELECT 
      t.id
      FROM tickets AS t 
      WHERE (t.open=1
      AND t.tickettype_id=1)
      ";
      $Ids = array_implode($db->Query($sql,false,"row"));
      $wc = "t.id IN(".join(",",$Ids).")";
      break;
     case "sOpen": // Tickets assigned to the user {To Me}
      $sql = "SELECT 
      t.id
      FROM tickets AS t 
      WHERE t.assigned_id=".$usr->User_id."
      AND (t.open=1
      AND t.tickettype_id=1)
      ";
      $Ids = array_implode($db->Query($sql,false,"row"));
      $wc = "t.id IN(".join(",",$Ids).")";
      break;
    case "sClosed": // closed tickets that I am invloved with {Closed Tickets}
      $sql = "SELECT 
      t.id
      FROM tickets AS t 
      WHERE (t.created_by_id=".$usr->User_id."
      OR t.assigned_by_id=".$usr->User_id."
      OR t.assigned_id=".$usr->User_id.")
      AND (t.open=0
      AND t.tickettype_id=1)
      ";
      $Ids = array_implode($db->Query($sql,false,"row"));
      $wc = "t.id IN(".join(",",$Ids).")";
      break;
    case "closedDepartment": // closed tickets that my Department is involved in
    	$dep = getDepartmentMembers_by_userid($usr->User_id);
		//print_r($dep);die(join(",",$dep));
		$sql = "SELECT 
		t.id
		FROM tickets AS t 
		WHERE (t.created_by_id IN(".join(",",$dep).")
		OR t.assigned_by_id IN(".join(",",$dep).")
		OR t.assigned_id IN(".join(",",$dep)."))
		AND (t.open=0
		AND t.tickettype_id=1)
		";
		$Ids = array_implode($db->Query($sql,false,"row"));
		$wc = "t.id IN(".join(",",$Ids).")";
		break;      
    case "sOdepartment":  // Assigned to people in my department {To My Department}
      $depIds = getDepartmentMembers_by_userid($usr->User_id);
      $sql = "SELECT 
      t.id
      FROM tickets AS t 
      WHERE t.assigned_id IN(".join(",",$depIds).")
      AND (t.open=1
      AND t.tickettype_id=1)
      ";
      $Ids = array_implode($db->Query($sql,false,"row"));
      $wc = "t.id IN(".join(",",$Ids).")";      
      break;
    case "sAdepartment":  // Assigned to people in my department {By My Department}
      $depIds = getDepartmentMembers_by_userid($usr->User_id);
      $sql = "SELECT 
      t.id
      FROM tickets AS t 
      WHERE (t.created_by_id IN(".join(",",$depIds).")
      OR t.assigned_by_id IN(".join(",",$depIds).") )
      AND (t.open=1
      AND t.tickettype_id=1)
      ";
      //die(preFormat($sql));
      $Ids = array_implode($db->Query($sql,false,"row"));
      $wc = "t.id IN(".join(",",$Ids).")";      
      break;      
    case "sAssigned": // created by me, or assigned by me {By Me}
      $sql = "SELECT 
      t.id
      FROM tickets AS t 
      WHERE (t.created_by_id=".$usr->User_id."
      OR t.assigned_by_id=".$usr->User_id.")
      AND (t.open=1
      AND t.tickettype_id=1)
      ";
      $Ids = array_implode($db->Query($sql,false,"row"));
      $wc = "t.id IN(".join(",",$Ids).")";      
      break;
    case "sFavorite":
      $sql = "SELECT 
      f.ticket_id
      FROM favorite AS f 
      WHERE f.user_id=".$usr->User_id; 
      $Ids = array_implode($db->Query($sql,false,"row"));
      $wc = "t.id IN(".join(",",$Ids).")";
		break;
	case "new":
		if(isset($_SESSION["lastlogon"]) && $_SESSION["lastlogon"]>0 ){
			$dt = date("Y-m-d H:m:s",$_SESSION["lastlogon"]);
	    }else{ 
			$dt = date("Y-m-d H:m:s");
		}
		
        $sql = "SELECT t.id FROM tickets as t WHERE TIMESTAMPDIFF(SECOND,'$dt',t.created_on)>0 AND (t.assigned_id=".$usr->User_id." OR t.created_by_id=".$usr->User_id.")";
		$db->Query($sql);
        $ticketIds = $db->Fetch("row",false,false);
		//new replies
        $sql = "SELECT t.id FROM tickets AS t WHERE t.assigned_id=".$usr->User_id." OR t.created_by_id=".$usr->User_id."";
		$db->Query($sql);
        $replyTicketids = $db->Fetch("row",false,false);
		if(!is_array($replyTicketids)){$replyTicketids = array(0=>$replyTicketids);}else{$replyTicketids = array_implode($replyTicketids);}
		
		$sql = "SELECT ticket_id FROM responses AS r WHERE TIMESTAMPDIFF(SECOND,'$dt',r.created_on)>0 AND ticket_id IN (".join(",",$replyTicketids).")";
		$db->Query($sql);
        $responses = $db->Fetch("row",false,false);

		//some simple error checking.
		if(!is_array($ticketIds)){if($ticketIds == ""){$ticketIds = 0;}$ticketIds = array(0=>$ticketIds);}else{$ticketIds = array_implode($ticketIds);}
		
		if(!is_array($responses)){if($response == ""){$responses = 0;}$responses = array(0=>$responses);}else{$responses = array_implode($responses);}
		
		$ticketIds = array_merge($ticketIds,$responses);
        if($ticketIds){
        	$wc="t.id IN(".join(",",$ticketIds).")";
        }else{
        	$wc="t.id in(0,0)";
        }
		break;
 	default:
      $response["ticketCount"] = "Error with the request";
      $response["error"] = "You have requested a ticket area that does not exsist yet";
      break;    
  }
  // Lets take the switch statement above and use it to determain the where clause of the sql that needs to get ran.  Even favorites should be able to be done this way.
   $response["ticketCount"] = $db->ResultsCount;
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
      WHERE '.$wc.' GROUP BY t.id ORDER BY t.priority DESC,t.due_on 
      LIMIT '.$page.','.$amount.';';
	  //die($sql);
      $response["tickets"] = $db->Query($sql,false,"assoc_array");
	  
}



if(isset($response["tickets"])){
  if($db->ResultsCount == 0){
    $response["tickets"] = "No tickets found";
  }else{
    $response["tickets"] = aTcode($response["tickets"]);  
  }
}
echo json_encode($response);
?>