<?Php
/**
 * Ticket display script.  Very simple just returns the ticket info, and responses if needed
 * @author Joseph Harry
 * @version 1.0
 * @copyright March 16, 2009
 */
include_once("../small_header.php");
header('Content-type: application/json');
$usr = unserialize($_SESSION['user']);
$_GET = $db->Clean($_GET);

function recentTickets($user_id,$ticket_id,$subject,$display=false){
	$db = db::getInstance();
	$subject = $db->Clean($subject);
	$res1 = array();
	if($display){
		$db->QUERY("SELECT ticket_id,ticket_name,DATE_FORMAT(dt	, '%M %e, %Y %H:%i') AS dt FROM recent_tickets WHERE user_id=".$user_id." ORDER BY dt DESC LIMIT 10;");
		$res1 = $db->Fetch("assoc_array");
	}else{
		$db->Query("SELECT COUNT(ticket_id) FROM recent_tickets WHERE user_id=".$user_id.";");
		$cnt = $db->Fetch("row");
		if($cnt>10){
			$lim = $cnt-10;
			$db->Query("DELETE FROM recent_tickets WHERE user_id=".$user_id." ORDER BY dt DESC LIMIT ".$lim);
		}
		$db->Query("DELETE FROM recent_tickets WHERE user_id=".$user_id." AND ticket_id=".$ticket_id." AND ticket_name='".$subject."' LIMIT 1");
		$db->Query("INSERT INTO recent_tickets (user_id,ticket_id,ticket_name,dt) VALUES (".$user_id.",".$ticket_id.",'".$subject."',NOW());");
		if(count($db->Error)==2){return $db->Error;}
		$db->QUERY("SELECT ticket_id,ticket_name,DATE_FORMAT(dt	, '%M %e, %Y %H:%i') AS dt FROM recent_tickets WHERE user_id=".$user_id." ORDER BY dt DESC LIMIT 10;");
		$res1 = $db->Fetch("assoc_array");
	}
	return $res1;
}
if(isset($_GET['ticket_id'])){
	$ticket_id = $_GET['ticket_id'];
	/*This is a valid ticket request*/
	$res = $db->Query(" SELECT
	TIMESTAMPDIFF(SECOND ,tcv.created_on, now( ) ) AS dago,
	TIMESTAMPDIFF(SECOND ,tcv.closed_on, now( ) ) AS dagoc,
	DATE_FORMAT(tcv.created_on	, '%M %e, %Y %H:%i') AS created_on,
	DATE_FORMAT(tcv.closed_on	, '%M %e, %Y %H:%i') AS closed_on,
	DATE_FORMAT(tcv.due_on	, '%M %e, %Y %H:%i') AS due_on,
	TIMESTAMPDIFF(SECOND ,tcv.due_on, now( ) ) AS timeRemaining,
	f.ticket_id AS favorite,
	lhu.username,
	lhu.firstname,
	lhu.lastname, 
	lhu2.username as username2,
	lhu2.firstname AS firstname2,
	lhu2.lastname AS lastname2,
	tcv.description AS description,
	tcv.assigned_by_id,
	tcv.assigned_id,
	tcv.created_by_id,
	tcv.status AS status,
	tcv.subject,
	tcv.id,
	tcv.category,
	tcv.priority,
	tcv.tickettype_id,
	tcv.locationid,
	tcv.locationName
	FROM tcview AS tcv 
	LEFT JOIN favorite AS f ON (tcv.id=f.ticket_id AND f.user_id=".$usr->User_id.") 
	JOIN lapcat.hex_users AS lhu ON (tcv.assigned_id=lhu.id)
	JOIN lapcat.hex_users AS lhu2 ON (tcv.created_by_id=lhu2.id)
	WHERE tcv.id=".$_GET['ticket_id']." LIMIT 1");
	 
	$response = $db->Fetch("assoc");
	if(count($db->Error)==2){$response['error']==$db->Error;}
	if(@unserialize($response['status'])){$response['status'] = unserialize($response['status']);}
	//if(@unserialize($response['attachment'])){$response['attachment'] = unserialize($response['attachment']);}
	
	$response['dbDescription']=$response['description'];
	$response['description']=Tcode($response['description']);
			
	/**
	 * Get the response count
	 */
	$db->Query("SELECT COUNT(*) FROM responses WHERE ticket_id=".$ticket_id);
	$response['responseCount']=$db->Fetch("row");
}
/**
 * Insert the newest ticket, then get the recent tickets
 */

if(isset($_GET['recentOnly'])){
	$response['recentTickets']=recentTickets($usr->User_id,"","",true);
	echo json_encode($response['recentTickets']); 
}else{
	$response['recentTickets']=recentTickets($usr->User_id,$_GET['ticket_id'],$response['subject'],false);
	echo json_encode($response);	
}
?>  