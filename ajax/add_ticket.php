<?php
/**
 * New ticket ajax script
 * @author Joseph Harry
 * @version 2.0
 * @copyright March 28, 2009
 */
	include_once("../header.php");
$_GET = $db->Clean($_GET);

if($_SESSION){
	//$_GET['nagiosTicket']=881234123;
	if(isset($_SESSION["user"])){
		$usr = unserialize($_SESSION["user"]);	
	}else {
		@$usr = new User();
	}
}
/**
 * 
 * newTicketAssign	1
newTicketBugTrouble	2
newTicketCategory	1
newTicketDescription	asdfasdf
newTicketPriority	0
newTicketTicket_id	
newTicketTitle	test
newTicketType	new
newTicketUser_id	1321
 * 
 */
if(isset($_GET['nagiosTicket']) && $_GET['nagiosTicket']==881234123 || $_GET['newTicketType']=="new"){
	if($_GET['nagiosTicket']==881234123){$_GET["newTicketUser_id"]=128;$_GET["newTicketType"]="new";}
		$dueOn = date("Y-m-d G:i:s",mktime(date("G"),date("i"),0,date("m",strtotime($_GET["newTicketDueDate"])),date("d",strtotime($_GET["newTicketDueDate"])),date("Y",strtotime($_GET["newTicketDueDate"]))));
		if($_GET["newTicketBugTrouble"] == 1){
			$db->Query('INSERT INTO tickets(created_by_id,assigned_by_id,assigned_id,category_id,subject,description,created_on,open,priority,due_on,location,tickettype_id) 
			VALUES(
					"'.$_GET["newTicketUser_id"].'",
					"'.$_GET["newTicketUser_id"].'",
					"'.$_GET["newTicketAssign"].'",
					"'.$_GET["newTicketCategory"].'",
					"'.$_GET["newTicketTitle"].'",				
					"'.str_replace("\\n","<br>",nl2br($_GET["newTicketDescription"])).'",
					NOW(),1,
					"'.(intval($_GET["newTicketPriority"])+1).'",
					"'.$dueOn.'",
					"'.$_GET["newTicketLocation"].'",
					"1"
						)');
		}elseif($_GET["newTicketBugTrouble"] == 2){
			$db->Query('INSERT INTO tickets(created_by_id,assigned_by_id,assigned_id,project_id,category_id,subject,description,created_on,open,priority,tickettype_id) 
			VALUES(
					"'.$_GET["newTicketUser_id"].'",
					"'.$_GET["newTicketUser_id"].'",
					"'.$_GET["newTicketUser_id"].'",
					"'.$_GET["newTicketProject"].'",8,
					"'.$_GET["newTicketTitle"].'",				
					"'.str_replace("\\n","<br>",nl2br($_GET["newTicketDescription"])).'",
					NOW(),1,
					"'.(intval($_GET["newTicketPriority"])+1).'",
					"2"	)');
		}else{
			$response["error"] = "There was an error on line 61 of add_ticket";
		}	
			echo $db->Lastsql;
			
			$response["newTicketId"] = $ticketId = $db->Lastid;
			$db->Query("SELECT email from library_names WHERE id=".$_GET["newTicketLocation"]);
			$locationEmail= $db->Fetch("row");
			$db->Query("SELECT assigned_by_id,created_on,assigned_id,created_by_id,id,subject,description,priority,category FROM tcview WHERE id=".$ticketId);
			$res1 = $db->Fetch("assoc");
			$users = getUsers();
			$userName = ucwords($users[$res1['created_by_id']]['firstname'])." ".ucwords($users[$res1['created_by_id']]['lastname']);
			$userName2 = ucwords($users[$res1['assigned_id']]['firstname'])." ".ucwords($users[$res1['assigned_id']]['lastname']);
			$body = $res1['description'];
			$smarty -> assign('email_ticket_id',$ticketId);
			$smarty -> assign('email_created_on',$res1['created_on']);
			$smarty -> assign('email_assigned_to',$userName2);
			$smarty -> assign('email_created_by',$userName);
			$smarty -> assign('email_category',$res1['category']);
			$smarty -> assign('email_title',$res1['subject']);
			$smarty -> assign('email_priority',$res1['priority']);				
			$smarty -> assign('email_description',nl2br($res1['description']));
			$smarty -> assign('showRes',"0");
			if(isset($respon)){	$smarty -> assign('respon',$respon);}
			$body = $smarty->fetch('email.tpl');
			if($_GET['nagiosTicket']!=881234123 || !isset($_GET['nagiosTicket']) || $_GET['newTicketType']=="new"){
				generateEmail($res1['created_by_id'],$res1['assigned_id'],$res1['id'],$body,$res1['subject'],false,$locationEmail);	
			}
				
		
		/** Achievements area */	
		//	$response['achievements'] = $usr->F_CheckAchievements(array(1,2,3,4));
		//	$response['message']="Achievements are cool!";
		
	}else{ //this should be edit
		//Lets make sure there are not any extra attachments
		$dueOn = date("Y-m-d G:i:s",mktime(date("G"),date("i"),0,date("m",strtotime($_GET["newTicketDueDate"])),date("d",strtotime($_GET["newTicketDueDate"])),date("Y",strtotime($_GET["newTicketDueDate"]))));
		$db->Query('UPDATE tickets SET
				assigned_id="'.$_GET["newTicketAssign"].'",
				category_id="'.$_GET["newTicketCategory"].'",
				subject="'.$_GET["newTicketTitle"].'",				
				description="'.nl2br($_GET["newTicketDescription"]).'",
				modified_on=NOW(),
				priority="'.(intval($_GET["newTicketPriority"])+1).'",
				due_on="'.$dueOn.'",
				location = '.$_GET['newTicketLocation'].'				
				WHERE id='.$_GET['newTicketTicket_id'].'
				');
		addReply($_GET['newTicketTicket_id'],256,"Ticket Edited","This ticket was Edited on ".date("D M j, Y G:i:s ")." by [user=".$usr->User_id."]");
		//Put in the reassign variable and store it in the table
		$db->Query("SELECT status FROM tcview WHERE id=".$_GET['newTicketTicket_id']);
		$res1 = $db->Fetch("assoc");
		if(@unserialize($res1['status'])){
			$res1['status'] = unserialize($res1['status']);
			$res1['status']['edit']=1;
			$res1['status'] = serialize($res1['status']);
		}else{
			$response['error']=$res1['status'];
			$res1['status']=array("edit"=>1);
			$res1['status'] = serialize($res1['status']);
		}
		$db->Query("UPDATE tickets SET status='".$res1['status']."' WHERE id=".$_GET['newTicketTicket_id']. " LIMIT 1;");//put in the new status
		//end status area
	}
echo json_encode($response);
?> 