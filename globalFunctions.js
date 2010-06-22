/**
 * Started November 19, 2009
 * @author joe
 */
var uri = window.location.toString();
uri = uri.replace(window.location.hash, "");

function sec2readable(seconds) {
    var wt;
    var week;
    //var mabs = new Math;
    seconds = Math.abs(seconds);
    if (seconds < 31536000) { //Year
        if (seconds < 2419200) { //Month
            if (seconds < 604800) { //week
                if (seconds < 86400) { //day
                    if (seconds < 3600) { //hour
                        if (seconds < 60) { //miniutes
                            return seconds + " Seconds";
                        } else {
                            return parseInt(seconds / 60, 10) + " Minutes";
                        }
                    } else {
                        return parseInt(seconds / 3600, 10) + " Hours";
                    }
                } else {
                    return parseInt(seconds / 86400, 10) + " Days";
                }
            } else {
                week = parseInt(seconds / 604800, 10);
                wt = "";
                if (week > 1) {
                    wt = "s";
                }
                return week + " Week" + wt;
            }
        } else {
            week = parseInt(seconds / 2419200, 10);
            wt = "";
            if (week > 1) {
                wt = "s";
            }
            return week + " Month" + wt;
        }
    } else {
        week = parseInt(seconds / 31536000, 10);
        wt = "";
        if (week > 1) {
            wt = "s";
        }
        return week + " Year" + wt;
    }
}

function getHash() {
    return window.location.hash;
}

function getHashArray() {
    var hash = jQuery.makeArray(getHash().split("\/"));
    return hash;
}

function setHash(htbs) {
    if (getHash() != htbs) {
        window.location.hash = htbs;
    }
}

function pageAnator(container, count, perPage) {
    hash = getHashArray();
    //Content.find("#pageAnator")
    container.empty().html(
    $("<span/>").addClass("ui-corner-all lapcatButton").css({
        width: "auto",
        padding: "1px",
        textAlign: "center",
        textDecoration: "none"
    }).html($("<font/>").html("Pages:")));

    if (count === 0) {
        container.append($("<a/>").addClass("ui-corner-all background-alpha-4 border-all-B-1 lapcatButton nolink").attr("href", hash[0] + "/" + hash[1] + "/page/" + 0).css({
            width: "20px",
            padding: "1px",
            textAlign: "center",
            textDecoration: "none"
        }).html(1));
    } else {
        var pages = count / perPage;
        for (var a = 1; a < pages + 1; a++) {
            var b = parseInt(a - 1, 10);
            container.append($("<a/>").addClass("ui-corner-all background-alpha-4 border-all-B-1 lapcatButton nolink").attr("href", hash[0] + "/" + hash[1] + "/page/" + b).css({
                width: "20px",
                padding: "1px",
                textAlign: "center",
                textDecoration: "none"
            }).html(a));
        }
    }
}

function stripslashes(str) {
    str = str.replace(/\\'/g, '\'');
    str = str.replace(/\\"/g, '"');
    str = str.replace(/\\0/g, '\0');
    str = str.replace(/\\\\/g, '\\');
    return str;
}

function addBr(obj) {
    if (typeof obj != "object") {
        obj = this;
    }
    obj.append("<br>");
}

function notice(title, body, sticky, ticketid) {
    var noticeClass = "";
    var fontClass = "white";
    var image = "http://www.lapcat.org/lapcat/images/101-58-1.png";
    switch (title) {
    case "Error":
        noticeClass = "button-red";
        break;
    case "Debug":
        noticeClass = "button-purple";
        break;
    case "Notice":
        noticeClass = "color-D-1";
        break;
    case "Achievement":
        noticeClass = "color-D-1";
        image = "";
        break;
    default:
        noticeClass = "color-D-1 ";
        break;
    }
    var noticeBox = '<div class="notice fakelink ticketlink border-B-1 ui-corner-all box_transition ">' + '<div class="notice-body ' + noticeClass + ' ui-corner-all">' + '<div style="float:left;width:50px;padding-right:5px;"><img src="' + image + '" alt="" /></div>' + '<div style="float:left;width:200px;"><h3><font class="' + fontClass + '">' + title + '</font></h3>' + '<font class="' + fontClass + '">' + body + '</font></div>' + '</div>' + '</div>';
    if (sticky) {
        if (parseInt(ticketid, 10) > 0) {
            $(noticeBox).click(function () {
                loadTicket(ticketid);
            }).purr({
                isSticky: true
            });
        } else {
            $(noticeBox).removeClass("fakelink").purr({
                isSticky: true
            });
        }
    } else {
        if (parseInt(ticketid, 10) > 0) {
            $(notice).click(function () {
                loadTicket(ticketid);
            }).purr({
                isSticky: false
            });
        } else {
            $(noticeBox).removeClass("fakelink").purr({
                isSticky: false
            });
        }
    }
    $(".close").addClass("color-E-1");
}
/**
 * 
 * o_data accepts compled objects as well as very basic ones
 * Basic:{0:["1","2","3","4","5","6","7"],1:["1","2","3","4","5","6","7"]};
 * Complex:
 */
function buildTable(o_data,o_target){
	table = $("<div/>",{css:{"display":"table","width":"100%"}}).addClass("generated");
	lables = {};
	$.each(o_data,function(key,tableRowdata){
		table
			.append(
				$("<div/>",{css:{"display":"table-row","width":"100%","box-sizing":"border-box","-moz-box-sizing":"border-box","-webkit-box-sizing":"border-box"}})
					.bind("build_row",{"tableDef":tableRowdata},function(event){
						var o_table = event.data.tableDef;
						for (var v_key in o_table){
							if(!o_table[v_key].o_jQ){//this should be for a simple display
								alert(v_key);
								$(this)
									.append(
										$("<div/>")
											.css({"display":"table-cell","box-sizing":"border-box","-moz-box-sizing":"border-box","-webkit-box-sizing":"border-box"})
											.html(o_table[v_key])
									);
							}else{//Complex display
								$(this)
									.append(
										$("<div/>",o_table[v_key].o_jQ)
											.css({"display":"table-cell","box-sizing":"border-box","-moz-box-sizing":"border-box","-webkit-box-sizing":"border-box"})
											
									);
							}
						}
					}).trigger("build_row")
					
			);
	});
	o_target.append(table);
}