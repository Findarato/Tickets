<div class=" " style="height:500px;width:auto;margin-left:5px;">
	<div class="fontMain colorMain-1 border-all-B-1 headerBox" id="" style="">
		Please Login
	</div>
	<div class="message_body colorWhite-1 corners-bottom-2" id="" style="height:451px;border:#fff solid thin">
		<form id="frm_login" action="javascript:void(none);" name="login">
			<div style="display:table;margin-bottom:15px;">
				<div class="box_transition" id="oldLogin" style="height:0px; overflow: hidden">
					<div style="display:table-cell">
						<div class="fontMain" style="height:20px">
							Username:
						</div>
						<div class="fontMain" style="height:20px">
							<input class="roundAll4 border-all-B-2 fontMain" id="un" name="un" placeholder="Enter Username" style="padding:5px;" type="text"/>
						</div>
					</div>
					<div style="display:table-cell">
						<div class="fontMain " style="height:20px">
							Password:
						</div>
						<div class="fontMain" style="height:20px">
							<input class="roundAll4 border-all-B-2 fontMain" id="loginpassword" name="pw" placeholder="Enter Password" style="padding:5px; margin-left:10px" type="password"/>
						</div>
					</div>
					<div style="display:table-cell">
						<div class="fontMain " style="height:20px">
							&nbsp;
						</div>
						<div class="fontMain" style="height:20px;padding-left:5px">
							<button class="button" id="loginButton" style="width:auto;">
								Login
							</button>
						</div>
					</div>
					<div style="display:table-cell">
						<div class="fontMain " style="height:20px">
							&nbsp;
						</div>
						<div class="fontMain" style="height:20px;padding-left:5px">
							<button class="button" id="forgotPasswordButton" style="width:auto;">
								Forgot Password
							</button>
						</div>
					</div>
				</div>
			</div>
		</form>
		<button class="button" id="showOldLoginButton" style="width:auto;">
			old Login
		</button>
		<button class="button" id="googleLogin" style="width:auto;">
			<span class="ticket_button ticketSprite google">Login with Google</span>
		</button>
		<div class="box_transition textMessages" style="opacity:0;color:#f00;font-weight:bold;display:inline-block;" id="requestSent">
			Request Sent, Check your inbox.
		</div>
		<div class="box_transition textMessages" style="opacity:0;color:#f00;font-weight:bold;display:inline-block;" id="loginErrorMessage"></div>
		<div class="" id="forgotPasswordBox" style="width:400px;margin:10px 0 10px 0;height:0;overflow:hidden;">
			<div class="fontMain head message_head colorMain-1 border-all-B-1" id="" style="">
				Request Password Reset
			</div>
			<div class="" style="display:table;margin: 0 0 10px 0;">
				<form id="frm_resetPassword" action="javascript:void(none);" name="resetPassword">
					<div style="display:table-cell;padding-top:10px">
						<div class="fontMain">
							Username:
						</div>
						<input class="roundAll4 border-all-B-2 fontMain" id="recoverUn" name="un" placeholder="Enter Username" style="padding:5px;" type="text"/>
					</div>
					<div style="display:table-cell">
						<div class="fontMain ">
							Email:
						</div>
						<input class="roundAll4 border-all-B-2 fontMain" id="recoverEmail" name="rcoverEmail" placeholder="Enter email" style="padding:5px; margin-left:10px" type="email"/>
					</div>
			</div>
			</form>
			<div style="float:left;">
				<button class="button " id="forgotPasswordSubmitButton" style="width:auto;">
					Request
				</button>
			</div>
			<div style="float:left;margin-left:10px"></div>
		</div>
	</div>
</div>
<div id="ticketLoginNewBox">
	<div class="colorMain-1 insideBorder headerBox" style="width:100%;position:absolute;top:0px;left:0px;">
		New Tickets
	</div>
	<div class="border-all-Main-1 insideBorder headerBox" style="width:100%;position:absolute;top:25px;left:0px;"></div>
</div>