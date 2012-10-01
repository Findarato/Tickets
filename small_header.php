<?php
/**
 * Small header that can be included if no smarty access is needed
 * @author Joseph Harry
 * @version 1.0
 * @copyright March 28, 2009
 */
session_start();//start the session
$response = array("message"=>"","error"=>""); //including the generatic response
function __autoload($class_name) { require_once $_SERVER['DOCUMENT_ROOT']."/classes/".strtolower($class_name) . '.class.php'; }
require_once "functions.php";
require_once "classes/user.php";
//require_once "/stuff/php-functions.php";

$db = db::getInstance();
date_default_timezone_set( 'America/Chicago' );

function in_array_r($needle, $haystack) {
	if(is_array($needle)){
		foreach($needle as $need){
			if(in_array_r($need,$haystack)){
				return true;
			}
		}	
	}else{
		foreach ($haystack as $item) {
	        if ($item === $needle || (is_array($item) && in_array_r($needle, $item))) {
	            return true;
	        }
	    }	
	}
    return false;
}
if(isset($_SESSION['user'])){
	$usr = unserialize($_SESSION['user']);
	if($usr->User_id > 1000){
		if(isset($usr)){
			if(count($usr->getPermissions()) == 0 ){  // This is to make sure that your user has permissions
				$usr->LoadPermissions();
			}
			if(in_array_r(array("ADMIN","STAFF","USER","VIEW"),$usr->getPermissions())){
				if(in_array_r("NO_ACCESS", $usr->getPermissions())){
					die("no access");
				}
			}else{
				$response["error"] = "No Access";
				$response["message"] = "Your user account has no access";
			}
		}	
	}
}

