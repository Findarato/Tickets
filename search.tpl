<section class="roundTop4 small-shadow-black-1" style="width:205px;margin-left:5px;position:relative">
    <!-- <div class="roundTop4" style="height:100%;width:100%;position:absolute;top:0;right:0;background:hsla(0,0%,0%,0.6);z-index:50"></div> -->
    <div class="fontBlack head message_head roundTop4 color-B-2 border-all-D-1 " style="">
        <div class="td" style="width:90%">Search</div>
        <div class="td" style="text-align:right"></div>
    </div>
    <form class="jqtransform" id="search">
    <div style="position:relative;" class="message_body colorWhite-1 corners-bottom-2  ">
        <div>
            <label class="">Title of Ticket:</label>
            <input type="text" name="searchTitle" id="searchTitle"   style="padding:2px;width:150px;" />
        </div>
        <div>
            <label class="">Category:</label>
            <select id="searchCategory" name="searchCategory"  style="padding:2px;width:150px;">
                <option value=""></option>
                {html_options options=$cate}
            </select>
        </div>
        <div>
            <label class="">Assign:</label>
            <select id="searchAssign" name="searchAssign"  style="padding:2px;width:150px;">
                <option value=""></option>
                {html_options options=$assign}
            </select>
        </div>
        <div>
            <label class="">Department:</label>
            <select id="searchDepartment" name="searchDepartment"  style="padding:2px;width:150px;">
                <option value=""></option>{html_options options=$department}
            </select>
        </div>
        <div>
            <label class="">Priority:</label>
            <br>
            <select id="searchPriority" name="searchPriority"  style="padding:2px;width:150px;">
                <option value=""></option>{html_options options=$priority}
            </select>
        </div>
        <div class="table textLeft">
            <div class="td">
                <button class="fontMain fontBold minimal" id="searchButton" style="width:auto;padding:3px" id="ticketSearchBtn" >
                    <span class="ticket_button ticketSprite magnifier">Search</span>
                </button>
            </div>
        </div>
    </div>
    </form>
</section>