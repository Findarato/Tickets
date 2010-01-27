<?Php
//This will display all tickets that meet the criteria
//It will also take passing of variables such as level
//Also it will be used in the global display.
//Assume user_id = 1
$tickets = array();
include_once "db.inc.php";
include_once "header.php";
require_once "responses.php";
$uri = getUrl();
//Set the status to read before getting the ticket
mysql_query("UPDATE tickets SET status='Read' WHERE id=$uri[1]");

$tickets = getTickets($uri[1]);
$smarty->assign('ticket',$tickets);
$smarty->assign('type',"reply");
$smarty->assign('ticket_id',$uri[1]);
$smarty->assign('content2','reply.tpl');
$smarty->assign('content3','responses.tpl');
$smarty -> display('index.tpl');
//print_r($tickets);

?>