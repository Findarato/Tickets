<?Php
	include_once $_SERVER["DOCUMENT_ROOT"]."/small_header.php";
	
	
	$users = $db->Query("SELECT user_id,email FROM tickets.alt_email",false,"assoc_array");
	
	foreach($users as $u){
		echo "UPDATE users SET email_address='".$u["email"]."' WHERE id=".$u["user_id"]." LIMIT 1;";
	} 

?>