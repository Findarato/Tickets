<div class="corners-bottom-2 color-B-2" style="width:auto;height:auto;position:relative;">
	<div id="replyareabody" style="padding:3px;">
		<form name="newReplyForm" id="newReplyForm">
			<div class="textLeft">
			  <span class="">Title:</span>
			  <input type="text" name="title" autocomplete="off" maxlength="100" id="replyTitle" class="corners-bottom-2 corners-top-2 border-B-2 Ticketform" style="padding:3px;width:200px"/><br>
			  <div style="width:auto;border:none;margin:5px;">
			   <textarea name="description" autocomplete="off"  class="corners-bottom-2 corners-top-2 Ticketform" style="width:100%;"></textarea>
			  </div>
				<INPUT type="hidden" id="replyuserid" name="user_id" value="{$user_id}">
				<INPUT type="hidden" id="replyticketid" name="ticket_id"  value="{$ticket_id}" >
				<INPUT type="hidden" name="type" value="{$type}">
			</div>
		</form>
	</div>
	<div style="height:24px;position:absolute;top:2px;right:3px;">
    <div class="ticket_sprite cross fakelink" id="replyCancelButton" style="display:inline-block"></div>
    <div  class="ticket_sprite tick fakelink" id="replyAddButton" style="display:inline-block"></div>
	</div>
</div>