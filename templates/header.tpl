<div class="fontMain" style="width:100%;padding:0px 0px 4px 0;position:relative;text-align:right;" id="topper" title="Header of document">
	<div class="" id="areaBar" style="width:100%;display:block">
		<div style="display:table;width:100%;text-align:right;">
			<div class="border-bottom-Main-1" style="display:table-cell;height:auto;width:250px;text-align:left"> <!-- Logo stuff -->
				<div style="height:30px;display:inline-block">
					<a class="left fakelink ticket_link" href="#start" style="margin-left:5px;">
						<img src="http://tickets.lapcat.org/css/tree.svg" style="border:none;height:40px;width:40px;">
						
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
					<a class="ticket_button ticket_sprite ticket nolink fontMain" href="#ticketList/all_tickets" id="" style="padding-right:5px;width:auto;text-decoration:none;"><span>Tickets</span></a>
				</div>
			</div>	
			<div style="display:table-cell;width:30px;height:auto;vertical-algin:top;position:relative;"><!-- Start of Tab 2 -->
				<div id="bugTab" class="tab border-bottom-Main-1 roundTop4">
					<a class=" ticket_button ticket_sprite bug nolink fontMain " href="#bugs" id="" style="padding-right:5px;width:auto;text-decoration:none;"><span>Bugs</span></a>
				</div>
			</div>	
			<div style="display:table-cell;width:30px;height:auto;vertical-algin:top;position:relative;"><!-- Start of Tab 3 -->
				<div id="searchTab" class="tab border-bottom-Main-1 roundTop4">
					<a class=" ticket_button ticket_sprite magnifier nolink fontMain" href="#search" id="" style="padding-right:5px;width:auto;text-decoration:none;"><span>Search</span></a>
				</div>
			</div>
			<div style="display:table-cell;width:30px;height:auto;vertical-algin:top;position:relative;"><!-- Start of Tab 4 -->
				<div id="statsTab" class="tab border-bottom-Main-1 roundTop4">
					<a class=" ticket_button ticket_sprite chart nolink fontMain" href="#stats" id="" style="padding-right:5px;width:auto;text-decoration:none;"><span>Stats</span></a>
				</div>
			</div>				
			<div class="border-bottom-Main-1" style="display:table-cell;width:auto;height:auto;vertical-algin:top"><!-- Start of User info -->
				{if isset($firstname)}
				<a class="right ticket_button ticket_sprite user nolink fontMain" href="#userPage/" id="topperUserInfo" style="padding-right:5px;width:auto;text-decoration:none;">{$firstname} {$lastname} ({$username})</a>
				{else}
				<a class="right ticket_button ticket_sprite user nolink fontMain" href="#login" id="topperUserInfo" style="padding-right:5px;width:auto;text-decoration:none;">No User (Please Log in) </a>
				{/if}
			</div>	<!-- End of User info -->
		</div>		
	</div>	
	<div class="WhitetoLightOff border-bottom-Main-1" id="subAreaBar" style="width:100%;height:30px;display:block">
		
	</div>	
</div>