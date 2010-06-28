<div style="display:table;width:100%;height:500px">
	<div style="display:table-cell;width:300px;height:500px">
		<div class="corners-bottom-2 corners-top-2 small-shadow-black-1" style="vertical-align:top;height:500px;margin-right:3px;">
			<div class="droidSerif font-X head message_head corners-top-2 color-B-2 border-all-B-1" id="" style="position:relative;">
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
						<div class="left ticket_button ticket_sprite error" id="imgTicketTrouble" style="height:15px;display:none;" title="Trouble Ticket"></div>
						<div class="left ticket_button ticket_sprite bug" id="imgTicketBug" style="height:15px;display:none;" title="Bug Report"></div>
					</div>
				</div>
			</div>
			<div class="droidSerif color-X-1 " id="ticket" style="position:relative;height:475px;width:auto;padding:3px" ><!-- Ticket Body -->
		        <div style="position:absolute;:1px;right:0px;clear:both;">
					<div class="option-theme fg-button corners-bottom-2 corners-top-2 white lapcatButton left openTicket hold actionButtons holdLink" id="Holdlink" style="width:auto;"><span class="ticket_button ticket_sprite lock">Lock</span></div>
					<div class="option-theme fg-button corners-bottom-2 corners-top-2 white lapcatButton left openTicket hold actionButtons unholdLink" id="unHoldlink" style="width:auto;display:none;"><span class="ticket_button ticket_sprite unlock">unlock</span></div>
					<!--<div class="option-purple fg-button corners-bottom-2 corners-top-2 white lapcatButton left" id="Blocklink" style="width:auto;"><span class="ticket_button ticket_sprite brick">Block</span></div>-->
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
			<div class="droidSerif font-X head message_head corners-bottom-2 color-B-2 border-all-B-1" id="" style="height:25px">
				<div class="option-purple fg-button corners-bottom-2 corners-top-2 white lapcatButton openTicket actionButtons editLink" id="editlink" style="width:45px;">Edit</div>
				<div class="option-theme fg-button corners-bottom-2 corners-top-2 white lapcatButton openTicket actionButtons closeLink" id="closelink" style="width:45px;">Close</div>
				<div class="option-black fg-button corners-bottom-2 corners-top-2 white lapcatButton closedTicket actionButtons openLink" id="openlink" style="width:45px;display:none">Reopen</div>
				<div class="option-purple fg-button corners-bottom-2 corners-top-2 white lapcatButton openTicket" id="ReAssignlink" style="width:auto;"><span class="ticket_button ticket_sprite user_edit">Reassign</span></div>
			</div>
		</div>
	</div>
	<div id="replyArea" style="display:table-cell;width:auto;height:500px;vertical-align:top;">
		<div class="corners-bottom-2 corners-top-2 small-shadow-black-1" style="width:auto;height:500px;margin-left:5px;">
			<div class="droidSerif font-X head message_head corners-top-2 color-B-2 border-all-B-1" id="" style="">
				<div style="width:100%">
					<font id="replyareaTitle" style="margin-left:10px;margin:5px;">Replies (0)</font>
					<div id="pageAnator" style="right:5px;position:absolute;top:2px;"></div>
				</div>
			</div>
			<div class="droidSerif color-X-1 corners-bottom-2" id="" style="overflow:auto;height:475px;padding:3px;">
				<div id="replyareabody" style="padding:3px;"></div>
			</div>
			<div class="droidSerif font-X head message_head corners-bottom-2 color-B-2 border-all-B-1" id="" style="height:25px">
				<div class="option-purple fg-button corners-bottom-2 corners-top-2 white lapcatButton" id="replylink" style="width: 80px;">Add Reply</div>
			</div>
		</div>
	</div>
</div>