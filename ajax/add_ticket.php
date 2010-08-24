<?php
/**
 * New ticket ajax script
 * @author Joseph Harry
 * @version 2.0
 * @copyright March 28, 2009
 */
	include_once("../header.php");
$_GET["newTicketDescription"] = $db->Clean($_GET["newTicketDescription"],true);
$ok = true;
$service = "";
$host = "";
$locationEmail = "";

if($_SESSION){
	//$_GET['nagiosTicket']=881234123;
	if(isset($_SESSION["user"])){
		$usr = unserialize($_SESSION["user"]);	
	}else {
		@$usr = new User();
	}
} 
if(isset($_GET['nagiosTicket']) && $_GET['nagiosTicket']==881234123 || $_GET['newTicketType']=="new"){
	if(isset($_GET['nagiosTicket']) && $_GET['nagiosTicket']==881234123){
	   $_GET["newTicketUser_id"]=128;$_GET["newTicketType"]="new";
     if(stripos($_GET["newTicketTitle"],"is OK") || stripos($_GET["newTicketTitle"],"is UP") ){
       //This is a ticket that does not need to be a new ticket, but instead needs to be entered as a comment
       $ok = false;
       
       if(stripos($_GET["newTicketTitle"],"is OK")){ //service being down
         $service = str_replace("is OK","is",$_GET["newTicketTitle"]);
       }else{
         $host = str_replace("is UP","is DOWN",$_GET["newTicketTitle"]);
         $host = str_replace("RECOVERY","PROBLEM",$host);
       }
     }
  }
  
	if($_GET["newTicketBugTrouble"] == 1 && $ok===true){
		$dueOn = date("Y-m-d G:i:s",mktime(date("G"),date("i"),0,date("m",strtotime($_GET["newTicketDueDate"])),date("d",strtotime($_GET["newTicketDueDate"])),date("Y",strtotime($_GET["newTicketDueDate"]))));
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
	}elseif($_GET["newTicketBugTrouble"] == 2 && $ok===true){
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
	}elseif($ok===false){//lets take the ticket info and convert it into a response
    if($host !=""){//this is a host reporting that it is back up
      $sqlItem = $host;
    }else{//this should be a service reporting its up
      $sqlItem = "LIKE '%".$service."%'";
    }
    
    $_GET["newTicketDescription"] = nl2br($_GET["newTicketDescription"]);
    mail("jharry@lapcat.org","tickets Debug","SELECT id FROM tickets.tickets WHERE subject='".$sqlItem."' ORDER BY id DESC LIMIT 1; ");
    $res = $db->Query("SELECT id FROM tickets.tickets WHERE subject='".$sqlItem."' ORDER BY id DESC LIMIT 1; ",false,"row");
    addReply($res,128,$_GET["newTicketTitle"],str_replace('\\\\\\\\n',"<br>",$_GET["newTicketDescription"]));
    die();
	}else{
		$response["error"] = "There was an error on line 61 of add_ticket";
	}	
    
		$response["newTicketId"] = $ticketId = $db->Lastid;
		$res1 = $db->Query("SELECT assigned_by_id,created_on,assigned_id,created_by_id,id,subject,description,priority,category FROM tcview WHERE id=".$ticketId,false,"assoc");
		$users = getUsers();

		$userName = ucwords($users[$res1['created_by_id']]['firstname'])." ".ucwords($users[$res1['created_by_id']]['lastname']);
		$userName2 = ucwords($users[$res1['assigned_id']]['firstname'])." ".ucwords($users[$res1['assigned_id']]['lastname']);		

		if($_GET["newTicketBugTrouble"]==1){
			$tempName = "email.tpl";
		}else{
			$tempName = "emailBug.tpl";
		}
    $locs = $db->Query("SELECT ID,name,email FROM tickets.library_names",false,"assoc_array",false,"ID");
		$smarty -> assign('email_ticket_id',$res1['id']);
		$smarty -> assign('email_title',$res1['subject']);
    $smarty -> assign('email_created_on',$res1['created_on']);
    $smarty -> assign('email_due_on',$dueOn);
    $smarty -> assign('email_created_by',$userName);
    $smarty -> assign('email_assigned_to',$userName2);
    $smarty -> assign('email_category',$res1['category']);
    $smarty -> assign('email_title',$res1['subject']);
    $smarty -> assign('email_priority',$res1['priority']);        
    $smarty -> assign('email_location',$locs[$_GET["newTicketLocation"]]["name"]);
    $smarty -> assign('email_description',nl2br(Tcode($res1['description'],false,false,true)));
		$smarty -> assign('showRes',"0");
    $styleCode = join("",file("http://www.lapcat.org/lapcat/css/themes/theme-generator.php?theme=22&hsl"));
    $styleCode .= join("",file("http://www.lapcat.org/tickets/css/tickets.css"));
    $smarty -> assign('styleCode',$styleCode);
		$body = $smarty->fetch($tempName);
		if(isset($respon)){	$smarty -> assign('respon',$respon);}
		
		if(isset($_GET['nagiosTicket']) && $_GET['nagiosTicket']!=881234123 || !isset($_GET['nagiosTicket']) || $_GET['newTicketType']=="new"){
			if($_GET["newTicketBugTrouble"]==2){
			}else{
				generateEmail($res1['created_by_id'],$res1['assigned_id'],$res1['id'],$body,$res1['subject'],false,$locationEmail);		
			}
		}		
  }else{ //this should be edit
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