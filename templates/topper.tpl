<div class="fg-toolbar ui-helper-clearfix" style="height:30px;overflow:hidden;" id="topper">
	<div class="button-theme ticketButton lapcatButton font-Y font-bold" style="width:auto;min-width:16px;min-height:16px;" id="t_uI"><span class="ticket_button ticket_sprite user" style="width:auto;min-width:16px;min-height:16px;">{if ($firstname)}
	{$firstname} {$lastname} ({$username})	
	{else}   
	{/if}
	</span></div>
	<div class="button-theme fg-button ticketButton lapcatButton font-Y font-bold" id="topperStart" style="width:auto" title="Show Start Page"><span class="ticket_button ticket_sprite lightning">Start</span></div>
	<div class="button-purple fg-button ticketButton lapcatButton font-Y font-bold" id="topperNew" style="width:auto"><span class="ticket_button ticket_sprite ticket-plus">New Ticket</span></div>
	<div class="button-purple fg-button ticketButton lapcatButton font-Y font-bold" id="topperNewBug" style="width:auto"><span class="ticket_button ticket_sprite bug">New Bug Report</span></div>
	<div class="button-purple fg-button ticketButton lapcatButton font-Y font-bold" id="topperSearch" style="width:auto"><span class="ticket_button ticket_sprite magnifier">Search</span></div>
	<div class="button-theme fg-button ticketButton lapcatButton font-Y font-bold" id="topperRecent" style="width:auto" title="Toggle Recent"><span class="ticket_button ticket_sprite ticket">Recent Tickets</span></div>
	<div class="button-purple fg-button ticketButton lapcatButton font-Y font-bold" id="t_fT" style="width:auto" title="Toggle Bookmark"><span class="ticket_button ticket_sprite bookmark">Bookmark</span></div>
	<div class="button-black fg-button corners-bottom-2 corners-top-2 font-Y ticketButton lapcatButton font-bold" id="replyToggle" style="width:auto" title="Toggle Replies"><span class="ticket_button ticket_sprite eye">Toggle Replies</span></div>
</div>
<div class="ui-helper-hidden" id="t_userid">{$user_id}</div>
<a class="font-X ticket_link" id="Version" href="#updateNotes" style="margin:5px;padding:2px;position:absolute;width:auto;right:0;top:0;">Live Tickets Update XIII</a>
<!--<a class="font-X ticket_link" id="clearLocalStorage" href="#updateNotes" style="margin:5px;padding:2px;position:absolute;width:auto;right:100px;top:0;">Clear LocalStorage</a>-->