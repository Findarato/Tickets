<section class="corners-bottom-2 corners-top-2 small-shadow-black-1" style="width:205px;margin-left:5px;">
    <div class="droidSerif fontBlack head message_head corners-top-2 color-B-2 border-all-D-1 " style="">
        Search
    </div>
    <div style="position:relative;" class="message_body colorWhite-1 corners-bottom-2  ">
        <div>
            <span class="">Title of Ticket:</span>
            <input type="text" name="searchTitle" id="searchTitle"  class="Ticketform roundAll4 border-all-B-2 fontMain" style="padding:2px;width:150px;" />
        </div>
        <div>
            <span class="">Category:</span>
            <select id="searchCategory" name="searchCategory" class="Ticketform roundAll4 border-all-B-2 fontMain" style="padding:2px;width:150px;">
                <option value=""></option>
                {html_options  options=$cate}
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
                <button class="fontBlack font-bold" id="ticketSearchBtn" style="width:auto">
                    <span class="ticket_button ticket_sprite bug"></span>
                    <span>Search</span>
                </button>
            </div>
        </div>
    </div>
</section>