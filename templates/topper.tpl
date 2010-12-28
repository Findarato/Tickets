<div class="fontReverse" style="height:40px;width:100%;padding:4px 4px 4px 0;position:relative;text-align:right;" id="topper">
  <a class="right ticket_button ticket_sprite user nolink fontReverse" href="#userPage/" id="topperUserInfo" style="padding-right:5px;width:auto;text-decoration:none;">{if isset($firstname)}{$firstname} {$lastname} ({$username}) {else} No User (Please Log in) {/if}</a>
  <div style="display:block;height:40px;width:auto;position:absolute;top:0;left:0;">
    <div style="height:40px;display:inline-block">
      <a class="left fakelink ticket_link" href="#start" style="display:inline-block;background:url(/tickets/css/tickets-logo.png) no-repeat scroll 0% 0% transparent;height:40px;width:59px;-moz-background-size:100% 100%;-webkit-background-size:100% 100%;-o-background-size:100% 100%;background-size:100% 100%;"></a>
    </div>
    <div style="width:auto;height:40px;display:inline-block;text-align:left;">
      <div class="" style="width:auto;height:16px">The issue tracking system</div>
      <div class="fontReverse  fakelink" style="width:auto;height:16px" id="updateNotesContainer" title="Update Notes">
       <span class="" id="UpdateNotes">
          <a class="ticket_link fakelink fontReverse" href="#updateNotes" id="Version"></a>
       </span>
      </div>
    </div>    
  </div>
</div>