<?
/**
 * Main index page.  Used for loging handeling as well as displaying the tickets. 
 * Tied directly into the smarty template engin
 * 
 * @author Joseph Harry
 * @version 1.0
 * @copyright April 1, 2009
 */
	$depart = "";
	$altE = "";
	include "header.php";
	$smarty->assign('theme_id',2);
	$_SESSION['uploadCnt']=0;
	if(!isset($_SESSION["user"]) || unserialize($_SESSION['user'])->User_id==-1|| unserialize($_SESSION['user'])->A_U['type']<4) {//there is not a valid session
		if(isset($_POST["un"]) && isset($_POST["pw"])){ //the user is trying to log on.
			$usr = new user(true);
			$usr->UserLogin($db->Clean($_POST['un']),$db->Clean($_POST['pw']));
			
			if($usr->User_id==-1 || $usr->A_U['type']<4){$smarty -> assign('content','login.tpl');$smarty -> assign('error','Invalid Username or Password');}else{
				$_SESSION["user"] = serialize($usr);
				$smarty-> assign("content","empty.tpl");
				$smarty->assign('username',$usr->A_P['username']);
				$smarty->assign('firstname',$usr->A_U['first-name']);
				$smarty->assign('lastname',$usr->A_U['last-name']);
				$smarty->assign('user_id',$usr->User_id);
				$smarty->assign('theme_id',$usr->a_User["theme"]);
				$depart = getDepartment_by_userid($usr->User_id);
				$db->Query("SELECT email FROM alt_email WHERE user_id=".$usr->User_id);
				$altE = $db->Fetch("row");
			}
		}else{$smarty -> assign('content','login.tpl');	}
	}else{$smarty-> assign("content","empty.tpl"); 	
		$usr = unserialize($_SESSION['user']);
		$smarty->assign('username',$usr->A_P['username']);
		$smarty->assign('firstname',$usr->A_U['first-name']);
		$smarty->assign('lastname',$usr->A_U['last-name']);
		$smarty->assign('user_id',$usr->User_id);
		$smarty->assign('theme_id',$usr->a_User["theme"]);
		$depart = getDepartment_by_userid($usr->User_id);
		$db->Query("SELECT email FROM alt_email WHERE user_id=".$usr->User_id);
		$altE = $db->Fetch("row");
	}

	$db->Query("SELECT * FROM category");
	$cate = array();
	$dep = array();
	$checkN = false;
	$line = $db->Fetch("assoc_array");
	foreach ($line as $l){$cate[$l["id"]] = $l["name"];}
	$db->Query("SELECT d.name,dm.user_id,d.id,dm.notify FROM department AS d JOIN department_members AS dm ON (dm.department_id=d.id)");
	$line2 = $db->Fetch("row_array");
	foreach($line2 as $line){$userInfo = id2Username($line[1]);
		if(isset($usr)){if($line2[1]==$usr->User_id){if($line[3]==2||$line[3]==1){$checkN="checked";}else{$checkN="none";}}}//checks the notify box on a refresh
		$name = ucwords($userInfo['firstname'])." ".ucwords($userInfo['lastname']);
		if(strlen($name)<5){$name = ucwords($userInfo['username']);}
		$dep[$line[0]][$line[1]] = $name;
		$department[$line[2]] = $line[0];
	}
	$db->Query("SELECT id,name FROM department");
	$res = $db->Fetch("row");
	foreach($res as $r){$Depres[$r[0]]=$r[1];}
	if(isset($depart[0])){$depart = $depart[0];}else{$depart[1]="None!";}

	//Adding in the libraries
	$db->Query("SELECT * FROM library_names ORDER BY name ASC");
	$loc = $db->Fetch("row");
	$location = array();
	foreach($loc as $l){
		switch($l[1]){
			case "All Libraries":case "See Description":break;
			default:
				$location[$l[0]]=$l[1];
				break;
		}
	}
	//$a_res = $o_db->Query("SELECT id,name,serial,model,ram_id,os_id,location_id,manufacturer FROM inventory.hardware WHERE os_id='".$_GET["paramater"]."'  ORDER BY name;",false,"assoc");
	$projects = $db -> Query("SELECT id,name FROM tickets.projects",false,"assoc");
	if(count($depart)<2){$depart[1]="None!";}
	$smarty -> assign('altEmail',$altE);
	$smarty -> assign('notifyCheck',$checkN);
	$smarty -> assign('location',$location);
	$smarty -> assign('departmentName',$depart[1]);
	$smarty -> assign('departmentList',$Depres);
	$smarty -> assign('department',$department);
	$smarty -> assign('cate',$cate);
	$smarty -> assign('assign',$dep);
	$smarty -> assign('projects',$projects);
	$smarty -> assign('type',"new");
	$smarty -> assign('priority',array(0=>"Very Low",1=>"Low",2=>"Tolerable",3=>"Important",4=>"Mission Critical"));
	$smarty -> display('index.tpl');


?>