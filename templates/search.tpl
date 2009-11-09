<div id="newSearchdialog" class="color-off" style="padding:5px;text-align:left;">
	<div><font class="opposite">Title of Ticket:</font><input type="text" name="searchTitle" id="searchTitle"  class="dropdown Ticketform " maxlength="35" /></div>
	<div><font class="opposite">Category:</font><select class="dropdown Ticketform " id="searchCategory" name="searchCategory"><option value=""></option>{html_options  options=$cate }</select></div>
	<div><font class="opposite">Assign:</font><select class="dropdown Ticketform " id="searchAssign" name="searchAssign"><option value=""></option>{html_options options=$assign }</select></div>
	<div><font class="opposite">Department:</font><select class="dropdown Ticketform " id="searchDepartment" name="searchDepartment"><option value=""></option>{html_options options=$department }</select></div>
	<div><font class="opposite">Priority:</font><select class="dropdown Ticketform " id="searchPriority" name="searchPriority"><option value=""></option>{html_options options=$priority }</select></div>
	<div class="table textLeft">
		<div class="td"><a class="option-theme fg-button ui-corner-all white lapcatButton Cancel" id="ticketSearchCancelBtn">Cancel</a></div>
		<div class="td"><a class="option-theme fg-button ui-corner-all white lapcatButton white" id="ticketSearchBtn" style="width:auto">Search For Ticket</a></div>
	</div>
</div>