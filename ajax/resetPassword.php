<?php

  include "../small_header.php";
  include "../smarty.inc.php";
  $_POST = $db->Clean($_POST,true);

	$userId = $db->Query("SELECT id FROM users WHERE username='".$_POST["un"]."' AND email_address='".$_POST["rcoverEmail"]."';",false,"row");
	
	//$response["dbInfo"] = $userId;
	//$response["sql"] = $db->Lastsql;
	if($userId==0){$response["error"]="Could not find the requested User";}
	echo json_encode($response);
?> 
   