<?php	
	include_once $_SERVER["DOCUMENT_ROOT"]."/small_header.php"; 
	
	$_POST = $db->Clean($_POST);//clean out the post before it can be used
	if(!isset($_SESSION["user"]) || unserialize($_SESSION['user'])->User_id==-1 ) {//there is not a valid session
		if(isset($_POST["un"]) && isset($_POST["pw"])){ //the user is trying to log on.
			$response = login($db->Clean($_POST['un']),$db->Clean($_POST['pw']),$response);
		}elseif(isset($_GET["openId"]) && isset($_GET["userId"])){// We are trying to login with an openID
			if($_GET["userId"]==1){
				$res = $db->Query("SELECT open_id FROM tickets.openId_users WHERE user_id=".$_SESSION["openID"]["user_id"]." LIMIT 1",false,"row");
				if(count($res) == 0 || $res == 0){ // lets just make sure that we are not entering in a lot of values
					$db->Query("INSERT INTO tickets.openId_users (user_id,open_id) VALUES (".$_SESSION["openID"]["user_id"].",'".mysql_real_escape_string($_SESSION["openID"]["identity"])."')");
				}
					//Lets do some cryptic database and data manip. 
				$password = $db->Query("SELECT password FROM tickets.users WHERE id=".$_SESSION["openID"]["user_id"],false,"row");
				$response = login($_SESSION["openID"]["user_id"],$password,$response,true);
			}elseif($_GET["userId"] == 2){ // this will be a new user in tickets
				$pass = '!#4$#$%%^jDkksDFUISPSD453Ddded'; 
				// Ok lets make a ticket user
				$un = explode("@",$_SESSION["openID"]["email"]);
				$unTest = $db->Query("SELECT id FROM tickets.users WHERE email_address='".$_SESSION["openID"]["email"]."' LIMIT 1;",false,"row");
				//$response["newid"] = $unTest;
				
				if($unTest == 0){  // lets just make sure some one is not spamming the button.  This kinda helps development as well
					$res = $db->Query('INSERT INTO tickets.users (type,joined,firstname,lastname,username,password,email_address) VALUES (
					1,
					NOW(),
					"'.$_SESSION["openID"]["first_name"].'",
					"'.$_SESSION["openID"]["last_name"].'",
					"'.$un[0].'",
					MD5("'.$pass.'"),
					"'.$_SESSION["openID"]["email"].'");'
					,false,"row");
					$response["newid"] = $res;
					$db->Query("INSERT INTO openId_users (user_id,open_id) VALUES (".$res.",'".mysql_real_escape_string($_SESSION["openID"]["identity"])."')");
					$password = $db->Query("SELECT password FROM tickets.users WHERE id=".$res,false,"row");
					$response["pw"] = $password;
					$response = login($res,$password,$response,true);					
				}
			}
		}	
	}elseif(isset($_GET["department_id"]) && isset($_GET["user_id"])){ 
		$db->Query("INSERT INTO department_members (department_id,user_id) VALUES(".$db->Clean($_GET["department_id"]).",".$db->Clean($_GET["user_id"]).");");
		if(count($db->Error)==2){$db->Query("UPDATE department_members SET department_id=".$db->Clean($_GET["department_id"])." WHERE user_id=".$db->Clean($_GET["user_id"]).";");}
		$response['message']="Update Successful";
	}elseif(isset($_POST["getDepartment"])){
		$response["departmentname"] = getDepartment_by_userid($db->Clean($_POST["getDepartment"]));
	}elseif(isset($_POST["opt"])){
		$db->Query("UPDATE department_members SET notify=".$_POST["opt"]." WHERE user_id=".$_POST["user_id"]);
		if($_POST["opt"]==2){
			$response["message"] = "You will be Notified on all Department Tickets";
		}else{$response["message"] = "You will no longer be notified on all Department Tickets";}
		$response["opt"] = $_POST["opt"];
	}elseif(isset($_POST["altEmail"])){ // this should be where the alternate email is set
		$usr = unserialize($_SESSION['user']);
		$db->Query("UPDATE users SET email_address='".$_POST["altEmail"]."' WHERE id=".$usr->User_id);
		$alt = $db->Query ("SELECT email_address FROM tickets.users WHERE id=".$usr->User_id,false,"row");
		if(count($db->Error)==2){
			$response['message']=$db->Error;
		}
		$response['message']="Update Successful";
		$response["altEmail"] = $alt;
	}elseif(isset($_GET["logout"])){
		$usr = unserialize($_SESSION['user']);	
		unset($_SESSION["openID"]);		
		$usr->LogUserOut();
		unset($_SESSION['user']);
		$response["message"]="Successfully Logged out of Tickets";
	}elseif(isset($_GET["userIdFetch"])){// Just give me the user id.  More of a problem has happened and I lost the user id
		$usr = unserialize($_SESSION['user']);	
		$response["user_id"]=$usr->User_id;
		$response["message"]="Successfully Returned User ID";
	}else{
		$response["error"]=="Invalid Username or password";
		echo json_encode($response);
		die();
	}
echo json_encode($response);	
?>