<?Php
include_once "../small_header.php";
header('Content-type: application/json');
$response = array("tickets"=>"","replies"=>"");
$usr = unserialize($_SESSION['user']);
if(isset($_SESSION['user'])){
	$dt = $db->Clean($_GET["dateTime"]);
	$dt = date("Y-m-d H:m:s",$dt-60);
	$sql = "SELECT tcv.subject,tcv.id,TIMESTAMPDIFF(SECOND ,tcv.created_on, NOW() ) AS tsd
	 FROM tcview AS tcv WHERE 
	TIMESTAMPDIFF(SECOND ,tcv.created_on, NOW() )<29
	 AND assigned_id=".$usr->User_id;
	$db->Query($sql);
	$response["tickets"] = $db->Fetch("assoc_array");
	
	$sql = "SELECT tcv.id
	 FROM tcview AS tcv WHERE open=1
	 AND (assigned_id=".$usr->User_id." OR created_by_id=".$usr->User_id.")";
	$db->Query($sql);
	$res = $db-> Fetch("row");
	foreach($res as $r){$ids[]=$r[0];}	
	
	$sql = "SELECT ticket_id,subject,TIMESTAMPDIFF(SECOND ,r.created_on, NOW() ) AS tsd
	 FROM responses AS r WHERE 
	TIMESTAMPDIFF(SECOND ,r.created_on, NOW() )<29
	 AND ticket_id IN (".join(",",$ids).")";
	$db->Query($sql);
	$response["replies"] = $db->Fetch("assoc_array");
	$response["status"]="1";
}else{ //the user is logged out and needs to be notified.
  $response["status"]="0";
}
echo json_encode($response);
?>