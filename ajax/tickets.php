<?Php
include_once("../small_header.php");
include_once("../smarty.inc.php");
header('Content-type: application/json');
header("Cache-Control: max-age=60, must-revalidate");
  $offset = 3600 * 24;	
// calc the string in GMT not localtime and add the offset
  $expire = "Expires: " . gmdate("D, d M Y H:i:s", time() + $offset) . " GMT";
//output the HTTP header
  Header($expire);
/**
 * Returns JSON version of the tickets to be displayed in either the center or the side area.
 * 
 * @author Joseph Harry  
 * @version 3.0  
 * @copyright December 24, 2007
 * @todo need to look at the 4 functions and find a way to make them into one
 */
//include_once "../header.php";  
$smallDisplay = array(); 
/**
 * Basically just some time saving, and to reduce some duplication of code
 * 
 * @return str the where clause to be put into any sql
 * @param int $user_id
 * @param str $type
 */
function getWhereClause($user_id,$type){
	$sqlw = "";
	if($user_id!=0){
		switch($type){
			case "open":
				$sqlw = "open=1 AND tickettype_id=1 AND assigned_id=$user_id";
			break;
			case "closed":
				$sqlw = "open=0 AND tickettype_id=1 AND (assigned_id=$user_id OR created_by_id=".$user_id.")"; 
			break;
			case "assigned":
				$sqlw = "open=1 AND tickettype_id=1 AND created_by_id=$user_id";
			break;
			case "favorite":
				$sqlw = "open=1 AND tickettype_id=1 AND assigned_by_id=$user_id";
			break;
			case "Odepartment":
				$sqlw = "open=1 AND tickettype_id=1 AND assigned_id IN (".join(",",getDepartmentMembers_by_userid($user_id)).") ";
			break;
			case "Adepartment":
				$sqlw = "open=1 AND tickettype_id=1 AND created_by_id IN (".join(",",getDepartmentMembers_by_userid($user_id)).") ";
			break;
			default:break;
		}
	}
	return $sqlw;
}
/**
 * Gets the amount of tickets for the category.  
 * @return int Count of results for the specified type
 * @param int $user_id id of the person who needs the tickets
 * @param str $type[optional] defaults to open tickets, should always be passed though
 */
function countTickets($user_id,$type="open"){
	$db = db::getInstance();
	if($type=="favorite"){$sql = "SELECT count(ticket_id) FROM favorite WHERE user_id=".$user_id.";";}
	if(!isset($sql)){$sql = "SELECT COUNT(id) FROM tcview WHERE ".getWhereClause($user_id,$type)." ;";}	
	$db->Query($sql);
	$res = $db->Fetch("row",false,false);
	return $res;
}
/**
 * Atempt to create the one function that does the work of the old multi functions
 * @return 
 * @param int $user_id
 * @param str $type type of tickets to get data for
 * @param int $amount[optional]
 * @param int $style[optional]
 * 
 * @todo Figure out a way to search by user name 
 */
