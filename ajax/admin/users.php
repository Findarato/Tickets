<?Php
/**
 * Started December 9, 2011
 * Page to manage user accounts, edit, view all things that have to do with editing accounts
 * 
 */
include "../../small_header.php";
include "adminHeader.php";



function getUser($id="all"){
	$db = db::getInstance();
	$json = array();
	$json["allPermissions"] = $db->Query("SELECT p.id,p.display FROM permissions AS p ORDER BY p.display",false,"assoc_array");
	$holderArray = array();
	foreach ($json["allPermissions"] as $k=>$data){
		$holderArray[$data["id"]] = $data["display"];
	}
	$json["allPermissions"] = $holderArray;
	unset($holderArray);
	if($id=="all"){
		$json["users"] = $db->Query("SELECT *, MD5(email_address) AS md5Email FROM users",false,"assoc_array"); 
		$json["permissions"] = $db->Query("SELECT up.user_id,up.permission_id,p.display FROM user_permissions AS up JOIN permissions AS p ON (up.permission_id=p.id)",false,"assoc_array");
		
	}else{
		$json["users"] = $db->Query("SELECT * FROM users WHERE id=".$id,false,"assoc_array");
		$json["permissions"] = $db->Query("SELECT up.user_id,up.permission_id,p.display FROM user_permissions AS up JOIN permissions AS p ON (up.permission_id=p.id) WHERE up.user_id=".$id,false,"assoc_array");
	}
	
	return $json;
}

function adjustPerms($toggle = 1,$userId = 0, $permId = 0){
	$db = db::getInstance();
	if($toggle == 1){  //add permission
		$res = $db->Query("INSERT INTO user_permissions (user_id,permission_id) VALUES (".$userId.",".$permId.");",false,"row");
		if(count($db->Error) == 2){
			$response["error"] = $db->Error[1];
			return $db->Error;
		}else{
			$response["message"] = "The permssion was successfully added!";
			return true;
		}
	}else{ // remove permission
		$res = $db->Query("DELETE FROM user_permissions WHERE (user_id = ".$userId." AND permission_id = ".$permId.");",false,"row");
		if(count($db->Error) == 2){
			return $db->Error[1]; 
		}else{
			return true;			
		}
	}
}
if(count($_GET) > 0){
	if($_GET["userId"] == $usr->getUserId()){
		$response["message"] = "You can not modify your own permissions";
		$response["error"] = "Permission Denied";
		echo json_encode($response);
		die();	
	}
	switch($_GET["type"]){
		case "adjustPerms":
			$response["data"] = adjustPerms($_GET["value"],$_GET["userId"],$_GET["perm"]);
			$response["message"] = "The permssion was successfully adjusted!";			
			break;
		case "allUsers":
			$response["data"] = getUser();		
			break;
		default:
			$response["message"] = "You requested data that could not be found";
			$response["error"] = "Format request error";
		break;
	}
}else{

}

echo json_encode($response);

