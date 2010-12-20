<div id="newBugdialog">
	<div style="width:auto;vertical-align:top;">
		<div class="corners-top-2 " style="width:auto;height:auto;margin-left:5px;">
			<div class="droidSerif font-X head message_head corners-top-2 color-B-2 border-all-B-1" id="replyTitleAreaBOX" style="height:16px;">
				Add new Bug
			</div>
			<div class="droidSerif color-X-1" id="replyareabody" style="overflow:auto;height:auto;padding:3px;">
				<form name="newTicketForm" action="#" method="post" id="newTicketForm">
					<table border="0" cellpadding="0" cellspacing="0">
						<tr>
							<td style="text-align:left;"><span class="font-X">Title of Bug:</span><input type="text" name="newTicketTitle" id="newTicketTitle"  class=" Ticketform " maxlength="35" /></td>
						</tr>
						<tr>
							<td style="text-align:left;"><span class="font-X">Project:</span><select class=" Ticketform " id="newTicketProject" name="newTicketProject"><option value="">Select Project</option>{html_options options=$projects}</select></td>
						</tr>
						<tr>
							<td style="text-align:left;"><span class="font-X">Priority:</span><select class=" Ticketform " id="newTicketPriority" name="newTicketPriority">{html_options options=$priority}</select></td>
						</tr>
						<tr>
							<td style="text-align:left;"><span class="font-X">Description of the Bug</span><br /> <textarea id="newTicketDescription"  name="newTicketDescription" cols="30" rows="10" class=" Ticketform "></textarea></td>
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
			<div class="droidSerif font-X message_head corners-bottom-2 color-B-2 border-all-B-1" id="" style="height:24px">
				<a class="button-theme ticketButton font-Y lapcatButton Cancel" id="replyCancelBtn">Cancel</a>
				<a class="button-theme ticketButton font-Y lapcatButton" id="bugAddButton" style="width:75px;">Add Bug</a>
			</div>
		</div>
	</div>
</div>