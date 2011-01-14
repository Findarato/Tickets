<div class="t" style="width:100%;height:500px;margin-right:5px;">
	<div id="ticketarea" >
		<div class="roundAll4 small-shadow-black-1" style="vertical-align:top;height:500px;margin-right:5px;">
			<div class="fontMain head message_head roundTop4 color-B-2 border-all-D-1" id="ticketTitlearea" style="position:relative;height:16px;">
				<div class="fontMain ticket_sprite ticket_button fakelink" id="ticketTitle" name="bookmark" style="width:230px;height:16px;overflow:hidden;text-overflow: ellipsis-word;"></div><!-- Ticket Title area -->
				<div class="colorWhite" id="ticketStatusImage" style="position:absolute;right:5px;top:2px;height:13px;">
					<div class="roundAll4 colorBlack30 border-all-D-1 lapcatButton" style="width:auto;padding:2px;">
						<div class="statusImage left ticket_sprite pencil" style="display:none;height:15px;" id="imgEdited" title="Edited"></div>
						<div class="statusImage left ticket_sprite user-pencil" style="display:none;height:15px;" id="imgReassigned" title="Reassigned"></div>
						<div class="statusImage left ticket_sprite door" style="display:none;height:15px;" id="imgClosed" title="Closed"></div>
						<div class="statusImage left ticket_sprite wall" style="display:none;height:15px;" id="imgBlocked" title="Blocked"></div>
						<div class="statusImage left ticket_sprite lock" style="display:none;height:15px;" id="imgLock" title="Locked"></div>
						<div class="left ticket_sprite ticket" id="imgTicketTrouble" style="height:15px;display:none;" title="Trouble Ticket"></div>
						<div class="left ticket_sprite bug" id="imgTicketBug" style="height:15px;display:none;" title="Bug Report"></div>
					</div>
				</div>
			</div> 
			<div class="colorWhite-1 " id="ticket" style="position:relative;height:430px;width:auto;padding:3px" ><!-- Ticket Body -->
		    <div id="ticketBox" style="width:100%;display:inline-block">
					<div class="td" style="width:75px;"> <!-- Locked Area -->
            <div class="fontMain openTicket hold actionButtons holdLink roundAll4 background-alpha-4 border-all-D-1 lapcatButton" id="Holdlink" style="width:auto;margin-right:5px;padding:3px;">
              <span>Lock</span>
            </div>
            <div class="fontMain openTicket hold actionButtons unholdLink roundAll4 background-alpha-4 border-all-D-1 lapcatButton" id="unHoldlink" style="width:auto;margin-right:5px;display:none;padding:3px;">
              <span>unlock</span>
            </div>
            <!--<div class="button-purple fg-button roundAll4 fontReverse lapcatButton left" id="Blocklink" style="width:auto;"><span class="ticket_button ticket_sprite brick">Block</span></div>-->
          </div>
				</div>
  		
  				<div style="height:16px;">
  	       	<div class="fontMain2" id="ticketId" style="font-weight:bold;padding-left:2px;padding-right:3px">Ticket ID</div>
          </div>
         	<div class="fontMain2" id="ticketDate" style="font-weight:bold;padding-left:2px;padding-right:3px;height:16px;width:auto;" >Opened On</div>
  
          <div id="dueOnBox" style="display:none;height:16px;">
  	       	<div class="fontMain2" id="ticketDueDate" style="font-weight:bold;padding-left:2px;padding-right:3px" >Due On</div>
          </div>
  
          <div style="display:none;height:16px;" class="closedTicket" id="ticketClosedOn">
  	       	<div class="fontMain2" id="ticketClosedOnDate" style="font-weight:bold;padding-left:2px;padding-right:3px" >Closed On</div>
          </div>
  
          <div id="projectBox" style="height:16px;">
  	       	<div class="fontMain2" id="ticketProject" style="font-weight:bold;padding-left:2px;padding-right:3px">Project</div>
          </div>
  
          <div id="categoryBox" style="display:none;">
            <div class="fontMain2" id="ticketCategory" style="font-weight:bold;padding-left:2px;padding-right:3px;height:16px;">Category</div>
          </div>
  
         	<div class="fontMain2 " id="ticketCreatedBy" style="font-weight:bold;padding-left:2px;padding-right:3px;height:16px;">Created By</div>
  
  			  <div id="assignedToBox" style="display:none;height:16px;">
  		       	<div class="fontMain2" id="ticketAssignedTo" style="font-weight:bold;padding-left:2px;padding-right:3px;height:16px;">Assigned To</div>
  	      </div> 
  			  <div id="priorityBox" style="display:block;height:16px;">
  		      <div class="fontMain2" id="ticketPriority" style="font-weight:bold;padding-left:2px;padding-right:3px;height:16px;">Priority</div>
          </div>
          <div id="locationBox" style="display:none;height:16px;">
              <div class="fontMain2" id="ticketLocation" style="font-weight:bold;padding-left:2px;padding-right:3px;height:16px;">Location</div>
          </div>
  			<section id="ticketDataBox" style="display:block;padding-left:2px;position:relative;margin-bottom:5px;margin-top:5px;width:100%;height:260px;overflow:auto;vertical-align:top; clear:both">
  				<article id="ticketBody" style="display:block;height:260px;with:200px; overflow:auto"></article>
  			</section>
			</div>
			<div class="corners-bottom-2" style="position:relative">
  			<div class="corners-bottom-2 color-B-2 box_transition" id="reassignBox" style="overflow:hidden;position:absolute;bottom:34px;left:0;height:0px;width:100%">
          <div style="overflow:hidden;height:auto;padding:3px;">
            <div class="textLeft">
              <span>Assign:</span>
              <select style="width:150px" id="TicketAssign" name="TicketAssign">{html_options options=$assign}</select>
              <div class="ticket_sprite cross fakelink" id="ReAssignCancelButton" style="display:inline-block"></div>
              <div id="reAssignAcceptButton" class="ticket_sprite tick fakelink" style="display:inline-block"></div>
            </div>
          </div>
 			  </div>
  			<div class="custom fontMain2 head message_head corners-bottom-2 color-B-2 border-all-D-1" id="ticketFooterArea" style="height:24px">
  				<div class="openTicket button-purple ticketButton fontReverse lapcatButton" id="reAssignButton" style="width:auto;"><span class="ticket_button ticket_sprite user-pencil">Reassign</span></div>
  				<div class="openTicket button-purple ticketButton fontReverse lapcatButton" id="modifyButton" style="width:auto;"><span class="ticket_button ticket_sprite pencil">Modify</span></div>
  				<div class="openTicket button-purple ticketButton fontReverse lapcatButton" id="ticketModifySaveButton" style="width:auto;display:none;"><span class="ticket_button ticket_sprite tick">Save</span></div>
  				<div class="openTicket button-purple ticketButton fontReverse lapcatButton" id="ticketModifyCancelButton" style="width:auto;display:none;"><span class="ticket_button ticket_sprite cross">Cancel</span></div>
          <div class="openTicket button-purple ticketButton fontReverse lapcatButton actionButtons closeLink" id="closeButton" style="width:auto;"><span style="margin-right:5px">Close</span></div>
          <div class="closedTicket button-purple ticketButton fontReverse lapcatButton actionButtons openLink" id="reOpenButton" style="width:auto;margin-right:5px;padding:3px;display:none;"><span style="margin-right:5px">Open</span></div>
  			</div>
			</div>
		</div>
	</div>
	<section id="replyArea"  style="display:table-cell;width:auto;height:500px;vertical-align:top;">
		<div class="roundTop4 small-shadow-black-1" style="width:auto;height:500px;margin-left:5px;">
			<div class="custom fontMain head message_head roundTop4 color-B-2 border-all-D-1" id="replyTitleArea" style="height:16px;">
				<div style="width:100%">
					<span id="replyareaTitle" style="margin-left:10px;margin:5px;">Replies (0)</span>
					<div id="pageAnator" style="right:5px;position:absolute;top:2px;"></div>
				</div>
			</div>
			<div class="colorWhite-1" id="replyareabody" style="overflow:auto;height:430px;padding:3px;"></div>
			<div class="roundBottom4" style="position:relative">
        <div class="corners-bottom-2 box_transition" id="replyBox" style="overflow:hidden;position:absolute;bottom:34px;left:0;height:0px;width:100%;background-color:#FFF">
          {include file="reply.tpl"}
        </div>
			<div class="fontMain message_head roundBottom4 color-B-2 border-all-D-1" id="replyFooter" style="height:24px">
				<div class="button-purple fg-button ticketButton fontReverse lapcatButton" id="replyButton" style="width: 80px;">
				  <span class="ticket_button ticket_sprite balloon">Add Reply</span>
				</div>
			</div>
		</div>
	</div>
</section>