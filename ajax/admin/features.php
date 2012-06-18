<?Php
/**
 * Started January 6, 2012
 * Page to manage and display features to turn on and off on tickets
 * 
 */
include "../../small_header.php";
include "adminHeader.php";
function getFeatures(){
	$db = db::getInstance();
	return $db->Query("SELECT id,name,status FROM features",false,"assoc_array");
}



$_GET = $_GET;

if(isset($_GET["features"])){
	$response["features"] = getFeatures();	
}
if(isset($_GET["changeFeat"])){// lets change this feature around
  checkAdminStatus();
	$test = $db->Query("SELECT status FROM features WHERE id=".$_GET["changeFeat"],false,"row");
	if($test == 1){
		$db->Query("UPDATE features SET status=0 WHERE id=".$_GET["changeFeat"]." LIMIT 1");
		$response["message"] = "Turned off the feature";
	}else{
		$db->Query("UPDATE features SET status=1 WHERE id=".$_GET["changeFeat"]." LIMIT 1");
		$response["message"] = "Turned on the feature";
	}

	$response["features"] = getFeatures();	
}

echo json_encode($response);