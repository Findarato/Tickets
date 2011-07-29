<?
/**
 * Started July 30, 2010
 * This file will generate all of the bug information 
 * 
*/
include_once("../small_header.php");
header('Content-type: application/json');
header("Cache-Control: max-age=60, must-revalidate");


$_GET = $db->Clean($_GET,true);


if(isset($_GET["all"])){//lets get all the bug display
	if(isset($_GET["small"])){ // lets also get the bugs for the small display
		$response["bugs"]["open"] = $db->Query("SELECT count(id) FROM tickets WHERE open=1 AND tickettype_id=2",false,"row");
		$response["bugs"]["closed"] = $db->Query("SELECT count(id) FROM tickets WHERE open=0 AND tickettype_id=2",false,"row");
	}else{
		
	}
}

echo json_encode($response);
?>