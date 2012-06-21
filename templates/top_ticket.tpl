{literal}
<nav>
	{/literal}
	<button class="ticket fakelink fontBold" style="cursor: pointer;" id=topperNew>
		New
	</button>
	{if $count["open"]>0}
	<button data-icon="U" class="nolink fontBold menuOpen" href="#ticketList/sOpen">
		To Me
	</button>
	{/if}
	{if $count["assigned"]>0}
	<button data-icon="e" class="nolink fontBold menuAssigned" href="#ticketList/sAssigned">
		By Me
	</button>
	{/if}
	{if $count["myDept"]>0}
	<button data-icon="F" class="nolink fontBold menuToMyDepartment" href="#ticketList/sOdepartment" id=toMyDepartment title="To My Dept.">
		To My Dep.
	</button>
	{/if}
	{if $count["byDept"]>0}
	<button data-icon="F" class="nolink fontBold menuByMyDepartment" href="#ticketList/sAdepartment" id=byMyDepartment>
		By My Dep.
	</button>
	{/if}
	{if $count["favorite"]>0}
	<button class="nolink bookmarkOff fontBold menuFavorite" href="#ticketList/sFavorite" style="opacity: 1;">
		Bookmarks
	</button>
	{/if}
	{if $count["closed"]>0}
	<button class="nolink closed fontBold menuClosed" href="#ticketList/sClosed">
		Closed
	</button>
	{/if}
	{if $count["deptClosed"]>0}
	<button class="nolink closed fontBold menuDepartmentClosed" href="#ticketList/closedDepartment">
		Dep.Closed
	</button>
	{/if}
</nav>