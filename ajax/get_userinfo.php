<?php

include "../small_header.php";
header('Content-type: application/json');
$usr = unserialize($_SESSION['user']);	
$_GET = $db->Clean($_GET,true);
$json = array();
$json["userInfo"] = $db->Query("
SELECT 
	lhu.firstname,
	lhu.lastname,
	lhu.username,
	DATE_FORMAT(lhu.joined	, '%M %e, %Y') AS joined,
	lhu.type 
FROM 
	lapcat.hex_users AS lhu 
WHERE 
	id=".$_GET["userId"]
,false,"assoc");

//Tickets
$json["tickets"]["byMe"] = $db->Query("SELECT count(id) FROM tickets WHERE tickettype_id=1 AND created_by_id=".$_GET["userId"],false,"row");
$json["tickets"]["toMe"] = $db->Query("SELECT count(id) FROM tickets WHERE tickettype_id=1 AND assigned_id=".$_GET["userId"]." AND open=1",false,"row");

//Bugs
$json["bugs"]["byMeOpen"] = $db->Query("SELECT count(id) FROM tickets WHERE created_by_id=".$_GET["userId"]." AND open=1 AND tickettype_id=2",false,"row");
$json["bugs"]["byMe"] = $db->Query("SELECT count(id) FROM tickets WHERE created_by_id=".$_GET["userId"]." AND tickettype_id=2",false,"row");

//Responses
$json["responses"]["created"] = $db->Query("SELECT count(id) FROM responses WHERE user_id=".$_GET["userId"],false,"row");

echo json_encode($json);
?> 
   