{literal}
<nav style=padding-top:5px;margin-left:5px>
	{/literal}
	<div style=display:table>
		<div class=td>
			<button class="ticket fakelink" style="cursor: pointer;" id=topperNew>
				New
			</button>
		</div>
		{if $count["open"]>0}
		<div class=td>
			<button class="nolink user fontBold menuOpen" href="#ticketList/sOpen">
				To Me
			</button>
		</div>
		{/if}
		{if $count["assigned"]>0}
		<div class=td>
			<button class="nolink pencil fontBold menuAssigned" href="#ticketList/sAssigned">
				By Me
			</button>
		</div>
		{/if}
		{if $count["myDept"]>0}
		<div class=td>
			<button class="nolink group fontBold menuToMyDepartment" href="#ticketList/sOdepartment" id=toMyDepartment title="To My Dept.">
				To My Dep.
			</button>
		</div>
		{/if}
		{if $count["byDept"]>0}
		<div class=td>
			<button class="nolink group fontBold menuByMyDepartment" href="#ticketList/sAdepartment" id=byMyDepartment>
				By My Dep.
			</button>
		</div>
		{/if}
		{if $count["favorite"]>0}
		<div class=td>
			<button class="nolink bookmarkOff fontBold menuFavorite" href="#ticketList/sFavorite" style="opacity: 1;">
				Bookmarks
			</button>
		</div>
		{/if}
		{if $count["closed"]>0}
		<div class=td>
			<button class="nolink closed fontBold menuClosed" href="#ticketList/sClosed">
				Closed
			</button>
		</div>
		{/if}
		{if $count["deptClosed"]>0}
		<div class=td>
			<button class="nolink closed fontBold menuDepartmentClosed" href="#ticketList/closedDepartment">
				Dep.Closed
			</button>
		</div>
		{/if}
	</div>
</nav>