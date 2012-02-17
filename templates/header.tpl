{*
<div class="fontMain" style="width:100%;padding:0px 0px 4px 0;position:relative;text-align:right;" id="topper" title="Header of document">
	<div class="" id="areaBar" style="width:100%;display:block">
		<div style="display:table;width:100%;text-align:right;">
			<div class="border-bottom-Main-1" style="display:table-cell;height:auto;width:150px;text-align:left">
				<!-- Logo stuff -->
				<div style="height:30px;display:inline-block">
					<a class="left fakelink ticket_link" href="#start" style="margin-left:5px;"> <img src="/css/tree.png" style="border:none;height:40px;width:40px;"> </a>
				</div>
				<div style="width:auto;height:30px;display:inline-block;text-align:left;"></div>
			</div>
			<!-- End of logo Stuff -->
			<div class="border-bottom-Main-1" style="display:table-cell;width:auto;height:auto;vertical-algin:top;text-align: right">
				&nbsp;
			</div>
		</div>
	</div>
	<div class="WhitetoLightOff border-bottom-Main-1" style="width:100%;height:30px;display:table">
		<div id="subAreaBar" style="display:table-cell"></div>
		<div id="tldPageAnator"  style="display:table-cell;width:300px;"></div>
	</div>
</div>
*}
<header class="topHeader" style="background-color:#FFF;margin:0;padding:0;">
	<menu class="" style="position:absolute;top:53px;right:0px;z-index:102;width:100%;">
		<ul class="tabrow">
		    <li id="ticketTab" class="selected"><a class="ticket nolink fontMain" href="#ticketList/all_tickets" id="" style="padding-right:5px;width:auto;text-decoration:none;">Tickets</a></li>
		    {*<li id="searchTab"><a class="magnifier nolink fontMain" href="#search" id="" style="padding-right:5px;width:auto;text-decoration:none;">Search</a></li>*}
		    <li id="statsTab" ><a class="chart nolink fontMain" href="#stats" id="" style="padding-right:5px;width:auto;text-decoration:none;">Stats</a></li>
		    {if isset($permissions) && in_array_r("ADMIN",$permissions)}
		    <li><a class="warning nolink fontMain" href="#admin" id="" style="padding-right:5px;width:auto;text-decoration:none;">Admin</a></li>
		    {/if}
		</ul>
	</menu>
	<div class="pageBranding rotate45n color5 outSideBoxShadow">
		<div class="" style="height:16px;font-size: 13px;text-align:center;margin:2px;">Tickets</div>
		<div class="fontMain fakelink" style="width:auto;height:16px" id="updateNotesContainer" title="Update Notes">
			<span class="" id="UpdateNotes" style="display:none;"> <a class="fontMain fakelink " href="#updateNotes" > <span class="fontMain" id="Version">8.8.8.8</span> </a> </span>
		</div>	
	</div>
	<nav title="top Navagation" class="firstNav color1 " style="text-align: center;margin:0;margin-bottom:10px;top:0;left:0;">
		<div class="topNav " style="text-align:center;margin:0 auto;">
			<div class="td">
				<a href="/"><img src="images/tree.png" alt="Lpcpls" width="68px" height="75px" border="0" style="display:inline-block"></a>
			</div>
			<div class="td" style="position:relative;">
				<h1><a href="/">La Porte County Public Library System</a></h1>
				<h3>learn, enrich, enjoy</h3>
			</div>
		</div>
	</nav>

<menu class="smallShadow colorMain-2" id="userPopup" style="position:absolute;top:27px;right:13px;z-index:999;display:none;">
	<!-- popup Userinfo box -->
	<div style="padding:3px;width:250px;">
		<ul>
			<li style="padding:5px">
				<a class="ticket_button ticketSprite ticket fakelink" id=topperNew><span>New Ticket</span></a>
			</li>
			<li style="padding:5px">
				<a class="nolink ticket_button ticketSprite user fontBold" href="#ticketList/sOpen"><span>To Me</span></a>
			</li>
			<li style="padding:5px">
				<a class="smallTicketL nolink ticket_button ticketSprite pencil fontBold" href="#ticketList/sAssigned"><span>By Me</span></a>
			</li>
			<li style="padding:5px">
				<a class="smallTicketL nolink ticket_button ticketSprite group fontBold" href="#ticketList/sOdepartment" id=toMyDepartment title="To My Dept."><span>To My Dep.</span></a>
			</li>
			<li style="padding:5px">
				<a class="smallTicketL nolink ticket_button ticketSprite group fontBold" href="#ticketList/sAdepartment" id=byMyDepartment><span>By My Dep.</span></a>
			</li>
			<li style="padding:5px">
				<a class="smallTicketL nolink ticket_button ticketSprite bookmarkOff fontBold" href="#ticketList/sFavorite"  style="opacity:1;"><span>Bookmarks</span></a>
			</li>
			<li style="padding:5px">
				<a class="smallTicketL nolink ticket_button ticketSprite closed fontBold" href="#ticketList/sClosed"><span>My Closed</span></a>
			</li>
			<li style="padding:5px">
				<a class="smallTicketL nolink ticket_button ticketSprite closed fontBold" href="#ticketList/closedDepartment"><span>Dep. Closed</span></a>
			</li>
		</ul>
	</div>
	<div style="border-top:solid rgba(0,0,0,.3) 1px;width:250px;padding:3px;">
		<ul style="width:250px;">
			<li style="display:inline-block;float:left;margin:3px;padding:5px;">
				<a id="popUpLogout" class="fakelink" href="/">Log Out</a>
			</li>
			<li style="display:inline-block;float:right;margin:3px;padding:5px;">
				<a class="nolink fontMain" href="#userPage/">More Info</a>
			</li>
		</ul>
	</div>
</menu>
</header>