<div class="dark fg-toolbar ui-helper-clearfix" style="height:30px;overflow:hidden;" id="topper">
	<div class="fg-buttonset ui-helper-clearfix"> 
		<div class="option-theme fg-button corners-bottom-2 corners-top-2 lapcatButton white" style="width:auto;min-width:16px;min-height:16px;" id="t_uI"><span class="ticket_button ticket_sprite user" style="width:auto;min-width:16px;min-height:16px;">{if ($firstname)}
		{$firstname} {$lastname} ({$username})	
		{else}   
		{/if}
		</span></div>
		<div class="option-theme fg-button corners-bottom-2 corners-top-2 lapcatButton white" id="topperStart" style="width:auto" title="Show Start Page"><span class="ticket_button ticket_sprite tux">Start</span></div>
		<div class="option-purple fg-button corners-bottom-2 corners-top-2 lapcatButton white" id="topperNew" style="width:auto"><span class="ticket_button ticket_sprite add">New Ticket</span></div>
		<div class="option-purple fg-button corners-bottom-2 corners-top-2 lapcatButton white" id="topperSearch" style="width:auto"><span class="ticket_button ticket_sprite search">Search</span></div>
		<div class="option-theme fg-button corners-bottom-2 corners-top-2 lapcatButton white" id="topperRecent" style="width:auto" title="Toggle Recent"><span class="ticket_button ticket_sprite bug">Recent Tickets</span></div>
		<div class="option-purple fg-button corners-bottom-2 corners-top-2 lapcatButton white" id="t_fT" style="width:auto" title="Toggle Bookmark"><span class="ticket_button ticket_sprite tick">Bookmark</span></div>
	</div>
	<div class="fg-buttonset ui-helper-clearfix fg-buttonset-multi">
		<div class="option-black fg-button corners-bottom-2 corners-top-2 white lapcatButton" id="replyToggle" style="width:auto" title="Toggle Replies"><span class="ticket_button ticket_sprite eye">Toggle Replies</span></div>
	</div>
	<div class="fg-buttonset ui-helper-clearfix" style="float:right"> 
				
	</div>

</div>
<div class="ui-helper-hidden" id="t_userid">{$user_id}</div>
<a class="font-X ticket_link" id="Version" href="#updateNotes" style="margin:5px;padding:2px;position:absolute;width:auto;right:0;top:0;">Live Tickets Update XIII</a>
<a class="font-X ticket_link" id="clearLocalStorage" href="#updateNotes" style="margin:5px;padding:2px;position:absolute;width:auto;right:100px;top:0;">Clear LocalStorage</a>