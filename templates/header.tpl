<div class="fontMain" style="width:100%;padding:0px 0px 4px 0;position:relative;text-align:right;" id="topper" title="Header of document">
	<div class="" id="areaBar" style="width:100%;display:block">
		<div style="display:table;width:100%;text-align:right;">
			<div class="border-bottom-Main-1" style="display:table-cell;height:auto;width:150px;text-align:left"> <!-- Logo stuff -->
				<div style="height:30px;display:inline-block">
					<a class="left fakelink ticket_link" href="#start" style="margin-left:5px;">
						<img src="/css/tree.png" style="border:none;height:40px;width:40px;">
					</a>
				</div>
				<div style="width:auto;height:30px;display:inline-block;text-align:left;">
					<div class="" style="width:auto;height:16px;font-size: 16px">Tickets</div>
					<div class="fontMain fakelink" style="width:auto;height:16px" id="updateNotesContainer" title="Update Notes">
						<span class="" id="UpdateNotes">
							<a class="fontMain fakelink " href="#updateNotes" >
							<span class="fontMain" id="Version">8.8.8.8</span>
							</a>
						</span>
					</div>
				</div>
			</div> <!-- End of logo Stuff -->
			<div style="display:table-cell;width:30px;height:auto;vertical-algin:top;position:relative;"><!-- Start of Tab 1 -->
				<div id="ticketTab" class="tab border-bottom-Main-1 roundTop4" >
					<a class="ticket_button ticketSprite ticket nolink fontMain" href="#ticketList/all_tickets" id="" style="padding-right:5px;width:auto;text-decoration:none;"><span>Tickets</span></a>
				</div>
			</div>	
			<div style="display:table-cell;width:30px;height:auto;vertical-algin:top;position:relative;"><!-- Start of Tab 2 -->
				<div id="bugTab" class="tab border-bottom-Main-1 roundTop4">
					<a class=" ticket_button ticketSprite bug nolink fontMain " href="#bugs" id="" style="padding-right:5px;width:auto;text-decoration:none;"><span>Bugs</span></a>
				</div>
			</div>	
			<div style="display:table-cell;width:30px;height:auto;vertical-algin:top;position:relative;"><!-- Start of Tab 3 -->
				<div id="searchTab" class="tab border-bottom-Main-1 roundTop4">
					<a class=" ticket_button ticketSprite magnifier nolink fontMain" href="#search" id="" style="padding-right:5px;width:auto;text-decoration:none;"><span>Search</span></a>
				</div>
			</div>
			<div style="display:table-cell;width:30px;height:auto;vertical-algin:top;position:relative;"><!-- Start of Tab 4 -->
				<div id="statsTab" class="tab border-bottom-Main-1 roundTop4">
					<a class=" ticket_button ticketSprite chart nolink fontMain" href="#stats" id="" style="padding-right:5px;width:auto;text-decoration:none;"><span>Stats</span></a>
				</div>
			</div>				
			<div style="display:table-cell;width:30px;height:auto;vertical-algin:top;position:relative;"><!-- Start of Tab 5 -->
				<div id="adminTab" class="tab border-bottom-Main-1 roundTop4">
					<a class=" ticket_button ticketSprite fire nolink fontMain" href="#admin" id="" style="padding-right:5px;width:auto;text-decoration:none;"><span>Admin</span></a>
				</div>
			</div>	
			<div class="border-bottom-Main-1" style="display:table-cell;width:auto;height:auto;vertical-algin:top;text-align: right">&nbsp;</div>
		</div>		
	</div>	
	<div class="WhitetoLightOff border-bottom-Main-1" style="width:100%;height:30px;display:table">
		<div id="subAreaBar" style="display:table-cell"></div>
		<div id="tldPageAnator"  style="display:table-cell;width:300px;"></div>
	</div>	
</div>
	<div id="idBox" class="" style="display:block;width:auto;height:24px;;vertical-algin:middle;text-align: right;z-index: 1000;position:absolute;top:3px;right:13px;padding-left:5px;"><!-- Start of User info -->
			{if isset($firstname)}
			<a class="right nolink fontMain" href="#" id="topperUserInfo" style="font-size:16px;line-height:18px;text-decoration:none;vertical-align: middle">{$firstname} {$lastname}
				<img id="headerAvatar" src="http://www.gravatar.com/avatar/{$gravatar}?s=24&d=identicon&r=g" style="vertical-align:middle;height:24px;width:24px;border:none;">
			</a>
			{else}
			<a class="right nolink fontMain" href="#login" id="topperUserInfo" style="font-size:16px;line-height:18px;text-decoration:none;vertical-align: middle">No User (Please Log in) </a>
			{/if}
		</div>
	</div>	<!-- End of User info -->
	
	<div class="smallShadow colorMain-2" id="userPopup" style="position:absolute;top:27px;right:13px;z-index:999;display:none;"> <!-- popup Userinfo box -->
		<div style="padding:3px;width:250px;">
			<ul>
				<li style="padding:5px"><a class="ticket_button ticketSprite ticket-plus fakelink" id=topperNew><span>New Ticket</span></a></li>
				<li style="padding:5px"><a class="nolink ticket_button ticketSprite user fontBold" href="#ticketList/sOpen"><span>To Me</span></a></li>
				<li style="padding:5px"><a class="smallTicketL nolink ticket_button ticketSprite pencil fontBold" href="#ticketList/sAssigned"><span>By Me</span></a></li>
				<li style="padding:5px"><a class="smallTicketL nolink ticket_button ticketSprite users fontBold" href="#ticketList/sOdepartment" id=toMyDepartment title="To My Dept."><span>To My Dep.</span></a></li>
				<li style="padding:5px"><a class="smallTicketL nolink ticket_button ticketSprite user--pencil fontBold" href="#ticketList/sAdepartment" id=byMyDepartment><span>By My Dep.</span></a></li>
				<li style="padding:5px"><a class="smallTicketL nolink ticket_button ticketSprite bookmark fontBold" href="#ticketList/sFavorite"><span>Bookmarks</span></a></li>
				<li style="padding:5px"><a class="smallTicketL nolink ticket_button ticketSprite door fontBold" href="#ticketList/sClosed"><span>My Closed</span></a></li>
				<li style="padding:5px"><a class="smallTicketL nolink ticket_button ticketSprite door fontBold" href="#ticketList/closedDepartment"><span>Dep. Closed</span></a></li>
			</ul>
		</div>
		<div style="border-top:solid rgba(0,0,0,.3) 1px;width:250px;padding:3px;">
			<ul style="width:250px;">
				<li style="display:inline-block;float:left;margin:3px;"><a class="nolink fontMain" href="#userPage/">More Info</a></li>
				<li style="display:inline-block;float:right;margin:3px;"><a id="popUpLogout" class="fakelink" href="/">Log Out</a></li>
			</ul>
		</div>
	</div>