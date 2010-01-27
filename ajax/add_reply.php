<?php
  include_once "../small_header.php";
  include_once "../smarty.inc.php";
	$usr = unserialize($_SESSION['user']);	
$_POST = $db->Clean($_POST);
if($usr->User_id>1){
	addReply($_POST['ticket_id'], $_POST['user_id'], $_POST['title'], stripslashes($_POST['description']));
}
?>
   