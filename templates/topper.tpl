<div class="color-A-1 font-Y small-shadow-black-down-1" style="overflow:hidden;padding:4px 0 4px 0;z-index:50" id="topper">
	<div class="left font-Y font-bold ticket_button fakelink" id="t_uI">
  	<span class="ticket_button ticket_sprite user" style="width:auto;">{if ($firstname)}{$firstname} {$lastname} ({$username}) {else} {/if}</span>
  </div>
	<div class="left font-Y font-bold ticket_button fakelink" id="topperStart" style="width:auto" title="Show Start Page"><span class="ticket_button ticket_sprite lightning"><span class="topperText">Start</span></span></div>
	<div class="left font-Y font-bold ticket_button fakelink" id="topperNew" style="width:auto" title="Create a new Ticket"><span class="ticket_button ticket_sprite ticket-plus"><span class="topperText">New Ticket</span></span></div>
	<div class="left font-Y font-bold ticket_button fakelink" id="topperNewBug" style="width:auto"><span class="ticket_button ticket_sprite bug"><span class="topperText">New Bug Report</div></span></span>
	<div class="left font-Y font-bold ticket_button fakelink" id="topperSearch" style="width:auto"><span class="ticket_button ticket_sprite magnifier"><span class="topperText">Search</div></span></span>
	<!--<div class="left font-Y font-bold ticket_button fakelink" id="topperRecent" style="width:auto" title="Toggle Recent"><span class="ticket_button ticket_sprite ticket"><span class="topperText">Recent Tickets</span></span></div>-->
	<div class="left font-Y font-bold ticket_button fakelink" id="t_fT" style="width:auto" title="Toggle Bookmark"><span class="ticket_button ticket_sprite bookmark"><span class="topperText">Bookmark</span></span></div>
	<div class="left font-Y font-bold ticket_button fakelink" id="replyToggle" style="width:auto" title="Toggle Replies"><span class="ticket_button ticket_sprite eye"><span class="topperText">Toggle Replies</span></div></span></div>
	<div class="right font-Y font-bold ticket_button "><a class="ticket_link" id="Version" href="#updateNotes" style="margin:5px;padding:2px;">Live Tickets Update XIII</a></div>
<div id="userIdHolder" style="display:none">{$userId}</div>
</div>