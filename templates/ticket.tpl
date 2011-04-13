<div class="colorMain-2" id="ticketTitlearea" style="width:100%;height:40px;">
	<div style="display:table;width:100%">
		<div style="display:table-cell;width:50%;text-align:left;">
			<div class="fontMain2" id="ticketId" style="font-weight:bold;padding-left:2px;padding-right:3px">
				Ticket ID
			</div>
			<h3 class="fontMain ticket_sprite ticket_button fakelink" id="ticketTitle" name="bookmark" style="width:auto;height:auto;word-wrap: break-word;overflow: hidden;text-overflow: ellipsis;font-size:15px"></h3><!-- Ticket Title area -->
		</div>
		<div style="display:table-cell;width:50%;text-align:right;">
			<div id="priorityBox" style="display:block;height:16px;">
				<div class="fontMain" id="ticketPriority" style="font-weight:bold;padding-left:2px;padding-right:3px;height:16px;">
					Priority
				</div>
			</div>
			<div class="colorWhite" id="ticketStatusImage" style="height:15px;float:right;">
				<div class="lapcatButton" style="width:auto;padding:2px;">
					<div class="statusImage left ticket_sprite pencil" style="display:none;height:15px;" id="imgEdited" title="Edited">
					</div>
					<div class="statusImage left ticket_sprite user-pencil" style="display:none;height:15px;" id="imgReassigned" title="Reassigned">
					</div>
					<div class="statusImage left ticket_sprite door" style="display:none;height:15px;" id="imgClosed" title="Closed">
					</div>
					<div class="statusImage left ticket_sprite wall" style="display:none;height:15px;" id="imgBlocked" title="Blocked">
					</div>
					<div class="statusImage left ticket_sprite lock" style="display:none;height:15px;" id="imgLock" title="Locked">
					</div>
					<div class="left ticket_sprite ticket" id="imgTicketTrouble" style="height:15px;display:none;" title="Trouble Ticket">
					</div>
					<div class="left ticket_sprite bug" id="imgTicketBug" style="height:15px;display:none;" title="Bug Report">
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
<div style="display:table;width:100%">
	<div class="border-right-Main-1" style="display:table-cell;width:300px;vertical-align:top;">
		<!-- Left Side ticket information -->
		<div style="display:none;height:16px;" class="closedTicket" id="ticketClosedOn">
			<div class="fontMain2" id="ticketClosedOnDate" style="font-weight:bold;padding-left:2px;padding-right:3px" >
				Closed On
			</div>
		</div>
		<div id="categoryBox" style="display:none;">
			<div class="fontMain2" id="ticketCategory" style="font-weight:bold;padding-left:2px;padding-right:3px;height:16px;">
				Category
			</div>
		</div>
		<div id="projectBox" style="height:16px;">
			<div class="fontMain2" id="ticketProject" style="font-weight:bold;padding-left:2px;padding-right:3px">
				Project
			</div>
		</div>
		<!--
		<div class="fontMain2 " id="ticketCreatedBy" style="font-weight:bold;padding-left:2px;padding-right:3px;height:16px;">
			Created By
		</div>
		-->
		<div id="assignedToBox" style="display:none;height:16px;">
			<div class="fontMain2" id="ticketAssignedTo" style="font-weight:bold;padding-left:2px;padding-right:3px;height:16px;">
				Assigned To
			</div>
		</div>
		<div id="dueOnBox" style="display:none;height:16px;">
			<div class="fontMain2" id="ticketDueDate" style="font-weight:bold;padding-left:2px;padding-right:3px" >
				Due On
			</div>
		</div>
		<div id="locationBox" style="display:none;height:16px;">
			<div class="fontMain2" id="ticketLocation" style="font-weight:bold;padding-left:2px;padding-right:3px;height:16px;">
				Location
			</div>
		</div>
		<div id="locationBox" style="display:none;height:16px;">
			<div class="fontMain2" id="replyareaTitle" style="font-weight:bold;padding-left:2px;padding-right:3px;height:16px;">
				Replies
			</div>
		</div>		
