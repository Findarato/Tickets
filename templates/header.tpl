<header class="topHeader" style="background-color:#FFF;margin:0;padding:0;">
	<nav title="top Navagation" class="firstNav color1 " style="text-align: center;margin:0;margin-bottom:10px;top:0;left:0;height:79px">
		<div class="topNav " style="text-align:center;margin:0 auto;">
			<div class="td">
				<a href="/"><img src="images/tree.png" alt="Lpcpls" width="68px" height="75px" border="0" style="display:inline-block"></a>
			</div>
			<div class="td" style="position:relative;">
				<h1 style="overflow:hidden;"><a href="/" style="text-decoration: none;">La Porte County Public Library System</a></h1>
				<h3>learn, enrich, enjoy</h3>
			</div>
		</div>
		<div class="pageBranding color5Soft rotate45n">
			<a href="#updateNotes" id="ticketsBrand" title="Tickets Version:">Tickets</a>
			<div class="fontMain fakelink" style="width:auto;" id="updateNotesContainer" title="Update Notes">
				<span class="" id="UpdateNotes" style="display:none;"> <a class="fontMain fakelink " href="#updateNotes" > <span class="fontMain" id="Version">8.8.8.8</span> </a> </span>
			</div>
		</div>
	</nav>
	<div id="idBox" class="{if isset($firstname)}idBox ddBox{else}signInBox{/if}" style="display:block;width:auto;height:24px;vertical-algin:middle;z-index: 1000;position:absolute;top:3px;right:13px;padding-left:5px;">
		<!-- Start of User info -->
		<ul>
			<li>
				{if isset($firstname)} 
				<a class="right fontMain nolink" href="#userPage/" id="topperUserInfo" tabindex="0" style="font-size:16px;line-height:18px;text-decoration:none;vertical-align: middle"><span>{$firstname} {$lastname}</span> <img id="headerAvatar" class="headerAvatar" src="http://www.gravatar.com/avatar/{$gravatar}?s=24&d=monsterid&r=g"> </a>
				{else}
				<a class="right fontMain" href="#login" id="topperSignIn" style="font-size:16px;line-height:18px;text-decoration:none;vertical-align: middle">No User (Please Log in) </a>
				{/if}
					<!-- popup Userinfo box -->
				<ul class="downRightShadow roundAll8 dropDown" id="userPopup" >
					<li>
						<a class="ticket_button ticketSprite ticket fakelink" id=topperNew>New Ticket</a>
					</li>
					<li>
						<a class="nolink ticket_button ticketSprite user fontBold" href="#ticketList/sOpen">To Me</a>
					</li>
					<li>
						<a class="smallTicketL nolink ticket_button ticketSprite pencil fontBold" href="#ticketList/sAssigned">By Me</a>
					</li>
					<li>
						<a class="smallTicketL nolink ticket_button ticketSprite group fontBold" href="#ticketList/sOdepartment" id=toMyDepartment title="To My Dept.">To My Dep.</a>
					</li>
					<li>
						<a class="smallTicketL nolink ticket_button ticketSprite group fontBold" href="#ticketList/sAdepartment" id=byMyDepartment>By My Dep.</a>
					</li>
					<li>
						<a class="smallTicketL nolink ticket_button ticketSprite bookmarkOff fontBold" href="#ticketList/sFavorite"  style="opacity:1;">Bookmarks</a>
					</li>
					<li class="menuBottom">
						<div style="display:inline-block;text-align:left;width:50%;height:30px;"><a class="fakelink" id="popUpLogout" href="/">Log Out</a></div>
						<div style="display:inline-block;text-align:right;width:50%height:30px;"><a class="nolink fontMain" href="#userPage/" >Account Info</a></div>
					</li>
				</ul>
			</li>
			<li>
				<span data-icon="L" title="Search" alt="Search" style="cursor: pointer"></span>
			</li>
		</ul>
	</div>
	</div> <!-- End of User info -->
	<menu class="tabs" style="position:absolute;right:0px;z-index:102;width:110%;top:41px;">
		<ul class="tabrow">
			<li id="ticketTab" class="selected">
				<a class="ticket nolink fontMain" href="#ticketList/all_tickets" id="" style="padding-right:5px;width:auto;text-decoration:none;">Tickets</a>
			</li>
			<li id="searchTab">
				<a class="magnifier nolink fontMain" href="#search" id="" style="padding-right:5px;width:auto;text-decoration:none;">Adv. Search</a>
			</li>
			<li id="statsTab" >
				<a class="chart nolink fontMain" href="#stats" id="" style="padding-right:5px;width:auto;text-decoration:none;">Stats</a>
			</li>
			{if isset($permissions) && in_array_r("ADMIN",$permissions)}
			<li id="adminTab">
				<a class="warning nolink fontMain" href="#admin" id="" style="padding-right:5px;width:auto;text-decoration:none;">Admin</a>
			</li>
			{/if}
		</ul>
	</menu>	
</header>