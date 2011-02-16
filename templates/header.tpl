<div class="fontReverse" style="height:40px;width:100%;padding:4px 0px 4px 0;position:relative;text-align:right;" id="topper" title="Header of document">
	{if isset($firstname)}
		<a class="right ticket_button ticket_sprite user nolink fontReverse" href="#userPage/" id="topperUserInfo" style="padding-right:5px;width:auto;text-decoration:none;">{$firstname} {$lastname} ({$username})</a>
	{else}
		<a class="right ticket_button ticket_sprite user nolink fontReverse" href="#login" id="topperUserInfo" style="padding-right:5px;width:auto;text-decoration:none;">No User (Please Log in) </a>
	{/if}
	<div>
	    <input type="search" name="searchTitle" id="searchTitle" placeholder="Title Search" class="Ticketform roundAll4 border-all-B-2 fontMain" style="padding:3px;width:150px;" />
		<button class="fontMain fontBold minimal" id="searchButton" style="width:auto;padding:3px;" id="ticketSearchBtn" >
			<span class="ticket_button ticket_sprite magnifier"></span>
		</button>
	</div>  
	<div style="display:block;height:40px;width:auto;position:absolute;top:0;left:0;">
		<div style="height:40px;display:inline-block">
			<a class="left fakelink ticket_link" href="#start" style="display:inline-block;background:url(/tickets/css/tickets-logo.png) no-repeat scroll 0% 0% transparent;height:40px;width:59px;-moz-background-size:100% 100%;-webkit-background-size:100% 100%;-o-background-size:100% 100%;background-size:100% 100%;"></a>
		</div>
		<div style="width:auto;height:40px;display:inline-block;text-align:left;">
			<div class="" style="width:auto;height:16px">The issue tracking system</div>
			<div class="fontReverse fakelink" style="width:auto;height:16px" id="updateNotesContainer" title="Update Notes">
				<span class="" id="UpdateNotes">
					<a class="fontReverse fakelink " href="#updateNotes" >
						<span class="fontReverse" id="Version"></span>
					</a>
				</span>
			</div>
		</div>    
	</div>
</div>