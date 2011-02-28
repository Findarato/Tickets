<div class="fontMain" style="height:40px;width:100%;padding:4px 0px 4px 0;position:relative;text-align:right;" id="topper" title="Header of document">
	{if isset($firstname)}
		<a class="right ticket_button ticket_sprite user nolink fontMain" href="#userPage/" id="topperUserInfo" style="padding-right:5px;width:auto;text-decoration:none;">{$firstname} {$lastname} ({$username})</a>
	{else}
		<a class="right ticket_button ticket_sprite user nolink fontMain" href="#login" id="topperUserInfo" style="padding-right:5px;width:auto;text-decoration:none;">No User (Please Log in) </a>
	{/if}
	<div style="display:block;height:40px;width:auto;position:absolute;top:0;left:0;">
		<div style="height:40px;display:inline-block">
			<a class="left fakelink ticket_link" href="#start" style="display:inline-block;background:url(/tickets/css/tickets-logo.png) no-repeat scroll 0% 0% transparent;height:40px;width:59px;-moz-background-size:100% 100%;-webkit-background-size:100% 100%;-o-background-size:100% 100%;background-size:100% 100%;"></a>
		</div>
		<div style="width:auto;height:40px;display:inline-block;text-align:left;">
			<div class="" style="width:auto;height:16px">The issue tracking system</div>
			<div class="fontMain fakelink" style="width:auto;height:16px" id="updateNotesContainer" title="Update Notes">
				<span class="" id="UpdateNotes">
					<a class="fontMain fakelink " href="#updateNotes" >
						<span class="fontMain" id="Version"></span>
					</a>
				</span>
			</div>
		</div>    
	</div>
</div>