<div class="font-X" style="height:40px;width:100%;padding:4px 4px 4px 0;position:relative;text-align:right;" id="topper">
	
  <a class="right ticket_button ticket_sprite user nolink font-X" href="#userPage/" id="topperUserInfo" style="padding-right:5px;width:auto;text-decoration:none;">{if ($firstname)}{$firstname} {$lastname} ({$username}) {else} {/if}</a>
  
  <div style="display:block;height:40px;width:auto;position:absolute;top:0;left:0;">
    <div style="height:40px;display:inline-block">
      <a class="left fakelink ticket_link" href="#start" style="display:inline-block;background:url(/tickets/css/tickets-logo.png) no-repeat scroll 0% 0% transparent;height:40px;width:59px;-moz-background-size:100% 100%;-webkit-background-size:100% 100%;-o-background-size:100% 100%;background-size:100% 100%;"></a>
    </div>
    <div style="width:auto;height:40px;display:inline-block;text-align:left;">
      <div class="" style="width:auto;height:16px">The issue tracking system</div>
      <div class="font-X  fakelink" style="width:auto;height:16px" id="updateNotesContainer" title="Update Notes">
       <span class="" id="UpdateNotes">
          <a class="ticket_link fakelink" href="#updateNotes" id="Version"></a>
       </span>
      </div>
    </div>    
  </div>
</div>
{* 
  <div class="right font-X  ticket_button fakelink" id="topperStart" style="width:auto" title="Show Start Page"><span class="ticket_button ticket_sprite lightning"><span class="topperText">Start</span></span></div>
  <div class="right font-X  ticket_button fakelink" id="topperSearch" style="width:auto"><span class="ticket_button ticket_sprite magnifier"><span class="topperText">Search</div></span></span>
  <div class="right font-X  ticket_button fakelink" id="replyToggle" style="width:auto" title="Toggle Replies">
   <span class="ticket_button ticket_sprite eye">
     <span class="topperText">Toggle Replies</span>
   </span>
  </div>
  
  *}