<table cellpadding="0" cellspacing="0" style="height:500px;width:100%" border="0">
	<tr>
		<td style="width:300px;vertical-align:top;height:500px;padding-right:1px;" class="">
			<div id="ticketarea" style="height:500px;" class="ui-corner-top ui-corner-bottom">
			    <div class="ui-corner-all dark border-main-1" style="text-align:left;text-align:left;margin:4px;padding:2px;height:20px;position:relative"><font style="margin-left:10px;margin:5px;" id="ticketTitle"></font>
				<div id="ticketStatusImage" style="position:absolute ;right: 10px;top: 2px;height:13px;">
					<div class="statusImage left ticket_sprite edit" style="display:none" id="imgEdited" title="Edited"></div>
					<div class="statusImage left ticket_sprite user_edit" style="display:none" id="imgReassigned" title="Reassigned"></div>
					<div class="statusImage left ticket_sprite closed" style="display:none" id="imgClosed" title="Closed"></div>
					<div class="statusImage left ticket_sprite tick" style="display:none" id="imgBookmark" title="Bookmarked"></div>
					<div class="statusImage left ticket_sprite brick" style="display:none" id="imgBlocked" title="Blocked"></div>
					<div class="statusImage left ticket_sprite clip" style="display:none" id="imgAttachment" title="Attachment"></div>
					<div class="statusImage left ticket_sprite lock" style="display:none" id="imgLock" title="Locked"></div>
				</div>
				</div>
					<div class="color-heavy" id="ticket" style="height:430px;padding:4px">
					<div style="width:100%;text-align:top;" class="">
				        <div style="clear:both">
					       	<div class="left " style="font-weight:bold; padding-right:3px" ><font class="opposite">Ticket ID:</font></div>
					       	<div class="left "><font class="opposite" id="ticketId"></font></div>
				        </div>
				        <div style="clear:both">
					       	<div class="left " style="font-weight:bold; padding-right:3px" ><font class="opposite">Opened On</font></div>
					       	<div class="left "><font class="opposite" id="ticketDate"></font></div>
				        </div>
				        <div style="clear:both">
					       	<div class="left " style="font-weight:bold; padding-right:3px" ><font class="opposite">Due On</font></div>
					       	<div class="left "><font class="opposite" id="ticketDueDate"></font></div>
				        </div>
				        <div style="clear:both;display:none" id="ticketClosedOn">
					       	<div class="left " style="font-weight:bold; padding-right:3px" ><font class="opposite">Closed On</font></div>
					       	<div class="left "><font class="opposite" id="ticketClosedOnDate"></font></div>
				        </div>
				        <div style="clear:both">
					       	<div class="left " style="font-weight:bold; padding-right:3px"><font class="opposite">Category</font></div>
					       	<div class="left "><font class="opposite" id="ticketCategory"></font></div>
				        </div>
				        <div style="clear:both">
					       	<div class="left " style="font-weight:bold; padding-right:3px"><font class="opposite">Created By</font></div>
					       	<div class="left "><font class="opposite" id="ticketCreatedBy"></font></div>
				       </div>
						<div style="clear:both">
					       	<div class="left" style="font-weight:bold; padding-right:3px"><font class="opposite">Assigned To</font></div>
					       	<div class="left" ><font class="opposite" id="ticketAssignedTo"></font></div>
				       </div> 
						<div style="clear:both">
					       	<div class="left" style="font-weight:bold; padding-right:3px"><font class="opposite">Priority</font></div>
					       	<div class="left" ><font class="opposite" id="ticketPriority"></font></div>
						</div>
						<div style="clear:both">
					       	<div class="left" style="font-weight:bold; padding-right:3px"><font class="opposite">Location</font></div>
					       	<div class="left" ><font class="opposite" id="ticketLocation"></font></div>
						</div>
						<div style="clear:both">
							<div class="option-theme fg-button ui-corner-all white lapcatButton left" id="Holdlink" style="width:auto;"><span class="ticket_sprite lock">Lock</span></div>
							<div class="option-theme fg-button ui-corner-all white lapcatButton left" id="unHoldlink" style="width:auto;display:none;"><span class="ticket_sprite unlock">unLock</span></div>
							<div class="option-purple fg-button ui-corner-all white lapcatButton left" id="Blocklink" style="width:auto;"><span class="ticket_sprite brick">Block</span></div>
						</div>
					</div>
					<div id="ticketDataBox" style="margin-bottom:5px;width:100%;height:auto;max-height:300px;overflow:auto;vertical-align:top; clear:both"><font class="opposite" id="ticketBody"></font></div>
					<div id="ticketAttachmentsBox" style="width:100%;height:113px;overflow:hidden;vertical-align:top; clear:both;display:none" ><font id="ticketAttachments"></font></div>
				</div>
				<div style="height:30px;position:relative;padding-top:4px;padding-left:4px;overflow:hidden;" class="color-heavy light-down ui-corner-bottom">
					<div class="option-purple fg-button ui-corner-all white lapcatButton" id="editlink" style="width:45px;">Edit</div>
					<div class="option-theme fg-button ui-corner-all white lapcatButton" id="closelink" style="width:45px;">Close</div>
					<div class="option-black fg-button ui-corner-all white lapcatButton" id="openlink" style="width:45px;display:none">Reopen</div>
					<div class="option-purple fg-button ui-corner-all white lapcatButton" id="ReAssignlink" style="width:auto;"><span class="ticket_sprite user_edit">Reassign</span></div>
				</div>
			</div>
		</td>
		<td id="replyarea" style="padding-left:1px;vertical-align:top;height:500px;" class="ui-corner-top ui-corner-bottom">
			<div class="ui-corner-all" style="width:100%;position:relative"> 
				<div class="ui-corner-all dark ol-fred border-main-1" style="text-align:left;margin:4px;padding:2px;height:20px" ><font id="replyareaTitle" style="margin-left:10px;margin:5px;">Replies (0)</font>
					<div id="pageAnator" style="right:5px;position:absolute;top:2px;"></div>
				</div>
								
				<div style="width:100%;vertical-align:top;" class="color-off">
					<div style="overflow:auto;height:430px;padding:4px;" >
						<div class=" border-main-1 color-heavy " style="width:100%">
							<font ><div id="replyareabody"></div></font>
						</div>
					</div>	
				</div>
				<div style="height:30px;position:relative;padding-top:4px;padding-left:4px" class="color-off light-down ui-corner-bottom">
					<div class="option-purple fg-button ui-corner-all white lapcatButton" id="replylink" style="width: 80px;">Add Reply</div>
				</div> 
			</div>
		</td>
	</tr>
</table>
