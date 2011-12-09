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
	if($id=="all"){
		$json["users"] = $db->Query("SELECT * FROM users",false,"assoc_array"); 
		$json["permissions"] = $db->Query("SELECT up.user_id,up.permission_id,p.display FROM user_permissions AS up JOIN permissions AS p ON (up.permission_id=p.id)",false,"assoc_array");
		
	}else{
		$json["users"] = $db->Query("SELECT * FROM users WHERE id=".$id,false,"assoc_array");
		$json["permissions"] = $db->Query("SELECT up.user_id,up.permission_id,p.display FROM user_permissions AS up JOIN permissions AS p ON (up.permission_id=p.id) WHERE up.user_id=".$id,false,"assoc_array");
	}
	
	return $json;
}


echo json_encode(getUser());
