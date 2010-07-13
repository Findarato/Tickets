<div id="newReplydialog">
	<div style="width:auto;vertical-align:top;">
		<div class="corners-top-2 " style="width:auto;height:auto;margin-left:5px;">
			<div class="droidSerif font-X head message_head corners-top-2 color-B-2 border-all-B-1" id="replyTitleAreaBOX" style="height:16px;">
				Reply to Ticket
			</div>
			<div class="droidSerif color-X-1" id="replyareabody" style="overflow:auto;height:auto;padding:3px;">
				<form name="newReplyForm" id="newReplyForm">
					<div class="textLeft"><span class="">Reply Subject:</span><input type="text" name="title" autocomplete="off" maxlength="100" id="replyTitle" class=" Ticketform"/><br>
					<span class="">Reply</span><br /> <textarea name="description" cols="30" rows="10" autocomplete="off"  class=" Ticketform"></textarea>
						<INPUT type="hidden" id="replyuserid" name="user_id" value="{$user_id}">
						<INPUT type="hidden" id="replyticketid" name="ticket_id"  value="{$ticket_id}" >
						<INPUT type="hidden" name="type" value="{$type}">
					</div>
				</form>
			</div>
			<div class="droidSerif font-X message_head corners-bottom-2 color-B-2 border-all-B-1" id="" style="height:24px">
				<a class="option-theme fg-button corners-bottom-2 corners-top-2 white lapcatButton Cancel" id="replyCancelBtn">Cancel</a>
				<a class="option-theme fg-button corners-bottom-2 corners-top-2 white lapcatButton" id="replyAddBtn">Add</a>
			</div>
		</div>
	</div>
</div>