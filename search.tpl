<div id="newSearchdialog">
	<div class="border-all-B-1 color-D-1" style="padding:5px;text-align:left">
		<div><font class="">Title of Ticket:</font><input type="text" name="searchTitle" id="searchTitle"  class="dropdown Ticketform " maxlength="35" /></div>
		<div><font class="">Category:</font><select class="dropdown Ticketform " id="searchCategory" name="searchCategory"><option value=""></option>{html_options  options=$cate }</select></div>
		<div><font class="">Assign:</font><select class="dropdown Ticketform " id="searchAssign" name="searchAssign"><option value=""></option>{html_options options=$assign }</select></div>
		<div><font class="">Department:</font><select class="dropdown Ticketform " id="searchDepartment" name="searchDepartment"><option value=""></option>{html_options options=$department }</select></div>
		<div><font class="">Priority:</font><select class="dropdown Ticketform " id="searchPriority" name="searchPriority"><option value=""></option>{html_options options=$priority }</select></div>
		<div class="table textLeft">
			<div class="td"><a class="option-theme fg-button corners-bottom-2 corners-top-2 white lapcatButton Cancel" id="ticketSearchCancelBtn">Cancel</a></div>
			<div class="td"><a class="option-theme fg-button corners-bottom-2 corners-top-2 white lapcatButton white" id="ticketSearchBtn" style="width:auto">Search For Ticket</a></div>
		</div>
	</div>
</div>