<div id="newTicketdialog">
	<div class="roundAll4 small-shadow-black-1" style="width:auto;vertical-align:top;">
		<div class="roundAll4 " style="width:auto;height:auto;">
			<div class=" fontMain head message_head roundTop4 color-B-2 border-all-B-1" id="" style="height:16px;">
				Add new Ticket
			</div>
			<div class=" color-X-1" id="replyareabody" style="overflow:auto;height:auto;padding:3px;">
				<form name="newTicketForm" action="#" method="post" id="newTicketForm">
					<table border="0" cellpadding="0" cellspacing="0">
						<tr>
							<td style="width:150px;text-align:left;"><span class="font-X">Title of Ticket:</span></td>
							<td style="text-align:left;"><input type="text" name="newTicketTitle" id="newTicketTitle"  class=" Ticketform " maxlength="35" /></td>
						</tr>
						<tr>
							<td style="text-align:left;"><span class="font-X">Category:</span></td>
							<td style="text-align:left;"><select class=" Ticketform " id="newTicketCategory" name="newTicketCategory">{html_options  options=$cate}</select></td>
						</tr>
						<tr id="ticketAssignBox">
							<td style="text-align:left;"><span class="font-X">Assign:</span></td>
							<td style="text-align:left;"><select class=" Ticketform " id="newTicketAssign" name="newTicketAssign"><option value="">Select User</option>{html_options options=$assign}</select></td>
						</tr>
						<tr id="ticketCreateForBox" style="display:none;">
							<td style="text-align:left;"><span class="font-X">Created For:</span></td>
							<td style="text-align:left;"><select class=" Ticketform " id="newTicketCreatedFor" name="newTicketCreatedFor"><option value="0">Select User</option>{html_options options=$assign}</select></td>
						</tr>
						<tr>
							<td style="text-align:left;"><span class="font-X">Priority:</span></td>
							<td style="text-align:left;"><select class=" Ticketform " id="newTicketPriority" name="newTicketPriority">{html_options options=$priority}</select></td>
						</tr>
						<tr>
							<td style="text-align:left;"><span class="font-X">Due Date:</span></td>
							<td style="text-align:left;"><input type="date" name="newTicketDueDate" id="newTicketDueDate" class=" Ticketform" maxlength="50" style="width:8em" value="" /></td>
						</tr>
						<tr>
							<td style="text-align:left;"><span class="font-X">Problem Location:</span></td>
							<td style="text-align:left;"><select name="newTicketLocation" id="newTicketLocation" class=" Ticketform" maxlength="50" style="width:8em" value="test data" /><option value=""></option>{html_options options=$location}</select></td>
						</tr>
						<tr>
							<td colspan="2" style="text-align:left;"><span class="font-X">Ticket Description</span><br /> <textarea id="newTicketDescription"  name="newTicketDescription" cols="30" rows="10" class=" Ticketform "></textarea></td>
						</tr>
						<tr>
							<td>
								<INPUT type="hidden" id="newTicketBugTrouble" name="newTicketBugTrouble" value="1" >
								<INPUT type="hidden" id="newTicketUser_id" name="newTicketUser_id" value="{$user_id}" >
								<INPUT type="hidden" id="newTicketTicket_id" name="newTicketTicket_id"  value="{$ticket_id}" >
								<INPUT type="hidden" id="newTicketType" name="newTicketType" value="{$type}">
							</td>
						</tr>
					</table>
				</form>
			</div>
			<div class=" fontMain message_head roundBottom4 color-B-2 border-all-B-1" id="" style="height:24px">
				<button class="button Cancel" id="replyCancelBtn" style="width:auto;" title="Cancel">
					<span class="ticket_button ticketSprite cross"></span>
					<span>Cancel</span>
				</button>

				<button class="button Cancel" id="ticketAddButton" style="width:auto;" title="Add Ticket">
					<span class="ticket_button ticketSprite tick"></span>
					<span>Add Ticket</span>
				</button>
				<button class="button" id="createForButton" style="width:auto;">
					<span class="ticket_button ticketSprite door" style="margin-right:5px">Create for</span>
				</button>
			</div>
		</div>
	</div>
</div>