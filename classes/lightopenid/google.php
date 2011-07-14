<?php


require 'openid.php';
require "../../small_header.php";
$_SESSION["validOpenID"] = false;
$_SESSION["openID"] = array();


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
        if($openid->validate())
        {
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
			$user_id = $db->Query("SELECT id FROM tickets.users WHERE email_address ='".$email."' ",false,"row");
			
			if($user_id == 0){ //We did not find a account to link
				
			}else{ //There is an account with the same email address
				//print_r($user_id);
				$_SESSION["validOpenID"] = true;
				$openIdtoUserID = $db->Query("SELECT user_id,open_id FROM tickets.openId_users WHERE user_id ='".$User_id."' ",false,"row");
				if($openIdtoUserID == 0){ //There is no link in the openID table
					echo "There is an account with the same email address found. Do you want to link it to this Google ID?<br>";
					echo "<button class='minimal ticketPadding3' id='yesLink' style='width:100px;'>Yes</button>";
					echo "<button class='minimal ticketPadding3' id='noLink' style='width:100px;'>No</button>";
				}else{//There is a link to a user id in the table.

					
				}
			}
        }
        else
        {
            echo 'User ' . $openid->identity . 'has not logged in.';
        }
    }
} catch(ErrorException $e) {
    echo $e->getMessage();
}
?>
	</body>	
</html>