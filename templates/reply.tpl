<div id="newReplydialog" class="color-off" style="padding:5px;">
	<form name="newReplyForm" id="newReplyForm">
		<div id="">
			<div class="textLeft"><font class="opposite">Reply Subject:</font><input type="text" name="title" autocomplete="off" maxlength="100" id="replyTitle" class="dropdown Ticketform"/><br>
			<font class="opposite">Reply</font><br /> <textarea name="description" cols="30" rows="10" autocomplete="off"  class="dropdown Ticketform"></textarea>
				<INPUT type="hidden" id="replyuserid" name="user_id" value="{$user_id}">
				<INPUT type="hidden" id="replyticketid" name="ticket_id"  value="{$ticket_id}" >
				<INPUT type="hidden" name="type" value="{$type}">
			</div>
	</form>
			<div class="table textLeft" style="width:100px">
				<div class="td"><a class="option-theme fg-button ui-corner-all white lapcatButton Cancel" id="replyCancelBtn">Cancel</a></div>
				<div class="td"><a class="option-theme fg-button ui-corner-all white lapcatButton" id="replyAddBtn">Add</a></div>
			</div>
		</div>		
</div>