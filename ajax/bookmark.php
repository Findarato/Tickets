<?Php
/**
 * Ticket edit script.  Very simple just returns the ticket info, and responses if needed
 * @author Joseph Harry
 * @version 1.0
 * @started September 14, 2010
 */
include("../small_header.php");
include("../smarty.inc.php");

$_GET = $db->Clean($_GET);

if(!isset($usr)){die("no user");}
if(isset($_GET["ticket"]) && isset($_GET["toggle"])){
	if($_GET["toggle"]=="off"){ // lets remove the bookmark
		$res = $db->Query("DELETE FROM favorite WHERE ticket_id=".$_GET["ticket"]." AND user_id=".$usr->User_id,false,"row");
	$response["message"] = $res;
	}else{// lets ADD the bookmark
		$res = $db->Query("INSERT INTO favorite (ticket_id,user_id) VALUES(".$_GET["ticket"].",".$usr->User_id.");",false,"row");
		$response["message"] = $res;
	}
}
if(isset($_GET["list"])){// lets just return an array of ticket ids that the user has bookmarked
	$response["favIds"] = array_implode($db->Query("SELECT ticket_id FROM favorite WHERE user_id=".$usr->User_id,false,"row"));
	
}

echo json_encode($response);