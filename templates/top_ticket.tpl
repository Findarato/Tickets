{literal}<nav style=padding-top:5px;margin-left:5px>{/literal}
	<div style=display:table>
		<div class=td>
			<div class=topMenuItem>
				<a class="ticket fakelink" style="cursor: pointer;" id=topperNew>New</a>
			</div>
		</div>
		{if $count["open"]>0}
		<div class=td>
			<div class=topMenuItem>
				<a class="nolink user fontBold" href="#ticketList/sOpen">To Me</a>
			</div>
		</div>
		{/if}
		{if $count["assigned"]>0}
		<div class=td>
			<div class="topMenuItem">
				<a class="nolink pencil fontBold" href="#ticketList/sAssigned">By Me</a>
			</div>
		</div>
		{/if}
		{if $count["myDept"]>0}
		<div class=td>
			<div class="topMenuItem">
				<a class="nolink group fontBold" href="#ticketList/sOdepartment" id=toMyDepartment title="To My Dept.">To My Dep.</a>
			</div>
		</div>
		{/if}
		{if $count["byDept"]>0}
		<div class=td>
			<div class="topMenuItem">
				<a class="nolink group fontBold" href="#ticketList/sAdepartment" id=byMyDepartment>By My Dep.</a>
			</div>
		</div>
		{/if}
		{if $count["favorite"]>0}
		<div class=td>
			<div class="topMenuItem">
				<a class="nolink bookmarkOff fontBold" href="#ticketList/sFavorite" style="opacity: 1;font-size: 12px">Bookmarks</a>
			</div>
		</div>
		{/if}
		{if $count["closed"]>0}
		<div class=td>
			<div class="topMenuItem">
				<a class="nolink closed fontBold" href="#ticketList/sClosed">Closed</a>
			</div>
		</div>
		{/if}
		{if $count["deptClosed"]>0}
		<div class=td>
			<div class="topMenuItem">
				<a class="nolink closed fontBold" href="#ticketList/closedDepartment">Dep.Closed</a>
			</div>
		</div>
		{/if}
	</div>
</nav>