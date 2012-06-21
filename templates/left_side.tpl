<!-- Tickets -->
<section class="" style="width:205px;margin-left:5px;">
	<div class="fontMain head message_head color-B-2 " style="">Tickets</div>
	<div style="position:relative;" class="message_body colorWhite-1 corners-bottom-2">
		<a class="smallTicketL nolink ticket_button ticketSprite user fontBold" href="#ticketList/sOpen">To Me</a>
		<span id="csOpen" class="timestamp" style="position:absolute;right:25px"></span>
		<br>
		<a class="smallTicketL nolink ticket_button ticketSprite pencil fontBold" href="#ticketList/sAssigned">By Me</a>
		<span id="csAssigned" class="timestamp " style="position:absolute;right:25px"></span>
		<br>
		<a class="smallTicketL nolink ticket_button ticketSprite users fontBold" href="#ticketList/sOdepartment" id="toMyDepartment">To My Dep.</a>
		<span id="csOdepartment" class="timestamp " style="position:absolute;right:25px"></span>
		<br>
		<a class="smallTicketL nolink ticket_button ticketSprite user--pencil fontBold" href="#ticketList/sAdepartment" id="byMyDepartment">By My Dep.</a>
		<span id="csAdepartment" class="timestamp " style="position:absolute;right:25px"></span
		><br>
		<a class="smallTicketL nolink ticket_button ticketSprite bookmark fontBold" href="#ticketList/sFavorite">Bookmarks</a>
		<span id="csFavorite" class="timestamp " style="position:absolute;right:25px"></span>
		<br>
		<a class="smallTicketL nolink ticket_button ticketSprite door fontBold" href="#ticketList/sClosed">My Closed</a>
		<span id="csClosed" class="timestamp " style="position:absolute;right:25px"></span>
		<br>
		<a class="smallTicketL nolink ticket_button ticketSprite door fontBold" href="#ticketList/closedDepartment">Dep. Closed</a>
		<span id="cclosedDepartment" class="timestamp " style="position:absolute;right:25px"></span>

    <br>
    <a class="smallTicketL nolink ticket_button ticketSprite chart fontBold" href="#stats">General Stats</a>
		<br>
		<br>
    <button class="fontMain fontBold minimal" id="topperNew" style="width:auto;padding:3px" title="Create a new Ticket">
      <span class="ticket_button ticketSprite ticket-plus"></span>
      <span>New Ticket</span>
    </button>
	</div>
</section>
<!-- Bugs -->
<section class="" style="width:205px;margin-left:5px;">
	<div class="fontBlack head message_head color-B-2  " style="">Bugs</div>
	<div style="position:relative;" class="message_body colorWhite-1 corners-bottom-2  ">
		<a class="smallTicketL nolink ticketSprite ticket_button bug fontBold" href="#ticketList/bugs_open">Open Bugs</a>
		<span id="cBugsOpen" class="timestamp" style="position:absolute;right:25px">0</span>
		<br>
		<a class="smallTicketL nolink ticketSprite ticket_button door fontBold" href="#ticketList/bugs_closed">Closed Bugs</a>
		<span id="cBugsClosed" class="timestamp" style="position:absolute;right:25px">0</span>
		<br>
		<br>
    <button class="fontMain fontBold minimal" id="topperNewBug" style="width:auto;padding:3px">
    <span class="ticket_button ticketSprite bug"></span>
    <span>New Bug</span>
    </button>
    <br>
	</div>
</section>