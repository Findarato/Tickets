<?php
  /**
   * JSON response based on ticket id.
   * @author Joseph Harry  
   * @version 1.0 
   * @copyright April 9, 2009
   * @todo Finish this 
   */
  header('Content-type: application/json');
  include_once('../small_header.php');
  if(isset($_GET['ticket_id'])){//This is a ticket request
	$ticketid = intval($_GET['ticket_id']);
  	$db->Query('SELECT tr.id,tr.user_id,tr.parent_id,tr.subject,tr.body,tr.created_on,lhu.username FROM responses AS tr JOIN lapcat.hex_users AS lhu ON (tr.user_id=lhu.id) WHERE tr.ticket_id='.$ticketid);
	$res = $db->Fetch('assoc_array');
	echo json_encode($res);	
  }
  
  
  
?>
