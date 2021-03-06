<div id="newTicketdialog">
			<div class=" color-X-1" id="replyareabody" style="overflow:auto;height:auto;padding:3px;">
				<form name="newTicketForm" action="#" method="post" id="newTicketForm">
					<table border="0" cellpadding="0" cellspacing="0">
						<tr>
							<td style="width:150px;text-align:left;"><span class="font-X">Title of Ticket:</span></td>
							<td style="text-align:left;"><input type="text" name="newTicketTitle" id="newTicketTitle"  required="required" class=" Ticketform " maxlength="35" /></td>
						</tr>
						{if $features["Categories"] eq 1}
						<tr class="">
							<td style="text-align:left;"><span class="font-X">Category:</span></td>
							<td style="text-align:left;"><select class=" Ticketform " id="newTicketCategory" name="newTicketCategory">{html_options  options=$cate}</select></td>
						</tr>
						{else}
						  <input type="hidden" name="newTicketCategory" id="newTicketCategory"  value="1" />
						{/if}
						<tr id="ticketAssignBox">
							<td style="text-align:left;"><span class="font-X">Assign:</span></td>
							<td style="text-align:left;"><select class=" Ticketform " id="newTicketAssign" name="newTicketAssign"><option value="">Select User</option>{html_options options=$assign selected=$ticketDefault}</select></td>
						</tr>
						<tr id="ticketCreateForBox" style="display:none;">
							<td style="text-align:left;"><span class="font-X">Created For:</span></td>
							<td style="text-align:left;"><select class=" Ticketform " id="newTicketCreatedFor" name="newTicketCreatedFor"><option value="0">Select User</option>{html_options options=$assign}</select></td>
						</tr>
						<tr>
							<td style="text-align:left;"><span class="font-X">Priority:</span></td>
							<td style="text-align:left;"><select class=" Ticketform " id="newTicketPriority" name="newTicketPriority">{html_options options=$priority}</select></td>
						</tr>
						{if $features["Due Date"] eq 1}
						<tr>
							<td style="text-align:left;"><span class="font-X">Due Date:</span></td>
							<td style="text-align:left;"><input type="date" name="newTicketDueDate" id="newTicketDueDate" required="required" class=" Ticketform" maxlength="50" style="width:8em" value="" /></td>
						</tr>
						{else}
						  <input type="hidden" name="newTicketDueDate" id="newTicketDueDate"  value="8-8-1982" />
						{/if}
						{if $features["Location"] eq 1}
						<tr class="">
							<td style="text-align:left;"><span class="font-X">Problem Location:</span></td>
							<td style="text-align:left;"><select name="newTicketLocation" id="newTicketLocation" class=" Ticketform" maxlength="50" style="width:8em" value="test data" ><option value=""></option>{html_options options=$location}</select></td>
						</tr>
						{else}
						  <input type="hidden" name="newTicketLocation" id="newTicketLocation"  value="1" />
						{/if}
						<tr>
							<td colspan="2" style="text-align:left;"><span class="font-X">Ticket Description</span><br /> <textarea  required="required" id="newTicketDescription"  name="newTicketDescription" cols="30" rows="10" class=" Ticketform "></textarea></td>
						</tr>
						<tr>
							<td>
								<INPUT type="hidden" id="newTicketBugTrouble" name="newTicketBugTrouble" value="1" >
								<INPUT type="hidden" id="newTicketUser_id" name="newTicketUser_id" value="{$user_id}" >
								<INPUT type="hidden" id="newTicketTicket_id" name="newTicketTicket_id"  value="" >
								<INPUT type="hidden" id="newTicketType" name="newTicketType" value="">
							</td>
						</tr>
					</table>
				</form>
			</div>
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