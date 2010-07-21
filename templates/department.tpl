<div class="color-A-1 border-B-1 corners-bottom-2 corners-top-2" style="text-align:left;padding-left:3px;">
	<table width="100%">
		<tr>
			<td style="padding-right:5px;"><div class="font-X ticket_button ticket_sprite user">Current Department is:</div></td>
			<td><div><span id="userDepartmentName" class="font-D font-bold">{$departmentName}</span></div></td>
		</tr>
		<tr>
			<td style="padding-right:5px;"><div class="font-X ticket_button ticket_sprite department">Select your Department</div></td>
			<td><div><select class="" id="userDepartmentSelect"><option value=""></opton>{html_options options=$departmentList }</select></div></td>
		</tr>
		<tr>
			<td style="padding-right:5px;"><div class="font-X ticket_button ticket_sprite email">Follow your Department</div></td>
			<td><div><input class="" value="1" id="userDepartmentNotify" type="checkbox" checked="{$notifyCheck}"></div></td>
		</tr>
		<tr>
			<td style="padding-right:5px;"><div class="font-X ticket_button ticket_sprite email">Ticket Specific Email</div>	</td>
			<td>
				<div>
					<input class="" id="userSecondaryEmail" style="width:125px;" type="text" value="{$altEmail}">
					<div class="ticket_button ticket" id="depOk" style="display:none"></div>
					<div class="ticket_button error" id="depError" style="display:none"></div>
					<div class="cross" id="depCancel"style="cursor:pointer" ></div>
				</div>
				</td>
		</tr>
		<tr>
			<td ><div><a class="ticket_button ticket_sprite feed " id="rss1" href="ticketsrss.php?id={$user_id}" title="Tickets involving you">Tickets involving you</a></div></td>
			<td ><div><a class="ticket_button ticket_sprite feed " id="rss2" href="ticketsrss.php?id={$user_id}&bookmark=1" title="Your Bookmarked Tickets">Your Bookmarked Tickets</a></div></td>
		</tr>
	</table>
</div>