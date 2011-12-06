<?Php
/**
 * Main index page.  Used for loging handeling as well as displaying the tickets. 
 * Tied directly into the smarty template engin
 * 
 * @author Joseph Harry
 * @version 1.0
 * @started December 6, 2011
 */

include_once $_SERVER["DOCUMENT_ROOT"]."/header.php"; 



function countTickets($user_id,$type="open"){
	$db = db::getInstance();
	if($type=="favorite"){$sql = "SELECT count(ticket_id) FROM favorite WHERE user_id=".$user_id.";";}
	if(!isset($sql)){$sql = "SELECT COUNT(id) FROM tcview WHERE ".getWhereClause($user_id,$type)." ;";}	
	$db->Query($sql);
	$res = $db->Fetch("row",false,false);
	return $res;
}
function getWhereClause($user_id,$type){
	$sqlw = "";
	if($user_id!=0){
		$dep = getDepartmentMembers_by_userid($user_id);
		switch($type){
			case "open":
				$sqlw = "open=1 AND tickettype_id=1 AND assigned_id=$user_id";
			break;
			case "closed":
				$sqlw = "open=0 AND tickettype_id=1 AND (assigned_id=$user_id OR created_by_id=".$user_id.")"; 
			break;
			case "assigned":
				$sqlw = "open=1 AND tickettype_id=1 AND created_by_id=$user_id";
			break;
			case "favorite":
				$sqlw = "open=1 AND tickettype_id=1 AND assigned_by_id=$user_id";
			break;
			case "toMyDepartment":
				$sqlw = "open=1 AND tickettype_id=1 AND assigned_id IN (".join(",",$dep).") ";
			break;
			case "byMyDepartment":
				$sqlw = "open=1 AND tickettype_id=1 AND created_by_id IN (".join(",",$dep).") ";
			break;
			case "closedDepartment":
				$sqlw = "(created_by_id IN(".join(",",$dep).") OR assigned_by_id IN(".join(",",$dep).")	OR assigned_id IN(".join(",",$dep).")) AND (open=0 AND tickettype_id=1)";
			break;
			
			default:break;
		}
	}
	return $sqlw;
}

if(!isset($_GET["menu"])){  // Nothing should happen if the menu is not requested
	return false;
}
switch ($_GET["menu"]){
	case "tickets":
		$count = array();
		$count["open"] = countTickets($usr->User_id,"open");
		$count["assigned"] = countTickets($usr->User_id,"assigned");
		$count["myDept"] = countTickets($usr->User_id,"byMyDepartment");
		$count["byDept"] = countTickets($usr->User_id,"toMyDepartment");
		$count["favorite"] = countTickets($usr->User_id,"favorite");
		$count["closed"] = countTickets($usr->User_id,"closed");
		$count["deptClosed"] = countTickets($usr->User_id,"closedDepartment");
		$smarty -> assign("count",$count);
		$smarty -> display("../templates/top_ticket.tpl");
		break;
	case "search":
		$smarty -> display("../templates/top_search.tpl");
	break; 
	case "admin":
		if(in_array_r("ADMIN",$usr->getPermissions())){ // yeah specific permission required
			$smarty -> display("../templates/top_admin.tpl");
		}else{
			echo "You do not have access";
		}
	break; 
	default:break;
}



