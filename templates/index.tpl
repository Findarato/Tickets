<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="description" content="La Porte County Public Library Ticket tracking system">
    <meta name="author" content="Joseph Harry">
    <meta name="viewport" content="width=device-width; initial-scale=1.0; maximum-scale=1.0;">
    <title>Tickets - The tracking system</title>
    <link href='http://fonts.googleapis.com/css?family=Dancing+Script|Buda:300|Overlock' rel='stylesheet' type='text/css'>
    <link href='/css/WebSymbols-Font-Pack/stylesheet.css' rel='stylesheet' type='text/css'>
    <link rel="stylesheet" type="text/css" href="/js/jquery-ui/css/smoothness/jquery-ui-1.8.18.custom.css" rel="stylesheet" />

    <link rel="stylesheet" media="screen" href="/css/foundation.css?v=2"/>
    <link rel="stylesheet/less" id="themeCss" href="/css/themes/default/less/style.less"/>
    <link rel="stylesheet" media="screen and (max-width: 1024px) " href="/css/handheld.css?v=2"/>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js"></script>
    <script type="text/javascript" src="/js/modernizr.custom.04865.js"></script>
    <script src="/js/libs/less-1.3.0.min.js"></script>
        
    <link rel="shortcut icon" href="/bug.png">
    <link rel="apple-touch-icon" href="/bug.png">
    <link rel="icon" type="image/png" href="/bug.png" />
    <script type="text/javascript">
		var gaJsHost = (("https:" == document.location.protocol) ? "https://ssl." : "http://www.");
		document.write(unescape("%3Cscript src='" + gaJsHost + "google-analytics.com/ga.js' type='text/javascript'%3E%3C/script%3E"));
    </script>
    <script type="text/javascript">
		var pageTracker = _gat._getTracker("UA-8067208-4");
		pageTracker._trackPageview();
    </script>
  </head>
  <body>
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
    <div id="notifyArea" style="width:0px;" class=""></div>
    <script src="http://cdn1.lapcat.org/js/RGraph/libraries/RGraph.common.core.js" ></script>
    <script src="http://cdn1.lapcat.org/js/RGraph/libraries/RGraph.bar.js" ></script>
    <script src="/js/modules/display.js?v=XXVI"></script>
    <script src="/js/tickets.js?v=XXVI"></script>
    <script src="/js/modules/admin.js?v=XX"></script>
    <script src="/js/globalFunctions.js"></script>
  </body>
</html>
