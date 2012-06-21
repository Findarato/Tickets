<?php

require 'openid.php';
require $_SERVER["DOCUMENT_ROOT"] . "/small_header.php";
$_SESSION["validOpenID"] = false;
$_SESSION["openID"] = array();

if (isset($_SESSION["user"])) {$usr = unserialize($_SESSION["user"]);
}
?>
<!DOCTYPE html>
<html>
	<head>
	    <meta charset="utf-8">
	    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
	    <meta name="description" content="La Porte County Public Library Ticket tracking system">
	    <meta name="author" content="Joseph Harry">
	    <meta name="viewport" content="width=device-width; initial-scale=1.0; maximum-scale=1.0;">
	    <title>Tickets - The tracking system</title>
	    <link href='http://fonts.googleapis.com/css?family=Dancing+Script' rel='stylesheet' type='text/css' />
	    <link href='http://fonts.googleapis.com/css?family=Buda:light' rel='stylesheet' type='text/css' />
	    <link href='http://fonts.googleapis.com/css?family=Calligraffitti' rel='stylesheet' type='text/css' />
	    <link href='/css/WebSymbols-Font-Pack/stylesheet.css' rel='stylesheet' type='text/css'>
	    <link rel="stylesheet" media="screen" href="/css/foundation.css?v=2"/>
	    <link rel="stylesheet/less" id="themeCss" href="/css/themes/default/less/style.less"/>
	    <link rel="stylesheet" media="screen and (max-width: 1024px) " href="/css/handheld.css?v=2"/>
	    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js"></script>
	    <script type="text/javascript" src="/js/modernizr.custom.04865.js"></script>
	
	    <script src="/js/libs/less-1.3.0.min.js"></script>
	    <script src="/js/modules/login.js"></script>
	    <link rel="shortcut icon" href="/bug.png">
	    <link rel="apple-touch-icon" href="/bug.png">
	    <link rel="icon" type="image/png" href="/bug.png" />
	    <script type="text/javascript">
			var gaJsHost = (("https:" == document.location.protocol) ? "https://ssl." : "http://www.");
			document.write(unescape("%3Cscript src='" + gaJsHost + "google-analytics.com/ga.js' type='text/javascript'%3E%3C/script%3E"));
	    </script>
	    <script type="text/javascript">
			var pageTracker = _gat._getTracker("UA-8067208-4");
			pageTracker._trackPageview();
	    </script>
	</head>
	<body>
	<div style="margin:0px auto; width:100%">
		<nav title="top Navagation" class="firstNav color1" style="position:relative;overflow:hidden;text-align: center;margin:0;margin-bottom:10px;top:0;left:0;height:79px">
			<div class="topNav " style="text-align:center;margin:0 auto;">
				<div class="td">
					<a href="/"><img src="/images/tree.png" alt="Lpcpls" width="68px" height="75px" border="0" style="display:inline-block"></a>
				</div>
				<div class="td" style="position:relative;">
					<h1 style="overflow:hidden;"><a href="/" style="text-decoration: none;" data-small="LPCPL" id="headerLink">La Porte County Public Library System</a></h1>
					<h3>learn, enrich, enjoy</h3>
				</div>
			</div>
					<div class="pageBranding color5Soft rotate45n">
						<a href="#updateNotes" id="ticketsBrand" title="Tickets Version:">Tickets</a>
						<div class="fontMain fakelink" style="width:auto;" id="updateNotesContainer" title="Update Notes">
							<span class="" id="UpdateNotes" style="display:none;"> <a class="fontMain fakelink " href="#updateNotes" > <span class="fontMain" id="Version">8.8.8.8</span> </a> </span>
						</div>
					</div>
		</nav>		
		<?php
		try {
			$openid = new LightOpenID;
			if (!$openid -> mode) {
				if (isset($_GET['login'])) {
					$openid -> identity = 'https://www.google.com/accounts/o8/id';
					$openid -> required = array('namePerson/first', 'namePerson/last', 'contact/email');

					header('Location: ' . $openid -> authUrl());
				}
			} elseif ($openid -> mode == 'cancel') {
				echo 'User has canceled authentication!';
			} else {
				if ($openid -> validate()) {
					$identity = $openid -> identity;
					$attributes = $openid -> getAttributes();
					$email = $attributes['contact/email'];
					$first_name = $attributes['namePerson/first'];
					$last_name = $attributes['namePerson/last'];

					$_SESSION["openID"]["email"] = $email;
					$_SESSION["openID"]["mode"] = $openid -> mode;
					$_SESSION["openID"]["identity"] = $identity;
					$_SESSION["openID"]["first_name"] = $first_name;
					$_SESSION["openID"]["last_name"] = $last_name;
					$userId = $db -> Query("SELECT id,firstname,lastname,username FROM tickets.users WHERE email_address ='" . $email . "' LIMIT 1", false, "assoc");
					$_SESSION["openID"]["user_id"] = $userId["id"];
					$_SESSION["openID"]["mdEmail"] = md5(strtolower(trim($email)));
					// This needs its own if statement to make sure its actually ran.
					if (is_array($userId)) {// There is a matching email address
						$openIdtoUserID = $db -> Query("SELECT user_id,open_id FROM tickets.openId_users WHERE user_id ='" . $userId["id"] . "'AND open_id='" . $identity . "';", false, "row");
					} else {// no matching email address
						$openIdtoUserID = $db -> Query("SELECT user_id,open_id FROM tickets.openId_users WHERE open_id='" . $identity . "';", false, "row");
						if (is_array($openIdtoUserID)) {// we did however find a id openId link
							$userId["id"] = $openIdtoUserID[0];
						}
					}
					if (is_array($userId)) {// there is an email to link
						if (is_array($openIdtoUserID)) {// There is a matching email and there is a linked account already
							echo "Thank you for logging into ticket with a google account.  We will now fully log you into tickets<br>";
							$password = $db -> Query("SELECT password FROM users WHERE id=" . $userId["id"], false, "row");
							$response = login($userId["id"], $password, $response, true);
							?>
							<script type="text/javascript">$.getJSON("/ajax/login.php",{"userIdFetch":1},function(data){localStorage.setItem("userId",data.user_id);login(data);});//window.location = "/";</script>
							<?Php
						} else {// there is a matching email but no openid link
							echo "There is an account with the same email address found. Do you want to link it to this Google ID?<br>";
							echo "<button class='ticketPadding3' id='yesLink' style='width:100px;'>Yes</button>";
							echo "<button class='ticketPadding3' id='noLink' style='width:100px;'>No</button>";
						}
					} else {// there is no matching email address and I am going to ask them some questions now
						if (isset($usr) && isset($usr -> User_id)) {// this is a logged in user lets do some stuff
							$db -> Query("INSERT INTO openId_users (user_id,open_id) VALUES (" . $usr -> User_id . ",'" . mysql_real_escape_string($_SESSION["openID"]["identity"]) . "')");
							if (count($db -> Error == 2)) {//There was an error
								echo "There was an error trying to link your accounts.";
								print_r($db -> Error);
								print_r($_SESSION);
							} else {
								echo "Your account is now linked with your google account";
							}
						} else {// The user is NOT logged in there is no link and no openid info
						?>
							We could not find a Tickets account with the email address provided: <strong><?=$email;?></strong> <br><br>
							You must either link the email address <strong><?=$email;?></strong> to an exsisting ticket account by first signing into tickets, or create a new account with this email address by clicking the button below.  If you create a new account you will need to request permission to access most of the features of tickets by contacting a tickets admin.<br>
							<div style="margin 0 auto">
								<button class='minimal ticketPadding3' id='newUser' style='width:auto;'>Create New Account</button>
								<button class='minimal ticketPadding3' id='noLink' style='width:auto;'>Do not Create New Account</button><br>	
							</div>
						<?Php
						}
					}
				}
			}
		} catch(ErrorException $e) {
			echo $e -> getMessage();
		}
	?>
		</div>
	</body>
</html>