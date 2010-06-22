<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 1.0 Strict//EN"    "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">

<html style:"width:100%">
<head>
<title>Tickets - The tracking system</title>
<link id="nebulacss" type="text/css" href="/lapcat/css/nebula.css" rel="stylesheet" />
<link id="themegencss" type="text/css" href="/lapcat/css/themes/theme-generator.php?theme={$theme_id}&update&hsl" rel="stylesheet" />  
<link type="text/css" media="screen" rel="stylesheet" href="css/colorbox.css" />
<link type="text/css" href="css/tickets.css" rel="stylesheet"  />
<link href='http://fonts.googleapis.com/css?family=Droid+Serif' rel='stylesheet' type='text/css'>
	<meta http-equiv="X-UA-Compatible" content="IE=100" >
	<meta http-equiv="X-UA-Compatible" content="chrome=1">

<link rel="icon" type="image/png" href="/tickets/bug.png" /> 
{literal}
<script type="text/javascript">
	var gaJsHost = (("https:" == document.location.protocol) ? "https://ssl." : "http://www.");
	document.write(unescape("%3Cscript src='" + gaJsHost + "google-analytics.com/ga.js' type='text/javascript'%3E%3C/script%3E"));
</script>
<script type="text/javascript">
	var pageTracker = _gat._getTracker("UA-8067208-4");
	pageTracker._trackPageview();
</script>
{/literal}
<script type="text/javascript" src="http://cdn1.lapcat.org/js/jquery-1.4.1.min.js"></script>
<script type="text/javascript" src="http://dev.lapcat.org/dateter/dateter.min.js"></script>
<script type="text/javascript" src="js/combine.php"></script>
<script type="text/javascript" src="http://github.com/cowboy/jquery-hashchange/raw/v1.2/jquery.ba-hashchange.min.js"></script>

<link id="rss1" href="ticketsrss.php?id={$user_id}" rel="alternate" title="Tickets involving you" type="application/rss+xml" />
<link id="rss2" href="ticketsrss.php?id={$user_id}&bookmark=1" rel="alternate" title="Your Bookmarked Tickets" type="application/rss+xml" />

</head>
<body onResize="javascript:resize();"  style="width:100%;background-position:-9px -21px;" class="image-background color-B-1">
<div class="header1" style="">{include file="topper.tpl"}</div>
<div style="height:50px;"></div>
<div id="wrap" style="width:99%; padding:4px;position:relative;" class="">
	<div style="min-height:300px;position:absolute;top:3px;left:2px;width:200px;"  class="corners-bottom-2 corners-top-2">
		{include file="status.tpl"} <br> {include file="stats.tpl"}
	</div>
  	<div style="margin-left:210px;" class=" corners-bottom-2 corners-top-2">
	    <div style="min-height:300px;width:100%;" class="corners-bottom-2 corners-top-2" id="content">{include file="$content"}</div>
	</div>
</div>

<div id="newTicketdialogTpl" class="ui-helper-hidden" title="Create new ticket">{include file="new.tpl"}</div>
<div id="newReplydialogTpl" class="ui-helper-hidden" title="Reply to Ticket">{include file="reply.tpl"}</div>
<div id="newsearchdialogTpl" class="ui-helper-hidden">{include file="search.tpl"}</div>
<div id="reassignTpl" class="ui-helper-hidden" title="Reassign Ticket">{include file="reassign.tpl"}</div>
<div id="responsestpl" class="ui-helper-hidden">{include file="responses.tpl"}</div>
<div id="ticketTpl" class="ui-helper-hidden">{include file="ticket.tpl"}</div>
<div id="ticket_listTpl" class="ui-helper-hidden">{include file="ticket_list.tpl"}</div>

<div id="blankTpl" class="ui-helper-hidden">{include file="blank.tpl"}</div>
<div id="departmentTpl" class="ui-helper-hidden" style="z-index:50;">{include file="department.tpl"}</div>
<div id="notifyTpl" style="position:absolute" class="ui-helper-hidden">{include file="notify.tpl"}</div>
<div id="statisticsTpl" style="position:absolute" class="ui-helper-hidden">{include file="statistics.tpl"}</div>
<div id="storage" class="ui-helper-hidden"></div>
<div id="notifyArea" style="width:0px;" class=""></div>
<div id="statusBar" style="position:absolute;bottom:0;left:0;width:100%">{include file="status_bar.tpl"}</div>
</body>
</html>
