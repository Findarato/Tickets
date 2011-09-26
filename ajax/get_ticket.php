<?Php
/**
 * Ticket display script.  Very simple just returns the ticket info, and responses if needed
 * @author Joseph Harry
 * @version 1.0
 * @copyright March 16, 2009
 */
include_once("../small_header.php");
header('Content-type: application/json');

$_GET = $db->Clean($_GET);

if(array_key_exists("user",$_SESSION)){
	$usr = unserialize($_SESSION['user']);	
}

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
	
	$sql = " SELECT
	TIMESTAMPDIFF(SECOND ,t.created_on, now( ) ) AS dago,
	TIMESTAMPDIFF(SECOND ,t.closed_on, now( ) ) AS dagoc,
	DATE_FORMAT(t.created_on	, '%M %e, %Y %H:%i') AS created_on,
	DATE_FORMAT(t.closed_on	, '%M %e, %Y %H:%i') AS closed_on,
	DATE_FORMAT(t.due_on	, '%M %e, %Y %H:%i') AS due_on,
	TIMESTAMPDIFF(SECOND ,t.due_on, now( ) ) AS timeRemaining,
	f.ticket_id AS favorite,
	u.username,
	u.firstname,
	u.lastname,
	u.email_address,
	u2.email_address AS mdEmail,
	u2.username as username2,
	u2.firstname AS firstname2,
	u2.lastname AS lastname2,
	t.description AS description,
	t.assigned_by_id,
	t.assigned_id,
	t.created_by_id,
	t.status AS status,
	t.subject,
	t.id,
	c.name AS category,
	t.category_id,
	t.project_id,
	p.name AS project_name,
	t.priority,
	t.tickettype_id,
	t.location AS location_id,
	l.name AS locationName
	FROM tickets AS t ";
	if(array_key_exists("user",$_SESSION)){
		$sql .= "LEFT JOIN favorite AS f ON (t.id=f.ticket_id AND f.user_id=".$usr->User_id.")"; 
	}else{
		$sql .= "LEFT JOIN favorite AS f ON (t.id=f.ticket_id AND f.user_id=1)";
	}
	$sql.="JOIN category AS c ON (t.category_id=c.id)
	LEFT JOIN projects AS p ON (p.id=t.project_id)
	JOIN library_names AS l ON (t.location=l.id)
	JOIN tickets.users AS u ON (t.assigned_id=u.id)
	JOIN tickets.users AS u2 ON (t.created_by_id=u2.id)
	WHERE t.id=".$_GET['ticket_id']." LIMIT 1";
	
	$res = $db->Query($sql);
	
	//die($db->Lastsql); 
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
	//$response['recentTickets']=recentTickets($usr->User_id,$_GET['ticket_id'],$response['subject'],false);
	echo json_encode($response);	
}
?>  