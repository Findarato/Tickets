<div class="t" style="width:100%;height:500px;margin-right:5px;">
	<div id="ticketarea" >
		<div class="corners-bottom-2 corners-top-2 small-shadow-black-1" style="vertical-align:top;height:500px;margin-right:5px;">
			<div class="font-X head message_head corners-top-2 color-B-2 border-all-D-1" id="ticketTitlearea" style="position:relative;height:16px;">
				<div class="font-X ticket_sprite ticket_button fakelink" id="ticketTitle" name="bookmark" style="width:230px;text-overflow: ellipsis-word;"><span></span></div><!-- Ticket Title area -->
				<div class="color-X" id="ticketStatusImage" style="position:absolute;right:5px;top:2px;height:13px;">
					<div class="corners-bottom-2 corners-top-2 background-alpha-4 border-all-D-1 lapcatButton" style="width:auto;padding:2px;">
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
			<div class="color-X-1 " id="ticket" style="position:relative;height:430px;width:auto;padding:3px" ><!-- Ticket Body -->
		    <div id="ticketBox" style="width:100%;display:inline-block">
          <div class="td" style="width:auto;"><!-- Previous Button -->
            <div class="actionButtons font-X corners-bottom-2 corners-top-2 background-alpha-4 border-all-D-1 lapcatButton" id="previousTicket" style="width:auto;margin-right:5px;padding:3px;">
             <span>Previous</span>     
            </div>
          </div>
          <div class="td" style="width:auto;"><!-- Next Button -->
            <div class="actionButtons font-X corners-bottom-2 corners-top-2 background-alpha-4 border-all-D-1 lapcatButton" id="nextTicket" style="width:auto;margin-right:5px;padding:3px;">
              <span style="margin-right:5px">Next</span>
            </div>
          </div>
          <div class="td" style="width:auto;">
            <!-- Close Button -->
            <div class="actionButtons closeLink font-X corners-bottom-2 corners-top-2 background-alpha-4 button-theme border-all-D-1 lapcatButton fakelink openTicket" id="closeButton" style="width:auto;margin-right:5px;padding:3px;">
              <span style="margin-right:5px">Close</span>
            </div>
            <!-- Open Button -->
            <div class="actionButtons openLink font-X corners-bottom-2 corners-top-2 background-alpha-4 button-black border-all-D-1 lapcatButton fakelink closedTicket" id="reOpenButton" style="width:auto;margin-right:5px;padding:3px;display:none;">
              <span style="margin-right:5px">Open</span>
            </div>
          </div>
					<div class="td" style="width:75px;"> <!-- Locked Area -->
            <div class="font-X openTicket hold actionButtons holdLink corners-bottom-2 corners-top-2 background-alpha-4 border-all-D-1 lapcatButton" id="Holdlink" style="width:auto;margin-right:5px;padding:3px;">
              <span>Lock</span>
            </div>
            <div class="font-X openTicket hold actionButtons unholdLink corners-bottom-2 corners-top-2 background-alpha-4 border-all-D-1 lapcatButton" id="unHoldlink" style="width:auto;margin-right:5px;display:none;padding:3px;">
              <span>unlock</span>
            </div>
            <!--<div class="button-purple fg-button corners-bottom-2 corners-top-2 font-Y lapcatButton left" id="Blocklink" style="width:auto;"><span class="ticket_button ticket_sprite brick">Block</span></div>-->
          </div>
				</div>
  		
  				<div style="height:16px;">
  	       	<div class="font-X" id="ticketId" style="font-weight:bold;padding-left:2px;padding-right:3px">Ticket ID</div>
          </div>
         	<div class="font-X" id="ticketDate" style="font-weight:bold;padding-left:2px;padding-right:3px;height:16px;width:auto;" >Opened On</div>
  
          <div id="dueOnBox" style="display:none;height:16px;">
  	       	<div class="font-X" id="ticketDueDate" style="font-weight:bold;padding-left:2px;padding-right:3px" >Due On</div>
          </div>
  
          <div style="display:none;height:16px;" class="closedTicket" id="ticketClosedOn">
  	       	<div class="font-X" id="ticketClosedOnDate" style="font-weight:bold;padding-left:2px;padding-right:3px" >Closed On</div>
          </div>
  
          <div id="projectBox" style="height:16px;">
  	       	<div class="font-X" id="ticketProject" style="font-weight:bold;padding-left:2px;padding-right:3px">Project</div>
          </div>
  
          <div id="categoryBox" style="display:none;">
            <div class="font-X" id="ticketCategory" style="font-weight:bold;padding-left:2px;padding-right:3px;height:16px;">Category</div>
          </div>
  
         	<div class="font-X " id="ticketCreatedBy" style="font-weight:bold;padding-left:2px;padding-right:3px;height:16px;">Created By</div>
  
  			  <div id="assignedToBox" style="display:none;;height:16px;">
  		       	<div class="font-X" id="ticketAssignedTo" style="font-weight:bold;padding-left:2px;padding-right:3px;height:16px;">Assigned To</div>
  	      </div> 
  			  
  		    <div class="font-X" id="ticketPriority" style="font-weight:bold;padding-left:2px;padding-right:3px;height:16px;">Priority</div>
          
          <div id="locationBox" style="display:none;height:16px;">
              <div class="font-X" id="ticketLocation" style="font-weight:bold;padding-left:2px;padding-right:3px;height:16px;">Location</div>
          </div>
  			<section id="ticketDataBox" style="display:block;padding-left:2px;position:relative;margin-bottom:5px;width:100%;height:260px;overflow:auto;vertical-align:top; clear:both">
  				<article id="ticketBody" style="display:block;height:260px;with:200px; overflow:auto"></article>
  			</section>
			</div>
			<div class="corners-bottom-2" style="position:relative">
  			<div class="corners-bottom-2 color-B-2 box_transition" id="reassignBox" style="overflow:hidden;position:absolute;bottom:34px;left:0;height:0px;width:100%">
          <div style="overflow:hidden;height:auto;padding:3px;">
            <div class="textLeft">
              <span>Assign:</span>
              <select style="width:150px" id="TicketAssign" name="TicketAssign">{html_options options=$assign }</select>
              <div class="ticket_sprite cross Cancel fakelink" id="replyCancelBtn" style="display:inline-block"></div>
              <div id="ReAssignBtn" class="ticket_sprite tick fakelink" style="display:inline-block"></div>
            </div>
          </div>
 			  </div>
  			<div class="custom font-X head message_head corners-bottom-2 color-B-2 border-all-D-1" id="ticketFooterArea" style="height:24px">
  				<div class="button-purple fg-button ticketButton font-Y lapcatButton openTicket" id="ReAssignlink" style="width:auto;"><span class="ticket_button ticket_sprite user-pencil">Reassign</span></div>
  				<div class="button-purple fg-button ticketButton font-Y lapcatButton openTicket" id="editLink" style="width:auto;"><span class="ticket_button ticket_sprite pencil">Modify</span></div>
  			</div>
			</div>
		</div>
	</div>
	<div id="replyArea"  style="display:table-cell;width:auto;height:500px;vertical-align:top;">
		<div class="corners-top-2 small-shadow-black-1" style="width:auto;height:500px;margin-left:5px;">
			<div class="custom font-X head message_head corners-top-2 color-B-2 border-all-D-1" id="replyTitleArea" style="height:16px;">
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