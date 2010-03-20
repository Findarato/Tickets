<div style="display:table;width:100%;height:500px">
	<div style="display:table-cell;width:300px;vertical-align:top;height:500px;padding-right:1px;"> <!--Ticket Area -->
		<div style="width:100%"> <!-- Ticket Title -->
			<div class="corners-bottom-2 corners-top-2 color-B-2 border-all-B-1" style="text-align:left;text-align:left;margin:4px;margin-top:0;padding:2px;height:20px;position:relative">
				<font style="margin-left:10px;margin:5px;" id="ticketTitle"></font>
				<div id="ticketStatusImage" style="position:absolute ;right: 5px;top: 2px;height:13px;">
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
		</div>
		<div style="width:100%"><!-- Ticket Body -->
			<div class="background-special-1 color-E-2 corners-top-2" id="ticket" style="border-bottom:none;height:430px;padding:4px;margin-left:4px;margin-right:4px;">
				<div style="position:relative;width:100%;text-align:top;" class="corners-top-2 corners-bottom-2 border-all-B-1 background-alpha-3">
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
			        <div style="clear:both;display:none" id="ticketClosedOn">
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
					<div style="position:absolute;top:1px;right:0px;clear:both;">
						<div class="option-theme fg-button corners-bottom-2 corners-top-2 white lapcatButton left" id="Holdlink" style="width:auto;"><span class="ticket_button ticket_sprite lock">Lock</span></div>
						<div class="option-theme fg-button corners-bottom-2 corners-top-2 white lapcatButton left" id="unHoldlink" style="width:auto;display:none;"><span class="ticket_button ticket_sprite unlock">unLock</span></div>
						<!--<div class="option-purple fg-button corners-bottom-2 corners-top-2 white lapcatButton left" id="Blocklink" style="width:auto;"><span class="ticket_button ticket_sprite brick">Block</span></div>-->
					</div>
					<div id="ticketDataBox" style="padding-left:2px;position:relative;margin-bottom:5px;width:100%;height:285px;overflow:auto;vertical-align:top; clear:both">
						<font id="ticketBody"></font>
					</div>
				</div>
			</div>
			<div style="border-top:none;height:30px;position:relative;padding-top:4px;padding-left:4px;margin-left:4px;margin-right:4px;overflow:hidden;" class="background-special-1 color-E-2 corners-bottom-2">
				<div class="option-purple fg-button corners-bottom-2 corners-top-2 white lapcatButton" id="editlink" style="width:45px;">Edit</div>
				<div class="option-theme fg-button corners-bottom-2 corners-top-2 white lapcatButton" id="closelink" style="width:45px;">Close</div>
				<div class="option-black fg-button corners-bottom-2 corners-top-2 white lapcatButton" id="openlink" style="width:45px;display:none">Reopen</div>
				<div class="option-purple fg-button corners-bottom-2 corners-top-2 white lapcatButton" id="ReAssignlink" style="width:auto;"><span class="ticket_button ticket_sprite user_edit">Reassign</span></div>
			</div>
		</div>
	</div>
	<div id="replyArea" style="display:table-cell;width:auto;"><!-- Reply Title -->
		<div style="width:100%">
			<div class="corners-bottom-2 corners-top-2 dark color-B-2 border-all-B-1" style="position:relative;text-align:left;margin:4px;margin-top:0px;padding:2px;height:20px" >
				<font id="replyareaTitle" style="margin-left:10px;margin:5px;">Replies (0)</font>
				<div id="pageAnator" style="right:5px;position:absolute;top:2px;"></div>
			</div>
		</div>
		<div class="corners-bottom-2 corners-top-2" style="width:100%"><!-- Reply Body -->
			<div style="vertical-align:top;margin-left:4px;margin-right:4px;" class="background-special-1 color-E-2 corners-top-2">	
				<div style="overflow:auto;height:438px;" >
					<div style="padding:4px;">
						<div id="replyareabody"></div>
					</div>
				</div>	
			</div>
			<div style="height:30px;position:relative;padding-top:4px;padding-left:4px;margin-left:4px;margin-right:4px;" class="background-special-1 color-E-2 corners-bottom-2">
				<div class="option-purple fg-button corners-bottom-2 corners-top-2 white lapcatButton" id="replylink" style="width: 80px;">Add Reply</div>
			</div> 
		</div>
	</div>
</div>