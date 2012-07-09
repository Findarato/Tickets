<div style="height:100%;position:relative">
	<div class="color2" id="ticketTitlearea" style="width:100%;height:40px;">
		<div style="display:table;width:100%;height:100%">
			<div style="display:table-cell;width:95%;text-align:left;">
				<div class="fontMain2" id="ticketId" style="font-weight:bold;padding-left:2px;padding-right:3px">
					Ticket ID
				</div>
				<div class="td">
					<div id="ticketBookmark" class="ticketSprite fakelink"  name="bookmark"></div>
				</div>
				<div class="td">
					<h4 class="fontMain" id="ticketTitle"></h4><!-- Ticket Title area -->
				</div>
			</div>
			<div style="display:table-cell;width:50%;text-align:right;">
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
		<div class="ticketSideRight ticket-divider" style="vertical-align:top;width:300px">
			<!-- Left Side ticket information -->
			<div id="rightSideFloater">
				<div style="display:none;" class="closedTicket" id="ticketClosedOn">
					<div class="fontMain2" id="ticketClosedOnDate" style="font-weight:bold;padding-left:2px;padding-right:3px" >
						Closed On
					</div>
				</div>
				<div id="categoryBox">
					<div class="fontMain2" id="ticketCategory" style="font-weight:bold;padding-left:2px;padding-right:3px;">
						Category
					</div>
				</div>
				<div id="priorityBox" style="display:block;">
					<div class="fontMain" id="ticketPriority" style="font-weight:bold;padding-left:2px;padding-right:3px;">
						Priority
					</div>
				</div>
				<div id="assignedToBox" >
					<div class="fontMain2" id="ticketAssignedTo" style="padding-left:2px;padding-right:3px;"></div>
				</div>
				<div id="dueOnBox" >
					<div class="fontMain2" id="ticketDueDate" style="padding-left:2px;padding-right:3px" ></div>
				</div>
				<div id="locationBox" >
					<div class="fontMain2" id="ticketLocation" style="padding-left:2px;padding-right:3px;"></div>
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
					<div id="buttonBox" style="">
						<button class="openTicket button" id="reAssignButton" style="width:auto;">
							<span class="">Reassign</span>
						</button>
						<button class="openTicket button actionButtons " id="modifyButton" style="width:auto;">
							<span class="">Modify</span>
						</button>
						<button class="button actionButtons" id="ticketModifySaveButton" style="width:auto;display:none;">
							<span class="">Save</span>
						</button>
						<button class="button negative actionButtons" id="ticketModifyCancelButton" style="width:auto;display:none;">
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
					<div class="" id="reassignBox" style="width:100%;height:0px;overflow:hidden;">
						<div style="height:auto;padding:3px;">
							<div class="textLeft" style='height:auto;'>
								<span>Assign:</span>
								<a style="width:150px;position:relative;" id="ticketAssign" name="ticketAssign" data-value="-1" data-select-items='{json_encode($assign)}' class="selectButton">Select</a>
								<button class="remove" id="ReAssignCancelButton" style="display:inline-block"></button>
								<button class="check" id="reAssignAcceptButton" class="" style="display:inline-block"></button>
							</div>
						</div>
					</div>


				<div id="pageAnator" style=""></div>
			</div>
		</div>
		<div class="ticketSideRight" style="padding:3px">
			<!-- Right Side ticket body and Replies -->
			<div style="display:table; width:100%; margin-bottom:2px;overflow:hidden;" class="mainBorder">
				<!-- Body of the ticket -->
				<div class="" style="display:table-row;width:100%">
					<div class="ticketHighLight color1toWhite linearAnimate" style="display:table-cell; padding:0px; width:0px;vertical-align: top"></div>
					<div style="display:table-cell; padding:6px; width:24px;vertical-align: top">
						<div id="replyIcon" class="roundAll4 mainBorder" style="width:32px;height:32px;"></div>
					</div>
					<div style="display:table-cell; padding:6px; width:100px;vertical-align:top;">
						<div class="fontColorDark" id="ticketCreatedBy" style="width:100px;vertical-align:top;"></div>
						<div id="ticketDate" class="fontColorDark font-bold" style="vertical-align:top;"></div>
					</div>
					<div style="display:table-cell;vertical-align:top;padding:6px;">
						<div class="fontColorDark" style="word-wrap:break-word;white-space: normal;vertical-align:top;" id="ticketBody"></div>
					</div>
				</div>
			</div><!-- End Body of the ticket -->
			<div class="" id="replyareabody" style=""></div>
			<div style="width:100%;margin-top:10px" id="bottomReplyArea">
				<div class="color2" style="width:auto;height:90px;position:relative;" title="Reply Box">
					<div id="1replyareabody" style="padding:3px;">
						<form name="newReplyForm" id="newReplyForm">
							<div class="textLeft">
								<span class="" title="Reply Title">Title:</span>
								<input required="required" type="text" name="title" autocomplete="off" maxlength="100" id="replyTitleBox" class=" mainBorder Ticketform roundAll4 fontMain" style="padding:2px;width:400px;"/>
								<br>
								<div style="width:auto;border:none;margin:5px;padding-right:10px;height:100%">
									<textarea name="description" id="replyDescriptionTextArea" autocomplete="off"  required="required" class="mainBorder Ticketform roundAll4 fontMain" style="padding:2px;width:100%;height:100%"></textarea>
								</div>
								<INPUT type="hidden" id="replyuserid" name="user_id" value="{$user_id}">
								<INPUT type="hidden" id="replyticketid" name="ticket_id"  value="" >
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