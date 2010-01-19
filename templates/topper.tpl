<div class="dark fg-toolbar ui-helper-clearfix" style="height:30px;overflow:hidden;" id="topper">
	<div class="fg-buttonset ui-helper-clearfix"> 
		<div class="option-theme fg-button ui-corner-all lapcatButton white" style="width:auto;min-width:16px;min-height:16px;" id="t_uI"><span class="ticket_sprite user" style="width:auto;min-width:16px;min-height:16px;">{if ($firstname)}
		{$firstname} {$lastname} ({$username})	
		{else}   
		{/if}
		</span></div>
		<div class="option-purple fg-button ui-corner-all lapcatButton white" id="topperNew" style="width:auto"><span class="ticket_sprite add">New Ticket</span></div>
		<div class="option-purple fg-button ui-corner-all lapcatButton white" id="topperSearch" style="width:auto"><span class="ticket_sprite search">Search</span></div>
		<div class="option-theme fg-button ui-corner-all lapcatButton white" id="topperRecent" style="width:auto" title="Toggle Recent"><span class="ticket_sprite bug">Recent Tickets</span></div>
		<div class="option-purple fg-button ui-corner-all lapcatButton white" id="t_fT" style="width:auto" title="Toggle Bookmark"><span class="ticket_sprite tick">Bookmark</span></div>
	</div>
	<div class="fg-buttonset ui-helper-clearfix fg-buttonset-multi">
		<div class="option-black fg-button ui-corner-all white lapcatButton" id="replyToggle" style="width:auto" title="Toggle Replies"><span class="ticket_sprite eye">Toggle Replies</span></div>
	</div>
	<div class="fg-buttonset ui-helper-clearfix" style="float:right"> 
				
	</div>

</div>
<div class="ui-helper-hidden" id="t_userid">{$user_id}</div>

<div class="opposite" id="working" style="margin:5px;padding:2px;position:absolute;right:0;top:0;">Loading...</div>
