<div class="corners-bottom-2 corners-top-2 small-shadow-black-1" style="width:auto;margin-left:5px;" title="Update Notes">
	<div class="droidSerif font-X head message_head roundTop4 color-B-2 border-all-B-1" id="" style="">Update Notes</div>
	<div class="droidSerif message_body colorWhite-1 corners-bottom-2" id="" >
		<div class="corners-bottom-2 corners-top-2 border-all-B-1" style="text-align:left;text-align:left;margin:4px;padding:2px;height:auto;position:relative">
			Thank you for logging into tickets. Click on a ticket from the list on the left, or create a new ticket above.
    		<br>
			<span> More detailed update notes can be found <a class="ticket_sprite global_link ticket_button" href="http://forum.lapcat.org/viewforum.php?f=66">On the forums</a> or On the <a class="ticket_sprite global_link ticket_button" href="http://auto.lapcat.org/wiki/Ticket_Update_Notes">Wiki</a></span>		
		</div>
		<div style="padding:5px;margin:5px; height:400px; overflow:auto;position:relative" class="roundAll4 border-all-A-1">
		  <div style="position:absolute;top:0px;right:20px">
		    <a href="http://www.w3.org/html/logo/" title="Link to HTML5 logo">
          <img src="http://www.w3.org/html/logo/badge/html5-badge-h-css3-performance-semantics-storage.png" width="115" height="32" alt="HTML5 Powered with CSS3 / Styling, Performance &amp; Integration, Semantics, and Offline &amp; Storage" title="HTML5 Powered with CSS3 / Styling, Performance &amp; Integration, Semantics, and Offline &amp; Storage">
        </a>
		  </div>
      <span style="font-size: 175%; line-height: normal;" id="newestVersion" title="Ticket Update Title">Live Ticket Update XXII (The its not dead Update)</span>
      <span style="font-size: 90%; line-height: normal;" id="version" title="Ticket Update version number">v.3.2.0.r314</span>
      <br><span style="font-size: 150%; line-height: normal;">Bug Fixes</span>
      <ol>
        <li>Fixed [bug=742].</li>
        <li>Fixed a regression that was causing some text to be white, thus making it un readable</li>
      </ol>
      <br>
      <span style="font-size: 150%; line-height: normal;">New Features</span>
      <ol>
        <li>Do to popular request after the add reply box is showing clicking on the "Add Reply" button will add the reply.  The green check mark still does the same thing, and will continue to.  This is just an added feature as many people were requesting.</li>
        <li>Tickets has been updated to work with the newest version of jQuery, 1.5.0.</li>
        <li>Tickets has been updated to work with the newest version of RGraph.</li>
      </ol>
      <br>
      <span style="font-size: 150%; line-height: normal;">Known Issues</span>
      <ol>
        <li>Searching By project does not work</li>
        <li><del>There are no page numbers, nor any way to show more then the default amount of tickets in the list view.</del></li>
        <li>There are some issues with editing that have been around since editing was in place.  All of the ticket code links are not working as intended with the new editing system.</li>
        <li><del>Closed tickets are not showing up for some people. Even though a number shows up next to Closed Tickets.</del></li>
      </ol>
      <br>
      <br>
      <span style="font-size: 175%; line-height: normal;" id="newestVersion">Live Ticket Update XXI</span>
      <span style="font-size: 90%; line-height: normal;" id="version">v.3.1.0.r314</span>
      <br><span style="font-size: 150%; line-height: normal;">Bug Fixes</span>
      <ol>
        <li>Fixed [bug=545].</li>
        <li>Fixed [bug=693].</li>
      </ol>
      <br>
      <span style="font-size: 150%; line-height: normal;">New Features</span>
      <ol>
        <li>Creating a new ticket, or a new bug report now shows up inside of the ticket display instead of as a popup.</li>
        <li>Adding a reply now follows the same look and feel of new tickets and bug reports.</li>
        <li>Closed tickets that are linked using the [ticket=###] link style will now look like [bug=693]<del><a class="bug_link ticket_button ticket_sprite" href="#ticket/693">#693</a></del></li>
      </ol>
      <br>
      <span style="font-size: 150%; line-height: normal;">Known Issues</span>
      <ol>
        <li>Searching By project does not work</li>
        <li>There are no page numbers, nor any way to show more then the default amount of tickets in the list view.</li>
        <li>There are some issues with editing that have been around since editing was in place.  All of the ticket code links are not working as intended with the new editing system.</li>
        <li>Closed tickets are not showing up for some people. Even though a number shows up next to Closed Tickets.</li>
      </ol>
      <br>
      <br>
      <span style="font-size: 175%; line-height: normal;" id="newestVersion">Live Ticket Update XX</span>
      <span style="font-size: 90%; line-height: normal;" id="version">v.3.0.0.r301</span>
      <br><span style="font-size: 150%; line-height: normal;">Bug Fixes</span>
      <ol>
        <li>Fixed [bug=595].</li>
        <li>Fixed [bug=583].</li>
        <li>Fixed [bug=602].</li>
        <li>Fixed [bug=604].</li>
        <li>Fixed [bug=605].</li>
        <li>Fixed a javascript uncaught TypeError bug that would happen when there were no responses on a ticket.</li>
      </ol>
      <br>
      <span style="font-size: 150%; line-height: normal;">New Features</span>
      <ol>
        <li>New tickets and new bugs are now closer linked to the areas they are for. The menu bar is going to be for global adjustments not just for links.</li>
        <li>Launch of mobile tickets
          <ol>
            <li>This is basically a media query based shiv to make tickets work better on a smaller screen.</li>
            <li>This will also work on a desktop, just resize your browser window down and see the results.</li>
          </ol>
        </li>
        <li>Editing is totally revamped.
          <ol>
            <li><del>Tickets is now using the markitup editor that the main site is using</del> This will be included at a later date.</li>
            <li>Tickets are now edited in line. When the modify button is clicked the editing interface will show up.  Click save to make the changes, or cancel to undo any adjustments that were made.</li>
          </ol>
        </li>
         <li>Recent Tickets has been removed from this version of tickets. Its going to be handled differently than before.</li>
         <li>Implemented [bug=601].</li>
         <li>Tickets are now sorted by priority then due date</li>
         <li>Bookmarks are now done in line vs though a toolbar button.  You can click the (<div class="ilb bookmark-off ticket_sprite"></div>/<div class="ilb bookmark ticket_sprite"></div>) icon anywhere it is on the page, and it will toggle the book mark for the ticket you have selected.</li>
         <li></li>
      </ol>
      <br>
      <span style="font-size: 150%; line-height: normal;">Known Issues</span>
      <ol>
        <li>Searching By project does not work</li>
        <li>Going directly to the user Page in Firefox can result in odd placement of the yes/no selector.  This is a result of how Firefox renders report @font-face fonts.</li>
        <li>There are no page numbers, nor any way to show more then the default amount of tickets in the list view.</li>
        <li>Going directly to a ticketlist search result can lead to a broken page.</li>
        <li>There are some issues with editing that have been around since editing was in place.  All of the ticket code links are not working as intended with the new editing system.</li>
        <li>Closed tickets are not showing up for some people. Even though a number shows up next to Closed Tickets.</li>
        <li>New tickets / bugs and new replies are not in their final form.  These will be integrated into the new look in a later version.</li>
        
      </ol>
      <br>
      <br>
			<span style="font-size: 175%; line-height: normal;" id="newestVersion">Live Ticket Update XIX</span>
			<span style="font-size: 90%; line-height: normal;" id="version">v.2.14.21.r217</span>
			<br><span style="font-size: 150%; line-height: normal;">Bug Fixes</span>
			<ol>
				<li>Large Graphs are finally working properly again. Not all of the graphs are back in place.</li>
				<li>All ticket lists, and responses should now display in the same order on all browsers</li>
				<li>Departments dropdown no longer looks cluttered.  This was introduced with the last update. This has been solved by moving the adjustments to a new user page.</li>
				<li>Ticket email was showing too much information thus making looking at tickets less important.  This has been fixed</li>
				<li>Fixed a bookmark bug that was introduced with ticket update XVIII</li>
			</ol>
			<br>
			<br>
			<span style="font-size: 150%; line-height: normal;">New Features</span>
			<ol>
				<li>User Pages are in place.
					<ol>
						<li>This is a very early version. More features to this page will be added with time.</li>
						<li>The prime goal of user pages is to allow other people to see basic stats on tickets, based on the user they have selected.</li>	
						<li>User pages will eventually take user name,user id, as well as real name as a parameter. Currently they only support user id.  </li>
						<li>User pages are the first location of the new graphs. </li>
					</ol>
					<li>Bugs are now separated out into their own area. No longer will bugs show up in the ticket list.</li>
				</li>
			</ol>
			<br>
			<br>
			<span style="font-size: 150%; line-height: normal;">Known Issues</span>
			<ol>
				<li><strike>Large Graphs are still not working properly</strike></li>
				<li>Searching By project does not work</li>
				<li><strike>Some themes do not work 100%</strike></li>
				<li>Going directly to the user Page in Firefox can result in odd placement of the yes/no selector.  This is a result of how Firefox renders report @font-face fonts.</li>
				<li>There are no page numbers, nor any way to show more then the default amount of tickets in the list view.</li>
				<li><strike>Problem or bug icons do not show up in the ticket list.</strike> No longer relative</li> 
				<li>Going directly to a ticketlist search result can lead to a broken page.</li>
			</ol>
			<br>
			<br>
			<span style="font-size: 175%; line-height: normal;" id="newestVersion">Live Ticket Update XVIII</span>
			<span style="font-size: 90%; line-height: normal;" id="version">v.2.12.16.r175</span>
			<br><span style="font-size: 150%; line-height: normal;">Bug Fixes</span>
			<ol>
				<li>Fixed a bug that was causing tickets to show the wrong replies.</li>
				<li>Fixed many bugs relating to the theme generator.</li>
				<li>Making a new ticket will once again take you to the ticket you just created</li>
				<li>Notice text was too hard to read as a result of this update.  This has been fixed.</li>
			</ol>
			<br>
			<br>
			<span style="font-size: 150%; line-height: normal;">New Features</span>
			<ol>
				<li>Tickets now uses localStorage.  If your browser supports it tickets that you have recently viewed will load up much faster.</li>
				<li>Bug reports are now separated out into their own section.  This will make it easier to file a bug report and see the progress associated with it.
					<ol>
						<li>Bug reports do not have a due date, nor do they have a department.  Bug reports will have a Priority level and a product.  They will look a lot like a ticket, but will be missing some of the components that are not needed in a bug report.</li>
						<li>This is just a framework release.  The bug tickets are not out yet, and the button does not currently do anything.</li>	
					</ol>
				</li>
				<li>All of the notifications now have their own icon.  The icons are more descriptive of what the notification is actually telling you.</li>
				<li>Along with the new notification icons comes new icons for tickets.  Tickets should look more like the website again.</li>
			</ol>
			<br>
			<br>
			<span style="font-size: 150%; line-height: normal;">Known Issues</span>
			<ol>
				<li>Large Graphs are still not working properly</li>
				<li>Some themes do not work 100%</li>
				<li>There are no page numbers, nor any way to show more then the default amount of tickets in the list view.</li>
				<li>Problem or bug icons do not show up in the ticket list.</li>
				<li>Going directly to a ticketlist search result can lead to a broken page.</li>
			</ol>
			<br>
			<br>
			<span style="font-size: 175%; line-height: normal;" id="newestVersion">Live Ticket Update XVII</span>
			<span style="font-size: 90%; line-height: normal;" id="version">v.2.8.13.r161</span>
			<br><span style="font-size: 150%; line-height: normal;">Bug Fixes</span>
			<br>1. The Update notes page was using the old theme.  This has been fixed.
			<br>2. Fixed a bug that was causing bookmarked checks to apear on replies.
			<br>
			<br>
			<span style="font-size: 150%; line-height: normal;">New Features</span>
			<br>1. Navagation has been made dramatically easier, and more to the point.  All tickets are selected though the ticket list.  This will reducde the amount of CSS needed, as well as allow for the reduction in a lot of the javascript as well. 
			<br>2. Look and feak of tickets has changed.  No longer are the areas separated from their headers.  
			<br>3. CSS3 has attacked tickets.  There are now lots of cool new CSS3 tags running rampant around tickets.  If you see square corners and no drop shadows you are using an old browser.
			<br>4. there is now an [ img ] tag.  it allows for linking to offsite images within tickets.  No matter what size it is, it will work. 
			<br>
			<br>
			<span style="font-size: 150%; line-height: normal;">Known Issues</span>
			<br>1. Large Graphs are still not working properly
			<br>2. Some themes do not work 100%
			<br>3. There are no page numbers, nor any way to show more then the default amount of tickets in the list view.
			<br>4. Problem or bug icons do not show up in the ticket list.
			<br>
			<br>
			<span style="font-size: 175%; line-height: normal;" id="newestVersion">Live Ticket Update XVI</span>
			<span style="font-size: 90%; line-height: normal;" id="version">v.2.5.12</span>
			<br><span style="font-size: 150%; line-height: normal;">Bug Fixes</span>
			<br>
			<br>
			<span style="font-size: 150%; line-height: normal;">New Features</span>
			<br>1. Tickets now uses the Droid-serif font.  If your browser supports the new css3 font face it will automaticlly switch to that font. 
			<br>
			<br>
			<span style="font-size: 150%; line-height: normal;">Known Issues</span>
			<br>1. Large Graphs are still not working properly
			<br>2. Some themes do not work 100%
			<br>3. There are no page numbers, nor any way to show more then the default amount of tickets in the list view.
			<br>
			<br>
			<span style="font-size: 175%; line-height: normal;" id="newestVersion">Live Ticket Update XV</span>
			<span style="font-size: 90%; line-height: normal;" id="version">v.2.4.12</span>
			<br><span style="font-size: 150%; line-height: normal;">Bug Fixes</span>
			<br>1. Fixed some spelling problems. 
			<br>2. Closing and reopening of tickets should be a lot faster.
			<br>3. Fixed the bug from [ticket=450].
			<br>4. The ticket list is now the same height as the ticket area.
			<br>5. Fixed the bug from [ticket=451].
			<br>6. Fixed some theme issues relating to fonts.
			<br>7. Ticket lists now fit inside the default window height.  There is a scroll bar inside the page to see tickets that can not be seen.
			<br>8. Ticket list now shows more relavant information about each of the tickets.  Including due on, completed on, and over dy by.  This was always intended and was not working properly.		
			<br>
			<br>
			<span style="font-size: 150%; line-height: normal;">New Features</span>
			<br>1. Ticket lists now show the same icons as the normal ticket view.
			<br>2. Ticket lists have been reorganized a bit.  The created by link is now on the right instead of the left.
			<br>
			<br>
			<span style="font-size: 150%; line-height: normal;">Known Issues</span>
			<br>1. Large Graphs are still not working properly
			<br>2. Some themes do not work 100%
			<br>3. There are no page numbers, nor any way to show more then the default amount of tickets in the list view.
			<br>
			<br>
			<span style="font-size: 175%; line-height: normal;" id="newestVersion">Live Ticket Update XIV</span>
			<span style="font-size: 90%; line-height: normal;" id="version">v.2.2.4</span>
			<br><span style="font-size: 150%; line-height: normal;">Bug Fixes</span>
			<br>1. Fixed a bug that was causing tickets that you reassigned to be shown in the side area as if you created them.
			<br>2. Fixed a long standing bug that was not filtering some of the show all areas by the logged in user
			<br>3. Fixed a bug with the start page not showing tickets if they were old and got a new response since your last visit.
			<br>4. Fixed the bug from <a class="ticket_link ticket_button ticket_sprite" href="ticket/434">ticket 434</a>.
			<br>
			<br>
			<span style="font-size: 150%; line-height: normal;">New Features</span>
			<br>1. New start page.
			<br>1.1 Tickets that have been worked on since your last visit are now shown instead of the update notes.  Update notes are still accessable though the link in the top right corner.
			<br>1.2 Ticket lists have been reworked along side the crusade to banish the table tag.
			<br>2. Tickets is using the rounded corner CSS from the theme generator now. This will insure that the corners look correct.
			<br>3. New look to tickets and replies.  More table tags squashed!
			<br>4. Ticket lists now show the same icons as the normal ticket view.
			<br>
			<br>
			<span style="font-size: 150%; line-height: normal;">Known Issues</span>
			<br>1. Large Graphs are still not working properly
			<br>2. Some themes do not work 100%
			<br>3. There are no page numbers, nor any way to show more then the default amount of tickets in the list view.
			<br>
			<br>
			<span style="font-size: 175%; line-height: normal;" id="newestVersion">Live Ticket Update XIII</span>
			<span style="font-size: 90%; line-height: normal;" id="version">v.2.1.0</span>
			<br><span style="font-size: 150%; line-height: normal;">Bug Fixes</span>
			<br>1. Fixed a bug that was preventing any favorite tickets from showing the proper icon.
			<br>1. Tickets is now working in Opera, as well as versions of Firefox prior to 3.1.
			<br>
			<br>
			<span style="font-size: 150%; line-height: normal;">New Features</span>
			<br>1. Ticket types are now in.  They are <span class="bug ticket_sprite ticket_button">bug tickets</span> and <span class="error ticket_sprite ticket_button">trouble tickets</span>.
			<br><blockquote>be sure to choose the proper type of ticket.  Bug reports should be fixed for web code and things that can be fixed, but probably not related to computers.  While trouble tickets are for everything that is not a bug.</blockquote>	
			<br>2. Recent tickets should now be working properly.
			<br>
			<br>
			<span style="font-size: 150%; line-height: normal;">Known Issues</span>
			<br>1. Large Graphs are still not working properly
			<br>2. Some themes do not work 100%
			<br>3. There are no page numbers, nor any way to show more then the default amount of tickets in the list view.
			<br>
			<br>
			<span style="font-size: 175%; line-height: normal;" id="newestVersion">Live Ticket Update XII</span>
			<br><span style="font-size: 150%; line-height: normal;">Bug Fixes</span>
			<br>1. Fixed some bugs relating to the new theme definitions.
			<br>2. Removed uploads as they were not being used and caused lots of bugs.
			<br>3. Fixed some email issues that crept up.
			<br>4. Fixed some small graphical issues relating to the sprite.
			<br>5. Fixed a javascript mistake that was preventing favorites from working properly.
			<br>6. Fixed a bug that was causing the buttons to disapear on a ticket.
			<br>7. Fixed the javascript error relating to tick.status.
			<br>
			<br>
			<span style="font-size: 150%; line-height: normal;">New Features</span>
			<br>1. User links.  You can now link to a search of all tickets created by a user with [user=1321]
			<br>2. Tickets now uses the newest version of <a href="http://www.jquery.com">Jquery</a>!
			<br>3. Dater is now part of tickets!
			<br>3.1 Enjoy selecting due dates with a new popup date selector.
			<br>4. Url links are now in.  [url=http://www.google.com] would create a URL link looking like <a class="ticket_sprite global_link ticket_button" href="http://www.google.com">http://www.google.com</a>
			<br>5. Moving to a new naming convention for ticket updates. They will be numbered instead of just putting in the date
			<br>
			<br>
			<span style="font-size: 150%; line-height: normal;">Known Issues</span>
			<br>1. Tickets is currently having issues in Opera
			<br>2. Large Graphs are still not working properly
			<br>3. Recent Tickets are not updating like they should
			<br>4. Some themes do not work 100%
			<br>5. There are no page numbers, nor any way to show more then the default amount of tickets in the list view.		
			<br>
			<br>
		</div>
	</div>
</div> 