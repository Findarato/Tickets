<div class="t" style="width:100%;height:500px;margin-right:5px;">
	<div id="ticketarea" >
		<div class="corners-bottom-2 corners-top-2 small-shadow-black-1" style="vertical-align:top;height:500px;margin-right:5px;">
			<div class="font-X head message_head corners-top-2 color-B-2 border-all-D-1" id="ticketTitlearea" style="position:relative;height:16px;">
				<div class="font-X" id="ticketTitle"></div>
				<div class="color-X" id="ticketStatusImage" style="position:absolute;right:5px;top:2px;height:13px;">
					<div class="corners-bottom-2 corners-top-2 background-alpha-4 border-all-D-1 lapcatButton" style="width:auto;padding:2px;">
						<div class="statusImage left ticket_sprite pencil" style="display:none;height:15px;" id="imgEdited" title="Edited"></div>
						<div class="statusImage left ticket_sprite user-pencil" style="display:none;height:15px;" id="imgReassigned" title="Reassigned"></div>
						<div class="statusImage left ticket_sprite door" style="display:none;height:15px;" id="imgClosed" title="Closed"></div>
						<div class="statusImage left ticket_sprite bookmark" style="display:none;height:15px;" id="imgBookmark" title="Bookmarked"></div>
						<div class="statusImage left ticket_sprite wall" style="display:none;height:15px;" id="imgBlocked" title="Blocked"></div>
						<div class="statusImage left ticket_sprite lock" style="display:none;height:15px;" id="imgLock" title="Locked"></div>
						<div class="left ticket_sprite ticket" id="imgTicketTrouble" style="height:15px;display:none;" title="Trouble Ticket"></div>
						<div class="left ticket_sprite bug" id="imgTicketBug" style="height:15px;display:none;" title="Bug Report"></div>
					</div>
				</div>
			</div> 
			<div class="color-X-1 " id="ticket" style="position:relative;height:430px;width:auto;padding:3px" ><!-- Ticket Body -->
		        <div id="lockBox" style="position:absolute;:1px;right:0px;clear:both;display:none">
					<div class="button-theme fg-button ticketButton font-Y lapcatButton left openTicket hold actionButtons holdLink" id="Holdlink" style="width:auto;"><span class="ticket_button ticket_sprite lock">Lock</span></div>
					<div class="button-theme fg-button ticketButton font-Y lapcatButton left openTicket hold actionButtons unholdLink" id="unHoldlink" style="width:auto;display:none;"><span class="ticket_button ticket_sprite unlock">unlock</span></div>
					<!--<div class="button-purple fg-button corners-bottom-2 corners-top-2 font-Y lapcatButton left" id="Blocklink" style="width:auto;"><span class="ticket_button ticket_sprite brick">Block</span></div>-->
				</div>
				<div style="clear:both">
			       	<div class="left " style="font-weight:bold;padding-left:2px;padding-right:3px" ><span id="ticketBugId" class="font-X" >Ticket ID:</span></div>
			       	<div class="left "><span class="font-X" id="ticketId"></span></div>
		        </div>
		        <div style="clear:both">
			       	<div class="left " style="font-weight:bold;padding-left:2px;padding-right:3px" ><span class="font-X" >Opened On</span></div>
			       	<div class="left "><span class="font-X" id="ticketDate"></span></div>
		        </div>
		        <div id="dueOnBox" style="clear:both;display:none;">
			       	<div class="left " style="font-weight:bold;padding-left:2px;padding-right:3px" ><span class="font-X" >Due On</span></div>
			       	<div class="left "><span class="font-X" id="ticketDueDate"></span></div>
		        </div>
		        <div style="clear:both;display:none" class="closedTicket" id="ticketClosedOn">
			       	<div class="left " style="font-weight:bold;padding-left:2px;padding-right:3px" ><span class="font-X" >Closed On</span></div>
			       	<div class="left "><span class="font-X" id="ticketClosedOnDate"></span></div>
		        </div>
		        <div id="projectBox" style="clear:both">
			       	<div class="left " style="font-weight:bold;padding-left:2px;padding-right:3px"><span class="font-X" >Project</span></div>
			       	<div class="left "><span class="font-X" id="ticketProject"></span></div>
		        </div>
		        <div id="categoryBox" style="clear:both">
			       	<div class="left " style="font-weight:bold;padding-left:2px;padding-right:3px"><span class="font-X" >Category</span></div>
			       	<div class="left "><span class="font-X" id="ticketCategory"></span></div>
		        </div>
		        <div style="clear:both;height:16px;">
			       	<div class="left " style="font-weight:bold;padding-left:2px;padding-right:3px"><span class="font-X" >Created By</span></div>
			       	<div class="left " style="height:16px;"><span class="font-X" id="ticketCreatedBy" style="height:16px;"></span></div>
		       </div>
				<div id="assignedToBox" style="clear:both;display:none;">
			       	<div class="left" style="font-weight:bold;padding-left:2px;padding-right:3px"><span class="font-X" >Assigned To</span></div>
			       	<div class="left" ><span class="font-X" id="ticketAssignedTo"></span></div>
		       </div> 
				<div style="clear:both">
			       	<div class="left" style="font-weight:bold;padding-left:2px;padding-right:3px"><span class="font-X" >Priority</span></div>
			       	<div class="left" ><span class="font-X" id="ticketPriority"></span></div>
				</div>
				<div id="locationBox" style="clear:both;display:none;">
			       	<div class="left" style="font-weight:bold;padding-left:2px;padding-right:3px"><span class="font-X" >Location</span></div>
			       	<div class="left" ><span class="font-X" id="ticketLocation"></span></div>
				</div>
				<section id="ticketDataBox" style="display:block;padding-left:2px;position:relative;margin-bottom:5px;width:100%;height:385px;overflow:auto;vertical-align:top; clear:both">
					<article id="ticketBody" style="display:block;"></article>
				</section>
			</div>
			<div class="droidSerif font-X head message_head corners-bottom-2 color-B-2 border-all-D-1" id="ticketFooterArea" style="height:24px">
				<div class="button-purple fg-button ticketButton font-Y lapcatButton openTicket actionButtons editLink" id="editlink" style="width:45px;">Edit</div>
				<div class="button-theme fg-button ticketButton font-Y lapcatButton openTicket actionButtons closeLink" id="closelink" style="width:45px;">Close</div>
				<div class="button-black fg-button ticketButton font-Y lapcatButton closedTicket actionButtons openLink" id="openlink" style="width:auto;display:none">Reopen</div>
				<div class="button-purple fg-button ticketButton font-Y lapcatButton openTicket" id="ReAssignlink" style="width:auto;"><span class="ticket_button ticket_sprite user-pencil">Reassign</span></div>
			</div>
		</div>
	</div>
	<div id="replyArea"  style="display:table-cell;width:auto;height:500px;vertical-align:top;">
		<div class="corners-top-2 small-shadow-black-1" style="width:auto;height:500px;margin-left:5px;">
			<div class="droidSans font-X head message_head corners-top-2 color-B-2 border-all-D-1" id="replyTitleArea" style="height:16px;">
				<div style="width:100%">
					<span id="replyareaTitle" style="margin-left:10px;margin:5px;">Replies (0)</span>
					<div id="pageAnator" style="right:5px;position:absolute;top:2px;"></div>
				</div>
			</div>
			<div class="color-X-1" id="replyareabody" style="overflow:auto;height:430px;padding:3px;">	</div>
			<div class="font-X message_head corners-bottom-2 color-B-2 border-all-D-1" id="" style="height:24px">
				<div class="button-purple fg-button ticketButton font-Y lapcatButton" id="replylink" style="width: 80px;"><span class="ticket_button ticket_sprite balloon">Add Reply</span></div>
			</div>
		</div>
	</div>
</div>