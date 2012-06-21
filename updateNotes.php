<?Php
include "../header.php";
$blankPage = $smarty -> createTemplate("blank.tpl");
$blankPage = Tcode($blankPage -> Fetch());
echo $blankPage;
?>

		  <div style="position:absolute;top:100px;right:20px">
		    <a href="http://www.w3.org/html/logo/" title="Link to HTML5 logo">
        	  <img src="http://www.w3.org/html/logo/badge/html5-badge-h-css3-performance-semantics-storage.png" width="115" height="32" alt="HTML5 Powered with CSS3 / Styling, Performance &amp; Integration, Semantics, and Offline &amp; Storage" title="HTML5 Powered with CSS3 / Styling, Performance &amp; Integration, Semantics, and Offline &amp; Storage">
       		 </a>
		  </div>