<!--		<span id="replyareaTitle" style="margin-left:10px;margin:5px;" title="Reply Title">Replies (0)</span> -->
		<!-- Modification Buttons -->		
		<div class="" id="ticketFooterArea" style="height:28px;margin-top:20px">
			<button class="openTicket fontReverse  minimal " id="reAssignButton" style="width:auto;">
				<span class="ticket_button ticket_sprite user-pencil">Reassign</span>
			</button>
			<button class="openTicket fontReverse  minimal " id="modifyButton" style="width:auto;">
				<span class="ticket_button ticket_sprite pencil">Modify</span>
			</button>
			<button class="fontReverse minimal " id="ticketModifySaveButton" style="width:auto;display:none;">
				<span class="ticket_button ticket_sprite tick">Save</span>
			</button>
			<button class="fontReverse minimal " id="ticketModifyCancelButton" style="width:auto;display:none;">
				<span class="ticket_button ticket_sprite cross">Cancel</span>
			</button>
			<button class="openTicket fontReverse  minimal actionButtons closeLink " id="closeButton" style="width:auto;">
				<span class="ticket_button ticket_sprite door" style="margin-right:5px">Close</span>
			</button>
			<button class="closedTicket fontReverse  minimal actionButtons openLink" id="reOpenButton" style="width:auto;margin-right:5px;display:none;">
				<span style="margin-right:5px">Open</span>
			</button>
			<div class="td" style="width:75px;display:none">
				<!-- Locked Area -->
				<div class="fontMain openTicket hold actionButtons holdLink roundAll4 background-alpha-4 border-all-D-1 lapcatButton " id="Holdlink" style="width:auto;m5px;">
					<span>Lock</span>
				</div>
				<div class="fontMain openTicket hold actionButtons unholdLink roundAll4 background-alpha-4 border-all-D-1 lapcatButton " id="unHoldlink" style="width:auto;margin-right:5one;">
					<span>unlock</span>
				</div>
				<!--<div class="button-purple fg-button roundAll4 fontReverse lapcatButton left" id="Blocklink" style="width:auto;"><span class="ticket_button ticket_sprite brick">Block</span></div>-->
			</div>
		</div>
		
		<div id="pageAnator" style=""></div>
	</div>
	<div style="display:table-cell;width:auto;padding:3px">
		<!-- Right Side ticket body and Replies -->
		<div style="display:table; width:100%; margin-bottom:2px;overflow:hidden;" class="border-all-B-1 WhitetoLightBlue"> <!-- Body of the ticket -->
			<div style="display:table-row;width:100%">
				<div style="display:table-cell; padding:6px; width:100px;vertical-align:top;">
					<div class="font-X2" id="ticketCreatedBy" style="width:100px;vertical-align:top;"></div>
					<div id="ticketDate" class="font-L font-bold" style="vertical-align:top;"></div>
				</div>
				<div style="display:table-cell;vertical-align:top;padding:6px;">
					<div class="font-X2" style="word-wrap:break-word;white-space: normal;vertical-align:top;" id="ticketBody"></div>
				</div>
				<div id="ticketListDueDate" style="display:table-cell;width:200px;right:0px;">
					<div class="font-X2" id="changemeDueDate">
					</div>
					<div class="font-X2" id="changemeTr">
					</div>
					<div class="font-X2" id="changemeTT">
					</div>
					<div class="font-X2" id="changemeAssignedid">
					</div>
				</div>
			</div>
		</div><!-- End Body of the ticket -->
		<div class="colorWhite-1 " id="replyareabody" style=""></div>
	</div>
</div>
asdfadf



<!-- Old code down below this point-->
<div class="t" style="width:100%;height:645px;margin-right:5px;" title="Ticket Display">
	<section id="ticketarea" title="Ticket Side" style="height:600px;">
		<div class="roundTop4 small-shadow-black-1" style="vertical-align:top;height:100%;margin-right:5px;">
			<div class="fontMain head message_head roundTop4 color-B-2 border-all-D-1" id="ticketTitlearea" style="position:relative;height:16px;">
				<div class="fontMain ticket_sprite ticket_button fakelink" id="ticketTitle" name="bookmark" style="width:230px;height:16px;word-wrap: break-word;overflow: hidden;text-overflow: ellipsis;">
				</div><!-- Ticket Title area -->
			</div>
			<div class="colorWhite-1 " id="ticket" style="position:relative;height:100%;width:auto;padding:3px" >
				<!-- Ticket Body -->

				<section id="ticketDataBox" style="display:block;padding-left:2px;position:relative;margin-bottom:5px;margin-top:5px;width:100%;height:360px;overflow:auto;vertical-align:top; clear:both">
				</section>
			</div>
			<div class="" style="position:relative">
				<div class=" color-B-2 box_transition" id="reassignBox" style="overflow:hidden;position:absolute;bottom:34px;left:0;height:0px;width:100%">
					<div style="overflow:hidden;height:auto;padding:3px;">
						<div class="textLeft">
							<span>Assign:</span>
							<select style="width:150px" id="TicketAssign" name="TicketAssign">
								{html_options options=$assign}
							</select>
							<div class="ticket_sprite cross fakelink" id="ReAssignCancelButton" style="display:inline-block">
							</div>
							<div id="reAssignAcceptButton" class="ticket_sprite tick fakelink" style="display:inline-block">
							</div>
						</div>
					</div>
				</div>

			</div>
		</div>
	</section>
	<section id="replyArea"  style="display:table-cell;width:auto;height:600px;vertical-align:top;" title="Reply Display">
		<!-- Reply area-->
		<div class="roundTop4 small-shadow-black-1" style="width:auto;height:100%;margin-left:5px;">
			<div class="custom fontMain head message_head roundTop4 color-B-2 border-all-D-1" id="replyTitleArea" style="height:16px;">
				<!--Reply Title -->
				<div style="width:100%">
					<!--
					<span id="replyareaTitle" style="margin-left:10px;margin:5px;" title="Reply Title">Replies (0)</span>
					<div id="pageAnator" style="right:5px;position:absolute;top:2px;"></div>
					-->
				</div>
			</div>
			<div class="colorWhite-1 " id="replyareabody" style="overflow:auto;height:573px;padding:3px"></div>
			<div class="" id="replyFooterArea" style="position:relative;">
				<!-- Reply Footer -->
				<div class="box_transition" id="replyBox" style="overflow:hidden;position:absolute;bottom:34px;left:0;height:0px;width:100%;background-color:#FFF">
					{include file="reply.tpl"}
				</div>
				<div class="fontMain message_head color-B-2 border-all-B-1" id="replyFooter" style="height:28px;">
					<!-- Footer of the reply box-->
					<button class="fontReverse minimal" id="replyButton" style="width:auto;" title="Add Reply">
						<span class="ticket_button ticket_sprite balloon">Add Reply</span>
					</button>
				</div>
			</div>
		</div>
	</section>
</div>
