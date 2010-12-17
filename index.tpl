<!DOCTYPE html>
<html style:"width:100%">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
        <meta name="description" content="La Porte County Public Library Ticket tracking system">
        <meta name="author" content="Joseph Harry">
        <meta name="viewport" content="width=device-width; initial-scale=1.0; maximum-scale=1.0;">
        <title>Tickets - The tracking system</title>
        <link href='http://fonts.googleapis.com/css?family=Cantarell' rel='stylesheet' type='text/css'>
        <link rel="stylesheet" href="css/resetStyle.css?v=1">
        <link id="themegencss" href="http://dev.lapcat.org/lapcat/css/themes/theme-generator.php?theme=&hsl&update" rel="stylesheet" />
        <link rel="stylesheet" media="handheld" href="css/handheld.css?v=1">
        <link rel="stylesheet" media="screen" href="css/tickets.css"  />
        <link rel="stylesheet" type="text/css" href="js/markitup/skins/markitup/style.css" />
        <link rel="stylesheet" type="text/css" href="js/markitup/style.css" />
        <link rel="shortcut icon" href="/tickets/bug.png">
        <link rel="apple-touch-icon" href="/tickets/bug.png">
        <link rel="icon" type="image/png" href="/tickets/bug.png" />
        <link id="rss1" href="ticketsrss.php?id={$user_id}" rel="alternate" title="Tickets involving you" type="application/rss+xml" />
        <link id="rss2" href="ticketsrss.php?id={$user_id}&bookmark=1" rel="alternate" title="Your Bookmarked Tickets" type="application/rss+xml" />

        <link rel="icon" type="image/png" href="/tickets/bug.png" />
        <script type="text/javascript">
            var gaJsHost = (("https:" == document.location.protocol) ? "https://ssl." : "http://www.");
            document.write(unescape("%3Cscript src='" + gaJsHost + "google-analytics.com/ga.js' type='text/javascript'%3E%3C/script%3E"));
        </script>
        <script type="text/javascript">
            var pageTracker = _gat._getTracker("UA-8067208-4");
            pageTracker._trackPageview();
        </script>
        <script src="http://cdn1.lapcat.org/js/jquery-1.4.4.min.js"></script>
        <script src="http://dev.lapcat.org/dateter/dateter.min.js"></script>
        <script src="http://cdn1.lapcat.org/js/RGraph/libraries/RGraph.common.js" ></script>
        <script src="http://cdn1.lapcat.org/js/RGraph/libraries/RGraph.bar.js" ></script>
        <script src="http://cdn1.lapcat.org/js/RGraph/libraries/RGraph.line.js" ></script>
        <script src="js/combine.php"></script>
        <script>Params.UserId = {$user_id};Params.Locations = {$locationJSON}; </script>
    </head>
    <!--[if lt IE 7 ]> <body class="ie6"> <![endif]-->
    <!--[if IE 7 ]>    <body class="ie7"> <![endif]-->
    <!--[if IE 8 ]>    <body class="ie8"> <![endif]-->
    <!--[if IE 9 ]>    <body class="ie9"> <![endif]-->
    <!--[if (gt IE 9)|!(IE)]><!-->
    <body>
        <!--<![endif]-->
        <header class="header1" style="height:30px;margin-bottom:20px;">
            {include file="topper.tpl"}
        </header>
        <div class="" style="display:table;width:98%;">
            <aside id="sideArea1" class="corners-bottom-2 corners-top-2" style="display:table-cell;vertical-align:top;width:220px">
                {include file="navagation.tpl"}
                <br> {include file="bugs.tpl"}{*<!--<br><div id="droidId">Droid</div><br> {include file="stats.tpl"} <br> {include file="features.tpl"} <br> {include file="log.tpl"} -->*}
            </aside>
            <div id="mainArea1" class="corners-bottom-2 corners-top-2"  style="display:table-cell;text-align:left;">
                <div style="min-height:300px;width:100%;" class="corners-bottom-2 corners-top-2" id="content">
                    {include file="$content"}
                </div>
            </div>
        </div>
        <div id="newTicketdialogTpl" class="ui-helper-hidden" title="Create new ticket">
            {include file="new.tpl"}
        </div>
        <div id="newBugdialogTpl" class="ui-helper-hidden" title="Create new ticket">
            {include file="new_bug.tpl"}
        </div>
        {*
        <div id="newReplydialogTpl" class="ui-helper-hidden" title="Reply to Ticket">
            {include file="reply.tpl"}
        </div>
        *}
        <div id="newsearchdialogTpl" class="ui-helper-hidden">
            {include file="search.tpl"}
        </div>
        {*
        <div id="reassignTpl" class="ui-helper-hidden" title="Reassign Ticket">
            {include file="reassign.tpl"}
        </div>*}
        <div id="responsestpl" class="ui-helper-hidden">
            {include file="responses.tpl"}
        </div>
        <div id="ticketTpl" class="ui-helper-hidden">
            {include file="ticket.tpl"}
        </div>
        <div id="generic" class="ui-helper-hidden">
            {include file="generic.tpl"}
        </div>
        <div id="blankTpl" class="ui-helper-hidden">
            {include file="blank.tpl"}
        </div>
        <div id="notifyTpl" style="position:absolute" class="ui-helper-hidden">
            {include file="notify.tpl"}
        </div>
        <div id="statisticsTpl" style="position:absolute" class="ui-helper-hidden">
            {include file="statistics.tpl"}
        </div>
        <div id="notifyArea" style="width:0px;" class="">
        </div>
    </body>
</html>