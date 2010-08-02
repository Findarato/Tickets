<div class="color-A-1 border-B-1 corners-bottom-2 small-shadow-black-1" style="text-align:left;padding-left:3px;">
	<div class="t" style="width:100%">
		<div class="tr">
			<div class="td" style="width:200px;">
				<div class="font-Y ticket_button ticket_sprite user" style="font-size:10px;width:auto;">Current Department is:</div>
			</div>
			<div class="td">
				<div><span id="userDepartmentName" class="font-D font-bold">{$departmentName}</span></div>
			</div>
		</div>
		<div class="tr">
			<div class="td" style="width:200px;">
				<div class="font-X ticket_button ticket_sprite department">Select your Department</div>
			</div>
			<div class="td">
				<div><select class="" id="userDepartmentSelect"><option value=""></opton>{html_options options=$departmentList }</select></div>
			</div>			
		</div>
		<div class="tr">
			<div class="td" style="width:200px;">
				<div class="font-X ticket_button ticket_sprite email">Follow your Department</div>
			</div>
			<div class="td">
				<div><input class="" value="1" id="userDepartmentNotify" type="checkbox" checked="{$notifyCheck}"></div>
			</div>			
		</div>
		<div class="tr">
			<div class="td" style="width:200px;">
				<div class="font-X ticket_button ticket_sprite mail" style="width:auto;">Ticket Specific Email</div
			</div>
			<div class="td">
				<div>
					<input class="" id="userSecondaryEmail" style="width:125px;" type="email" value="{$altEmail}">
					<div class="ticket_button ticket" id="depOk" style="display:none"></div>
					<div class="ticket_button error" id="depError" style="display:none"></div>
					<div class="cross" id="depCancel"style="cursor:pointer" ></div>
				</div>
			</div>			
		</div>
		<div class="tr">
			<div class="td" style="width:100%;">
				<a class="ticket_button ticket_sprite feed " id="rss1" href="ticketsrss.php?id={$user_id}" title="Tickets involving you">My Tickets</a>
				<a class="ticket_button ticket_sprite feed " id="rss2" href="ticketsrss.php?id={$user_id}&bookmark=1" title="Your Bookmarked Tickets">My Bookmarks</a>
			</div>			
		</div>		
			
	</div>
</div>