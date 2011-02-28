<div id="newBugdialog">
	<div class="roundAll4 small-shadow-black-1" style="width:auto;vertical-align:top;">
		<div class="roundTop4 " style="width:auto;height:auto;">
			<div class="fontMain head message_head roundTop4 color-B-2 border-all-B-1" id="replyTitleAreaBOX" style="height:16px;">
				Add new Bug
			</div>
			<div class="color-X-1" id="replyareabody" style="overflow:auto;height:auto;padding:3px;">
				<form name="newTicketForm" action="#" method="post" id="newTicketForm">
					<table border="0" cellpadding="0" cellspacing="0">
						<tr>
							<td style="text-align:left;"><span class="fontMain">Title of Bug:</span><input type="text" name="newTicketTitle" id="newTicketTitle"  class=" Ticketform " maxlength="35" /></td>
						</tr>
						<tr>
							<td style="text-align:left;"><span class="fontMain">Project:</span><select class=" Ticketform " id="newTicketProject" name="newTicketProject"><option value="">Select Project</option>{html_options options=$projects}</select></td>
						</tr>
						<tr>
							<td style="text-align:left;"><span class="fontMain">Priority:</span><select class=" Ticketform " id="newTicketPriority" name="newTicketPriority">{html_options options=$priority}</select></td>
						</tr>
						<tr>
							<td style="text-align:left;"><span class="fontMain">Description of the Bug</span><br /> <textarea id="newTicketDescription"  name="newTicketDescription" cols="30" rows="10" class=" Ticketform "></textarea></td>
						</tr>
						<tr>
							<td>
								<INPUT type="hidden" id="newTicketBugTrouble" name="newTicketBugTrouble" value="2" >
								<INPUT type="hidden" id="newTicketUser_id" name="newTicketUser_id" value="{$user_id}" >
								<INPUT type="hidden" id="newTicketTicket_id" name="newTicketTicket_id"  value="{$ticket_id}" >
								<INPUT type="hidden" id="newTicketType" name="newTicketType" value="{$type}">
							</td>
						</tr>
					</table>
				</form>
			</div>
			<div class="fontMain message_head roundBottom4 color-B-2 border-all-B-1" id="" style="height:24px">
				
				<button class="fontMain fontBold minimal Cancel" id="replyCancelBtn" style="width:auto;padding:3px" title="Cancel">
					<span class="ticket_button ticket_sprite cross"></span>
					<span>Cancel</span>
				</button>

				<button class="fontMain fontBold minimal" id="bugAddButton" style="width:auto;padding:3px" title="Add Bug">
					<span class="ticket_button ticket_sprite tick"></span>
					<span>Add Bug</span>
				</button>
			</div>
		</div>
	</div>
</div>