<?php


require 'openid.php';
require "../../small_header.php";
$_SESSION["validOpenID"] = false;
$_SESSION["openID"] = array();

if(isset($_SESSION["user"])){$usr = unserialize($_SESSION["user"]);}

?>
<html>
	<head>
	 	<link id="themegencss" href="/tickets/css/themes/default/style.css" rel="stylesheet" />
        <link rel="stylesheet" media="screen" href="/css/buttons.css?v=21"  /> 
        <link rel="stylesheet" media="screen" href="/css/tickets.css?v=22"  /> 
        <link rel="shortcut icon" href="/tickets/bug.png">
        <script type="text/javascript">
            var gaJsHost = (("https:" == document.location.protocol) ? "https://ssl." : "http://www.");
            document.write(unescape("%3Cscript src='" + gaJsHost + "google-analytics.com/ga.js' type='text/javascript'%3E%3C/script%3E"));
        </script>
        <script type="text/javascript">
            var pageTracker = _gat._getTracker("UA-8067208-4");
            pageTracker._trackPageview();
        </script>
		<script src="http://ajax.microsoft.com/ajax/jQuery/jquery-1.6.2.min.js"></script>
		<script src="http://<?=$server;?>/js/login.js"></script>
		
	</head>
	<body>
		<?php
try {
    $openid = new LightOpenID;
    if(!$openid->mode) {
        if(isset($_GET['login'])) {
            $openid->identity = 'https://www.google.com/accounts/o8/id';
            $openid->required = array('namePerson/first', 'namePerson/last', 'contact/email');
			
            header('Location: ' . $openid->authUrl());
        }
    } elseif($openid->mode == 'cancel') {
        echo 'User has canceled authentication!';
    } else {
        if($openid->validate()){
            $identity = $openid->identity;
            $attributes = $openid->getAttributes();
            $email = $attributes['contact/email'];
            $first_name = $attributes['namePerson/first'];
            $last_name = $attributes['namePerson/last'];
 			
			$_SESSION["openID"]["email"] = $email;
			$_SESSION["openID"]["mode"] = $openid->mode;
			$_SESSION["openID"]["identity"] = $identity;
			$_SESSION["openID"]["first_name"] = $first_name;
			$_SESSION["openID"]["last_name"] = $last_name;
		
		
			//echo $identity;
			$userId = $db->Query("SELECT id,firstname,lastname,username FROM tickets.users WHERE email_address ='".$email."' ",false,"assoc");
			if($userId != 0){
				$openIdtoUserID = $db->Query("SELECT user_id,open_id FROM tickets.openId_users WHERE user_id ='".$userId["id"]."'AND open_id='".$identity."';",false,"row");	
			}else{
				$openIdtoUserID = $db->Query("SELECT user_id,open_id FROM tickets.openId_users WHERE open_id='".$identity."';",false,"row");
				$userId["id"] = $openIdtoUserID[0];
			}
				
			if($userId == 0 && $openIdtoUserID == 0){ //We did not find a account to link
				if(isset($usr) && isset($usr->User_id)){
					$db->Query("INSERT INTO openId_users (user_id,open_id) VALUES (".$usr->User_id.",'".mysql_real_escape_string($_SESSION["openID"]["identity"])."')");
					if(count($db->Error==2)){//There was an error
						echo "There was an error trying to link your accounts.";
						print_r($db->Error);
					}else{
						echo "Your account is now linked with your google account";
					}
				}else{ // there is no logged in user.
					echo "We could not find a Tickets account with the email address provided: <strong>".$email."</strong><br>";
					echo "Please log in to tickets to link your email address.<br>";
					echo "<button class='minimal ticketPadding3' id='noLink' style='width:100px;'>Close</button>";
				}
				//print_r($userId);
			}else{ //There is an account with the same email address
				$_SESSION["validOpenID"] = true;
				//$_SESSION["openID"]["user_id"] = $userId;
				if($openIdtoUserID == 0){ //There is no link in the openID table
					echo "There is an account with the same email address found. Do you want to link it to this Google ID?<br>";
					echo "<button class='minimal ticketPadding3' id='yesLink' style='width:100px;'>Yes</button>";
					echo "<button class='minimal ticketPadding3' id='noLink' style='width:100px;'>No</button>";
				}else{//There is a link to a user id in the table.
					echo "Thank you for logging into ticket with a google account.  We will now fully log you into tickets<br>"; 
					//require ($_SERVER["DOCUMENT_ROOT"]."/ajax/login.php");
					$password = $db->Query("SELECT password FROM users WHERE id=".$userId["id"],false,"row");
					$response = login($userId["id"],$password,$response,true);
					
					//print_r($response);die("died");
					echo '<script type="text/javascript">window.opener.window.login('.json_encode($response).');window.close();</script>';
					
				}
			}
        }
        else{
            echo 'User ' . $openid->identity . 'has not logged in.';
        }
    }
} catch(ErrorException $e) {
    echo $e->getMessage();
}
?>
	</body>	
</html>