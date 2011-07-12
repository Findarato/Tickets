<?php
require 'openid.php';
require "../../small_header.php";
$_SESSION["validOpenID"] = false;
$_SESSION["openID"] = array();
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
        	//require "/classes/"
            echo 'User <b>' . $openid->identity . '</b> has logged in.<br>';
 
            echo "<h3>User information</h3>";
 
            $identity = $openid->identity;
            $attributes = $openid->getAttributes();
            $email = $attributes['contact/email'];
            $first_name = $attributes['namePerson/first'];
            $last_name = $attributes['namePerson/last'];
 			
 			/*
            echo "mode: " . $openid->mode . "<br>";
            echo "identity: " . $identity . "<br>";
            echo "email: " . $email . "<br>";
            echo "first_name: " . $first_name . "<br>";
            echo "last_name: " . $last_name . "<br>";
			*/

			$_SESSION["openID"]["email"] = $email;
			$_SESSION["openID"]["mode"] = $openid->mode;
			$_SESSION["openID"]["identity"] = $identity;
			$_SESSION["openID"]["first_name"] = $first_name;
			$_SESSION["openID"]["last_name"] = $last_name;
		
			$user_id = $db->Query("SELECT id FROM tickets.users WHERE email_address ='".$email."' ",false,"row");

			if($res == 0){
				
			}else{
				print_r($res);
				$_SESSION["validOpenID"] = true;
				$openIdtoUserID = $db->Query("SELECT user_id,open_id FROM tickets.openId_users WHERE user_id ='".$User_id."' ",false,"row");
				if($openIdtoUserID == 0){ //There is no link in the openID table
					echo "There is no Google ID link<br>";
					echo "If you have a Tickets account please login with that now.";
					echo "<button>Close</button>";		
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