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
		
			//echo $openid->mode;
			/*
			echo $first_name."<br>";
			echo $last_name."<br>";
			echo $email."<br>";
			echo $identity."<br>"; 
		*/
			//echo $identity;
			$userId = $db->Query("SELECT id,firstname,lastname,username FROM tickets.users WHERE email_address ='".$email."' ",false,"assoc");
			// This needs its own if statement to make sure its actually ran.
			if(is_array($userId)){ // There is a matching email address
				$openIdtoUserID = $db->Query("SELECT user_id,open_id FROM tickets.openId_users WHERE user_id ='".$userId["id"]."'AND open_id='".$identity."';",false,"row");
			}else{// no matching email address
				$openIdtoUserID = $db->Query("SELECT user_id,open_id FROM tickets.openId_users WHERE open_id='".$identity."';",false,"row");
				if(is_array($openIdtoUserID)){ // we did however find a id openId link 
					$userId["id"] = $openIdtoUserID[0];	
				}
			}


			if(is_array($userId)){ // there is an email to link
				if(is_array($openIdtoUserID)){ // There is a matching email and there is a linked account already
					echo "Thank you for logging into ticket with a google account.  We will now fully log you into tickets<br>"; 
					$password = $db->Query("SELECT password FROM users WHERE id=".$userId["id"],false,"row");
					$response = login($userId["id"],$password,$response,true);
					echo '<script type="text/javascript">window.opener.window.login('.json_encode($response).');window.close();</script>';
				}else{// there is a matching email but no openid link
					echo "There is an account with the same email address found. Do you want to link it to this Google ID?<br>";
					echo "<button class='minimal ticketPadding3' id='yesLink' style='width:100px;'>Yes</button>";
					echo "<button class='minimal ticketPadding3' id='noLink' style='width:100px;'>No</button>";
				}
			}else{ // there is no matching email address 
				if(isset($usr) && isset($usr->User_id)){ // this is a logged in user lets do some stuff
					$db->Query("INSERT INTO openId_users (user_id,open_id) VALUES (".$usr->User_id.",'".mysql_real_escape_string($_SESSION["openID"]["identity"])."')");
					if(count($db->Error==2)){//There was an error
						echo "There was an error trying to link your accounts.";
						print_r($db->Error);
					}else{
						echo "Your account is now linked with your google account";
					}
				}else{ // The user is NOT logged in there is no link and no openid info
					echo "We could not find a Tickets account with the email address provided: <strong>".$email."</strong><br>";
					echo "Please log in to tickets to link your email address.<br>";
					echo "<button class='minimal ticketPadding3' id='noLink' style='width:100px;'>Close</button><br>";
					echo "Would you rather use this account's information in tickets as a new user?";
					echo "<button class='minimal ticketPadding3' id='newUser' style='width:100px;'>Yes</button><br>";
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