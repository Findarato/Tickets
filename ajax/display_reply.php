<?php
  /**
   * JSON response based on ticket id.
   * @author Joseph Harry  
   * @version 1.0 
   * @copyright April 9, 2009
   * @todo Finish this 
   */
	$reply = array();
	header('Content-type: application/json');
	include_once('../small_header.php');
	$start =0;
	$end = 20;
	$count = 0;
	if(isset($_GET['ticket_id'])){//This is a ticket request
		$ticketid = intval($_GET['ticket_id']);
		$sql = 'SELECT tr.id,tr.user_id,tr.parent_id,tr.subject,tr.body,tr.created_on,lhu.username,lhu.firstname,lhu.lastname, TIMESTAMPDIFF(SECOND ,tr.created_on, now( ) ) AS ddt	
		FROM responses AS tr JOIN lapcat.hex_users AS lhu ON (tr.user_id=lhu.id) WHERE tr.ticket_id='.$ticketid.' ORDER BY ddt';
		$db->Query($sql);
		if(isset($_GET['page'])){
			$page = $_GET['page'];
			$start = ($page*$end);
			$db->Query($sql." LIMIT ".$start.",".$end.";");
			$res = $db->Fetch('assoc_array',false,false);
			if($db->Count_res()>0)
			$res = aTcode($res,"body");
			$reply["reply"]=$res;			 
		}else{ //just keeping support for not passing the page number.  Page numbers should always be passed but it doesn't hurt to keep this clause in
			$res = $db->Fetch('assoc_array',false,false);
			$res = aTcode($res,"body");
			$reply["reply"]=$res;
		}
	echo json_encode($reply);	
	
	}
/*
 * 
 * 
0:0-20
1:21-40
2:41-60
 */
?>
