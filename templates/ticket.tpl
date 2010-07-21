<div style="display:table;width:100%;height:500px;margin-right:5px;">
	<div id="ticketarea" style="display:table-cell;width:300px;height:500px">
		<div class="corners-bottom-2 corners-top-2 small-shadow-black-1" style="vertical-align:top;height:500px;margin-right:5px;">
			<div class="droidSerif font-X head message_head corners-top-2 color-B-2 border-all-B-1" id="ticketTitlearea" style="position:relative;height:16px;">
				<div class="font-X" id="ticketTitle"></div>
				<div class="color-X" id="ticketStatusImage" style="position:absolute;right:5px;top:2px;height:13px;">
					<div class="corners-bottom-2 corners-top-2 background-alpha-4 border-all-B-1 lapcatButton" style="width:auto;padding:2px;">
						<div class="statusImage left ticket_button ticket_sprite edit" style="display:none;height:15px;" id="imgEdited" title="Edited"></div>
						<div class="statusImage left ticket_button ticket_sprite user_edit" style="display:none;height:15px;" id="imgReassigned" title="Reassigned"></div>
						<div class="statusImage left ticket_button ticket_sprite closed" style="display:none;height:15px;" id="imgClosed" title="Closed"></div>
						<div class="statusImage left ticket_button ticket_sprite tick" style="display:none;height:15px;" id="imgBookmark" title="Bookmarked"></div>
						<div class="statusImage left ticket_button ticket_sprite brick" style="display:none;height:15px;" id="imgBlocked" title="Blocked"></div>
						<div class="statusImage left ticket_button ticket_sprite clip" style="display:none;height:15px;" id="imgAttachment" title="Attachment"></div>
						<div class="statusImage left ticket_button ticket_sprite lock" style="display:none;height:15px;" id="imgLock" title="Locked"></div>
						<div class="left ticket_button ticket_sprite ticket" id="imgTicketTrouble" style="height:15px;display:none;" title="Trouble Ticket"></div>
						<div class="left ticket_button ticket_sprite bug" id="imgTicketBug" style="height:15px;display:none;" title="Bug Report"></div>
					</div>
				</div>
			</div>
			<div class="droidSerif color-X-1 " id="ticket" style="position:relative;height:430px;width:auto;padding:3px" ><!-- Ticket Body -->
		        <div style="position:absolute;:1px;right:0px;clear:both;">
					<div class="button-theme fg-button corners-bottom-2 corners-top-2 font-Y lapcatButton left openTicket hold actionButtons holdLink" id="Holdlink" style="width:auto;"><span class="ticket_button ticket_sprite lock">Lock</span></div>
					<div class="button-theme fg-button corners-bottom-2 corners-top-2 font-Y lapcatButton left openTicket hold actionButtons unholdLink" id="unHoldlink" style="width:auto;display:none;"><span class="ticket_button ticket_sprite unlock">unlock</span></div>
					<!--<div class="button-purple fg-button corners-bottom-2 corners-top-2 font-Y lapcatButton left" id="Blocklink" style="width:auto;"><span class="ticket_button ticket_sprite brick">Block</span></div>-->
				</div>
				<div style="clear:both">
			       	<div class="left " style="font-weight:bold;padding-left:2px;padding-right:3px" ><font class="">Ticket ID:</font></div>
			       	<div class="left "><font id="ticketId"></font></div>
		        </div>
		        <div style="clear:both">
			       	<div class="left " style="font-weight:bold;padding-left:2px;padding-right:3px" ><font class="">Opened On</font></div>
			       	<div class="left "><font id="ticketDate"></font></div>
		        </div>
		        <div style="clear:both">
			       	<div class="left " style="font-weight:bold;padding-left:2px;padding-right:3px" ><font class="">Due On</font></div>
			       	<div class="left "><font id="ticketDueDate"></font></div>
		        </div>
		        <div style="clear:both;display:none" class="closedTicket" id="ticketClosedOn">
			       	<div class="left " style="font-weight:bold;padding-left:2px;padding-right:3px" ><font class="">Closed On</font></div>
			       	<div class="left "><font id="ticketClosedOnDate"></font></div>
		        </div>
		        <div style="clear:both">
			       	<div class="left " style="font-weight:bold;padding-left:2px;padding-right:3px"><font class="">Category</font></div>
			       	<div class="left "><font id="ticketCategory"></font></div>
		        </div>
		        <div style="clear:both">
			       	<div class="left " style="font-weight:bold;padding-left:2px;padding-right:3px"><font class="">Created By</font></div>
			       	<div class="left "><font id="ticketCreatedBy"></font></div>
		       </div>
				<div style="clear:both">
			       	<div class="left" style="font-weight:bold;padding-left:2px;padding-right:3px"><font class="">Assigned To</font></div>
			       	<div class="left" ><font id="ticketAssignedTo"></font></div>
		       </div> 
				<div style="clear:both">
			       	<div class="left" style="font-weight:bold;padding-left:2px;padding-right:3px"><font class="">Priority</font></div>
			       	<div class="left" ><font id="ticketPriority"></font></div>
				</div>
				<div style="clear:both">
			       	<div class="left" style="font-weight:bold;padding-left:2px;padding-right:3px"><font class="">Location</font></div>
			       	<div class="left" ><font id="ticketLocation"></font></div>
				</div>
				<div id="ticketDataBox" style="padding-left:2px;position:relative;margin-bottom:5px;width:100%;height:285px;overflow:auto;vertical-align:top; clear:both">
					<span id="ticketBody"></span>
				</div>
			</div>
			<div class="droidSerif font-X head message_head corners-bottom-2 color-B-2 border-all-B-1" id="ticketFooterArea" style="height:24px">
				<div class="button-purple fg-button corners-bottom-2 corners-top-2 font-Y lapcatButton openTicket actionButtons editLink" id="editlink" style="width:45px;">Edit</div>
				<div class="button-theme fg-button corners-bottom-2 corners-top-2 font-Y lapcatButton openTicket actionButtons closeLink" id="closelink" style="width:45px;">Close</div>
				<div class="button-black fg-button corners-bottom-2 corners-top-2 font-Y lapcatButton closedTicket actionButtons openLink" id="openlink" style="width:45px;display:none">Reopen</div>
				<div class="button-purple fg-button corners-bottom-2 corners-top-2 font-Y lapcatButton openTicket" id="ReAssignlink" style="width:auto;"><span class="ticket_button ticket_sprite user_edit">Reassign</span></div>
			</div>
		</div>
	</div>
	<div id="replyArea" class="" style="display:table-cell;width:auto;height:500px;vertical-align:top;">
		<div class="corners-top-2 small-shadow-black-1" style="width:auto;height:500px;margin-left:5px;">
			<div class="droidSerif font-X head message_head corners-top-2 color-B-2 border-all-B-1" id="replyTitleArea" style="height:16px;">
				<div style="width:100%">
					<font id="replyareaTitle" style="margin-left:10px;margin:5px;">Replies (0)</font>
					<div id="pageAnator" style="right:5px;position:absolute;top:2px;"></div>
				</div>
			</div>
			<div class="droidSerif color-X-1" id="replyareabody" style="overflow:auto;height:430px;padding:3px;">	</div>
			<div class="droidSerif font-X message_head corners-bottom-2 color-B-2 border-all-B-1" id="" style="height:24px">
				<div class="button-purple fg-button corners-bottom-2 corners-top-2 font-Y lapcatButton" id="replylink" style="width: 80px;">Add Reply</div>
			</div>
		</div>
	</div>
</div>