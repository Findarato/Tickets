<div style="height:100%;position:relative">
	<div class="colorMain-1" id="ticketTitlearea" style="width:100%;height:40px;">
		<div style="display:table;width:100%;height:100%">
			<div style="display:table-cell;width:50%;text-align:left;">
				<div class="fontMain2" id="ticketId" style="font-weight:bold;padding-left:2px;padding-right:3px">
					Ticket ID
				</div>
				<div class="td">
					<div id="ticketBookmark" class="ticketSprite fakelink"  name="bookmark"></div>
				</div>
				<div class="td">
					<h3 class="fontMain" id="ticketTitle" style="width:auto;height:auto;font-size:15px">
				</div>
				</h3><!-- Ticket Title area -->
			</div>
			<div style="display:table-cell;width:50%;text-align:right;">
				<div class="colorWhite" id="ticketStatusImage" style="height:15px;float:right;">
					<div class="lapcatButton" style="width:auto;padding:2px;">
						<div class="statusImage ticket_left ticketSprite pencil" style="display:none;height:15px;" id="imgEdited" title="Edited"></div>
						<div class="statusImage ticket_left ticketSprite user-pencil" style="display:none;height:15px;" id="imgReassigned" title="Reassigned"></div>
						<div class="statusImage ticket_left ticketSprite closed" style="display:none;height:15px;" id="imgClosed" title="Closed"></div>
						<div class="statusImage ticket_left ticketSprite lock" style="display:none;height:15px;" id="imgLock" title="Locked"></div>
						<div class="ticket_left ticketSprite ticket" id="imgTicketTrouble" style="height:15px;display:none;" title="Trouble Ticket"></div>
						<div class="ticket_left ticketSprite bug" id="imgTicketBug" style="height:15px;display:none;" title="Bug Report"></div>
					</div>
				</div>
				<div id="" style="display:block;height:16px;">
					<div class="fontMain" id="backnext" style="font-weight:bold;padding-left:2px;padding-right:3px;height:16px;">
						<!-- <--BACK NEXT-->
					</div>
				</div>
			</div>
		</div>
	</div>
	<div style="display:table;width:100%">
		<!--Main Content -->
		<div class="ticketSideRight ticket-divider colorWhite-1" style="vertical-align:top;width:300px">
			<!-- Left Side ticket information -->
			<div id="rightSideFloater">
				<div style="display:none;" class="closedTicket" id="ticketClosedOn">
					<div class="fontMain2" id="ticketClosedOnDate" style="font-weight:bold;padding-left:2px;padding-right:3px" >
						Closed On
					</div>
				</div>
				<div id="categoryBox" style="display:none;">
					<div class="fontMain2" id="ticketCategory" style="font-weight:bold;padding-left:2px;padding-right:3px;">
						Category
					</div>
				</div>
				<div id="priorityBox" style="display:block;">
					<div class="fontMain" id="ticketPriority" style="font-weight:bold;padding-left:2px;padding-right:3px;">
						Priority
					</div>
				</div>
				<div id="projectBox" style="">
					<div class="fontMain2" id="ticketProject" style="font-weight:bold;padding-left:2px;padding-right:3px">
						Project
					</div>
				</div>
				<!--
				<div class="fontMain2 " id="ticketCreatedBy" style="font-weight:bold;padding-left:2px;padding-right:3px;height:16px;">
				Created By
				</div>
				-->
				<div id="assignedToBox" style="display:none;">
					<div class="fontMain2" id="ticketAssignedTo" style="font-weight:bold;padding-left:2px;padding-right:3px;">
						Assigned To
					</div>
				</div>
				<div id="dueOnBox" style="display:none;">
					<div class="fontMain2" id="ticketDueDate" style="font-weight:bold;padding-left:2px;padding-right:3px" >
						Due On
					</div>
				</div>
				<div id="locationBox" style="display:none;">
					<div class="fontMain2" id="ticketLocation" style="font-weight:bold;padding-left:2px;padding-right:3px;">
						Location
					</div>
				</div>
				<div id="" style="display:none;">
					<div class="fontMain2" id="replyareaTitle" style="font-weight:bold;padding-left:2px;padding-right:3px;">
						Replies
					</div>
				</div>
				<div id="" style="">
					<div class="fontMain2" id="" style="font-weight:bold;padding-left:2px;padding-right:3px;">
						<a href="javascript:focusMe('#replyTitleBox')">Add Reply Below</a>
					</div>
				</div>
				<!--		<span id="replyareaTitle" style="margin-left:10px;margin:5px;" title="Reply Title">Replies (0)</span> -->
				<!-- Modification Buttons -->
				<div class="" id="ticketFooterArea" style="height:37px;overflow:hidden; ">
					<div class="box_transition" id="reassignBox" style="overflow:hidden;width:100%;height:0px">
						<div style="overflow:hidden;height:auto;padding:3px;">
							<div class="textLeft" style='height:auto;'>
								<span>Assign:</span>
								
								<button style="width:150px" id="TicketAssign" name="TicketAssign" data-select-items='{json_encode($assign)}' class="selectButton">Select</button>
								{*
								<button style="width:16px" id="TicketAssignDrop" name="TicketAssignDrop"class="right">&nbsp;<div style="position:relative"><div class="triangleDown"></div></div></button>
								
								
								<select style="width:150px" id="TicketAssign" name="TicketAssign" class="selectButton">
									{html_options options=$assign}
									
								</select>
								*}
								<button class="" id="ReAssignCancelButton" style="display:inline-block">Cancel</button>
								<button id="reAssignAcceptButton" class="" style="display:inline-block">Save</button>
							</div>
						</div>
					</div>
					
					<div id="buttonBox" style="">
						<button class="openTicket button" id="reAssignButton" style="width:auto;">
							<span class="">Reassign</span>
						</button>
						<button class="openTicket button " id="modifyButton" style="width:auto;">
							<span class="">Modify</span>
						</button>
						<button class="button " id="ticketModifySaveButton" style="width:auto;display:none;">
							<span class="">Save</span>
						</button>
						<button class="button negative " id="ticketModifyCancelButton" style="width:auto;display:none;">
							<span class="">Cancel</span>
						</button>
						<button class="openTicket negative button actionButtons closeLink " id="closeButton" style="width:auto;">
							<span class="" style="margin-right:5px">Close</span>
						</button>
						<button class="closedTicket button actionButtons openLink" id="reOpenButton" style="width:auto;display:none;">
							<span style="margin-right:5px">Open</span>
						</button>
					</div>
				</div>
				<div id="pageAnator" style=""></div>
			</div>
		</div>
		<div class="ticketSideRight" style="padding:3px">
			<!-- Right Side ticket body and Replies -->
			<div style="display:table; width:100%; margin-bottom:2px;overflow:hidden;" class="border-all-B-1 WhitetoLightBlue">
				<!-- Body of the ticket -->
				<div style="display:table-row;width:100%">
					<div style="display:table-cell; padding:6px; width:24px;vertical-align: top">
						<div id="replyIcon" class="" style="width:32px;height:32px;"></div>
					</div>
					<div style="display:table-cell; padding:6px; width:100px;vertical-align:top;">
						<div class="font-X2" id="ticketCreatedBy" style="width:100px;vertical-align:top;"></div>
						<div id="ticketDate" class="font-L font-bold" style="vertical-align:top;"></div>
					</div>
					<div style="display:table-cell;vertical-align:top;padding:6px;">
						<div class="font-X2" style="word-wrap:break-word;white-space: normal;vertical-align:top;" id="ticketBody"></div>
					</div>
				</div>
			</div><!-- End Body of the ticket -->
			<div class="colorWhite-1 " id="replyareabody" style=""></div>
			<div style="width:100%;margin-bottom:10px" id="bottomReplyArea">
				<div class="colorMain-1" style="width:auto;height:90px;position:relative;" title="Reply Box">
					<div id="1replyareabody" style="padding:3px;">
						<form name="newReplyForm" id="newReplyForm">
							<div class="textLeft">
								<span class="" title="Reply Title">Title:</span>
								<input type="text" name="title" autocomplete="off" maxlength="100" id="replyTitleBox" class="Ticketform roundAll4 border-all-B-2 fontMain" style="padding:2px;width:400px;"/>
								<br>
								<div style="width:auto;border:none;margin:5px;padding-right:10px;height:100%">
									<textarea name="description" id="replyDescriptionTextArea" autocomplete="off"  class="Ticketform roundAll4 border-all-B-2 fontMain" style="padding:2px;width:100%;height:100%"></textarea>
								</div>
								<INPUT type="hidden" id="replyuserid" name="user_id" value="{$user_id}">
								<INPUT type="hidden" id="replyticketid" name="ticket_id"  value="{$ticket_id}" >
								<INPUT type="hidden" name="type" value="{$type}">
							</div>
						</form>
					</div>
					<div style="height:24px;position:absolute;top:2px;right:3px;">
						<button class="button" id="replyButton" style="width:auto;" title="Add Reply">
							<span class="">Add Reply</span>
						</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>