<section class="roundTop4 small-shadow-black-1" style="width:205px;margin-left:5px;position:relative">
    <div class="roundTop4" style="height:100%;width:100%;position:absolute;top:0;right:0;background:hsla(0,0%,0%,0.6);z-index:50"></div>
    <div class="fontBlack head message_head roundTop4 color-B-2 border-all-D-1 " style="">
        <div class="td" style="width:90%">Search</div>
        <div class="td" style="text-align:right"></div>
    </div>
    <div style="position:relative;" class="message_body colorWhite-1 corners-bottom-2  ">
        <div>
            <span class="">Title of Ticket:</span>
            <input type="search" name="searchTitle" id="searchTitle"  class="Ticketform roundAll4 border-all-B-2 fontMain" style="padding:2px;width:150px;" />
        </div>
        <div>
            <span class="">Category:</span>
            <select id="searchCategory" name="searchCategory" class="Ticketform roundAll4 border-all-B-2 fontMain" style="padding:2px;width:150px;">
                <option value=""></option>
                {html_options options=$cate}
            </select>
        </div>
        <div>
            <span class="">Assign:</span>
            <select id="searchAssign" name="searchAssign" class="Ticketform roundAll4 border-all-B-2 fontMain" style="padding:2px;width:150px;">
                <option value=""></option>
                {html_options options=$assign}
            </select>
        </div>
        <div>
            <span class="">Department:</span>
            <select id="searchDepartment" name="searchDepartment" class="Ticketform roundAll4 border-all-B-2 fontMain" style="padding:2px;width:150px;">
                <option value=""></option>{html_options options=$department}
            </select>
        </div>
        <div>
            <span class="">Priority:</span>
            <br>
            <select id="searchPriority" name="searchPriority" class="Ticketform roundAll4 border-all-B-2 fontMain" style="padding:2px;width:150px;">
                <option value=""></option>{html_options options=$priority}
            </select>
        </div>
        <div class="table textLeft">
            <div class="td">
                <button class="fontMain fontBold minimal" id="searchButton" style="width:auto;padding:3px" id="ticketSearchBtn" >
                    <span class="ticket_button ticket_sprite magnifier" style="text-indent:-9990px;">Search</span>
                </button>
            </div>
        </div>
    </div>
</section>