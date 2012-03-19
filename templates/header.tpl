<header class="topHeader" style="background-color:#FFF;margin:0;padding:0;">
	<menu class="" style="position:absolute;top:36px;right:0px;z-index:102;width:110%;">
		<ul class="tabrow">
		    <li id="ticketTab" class="selected"><a class="ticket nolink fontMain" href="#ticketList/all_tickets" id="" style="padding-right:5px;width:auto;text-decoration:none;">Tickets</a></li>
		    <li id="searchTab"><a class="magnifier nolink fontMain" href="#search" id="" style="padding-right:5px;width:auto;text-decoration:none;">Adv. Search</a></li>
		    <li id="statsTab" ><a class="chart nolink fontMain" href="#stats" id="" style="padding-right:5px;width:auto;text-decoration:none;">Stats</a></li>
		    {if isset($permissions) && in_array_r("ADMIN",$permissions)}
		    <li id="adminTab"><a class="warning nolink fontMain" href="#admin" id="" style="padding-right:5px;width:auto;text-decoration:none;">Admin</a></li>
		    {/if}
		</ul>
	</menu>
	<nav title="top Navagation" class="firstNav color1 " style="text-align: center;margin:0;margin-bottom:10px;top:0;left:0;">
		<div class="topNav " style="text-align:center;margin:0 auto;">
			<div class="td">
				<a href="/"><img src="images/tree.png" alt="Lpcpls" width="68px" height="75px" border="0" style="display:inline-block"></a>
			</div>
			<div class="td" style="position:relative;">
				<h1><a href="/" style="text-decoration: none;">La Porte County Public Library System</a></h1>
				<h3>learn, enrich, enjoy</h3>
			</div>
		</div>
		<div class="pageBranding color5Soft rotate45n">
			<a href="#updateNotes" id="ticketsBrand" title="Tickets Version: ">Tickets</a>
			<div class="fontMain fakelink" style="width:auto;height:16px" id="updateNotesContainer" title="Update Notes">
				<span class="" id="UpdateNotes" style="display:none;"> <a class="fontMain fakelink " href="#updateNotes" > <span class="fontMain" id="Version">8.8.8.8</span> </a> </span>
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
	<div id="idBox" class="" style="display:block;width:auto;height:24px;;vertical-algin:middle;text-align: right;z-index: 1000;position:absolute;top:3px;right:13px;padding-left:5px;"><!-- Start of User info -->
			{if isset($firstname)}
			<a class="right nolink fontMain" href="#" id="topperUserInfo" style="font-size:16px;line-height:18px;text-decoration:none;vertical-align: middle">{$firstname} {$lastname}
				<img id="headerAvatar" src="http://www.gravatar.com/avatar/{$gravatar}?s=24&d=identicon&r=g" style="vertical-align:middle;height:24px;width:24px;border:none;">
			</a>
			{else}
			<a class="right fontMain" href="#login" id="topperUserInfo" style="font-size:16px;line-height:18px;text-decoration:none;vertical-align: middle">No User (Please Log in) </a>
			{/if}
			<span data-icon="L" title="Search" alt="Search" style="cursor: pointer"></span>
	</div>
	
	</div>	<!-- End of User info -->
</header>