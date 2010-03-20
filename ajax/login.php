<?php
	include_once "../small_header.php";
	$_POST = $db->Clean($_POST);//clean out the post before it can be used
	if(!isset($_SESSION["user"]) || unserialize($_SESSION['user'])->User_id==-1 ||unserialize($_SESSION['user'])->A_U['type']<4) {//there is not a valid session
		if(isset($_POST["un"]) && isset($_POST["pw"])){ //the user is trying to log on.
			$usr = new user(true);
			$usr->UserLogin($db->Clean($_POST['un']),$db->Clean($_POST['pw']));
			if($usr->User_id==-1|| $usr->A_U['type']<4){
				$response['error']="Invalid Username or Password";
			}else{  
				$_SESSION["user"] = serialize($usr);
				$response["username"]=$usr->A_P['username'];
				$response["firstname"]=$usr->A_U['first-name'];
				$response["lastname"]=$usr->A_U['last-name'];
				$response["userid"]=$usr->User_id;
				$response["theme"]=$usr->a_User["theme"];
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
				//$dt = date("U");
				$dt =date("U");
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
		}
	}elseif(isset($_POST["department_id"]) && isset($_POST["user_id"])){ 
		$db->Query("INSERT INTO department_members (department_id,user_id) VALUES(".$db->Clean($_POST["department_id"]).",".$db->Clean($_POST["user_id"]).");");
		if(count($db->Error)==2){$db->Query("UPDATE department_members SET department_id=".$db->Clean($_POST["department_id"])." WHERE user_id=".$db->Clean($_POST["user_id"]).";");}
		$response['message']="Update Successful";
	}elseif(isset($_POST["getDepartment"])){
		$response["departmentname"] = getDepartment_by_userid($db->Clean($_POST["getDepartment"]));
	}elseif(isset($_POST["opt"])){
		$db->Query("UPDATE department_members SET notify=".$_POST["opt"]." WHERE user_id=".$_POST["user_id"]);
		if($_POST["opt"]==2){
			$response["message"] = "You will be Notified on all Department Tickets";
		}else{$response["message"] = "You will no longer be notified on all Department Tickets";}
		$response["opt"] = $_POST["opt"];
	}elseif(isset($_POST["altEmail"])){
		$usr = unserialize($_SESSION['user']);
		if($_POST["altEmail"]=="clear"){
			$db->Query("DELETE FROM alt_email WHERE user_id=".$usr->User_id." AND email='".$db->Clean($_POST["oldAltEmail"])."' LIMIT 1;");
			$response['message']="Email address cleared";
		}else{
			$db->Query("INSERT INTO alt_email (user_id,email) VALUES(".$usr->User_id.",'".$db->Clean($_POST["altEmail"])."');");
			if(count($db->Error)==2){$db->Query("UPDATE alt_email SET email=".$db->Clean($_POST["altEmail"])." WHERE user_id=".$usr->User_id.";");}
			$response['message']="Update Successful";
		}
		$response["altEmail"] = $_POST["altEmail"];
	}else{
		$response["error"]=="Invalid Username or passwordd";
		echo json_encode($response);
		die();
	}
echo json_encode($response);	
?>