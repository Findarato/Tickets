<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
        <meta name="description" content="La Porte County Public Library Ticket tracking system">
        <meta name="author" content="Joseph Harry">
        <meta name="viewport" content="width=device-width; initial-scale=1.0; maximum-scale=1.0;">
        <title>Tickets - The tracking system</title>
        <link rel="stylesheet" href="/css/resetStyle.css?v=1">
        
        <link href='http://fonts.googleapis.com/css?family=Snippet|Stardos+Stencil|Open+Sans+Condensed:300|Inconsolata|Ubuntu|Droid+Sans|Droid+Sans+Mono|Droid+Serif&v2' rel='stylesheet' type='text/css'>
        <link href='http://fonts.googleapis.com/css?family=Dancing+Script' rel='stylesheet' type='text/css' />
		<link href='http://fonts.googleapis.com/css?family=Buda:light' rel='stylesheet' type='text/css' />
		<link href='http://fonts.googleapis.com/css?family=Calligraffitti' rel='stylesheet' type='text/css' />
		<link href='/css/WebSymbols-Font-Pack/stylesheet.css' rel='stylesheet' type='text/css'>
		<link rel="stylesheet" type="text/css" href="/js/jquery-ui/css/redmond/jquery-ui-1.8.15.custom.css" rel="stylesheet" />	
        
        <link rel="stylesheet" id="themeCss" media="screen" href="/css/themes/default/style.css"/>
        <link rel="stylesheet" media="screen" href="/css/foundation.css?v=1"  />
        <link rel="stylesheet" media="screen and (max-width: 1024px) " href="/css/handheld.css?v=1"  />
        
        
        <link rel="shortcut icon" href="/bug.png">
        <link rel="apple-touch-icon" href="/bug.png">
        <link rel="icon" type="image/png" href="/bug.png" />
        <link id="rss1" href="ticketsrss.php?id={if isset($user_id)}{$user_id}){/if}" rel="alternate" title="Tickets involving you" type="application/rss+xml" />
        <link id="rss2" href="ticketsrss.php?id={if isset($user_id)}{$user_id}){/if}&bookmark=1" rel="alternate" title="Your Bookmarked Tickets" type="application/rss+xml" />
        <script type="text/javascript">
            var gaJsHost = (("https:" == document.location.protocol) ? "https://ssl." : "http://www.");
            document.write(unescape("%3Cscript src='" + gaJsHost + "google-analytics.com/ga.js' type='text/javascript'%3E%3C/script%3E"));
        </script>
        <script type="text/javascript">
            var pageTracker = _gat._getTracker("UA-8067208-4");
            pageTracker._trackPageview();
        </script>
        
        <script src="http://ajax.microsoft.com/ajax/jQuery/jquery-1.6.2.min.js"></script>
        
        <script src="http://cdn1.lapcat.org/js/RGraph/libraries/RGraph.common.core.js" ></script>
        <script src="http://cdn1.lapcat.org/js/RGraph/libraries/RGraph.bar.js" ></script>
		<script type="text/javascript" src="/js/modernizr.custom.43877.js"></script>
        <script src="/js/modules/display.js"></script>
        <script src="/js/tickets.js"></script>
        <script src="/js/globalFunctions.js"></script>
      </head>
    <body >
   
       {include file="header.tpl"}
       
        <div class="" style="display:table;width:100%">
            <div id="mainArea1 insideBorder" class="roundAll4"  style="min-height:400px;text-align:left;padding:0 5px 0 5px;margin-right:5px">
                <div style="width:100%;" class="roundBottom4" id="content">
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
        <div id="newsearchdialogTpl" class="ui-helper-hidden">
            {include file="search.tpl"}
        </div>
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
        {*
        <div id="notifyTpl" style="position:absolute" class="ui-helper-hidden">
            {include file="notify.tpl"}
        </div>
        
        <div id="statisticsTpl" style="position:absolute" class="ui-helper-hidden">
            {include file="statistics.tpl"}
        </div>
        *}
        <div id="notifyArea" style="width:0px;" class="">
        </div>
    </body>
</html>
