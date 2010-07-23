<?php

  include "../small_header.php";
  include "../smarty.inc.php";
	$usr = unserialize($_SESSION['user']);	
  $_POST = $db->Clean($_POST,true);

if($usr->User_id>1){
	addReply($_POST['ticket_id'], $_POST['user_id'], $_POST['title'], stripslashes($_POST['description']));
}

?> 
   