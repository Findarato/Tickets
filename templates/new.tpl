<div id="newTicketdialog">
<div class="border-all-B-1 color-D-1" style="padding:5px;">
	<form name="newTicketForm" action="#" method="post" id="newTicketForm">
	<table border="0" cellpadding="0" cellspacing="0">
		<tr>
			<td style="text-align:left;"><font class="">Title of Ticket:</font><input type="text" name="newTicketTitle" id="newTicketTitle"  class="dropdown Ticketform " maxlength="35" /></td>
		</tr>
		<tr>
			<td style="text-align:left;"><font class="">Category:</font><select class="dropdown Ticketform " id="newTicketCategory" name="newTicketCategory">{html_options  options=$cate }</select></td>
		</tr>
		<tr>
			<td style="text-align:left;"><font class="">Assign:</font><select class="dropdown Ticketform " id="newTicketAssign" name="newTicketAssign">{html_options options=$assign }</select></td>
		</tr>
		<tr>
			<td style="text-align:left;"><font class="">Priority:</font><select class="dropdown Ticketform " id="newTicketPriority" name="newTicketPriority">{html_options options=$priority }</select></td>
		</tr>
		<tr>
			<td style="text-align:left;"><font class="">Due Date:</font><input type="text" name="newTicketDueDate" id="newTicketDueDate" class="dropdown Ticketform" maxlength="50" style="width:8em" value="" /><img src="http://cdn1.lapcat.org/famfamfam/silk/calendar.png" title="calendar" id="newTicketCalendar"></td>
		</tr>
		<tr>
			<td style="text-align:left;"><font class="">Problem Location:</font><select name="newTicketLocation" id="newTicketLocation" class="dropdown Ticketform" maxlength="50" style="width:8em" value="test data" /><option value=""></option>{html_options options=$location }</select></td>
		</tr>
		<tr>
			<td style="text-align:left;"><font class="">Ticket Description</font><br /> <textarea id="newTicketDescription"  name="newTicketDescription" cols="30" rows="10" class="dropdown Ticketform "></textarea></td>
		</tr>
		<tr>
			<td>
				<INPUT type="hidden" id="newTicketUser_id" name="newTicketUser_id" value="{$user_id}" >
				<INPUT type="hidden" id="newTicketTicket_id" name="newTicketTicket_id"  value="{$ticket_id}" >
				<INPUT type="hidden" id="newTicketType" name="newTicketType" value="{$type}">
			</td>
		</tr>
	</table>
	</form>
	<div class="table textLeft">
		<div class="td"><a class="option-theme fg-button ui-corner-all white lapcatButton Cancel" id="ticketCancelBtn">Cancel</a></div>
		<div class="td"><a class="option-theme fg-button ui-corner-all white lapcatButton" id="ticketAddBtn" style="width:auto;">Add Ticket</a></div>
	</div>
</div>
</div>