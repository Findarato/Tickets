<!DOCTYPE html>

<html style:"width:100%">
<head>
<title>Tickets - The tracking system</title>
<link href='http://fonts.googleapis.com/css?family=Cantarell' rel='stylesheet' type='text/css'>
<link id="themegencss" href="/lapcat/css/themes/theme-generator.php?theme={$theme_id}&hsl" rel="stylesheet" />  
<link rel="stylesheet" media="screen" href="css/tickets.css"  />
<link rel="stylesheet" media="screen" rel="stylesheet" href="css/colorbox.css" />


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
<script src="http://cdn1.lapcat.org/js/jquery-1.4.1.min.js"></script>
<script src="http://dev.lapcat.org/dateter/dateter.min.js"></script>
<script src="http://cdn1.lapcat.org/js/RGraph/libraries/RGraph.common.js" ></script>
<script src="http://cdn1.lapcat.org/js/RGraph/libraries/RGraph.bar.js" ></script>
<script src="http://cdn1.lapcat.org/js/RGraph/libraries/RGraph.line.js" ></script>
<script src="js/combine.php"></script>

<link id="rss1" href="ticketsrss.php?id={$user_id}" rel="alternate" title="Tickets involving you" type="application/rss+xml" />
<link id="rss2" href="ticketsrss.php?id={$user_id}&bookmark=1" rel="alternate" title="Your Bookmarked Tickets" type="application/rss+xml" />

</head>
<body onResize="javascript:resize();"  class="image-background color-B-1" style="overflow-y:auto;overflow-x:hidden">
<div class="header1" style="overflow:hidden;height:30px">{include file="topper.tpl"}</div>
<div id="headerPadding" style="height:50px;"></div>
<div id="wrap" style="width:98%; padding:4px;position:relative;" class="">
	<div id="sideArea" class="corners-bottom-2 corners-top-2">
		{include file="navagation.tpl"} <br> {include file="bugs.tpl"}<br><div id="droidId">Droid</div><!--<br> {include file="stats.tpl"} <br> {include file="features.tpl"} <br> {include file="log.tpl"} -->
	</div>
  	<div id="mainArea" class=" corners-bottom-2 corners-top-2">
	    <div style="min-height:300px;width:100%;" class="corners-bottom-2 corners-top-2" id="content">{include file="$content"}</div>
	   
	</div>
</div>


<div id="newTicketdialogTpl" class="ui-helper-hidden" title="Create new ticket">{include file="new.tpl"}</div>
<div id="newBugdialogTpl" class="ui-helper-hidden" title="Create new ticket">{include file="new_bug.tpl"}</div>
<div id="newReplydialogTpl" class="ui-helper-hidden" title="Reply to Ticket">{include file="reply.tpl"}</div>
<div id="newsearchdialogTpl" class="ui-helper-hidden">{include file="search.tpl"}</div>
<div id="reassignTpl" class="ui-helper-hidden" title="Reassign Ticket">{include file="reassign.tpl"}</div>
<div id="responsestpl" class="ui-helper-hidden">{include file="responses.tpl"}</div>
<div id="ticketTpl" class="ui-helper-hidden">{include file="ticket.tpl"}</div>
<div id="generic" class="ui-helper-hidden">{include file="generic.tpl"}</div>

<div id="blankTpl" class="ui-helper-hidden">{include file="blank.tpl"}</div>
<div id="notifyTpl" style="position:absolute" class="ui-helper-hidden">{include file="notify.tpl"}</div>
<div id="statisticsTpl" style="position:absolute" class="ui-helper-hidden">{include file="statistics.tpl"}</div>
<div id="notifyArea" style="width:0px;" class=""></div>
</body>
</html>
