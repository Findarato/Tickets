<html>
	<head>
		<style>{$styleCode}</style>
	</head>
	<body class="image-background color-background">
		{$debug}
		<table cellpadding="0" cellspacing="0" style="width:100%" border="0">
			<tr>
				<td style="width:50%;vertical-align:top;padding-right:1px;" class=""><!--Ticket -->
					<div id="ticketarea" style="width:100%;">
						<div class="corners-bottom-2 corners-top-2 small-shadow-black-1" style="vertical-align:top;margin-right:5px;">
							<div class="droidSerif font-X head message_head corners-top-2 color-B-2 border-all-B-1" id="ticketTitlearea" style="position:relative;height:16px;">
								<div class="font-X" id="ticketTitle"><a class="ticket_link" href="http://www.lapcat.org/tickets/#ticket/{$email_ticket_id}">{$email_title}</a></div>
							</div>
							<div class="droidSerif color-X-1 " id="ticket" style="position:relative;height:430px;width:auto;padding:3px" ><!-- Ticket Body -->
								<div style="clear:both">
							       	<div class="left " style="font-weight:bold;padding-left:2px;padding-right:3px" ><font class="">Ticket ID:</font></div>
							       	<div class="left "><a class="" href="http://www.lapcat.org/tickets/#ticket/{$email_ticket_id}">{$email_ticket_id}</a></div>
						        </div>
						        <div style="clear:both">
							       	<div class="left " style="font-weight:bold;padding-left:2px;padding-right:3px" ><font class="">Opened On</font></div>
							       	<div class="left "><font id="">{$email_created_on|date_format:"%m/%d/%Y %H:%M"}</font></div>
						        </div>
						        <div style="clear:both">
							       	<div class="left " style="font-weight:bold;padding-left:2px;padding-right:3px" ><font class="">Due On</font></div>
							       	<div class="left "><font id="">{$email_due_on|date_format:"%m/%d/%Y %H:%M"}</font></div>
						        </div> 
						        <div style="clear:both">
							       	<div class="left " style="font-weight:bold;padding-left:2px;padding-right:3px"><font class="">Category</font></div>
							       	<div class="left "><span class="category_link " id="">{$email_category}</span></div>
						        </div>
						        <div style="clear:both">
							       	<div class="left " style="font-weight:bold;padding-left:2px;padding-right:3px"><font class="">Created By</font></div>
							       	<div class="left "><span class=" user" id="">{$email_created_by}</span></div>
						       </div>
								<div style="clear:both">
							       	<div class="left" style="font-weight:bold;padding-left:2px;padding-right:3px"><font class="">Assigned To</font></div>
							       	<div class="left" ><span class=" user" id="">{$email_assigned_to}</span></div>
						       </div> 
								<div style="clear:both">
							       	<div class="left" style="font-weight:bold;padding-left:2px;padding-right:3px"><font class="">Priority</font></div>
							       	<div class="left" ><span class="" id="">{$email_priority}</span></div>
								</div>
								<div style="clear:both">
							       	<div class="left" style="font-weight:bold;padding-left:2px;padding-right:3px"><font class="">Location</font></div>
							       	<div class="left" ><span class=" library-link" id="">{$email_location}</span></div>
								</div>
								<div id="" style="padding-left:2px;position:relative;margin-bottom:5px;width:100%;height:285px;overflow:auto;vertical-align:top; clear:both">
									<span class="" style="">{$email_description}</span>
								</div>
							</div>
						</div>
					</div>
				</td>
				<td>
					<td style="width:50%;vertical-align:top;padding-right:1px;" class=""> <!--Response -->
					<div id="ticketarea" style="width:100%;">
						<div class="corners-bottom-2 corners-top-2 small-shadow-black-1" style="vertical-align:top;margin-right:5px;">
							<div class="droidSerif font-X head message_head corners-top-2 color-B-2 border-all-B-1" id="ticketTitlearea" style="position:relative;height:16px;">
								<div class="font-X" id="ticketTitle"><span class="" style="font-weight:bold;">Title:</span> {$respon.subject}</span></div>
							</div>
							<div class="droidSerif color-X-1 " id="ticket" style="position:relative;height:430px;width:auto;padding:3px" ><!-- Response Body -->
						        <div style="clear:both">
							       	<div class="left " style="font-weight:bold;padding-left:2px;padding-right:3px" ><font class="">Name:</font></div>
							       	<div class="left "><font >{$respon.firstname} {$respon.lastname}</font></div>
						        </div>
						        <div style="clear:both">
							       	<div class="left " style="font-weight:bold;padding-left:2px;padding-right:3px" ><font class="">Posted On</font></div>
							       	<div class="left "><span class="" style="font-weight:bold;">Date:</span> {$respon.date|date_format:"%m/%d/%Y %H:%M"}</span></div>
						        </div>
								<div id="ticketDataBox" style="padding-left:2px;position:relative;margin-bottom:5px;width:100%;height:285px;overflow:auto;vertical-align:top; clear:both">
									<span class="" style="">{$respon.body}</span>
								</div>
							</div>
						</div>
					</div>
				</td>
			</tr>
		</table>
	</body>
</html>