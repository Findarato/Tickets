<?php

include "../small_header.php";
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

echo json_encode($json);
?> 
   