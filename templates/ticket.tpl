<table cellpadding="0" cellspacing="0" style="height:500px;width:100%" border="0">
	<tr>
		<td style="width:300px;vertical-align:top;height:500px;padding-right:1px;" class="">
			<div id="ticketarea" style="height:500px;" class="ui-corner-top ui-corner-bottom">
			    <div class="ui-corner-all color-B-2 border-all-B-1" style="text-align:left;text-align:left;margin:4px;padding:2px;height:20px;position:relative"><font style="margin-left:10px;margin:5px;" id="ticketTitle"></font>
				<div id="ticketStatusImage" style="position:absolute ;right: 5px;top: 2px;height:13px;">
					<div class="ui-corner-all background-alpha-4 border-all-B-1 lapcatButton" style="width:auto;padding:1px;">
						<div class="statusImage left ticket_button ticket_sprite edit" style="display:none;height:15px;" id="imgEdited" title="Edited"></div>
						<div class="statusImage left ticket_button ticket_sprite user_edit" style="display:none;height:15px;" id="imgReassigned" title="Reassigned"></div>
						<div class="statusImage left ticket_button ticket_sprite closed" style="display:none;height:15px;" id="imgClosed" title="Closed"></div>
						<div class="statusImage left ticket_button ticket_sprite tick" style="display:none;height:15px;" id="imgBookmark" title="Bookmarked"></div>
						<div class="statusImage left ticket_button ticket_sprite brick" style="display:none;height:15px;" id="imgBlocked" title="Blocked"></div>
						<div class="statusImage left ticket_button ticket_sprite clip" style="display:none;height:15px;" id="imgAttachment" title="Attachment"></div>
						<div class="statusImage left ticket_button ticket_sprite lock" style="display:none;height:15px;" id="imgLock" title="Locked"></div>
						<div class="left ticket_button ticket_sprite tag_green" id="imgTicket" style="height:15px;" title="Trouble Ticket"></div>
					</div>
				</div>
				</div>
					<div class="background-special-1 color-E-2 " id="ticket" style="border-bottom:none;height:430px;padding:4px">
					<div style="position:relative;width:100%;text-align:top;" class="border-all-B-1 color-B-2 background-alpha-2">
				        <div style="clear:both">
					       	<div class="left " style="font-weight:bold; padding-right:3px" ><font class="">Ticket ID:</font></div>
					       	<div class="left "><font class="" id="ticketId"></font></div>
				        </div>
				        <div style="clear:both">
					       	<div class="left " style="font-weight:bold; padding-right:3px" ><font class="">Opened On</font></div>
					       	<div class="left "><font class="" id="ticketDate"></font></div>
				        </div>
				        <div style="clear:both">
					       	<div class="left " style="font-weight:bold; padding-right:3px" ><font class="">Due On</font></div>
					       	<div class="left "><font class="" id="ticketDueDate"></font></div>
				        </div>
				        <div style="clear:both;display:none" id="ticketClosedOn">
					       	<div class="left " style="font-weight:bold; padding-right:3px" ><font class="">Closed On</font></div>
					       	<div class="left "><font class="" id="ticketClosedOnDate"></font></div>
				        </div>
				        <div style="clear:both">
					       	<div class="left " style="font-weight:bold; padding-right:3px"><font class="">Category</font></div>
					       	<div class="left "><font class="" id="ticketCategory"></font></div>
				        </div>
				        <div style="clear:both">
					       	<div class="left " style="font-weight:bold; padding-right:3px"><font class="">Created By</font></div>
					       	<div class="left "><font class="" id="ticketCreatedBy"></font></div>
				       </div>
						<div style="clear:both">
					       	<div class="left" style="font-weight:bold; padding-right:3px"><font class="">Assigned To</font></div>
					       	<div class="left" ><font class="" id="ticketAssignedTo"></font></div>
				       </div> 
						<div style="clear:both">
					       	<div class="left" style="font-weight:bold; padding-right:3px"><font class="">Priority</font></div>
					       	<div class="left" ><font class="" id="ticketPriority"></font></div>
						</div>
						<div style="clear:both">
					       	<div class="left" style="font-weight:bold; padding-right:3px"><font class="">Location</font></div>
					       	<div class="left" ><font class="" id="ticketLocation"></font></div>
						</div>
							<div style="position:absolute;top:1px;right:0px;clear:both">
								<div class="option-theme fg-button ui-corner-all white lapcatButton left" id="Holdlink" style="width:auto;"><span class="ticket_button ticket_sprite lock">Lock</span></div>
								<div class="option-theme fg-button ui-corner-all white lapcatButton left" id="unHoldlink" style="width:auto;display:none;"><span class="ticket_button ticket_sprite unlock">unLock</span></div>
								<!--<div class="option-purple fg-button ui-corner-all white lapcatButton left" id="Blocklink" style="width:auto;"><span class="ticket_button ticket_sprite brick">Block</span></div>-->
							</div>
						<div id="ticketDataBox" class="" style="position:relative;margin-bottom:5px;width:100%;height:285px;overflow:auto;vertical-align:top; clear:both">
							<font class="" id="ticketBody"></font>
						</div>
					</div>

				</div>
				<div style="border-top:none;height:30px;position:relative;padding-top:4px;padding-left:4px;overflow:hidden;" class="background-special-1 color-E-2 ui-corner-bottom">
					<div class="option-purple fg-button ui-corner-all white lapcatButton" id="editlink" style="width:45px;">Edit</div>
					<div class="option-theme fg-button ui-corner-all white lapcatButton" id="closelink" style="width:45px;">Close</div>
					<div class="option-black fg-button ui-corner-all white lapcatButton" id="openlink" style="width:45px;display:none">Reopen</div>
					<div class="option-purple fg-button ui-corner-all white lapcatButton" id="ReAssignlink" style="width:auto;"><span class="ticket_button ticket_sprite user_edit">Reassign</span></div>
				</div>
			</div>
		</td>
		<td id="replyarea" style="padding-left:1px;vertical-align:top;height:500px;" class="ui-corner-top ui-corner-bottom">
			<div class="ui-corner-all" style="width:100%;position:relative"> 
				<div class="ui-corner-all dark color-B-2 border-all-B-1" style="text-align:left;margin:4px;padding:2px;height:20px" ><font id="replyareaTitle" style="margin-left:10px;margin:5px;">Replies (0)</font>
					<div id="pageAnator" style="right:5px;position:absolute;top:2px;"></div>
				</div>
								
				<div style="width:100%;vertical-align:top;" class="background-special-1 color-E-2">	
					<div style="overflow:auto;height:430px;padding:4px;" >
						<div class=" border-all-B-1 color-E-2 " style="width:100%">
							<font ><div id="replyareabody"></div></font>
						</div>
					</div>	
				</div>
				<div style="height:30px;position:relative;padding-top:4px;padding-left:4px" class="background-special-1 color-E-2 ui-corner-bottom">
					<div class="option-purple fg-button ui-corner-all white lapcatButton" id="replylink" style="width: 80px;">Add Reply</div>
				</div> 
			</div>
		</td>
	</tr>
</table>
