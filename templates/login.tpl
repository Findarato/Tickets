<div class=" " style="height:500px;width:auto;margin-left:5px;">
	<div class="fontMain head message_head colorMain-1 border-all-B-1" id="" style="">
		Please Login
	</div>
	<div class="message_body colorWhite-1 corners-bottom-2" id="" style="height:451px;">
		<form id="frm_login" action="javascript:void(none);" name="login">
			<div style="display:table;margin-bottom:10px;">
				<div style="display:table-cell">
					<div class="fontMain">
						Username:
					</div>
					<input class="roundAll4 border-all-B-2 fontMain" id="un" name="un" placeholder="Enter Username" style="padding:5px;" type="text"/>
				</div>
				<div style="display:table-cell">
					<div class="fontMain ">
						Password:
					</div>
					<input class="roundAll4 border-all-B-2 fontMain" id="loginpassword" name="pw" placeholder="Enter Password" style="padding:5px; margin-left:10px" type="password"/>
				</div>
			</div>
		</form>
		<button class="fontReverse minimal ticketPadding3" id="loginButton" style="width:auto;">
			Login 
		</button>
		<button class="fontReverse minimal ticketPadding3" id="forgotPasswordButton" style="width:auto;">
			Forgot Password
		</button>
		<div class="box_transition textMessages" style="opacity:0;color:#f00;font-weight:bold;display:inline-block;" id="requestSent">Request Sent, Check your inbox.</div>
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
					<button class="fontReverse minimal ticketPadding3" id="forgotPasswordSubmitButton" style="width:auto;">Request</button>	
				</div>
				<div style="float:left;margin-left:10px">
				</div>
		</div>
	</div>
</div>
