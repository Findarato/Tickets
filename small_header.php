<?php
/**
 * Small header that can be included if no smarty access is needed
 * @author Joseph Harry
 * @version 1.0
 * @copyright March 28, 2009
 */

$lapcatPath = "/www/live";
$ticketsPath="/www/tickets";

if($_SERVER['DOCUMENT_ROOT'] != $ticketsPath){
	$_SERVER['DOCUMENT_ROOT'] = $ticketsPath;
}

session_start();//start the session
$response = array("message"=>"","error"=>""); //including the generatic response
function __autoload($class_name) { require_once $_SERVER['DOCUMENT_ROOT']."/classes/".strtolower($class_name) . '.class.php'; }
require_once "functions.php";
require_once $ticketsPath."/classes/user.php";
require_once $ticketsPath."/stuff/php-functions.php";
//require_once "/www/live/lapcat/code/achievements.php";

$db = db::getInstance();
//$DateTimeZone = timezone_open ( 'America/Chicago' );
date_default_timezone_set( 'America/Chicago' );
if(isset($_SESSION['user'])){
	$usr = unserialize($_SESSION['user']);	
	if($usr->User_id > 1000){
		if(isset($usr)){
			if(count($usr->getPermissions()) == 0 ){  // This is to make sure that your user has permissions
				$usr->LoadPermissions();
			}
			if(!in_array(array("ADMIN","STAFF","USER","VIEW"),$usr->getPermissions()) && !in_array("NO_ACCESS",$usr->getPermissions())){
				$response["error"] = "No Access";
				$response["message"] = "Your user account has no access";
				//die("No Permissions");	
			}else{
				print_r($usr->getPermissions()); 
			}
		}	
	}
}

