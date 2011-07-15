<?php
	include_once "../small_header.php"; 
	
	
	function login($un,$pw,$response,$openid=false){
		$db = db::getInstance();
		if($openid){
			$usr = new user($un,$pw,true,true);
			echo "cool";
			print_r($usr);die();
		}else{
			$usr = new user($un,$pw);
		}
		die();
		if($usr->User_id==-1|| $usr->A_U['type']<4){
			$response['error']="Invalid Username or Password";
		}else{  
			$_SESSION["user"] = serialize($usr);
			$response["username"]=$usr->A_P['username'];
			$response["firstname"]=$usr->A_U['first-name'];
			$response["lastname"]=$usr->A_U['last-name'];
			$response["userid"]=$usr->User_id;
			$dep = getDepartment_by_userid($usr->User_id); 
			$dep = array_implode($dep);
			if(count($dep)!=2 || $dep===false){
				$response["departmentid"]=-1; 
				$response["departmentname"] = "None!";
			}else{
				$response["departmentid"] = $dep[0];
				$response["departmentname"] = $dep[1];
			}
			$db->Query("SELECT notify FROM department_members WHERE user_id=".$usr->User_id);
			$res = $db->Fetch("row");
			$response["opt"] = $res;
			$dt = date("U");
			$response['message'] = "Login Successful";
			$db->Query("SELECT dt FROM lastlogon WHERE user_id=".$response["userid"]);
			$llo = $db->Fetch("row");
			$response['lastlogon'] = $llo;
			$_SESSION["lastlogon"] = $llo;
			$db->Query("INSERT INTO lastlogon (user_id,dt) VALUES(".$response["userid"].",".$dt.");");
			if(count($db->Error)==2){$db->Query("UPDATE lastlogon SET dt=".$dt." WHERE user_id=".$response["userid"].";");}
			$db->Query("SELECT email FROM alt_email WHERE user_id=".$response["userid"]);
			$altE = $db->Fetch("row");
			$response["altEmail"] = $altE;
			
		}
		return $response;
	} 
	
	$_POST = $db->Clean($_POST);//clean out the post before it can be used
	if(!isset($_SESSION["user"]) || unserialize($_SESSION['user'])->User_id==-1 ||unserialize($_SESSION['user'])->A_U['type']<4) {//there is not a valid session
		if(isset($_POST["un"]) && isset($_POST["pw"])){ //the user is trying to log on.
			$response = login($db->Clean($_POST['un']),$db->Clean($_POST['pw']),$response);
		}elseif(isset($_GET["openId"]) && isset($_GET["userId"])){// We are trying to login with an openID
			$res = $db->Query("SELECT open_id FROm openId_users WHERE user_id=".$_SESSION["openID"]["user_id"][0]." LIMIT 1",false,"row");
			//print_r($res);echo count($res);
			//$response["debug3"] = $res;	
			if(count($res) == 0 || $res == 0){ // lets just make sure that we are not entering in a lot of values
				$db->Query("INSERT INTO openId_users (user_id,open_id) VALUES (".$_SESSION["openID"]["user_id"][0].",'".mysql_real_escape_string($_SESSION["openID"]["identity"])."')");
				//$response["debug"] = "Added to the table";
				//$response["debug2"] = count($res);	
			}else{
				//$response["debug"] = "DID NOT Add to the table";
				//$response["debug2"] = count($res);
			}
				//Lets do some cryptic database and data manip. 
				
				$password = $db->Query("SELECT password FROM users WHERE id=".$_SESSION["openID"]["user_id"][0],false,"row");
				$response["pwtest"] = $password;
				$response = login($_SESSION["openID"]["user_id"][0],$password,$response,true);
			
			/*
			 * 
			 * 			$_SESSION["openID"]["email"] = $email;
			$_SESSION["openID"]["mode"] = $openid->mode;
			$_SESSION["openID"]["identity"] = $identity;
			$_SESSION["openID"]["first_name"] = $first_name;
			$_SESSION["openID"]["last_name"] = $last_name;
			 * 
			 * 
			 */  
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
	}elseif(isset($_GET["altEmail"])){
		$usr = unserialize($_SESSION['user']);
		if($_POST["altEmail"]=="clear"){
			$db->Query("DELETE FROM alt_email WHERE user_id=".$usr->User_id." AND email='".$db->Clean($_POST["oldAltEmail"])."' LIMIT 1;");
			$response['message']="Email address cleared";
		}else{
			$db->Query("REPLACE INTO alt_email (user_id,email) VALUES(".$usr->User_id.",'".$db->Clean($_POST["altEmail"])."');");
			if(count($db->Error)==2){$db->Query("UPDATE alt_email SET email=".$db->Clean($_POST["altEmail"])." WHERE user_id=".$usr->User_id.";");}
			$response['message']="Update Successful";
		}
		$response["altEmail"] = $_POST["altEmail"];
	}elseif(isset($_GET["logout"])){
		$usr = unserialize($_SESSION['user']);			
		$usr->LogUserOut();
		unset($_SESSION['user']);
		$response["message"]="Successfully Logged out of Tickets";
	}else{
		$response["error"]=="Invalid Username or password";
		echo json_encode($response);
		die();
	}
echo json_encode($response);	
?>