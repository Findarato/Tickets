<?php
/**
 * Small header that can be included if no smarty access is needed
 * @author Joseph Harry
 * @version 1.0
 * @copyright March 28, 2009
 */
if($_SERVER['DOCUMENT_ROOT'] != "/www/tickets"){
	$_SERVER['DOCUMENT_ROOT'] = "/www/tickets";
}
session_start();//start the session
$response = array("message"=>"","error"=>""); //including the generatic response
function __autoload($class_name) { require_once $_SERVER['DOCUMENT_ROOT']."/classes/".strtolower($class_name) . '.class.php'; }
require_once "functions.php";
require_once "/www/live/lapcat/objects/user.php";
require_once "/www/live/lapcat/code/php-functions.php";
//require_once "/www/live/lapcat/code/achievements.php";

$db = db::getInstance();
//$DateTimeZone = timezone_open ( 'America/Chicago' );
date_default_timezone_set( 'America/Chicago' );
 
?>  