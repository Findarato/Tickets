<html>
	<head>
		<link id="nebulacss" type="text/css" href="http://www.lapcat.org/lapcat/css/nebula.css" rel="stylesheet" />
		<link id="themegencss" type="text/css" href="http://www.lapcat.org/lapcat/css/themes/theme-generator.php?theme=9" rel="stylesheet" /> 
		<link id="ticketcss" type="text/css" href="http://www.lapcat.org/tickets/css/tickets.css" rel="stylesheet" />
	</head>

<body class="image-background color-background">
<table cellpadding="0" cellspacing="0" style="width:100%" border="0">
	<tr>
		<td style="width:300px;vertical-align:top;padding-right:1px;" class="">
			<div id="ticketarea" class="ui-corner-top ui-corner-bottom">
			    <div class="ui-corner-all dark border-main-1" style="text-align:left;text-align:left;margin:4px;padding:2px;height:20px;position:relative"><font style="margin-left:10px;margin:5px;" id="ticketTitle"><a class="ticket_link" href="http://www.lapcat.org/tickets/#ticket/{$email_ticket_id}">{$email_title}</a></font>
				<div id="ticketStatusImage" style="position:absolute ;right: 10px;top: 2px;height:13px;">
					<img class="smallimage" src="http://cdn1.lapcat.org/famfamfam/silk/pencil.png" style="display:none" id="imgEdited" title="Edited"><img class="smallimage" src="http://cdn1.lapcat.org/famfamfam/silk/user_edit.png" style="display:none" id="imgReassigned" title="Reassigned"><img class="smallimage" src="http://cdn1.lapcat.org/famfamfam/silk/door.png" style="display:none" id="imgClosed" title="Closed"><img class="smallimage" src="http://cdn1.lapcat.org/famfamfam/silk/tick.png" style="display:none" id="imgBookmark" title="Bookmarked"><img class="smallimage" src="http://cdn1.lapcat.org/famfamfam/silk/brick.png" style="display:none" id="imgBlocked" title="Blocked"><img class="smallimage" src="http://cdn1.lapcat.org/famfamfam/silk/attach.png" style="display:none" id="imgAttachment" title="Attachment">
				</div>
				</div>
					<div class="color-heavy dark ui-corner-all border-main-1" id="ticket" style="padding:2px;margin:4px">
						<div style="width:100%;text-align:top;" class="">
							<table>
								<tr>
									<td ><font class="" style="font-weight:bold;">Ticket ID: </font><a class="ticket_link" href="http://www.lapcat.org/tickets/#ticket/{$email_ticket_id}">{$email_ticket_id}</a></td>
								</tr>
								<tr>
									<td ><font class="" style="font-weight:bold;">Opened On: </font><font class="" id="ticketDate">{$email_created_on}</font></td>
								</tr>
								<tr>
									<td ><font class="" style="font-weight:bold;">Due On:</font><font class="" id="ticketDueDate">{$email_due_on}</font</td>
								</tr>
								<tr>
									<td ><font class="" style="font-weight:bold;">Category: </font><font class="category_link " id="ticketCategory">{$email_category}</font></td>
								</tr>
								<tr>
									<td ><font class="" style="font-weight:bold;">Created By: </font><font class=" user" id="ticketCreatedBy">{$email_created_by}</font></td>
								</tr>
								<tr>
									<td ><font class="" style="font-weight:bold;">Assigned To: </font><font class=" user" id="ticketCreatedBy">{$email_assigned_to}</font></td>
								</tr>
								<tr>
									<td ><font class="" style="font-weight:bold;">Priority: </font><font class="" id="ticketPriority">{$email_priority}</font></td>
								</tr>
								<tr>
									<td ><font class="" style="font-weight:bold;">Location: </font<font class=" library-link" id="ticketLocation">{$email_location}</font></td>
								</tr>
								<tr>
									<td ><font class="" style="">{$email_description}</font></td>
								</tr>
							</table>
					    </div>
				    </div> 
				</div>
				<div class="ui-corner-all dark border-main-1" style="text-align:left;margin:4px;padding:2px;height:20px;position:relative"><font style="margin-left:10px;margin:5px;" id="ticketTitle">Latest Reply</font></div>
				<div class="color-heavy ui-corner-all dark border-main-1" style="overflow:hidden;text-align:left;padding:2px;margin:4px;" id="changemeColor">
				<table style="width:100%">
					<tr>
						<td class="" style="text-align:left;vertical-align:top;"><font class="" style="font-weight:bold;">Name:</font> {$respon.firstname} {$respon.lastname}</td>
					</tr>
					<tr>
						<td class="" style="text-align:left;vertical-align:top;"><font class="" style="font-weight:bold;">Title:</font> {$respon.subject}</td>
					</tr>
					<tr>
						<td class="" style="text-align:left;vertical-align:top"><font class="" style="font-weight:bold;">Date:</font> {$respon.date|date_format:"%Y/%m/%d"}</td>
					</tr>					
					<tr>
						<td class="" style="text-align:left;vertical-align:top;">{$respon.body}</td>
					</tr>
				</table>
				</div>
			</div>
		</td>
	</tr>
</table>
	</body>
	</html>