function getTickets($user_id,$type,$amount=100,$style=1,$search=array()){
	$db = db::getInstance();
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
						$wc[]="tcv.locationId=\"".$s."\"";
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
            $sql = "SELECT tcv.id FROM tcview AS tcv WHERE TIMESTAMPDIFF(SECOND,'$dt',tcv.created_on)>0 AND (assigned_id=".$usr->User_id." OR created_by_id=".$usr->User_id.")";
						//die($sql);
						$db->Query($sql);
            $ticketIds = $db->Fetch("row",false,false);
						//new replies
            $sql = "SELECT tcv.id FROM tcview AS tcv WHERE assigned_id=".$usr->User_id." OR created_by_id=".$usr->User_id;
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
            	$wc[]="tcv.id IN(".join(",",$ticketIds).")";
            }else{
            	$wc[]="tcv.id in(0,0)";
            }
					break;
					case "open":
						$wc[]="tcv.open=\"".$s."\"";
					case "new":
						//$wc[]="tcv.assigned_id=".$usr->User_id;
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
						$wc[]="tcv.id in(".join(",",$favIds).")";
					break;
					case "title":
						if($s!=""){$wc[]="tcv.subject LIKE \"%".$s."%\"";}
					break;

				//New right pannel list. 
					case "sOdepartment":$idList = getDepartmentMembers_by_userid($usr -> User_id);$wc[]="(tcv.assigned_id IN (".join(",",$idList)."))";$wc[]="tcv.open=1";$wc[]="tcv.tickettype_id=1";break;
					case "sAdepartment":$idList = getDepartmentMembers_by_userid($usr -> User_id);$wc[]="(tcv.created_by_id IN (".join(",",$idList)."))";$wc[]="tcv.open=1";$wc[]="tcv.tickettype_id=1";break;
					case "sAssigned":$wc[]="tcv.created_by_id=".$usr->User_id;$wc[]="tcv.open=1";$wc[]="tcv.tickettype_id=1";break;
					case "sClosed":$wc[]="tcv.open=0";$wc[]="tcv.assigned_id=".$usr->User_id;$wc[]="tcv.tickettype_id=1";break;
					case "sOpen":$wc[]="tcv.open=1";$wc[]="tcv.assigned_id=".$usr->User_id;$wc[]="tcv.tickettype_id=1";break;
					case "bugs_open": $wc[]="tcv.open=1";$wc[]="tcv.tickettype_id=2";break;
					case "bugs_closed": $wc[]="tcv.open=0";$wc[]="tcv.tickettype_id=2";break;
				}				
			}
			if($type!="favorite"){
				$sc[]="tcv.description AS description";
				$sc[]="tcv.status";
				$sc[]="tcv.tickettype_id";
				$sql = 'SELECT '.join(",",$sc).',tcv.open,tcv.id,tcv.assigned_id,tcv.subject,
				    DATE_FORMAT(tcv.created_on,"%c.%d.%Y") AS created_on,
            DATE_FORMAT(tcv.due_on,"%c.%d.%Y") AS due_on,
						tcv.closed_on,tcv.category,tcv.category_id,tcv.created_by_id, 
						TIMESTAMPDIFF(SECOND ,tcv.created_on, now( ) ) AS dago,
						lhu.username,lhu.firstname,lhu.lastname, lhu2.firstname AS firstname2,lhu2.lastname AS lastname2,lhu2.username AS username2,
						TIMESTAMPDIFF(SECOND ,tcv.due_on, now( ) ) AS timeRemaining,
						TIMESTAMPDIFF(SECOND ,tcv.created_on, tcv.closed_on ) AS timeTaken,
						TIMESTAMPDIFF(SECOND ,tcv.created_on, tcv.due_on ) AS timeAllowed,
						tcv.locationId,tcv.locationName,tcv.priority
						FROM tcview AS tcv 
						JOIN lapcat.hex_users AS lhu ON (tcv.assigned_id=lhu.id)
						JOIN lapcat.hex_users AS lhu2 ON (tcv.created_by_id=lhu2.id)
						WHERE '.join(" AND ",$wc).' GROUP BY tcv.id ORDER BY tcv.priority DESC,tcv.due_on ';	
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
/**
 * This is where the real code happens.
 */
if(isset($_SESSION["user"])){ //the session is set
	$usr = unserialize($_SESSION['user']);
	if(isset($_GET["style"])){$style = $_GET["style"];}else{$style=0;}
	if(isset($_GET['type'])){
		switch($_GET['type']){
			case "close":
				$db->Query("UPDATE tickets SET  closed_on = NOW( ) , open = '0' WHERE id=".$_GET['ticket_id']. " LIMIT 1;");
				
				$db->Query("SELECT assigned_by_id,created_on,assigned_id,created_by_id,id,subject,description,priority,category,status FROM tcview WHERE id=".$_GET['ticket_id']);
				$res1 = $db->Fetch("assoc",false,false);
				//Put in the close variable and store it in the table
				if(@unserialize($res1['status'])){//checks to see if there is already a serialized value stored in the table.
					$res1['status'] = unserialize($res1['status']);
					$res1['status']['closed']=1;
					$res1['status'] = serialize($res1['status']);
				}else{//This is 
					if(strlen($res1['status'])==1 && $res1['status']==2){
						//This is a reassigned ticket
						$res1['status']=array("reassigned"=>1,"closed"=>1);
						$res1['status'] = serialize($res1['status']);
					}else{
						$res1['status']=array("closed"=>1);
						$res1['status'] = serialize($res1['status']);
					}
				}
				$db->Query("UPDATE tickets SET status='".$res1['status']."' WHERE id=".$_GET['ticket_id']. " LIMIT 1;");//put in the new status
				//end status area
				$db->Query("SELECT r.subject,r.body,r.created_on,r.user_id FROM responses AS r WHERE r.ticket_id=".$_GET['ticket_id']);
				$res2 = $db->Fetch("assoc",false,false);
				//get the location email
				$db->Query("SELECT t.location,ln.email,ln.name FROM tickets AS t JOIN library_names AS ln ON (ln.id=t.location) WHERE t.id=".$_GET['ticket_id']);
				$res3 = $db->Fetch("assoc",false,false);
				addReply($_GET['ticket_id'], 256, "Ticket Closed", "This ticket was closed on ".date("D M j, Y G:i:s ")." by [user=".$usr->User_id."]" ,true,true);
				$response["message"]="This ticket is now closed";
			break;			
			case "favorite":
				if($_GET['favorite']==0){$db->Query("DELETE FROM favorite WHERE user_id=".$usr->User_id." AND ticket_id=".$_GET['ticket_id']." LIMIT 1;");
				$response["message"]="This is no longer a bookmark";}
				else{$db->Query("INSERT INTO favorite VALUES (".$_GET['ticket_id'].",".$usr->User_id.");");
				$response["message"]="You have successfully bookmarked this ticket";
				}
			break;
			case "hold": //this is the lock and unlock case.  Hold is just what I called it in the start
				if($_GET['value']==0){ //This is removing the hold on the ticket
					$db->Query("DELETE FROM tickets_hold WHERE ticket_id=".$_GET['ticket_id']." AND user_id=".$usr->User_id." LIMIT 1;");
					//Update the status.
					$db->Query("SELECT status FROM tickets WHERE id=".$_GET['ticket_id'].";");
					$res = unserialize($db->Fetch("row",false,false));
					unset($res['lock']);
					$db->Query("UPDATE tickets SET status='".serialize($res)."',due_on=NOW() + INTERVAL 7 DAY WHERE id=".$_GET['ticket_id']." LIMIT 1;");
					if(count($db->Error)<2){$response["message"]="The ticket has successfully been unlocked.";
						addReply($_GET['ticket_id'], 256, "Ticket Removed from Locked Status", "This ticket was Removed from locked status on ".date("D M j, Y G:i:s ")." by [user=".$usr->User_id."]");
					}else{$response["error"]=$db->Error;}
				}elseif($_GET['value']==1){ //this is adding the hold on the ticket
					$db->Query("INSERT INTO tickets_hold (ticket_id,user_id,dt) VALUES(".$_GET['ticket_id'].",".$usr->User_id.",NOW());");
					//Update the status.
					$db->Query("SELECT status FROM tickets WHERE id=".$_GET['ticket_id'].";");
					$res = unserialize($db->Fetch("row",false,false));
					$res['lock']=1;
					$db->Query("UPDATE tickets SET status='".serialize($res)."' WHERE id=".$_GET['ticket_id']." LIMIT 1;");
					if(count($db->Error)<2){$response["message"]="The ticket has successfully been locked.";
						addReply($_GET['ticket_id'], 256, "Ticket Locked", "This ticket was locked on ".date("D M j, Y G:i:s ")." by [user=".$usr->User_id."]" );
					}else{$response["error"]=$db->Error;}									
				}else{/* This should never happen*/$response["error"]="You passed the wrong set of data";}
			break;
			case "open":
				$db->Query("UPDATE tickets SET  closed_on = '' , open = '1' WHERE id=".$_GET['ticket_id']. " LIMIT 1;");
				addReply($_GET['ticket_id'], 256, "Ticket Re-Opened", "This ticket was re-opened on ".date("D M j, Y G:i:s ")." by [user=".$usr->User_id."]" );
			break;
			case "reassign":
				if(isset($_GET['ticket_id']) && isset($_GET['user_id'])){
					$assigned_id = id2Username($_GET['user_id']);
					$db->Query("UPDATE tickets SET assigned_by_id=".$usr->User_id.", assigned_id=".$_GET['user_id']." WHERE id=".$_GET['ticket_id']);
					if(count($db->Error)==2){
						$response["error"]=$db->Error["error"];
					}else{$response["message"]="The ticket was Successfully reassigned";
					addReply($_GET['ticket_id'],256,"Ticket Reassigned","This ticket was reassigned to [user=".$_GET['user_id']."] on ".date("D M j, Y G:i:s ")." by [user=".$usr->User_id."]");
					}
					//Put in the reassign variable and store it in the table
					$db->Query("SELECT status FROM tcview WHERE id=".$_GET['ticket_id']);
					$res1 = $db->Fetch("assoc",false,false);
					if(@unserialize($res1['status'])){
						$res1['status'] = unserialize($res1['status']);
						$res1['status']['reassigned']=1;
						$res1['status'] = serialize($res1['status']);
					}else{
						$res1['status']=array("reassigned"=>1);
						$res1['status'] = serialize($res1['status']);
					}
					$db->Query("UPDATE tickets SET status='".$res1['status']."' WHERE id=".$_GET['ticket_id']. " LIMIT 1;");//put in the new status
					//end status area
				}else{
					$response["error"]="The wrong data is being passed!";
				}

			break;
			case "search":
				$response["tickets"] = getTickets($usr->User_id,"search",100,'',$_GET);
				if($response["tickets"]){
					$response["tickets"] = aTcode($response["tickets"]);	
				}
			break;
			case "small":
				if(isset($_GET['index'])){
					   	switch($_GET['index']){
							case "all": //merged all ticket requests into one large return to reduce requests
								$response["ticket"]['O']=array("type"=>"sOpen","Count"=>countTickets($usr->User_id,"open"));
								$response["ticket"]['C']=array("type"=>"sClosed","Count"=>countTickets($usr->User_id,"closed"));
								$response["ticket"]['A']=array("type"=>"sAssigned","Count"=>countTickets($usr->User_id,"assigned"));
								$response["ticket"]['OD']=array("type"=>"sOdepartment","Count"=>countTickets($usr->User_id,"Odepartment"));
								$response["ticket"]['AD']=array("type"=>"sAdepartment","Count"=>countTickets($usr->User_id,"Adepartment"));								
								$response["ticket"]['F']=array("type"=>"sFavorite","Count"=>countTickets($usr->User_id,"favorite"));
                $response["message"]="All Ticket lists generated Successfully";
							break;
              case "o":$response["ticket"]['O']=array("type"=>"sOpen","Count"=>countTickets($usr->User_id,"open"));break;
              case "c":$response["ticket"]['C']=array("type"=>"sClosed","Count"=>countTickets($usr->User_id,"closed"));break;
              case "a":$response["ticket"]['A']=array("type"=>"sAssigned","Count"=>countTickets($usr->User_id,"assigned"));break;
              case "od":$response["ticket"]['OD']=array("type"=>"sOdepartment","Count"=>countTickets($usr->User_id,"Odepartment"));break;
              case "ad":$response["ticket"]['AD']=array("type"=>"sAdepartment","Count"=>countTickets($usr->User_id,"Adepartment"));break;
              case "f":$response["ticket"]['F']=array("type"=>"sFavorite","Count"=>countTickets($usr->User_id,"favorite"));break;
              case "flist":$response["favIds"] = array_implode($db->Query("SELECT ticket_id FROM favorite WHERE user_id=".$usr->User_id,false,"row",false,false));break;                 
							default:
								$response["error"]="The wrong type index is being passed!";
							break;								
						}
				} 
			break;
				
			default:$response["error"]="There was some kind of error!";break;		
		}
		$response["user_id"] = $usr->User_id;
		echo json_encode($response);
	}
}
?>