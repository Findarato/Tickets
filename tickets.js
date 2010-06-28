/**
 * Simple global variables that are needed everywhere
 */
var User_id = 0;
var OuterHeight = 0;
var OuterWidth = 0;
var UploadCnt = 0;
//Setup the global variables for selectors
var Tlb = "";
//End global selectors
var Params = {
	"FadeTime": 0,
	"Ticket_id": 0,
	"Content": "",
	"TicketJSON": "",
	"LastArea": "",
	"popChange":false,
	"LastLogon":0
};
var uri = window.location.toString();
uri = uri.replace(window.location.hash, "");

function checkResponse(json) {
	if (json.error !== null && json.error.length > 2) {
		notice("Error", json.error, false);
	}
	if (json.message !== null && json.message.length > 2) {
		notice("Notice", json.message, false);
	}
}

function loadNew(timestamp){
	loadTicketList(0,{"new":"1","dateTime":timestamp});
	$("#ticketListtitle").html("Tickets with activity since your last visit");
}

function loadBlank() {
	Params.LastArea = "UpdateNotes";
	Params.Content.html($("#blankTpl").html());
}
/**
 * Checks the hash of the page, then decides what to do with it.  This is the brains behind the page.
 */

function checkHash() {
	var hash = getHashArray();
	if (window.location.hash.length > 1) {
		//This checks for a url passed hash, otherwise its just going to go in there.
		switch (hash[0]) {
		case "#ticket":
			switch (hash[2]) {
			case "page":
				if ($("#ticketId").html().length < 1) {
					//This should fix the directly accessing a response page bug
					if (Params.LastArea == "ticket") {
						loadTicketBody(hash[1], Params.Content);
						loadResponsesBody(hash[1], $("#replyareabody"), 0);
					} else {
						loadTicket(hash[1]);
					}
				} else {
					loadResponsesBody(hash[1], $("#replyareabody"), hash[3]);
				}
				break;
			default:
				if (Params.LastArea == "ticket") {
					loadTicketBody(hash[1], Params.Content);
					loadResponsesBody(hash[1], $("#replyareabody"), 0);
				} else {
					loadTicket(hash[1]);
				}
				break;
			}
			break;
		case "#ticketlist":
			$.each(hash, function (key, value) {
				//alert(key+"=>"+value);
				if (key % 2 === 0) {
					switch (value) {
					case "page":
						loadTicketList(hash[key + 1]);
						break;
					default:
						loadTicketList(0);
						break;
					}
				}
			});
			break;
		case "#search":
			loadSearch();
			break;
		case "#largestats":
			loadLargeStats();
			break;
		case "#largegraphs":
			loadLargeGraphs();
			break;
		case "#updateNotes":
			loadBlank();
			break;
		default: case "#start":
			loadNew(Params.LastLogon);
			break;
		}
	} else {
		loadNew(Params.LastLogon);
	}
}

function loadLargeGraphs() {

}

function checkNotify(dt) {
	var display = "";
	var disp = false;
	$.getJSON(uri + "ajax/notify.php", {
		dateTime: dt
	}, function (data) {
		$.each(data.tickets, function (i, item) {
			if (item.id > 1) {
				notice("New Ticket!", item.subject, true, item.id);
			}
		});
		$.each(data.replies, function (i, item) {
			if (item.ticket_id > 1) {
				notice("New Response!", item.subject, true, item.ticket_id);
			}
		});
	});
	var dat = new Date();
	Lastcheck = Math.round(dat.getTime() / 1000.0); //set the global variable to now
}

function resize() {
	OuterHeight = $("body").outerHeight() - 50;
	OuterWidth = $("body").outerWidth() - 5;
}
/* This is will work*/
/**
 * Used to convert seconds in to a more readable format
 * @param int seconds
 */

function loadLargeStats() {
	Params.Content.empty();
	Params.Content.html(
	$("<div/>").css({
		Width: "100%",
		textAlign: "left",
		margin: "4px",
		padding: "2px",
		height: "20px",
		position: "relative"
	}).addClass("corners-bottom-2 corners-top-2 color-B-2 border-all-B-1").append($("<font/>").css({
		margin: "5px"
	}).html("Large Stats for tickets"))).append(holder = $("<div/>").addClass("color-E-2 corners-bottom-2 corners-top-2 border-all-B-1").css({
		height: "500px",
		overflow: "auto",
		margin: "4px",
		padding: "2px"
	}));

	Params.LastArea = "largeStats";
	var title = "";
	$.getJSON(uri + "ajax/stats.php", {
		type: "1,2,3,4,5,6",
		style: "2"
	}, function (data) {
		var row = "";
		var cnt = 0;
		$.each(data.Largestats, function (a, item) {
			var table = $("<table/>").css({
				width: "99%"
			}).addClass("border-all-B-1 color-D-2 white");
			table.append(depNames = $("<tr/>").addClass("color-D-1").html($("<td/>").html("&nbsp;")));
			$.each(data.departments, function (d, dep) {
				//	if(cnt%2==1){var color="color-hex";}else{var color="";}
				color = "color-E-2";
				depNames.append($("<td/>").css({
					textAlign: "center",
					width: "7%"
				}).html(
				$("<div/>").css({
					textAlign: "center",
					overflow: "hidden",
					width: "90%",
					height: "16px",
					paddingLeft: "1px",
					paddingRight: "1px"
				}).html(dep.name)));
				cnt++;
			}); // display the headers
			cnt = 0; //reset the color counter
			title = item.title;
			//Add it to the page
			holder.append($("<div/>").html($("<h2/>").html(title).addClass("font-A").css({
				margin: "5px"
			}))).append(table).append("<br><br>");
			$.each(item.stats, function (b, item2) {
				table.append(row = $("<tr/>").addClass("border-all-B-1"));
				row.append($("<td/>").html(item2.username.firstname + " " + item2.username.lastname).addClass("color-D-2").css({
					width: "100px"
				}));
				$.each(item2, function (c, item3) {
					if (cnt % 2 == 1) {
						var color = "color-C-2";
					} else {
						var color = "";
					}
					row.append($("<td/>").css({
						textAlign: "center",
						width: "7%"
					}).addClass(color).css({
						textAlign: "center"
					}).html(item3.count));
					cnt++;
				});
				cnt = 0;
			});

		});
	});
}
/**
 * Loads the status ticket list for a specified area, or all areas if none is passed
 * @param String Area
 */

function populateAllTickets(Area) {
	var cnt = 0;
	var html = "";
	var Ttype = "";
	$.getJSON(uri + "ajax/tickets.php", {
		"type": "small",
		"index": "all",
		"area": Area,
		"style": 1
	}, function (data, text) {
		//alert(text);
		$.each(data.ticket, function (i, item) {
			cnt = 0;
			html = "";
			Ttype = "";
			$("#c" + item.type).html(item.Count);
			Ttype = item.type;
		});
	});
}
function updateTickets() {
	checkNotify(Params.LastLogon); //Use the last login time
	loadStats();
	populateAllTickets();
}

function loadResponsesBody(ticketId, container, page) {
	var params = {
		"ticket_id": ticketId
	};
	if (page.length !== 0) {
		params["page"] = page;
	} // adds the page number to the request
	//var resCont = $("<div/>");
	$.getJSON(uri + "ajax/display_reply.php", params, function (data) {
		var cnt = 0;
		var resCont = $("<div/>");
		$.each(data.reply, function (i, item) {
			if (i % 2 == 1) {
				var color = "background-alpha-4";
			} else {
				var color = "background-alpha-3";
			}
			resCont.append($("#responsestpl").html());
			resCont.find("#ticketListDueDate").hide();
			resCont.find("#changemeColor").addClass(color).attr({
				id: "userid" + item.id
			});
			resCont.find("#changemeUserid").html(item.firstname + " " + item.lastname).attr({
				id: "userid" + item.id
			});
			resCont.find("#changemeSubject").html(item.subject).css({
				fontWeight: "bold"
			}).attr({
				id: "subject" + item.id
			});
			resCont.find("#changemeBody").html(stripslashes(item.body)).attr({
				id: "body" + item.id
			});
			resCont.find("#changemeDay").html(sec2readable(item.ddt)).attr({
				id: "created" + item.id
			});
			$("#replyticketid").val(ticketId);
			cnt++;
		});
		container.html(resCont.html());
	});
	container.show();
}

function displayStatus(jsonData, Selector) {
	$.each(jsonData, function (key, item) {
		switch (key) {
			case "closed":
				Selector.find("#imgClosed").show();
				break;
			case "edit":
				Selector.find("#imgEdited").show();
				break;
			case "reassigned":
				Selector.find("#imgReassigned").show();
				break;
			case "blocked":
				Selector.find("#imgBlocked").show();
				break;
			case "lock":
				Selector.find("#imgLock").show();
				Params.Content.find("#Holdlink").hide();
				Params.Content.find("#unHoldlink").show();
				break;
			default:
				break;
		}
	});
}
/**
 * Simple function to build and display the recent tickets data
 * @param {Object} jsonData
 * @param jQuery Selector Object selector
 */

function loadRecentTickets(jsonData, selector) {
	selector.empty();
	$.each(jsonData, function (t, tl) {
		selector.append(
		$("<div/>").css({
			overflow: "hidden",
			width: "150px",
			height: "15px"
		}).html(
		$("<a/>").attr("href", "#ticket/" + tl.ticket_id).addClass("ticket_link ticket_button ticket_sprite").css({
			fontSize: "135%"
		}).html(tl.ticket_name.replace(/\+/g, " "))));
		selector.append(
		$("<div/>").css({
			overflow: "hidden",
			width: "150px",
			height: "15px",
			paddingBottom: "5px"
		}).html($("<span/>").css({
			fontSize: "9px"
		}).html(tl.dt)));
	});
}

function loadTicketBody(ticketId, container) {
	container.find(".statusImage ").hide();
	Params.Ticket_id = ticketId; //set the global
	$.getJSON(uri + "ajax/display_ticket.php", {
		"ticket_id": ticketId
	}, function (data) {
		Params.TicketJSON = data;
		container.find("#ticketTitle").html(data.subject).show();
		container.find("#ticketDate").html(data.created_on);
		if (data.timeRemaining > 0) { //ticket is over due.
			container.find("#ticketDueDate").html(data.due_on).addClass("dark-red");
			//container.find("#ticketStatusImage").append($("<img/>").attr("src","http://cdn1.lapcat.org/famfamfam/silk/exclamation.png"));
		} else { //ticket is not over due
			container.find("#ticketDueDate").html(data.due_on);
		}
		container.find("#ticketBody").html(data.description);
		container.find("#ticketCategory").html($("<a/>").attr("href", "#ticketlist/category/" + data.category).addClass("nolink ticket_button ticket_sprite category_link ").html(data.category));
		container.find("#ticketCreatedBy").html($("<a/>").attr("href", "#ticketlist/created_by/" + data.created_by_id).addClass("nolink ticket_button ticket_sprite user ").html(data.firstname2 + " " + data.lastname2));
		container.find("#ticketAssignedTo").html($("<a/>").attr("href", "#ticketlist/assigned/" + data.assigned_id).addClass("nolink ticket_button ticket_sprite user ").html(data.firstname + " " + data.lastname));
		container.find("#replyticketid").val(ticketId);
		container.find("#ticketLocation").html($("<a/>").attr("href", "#ticketlist/location/" + data.locationId).addClass("nolink library-link ").html(data.locationName));
		container.find("#ticketId").html(data.id);
		container.find("#ticketPriority").html(data.priority);
		if (data.favorite !== null) {
			container.find("#imgBookmark").show();
		}
		if (data.status.lock == 1) {
			$("#Holdlink").hide();
			$("#unHoldlink").show();
		} else {
			$("#Holdlink").show();
			$("#unHoldlink").hide();
		}
		if (data.closed_on !== null) { //All closed tickets
			container.find("#ticketClosedOnDate").html(data.closed_on);
			if (data.dagoc < 604800 || data.open == 1) { //newly closed
				container.find(".openTicket").hide();
				container.find(".closedTicket").show();
			} else { //very old closed
				container.find(".openTicket").hide();
				container.find(".closedTicket").hide();
			}
		} else { //open tickets
			container.find(".openTicket:not(.hold)").show();
			container.find(".closedTicket").hide();
		}
		var attCnt = 0;
		if ($("#storage").html() == 1) {
			$("#replyarea").hide();
		}
		var pri = parseInt(container.find("#ticketPriority").text() - 1, 10);
		$("#replyareaTitle").text("Replies (" + data.responseCount + ")"); //display the total response count
		$('#editlink').colorbox({
			iframe: false,
			transition: "none",
			open: false,
			inline: true,
			href: "#newTicketdialog",
			title: "<font class=\"white\">Edit Ticket</font>"
		}, function () {
			$("#newTicketDescription").val(Params.TicketJSON.dbDescription);
			$("#newTicketTitle").val(Params.TicketJSON.subject);
			$("#newTicketLocation").val(Params.TicketJSON.locationName);
			$("#newTicketTicket_id").val(Params.TicketJSON.id);
			$("#newTicketType").val("edit");
			$("#newTicketPriority").val(Params.TicketJSON.priority - 1);
			$("#newTicketAssign").val(Params.TicketJSON.firstname + " " + Params.TicketJSON.lastname);
			$("#newTicketCategory").val(Params.TicketJSON.category);
			$("#newTicketDueDate").val(Params.TicketJSON.due_on);
			$("#ticketAddBtn").text("Commit Changes");
			$("#newTicketDueDate").val(Date.today().add({
				days: 3
			}).toString("M/d/yyyy")).blur(function () {
				var cleanDate = Date.parse($(this).val(), "M/d/yyyy");
				if (cleanDate === null) {
					notice("Error", "bad date", false);
					$("#ticketAddBtn").hide();
				} else {
					$(this).val(cleanDate.toString("M/d/yyyy"));
					$("#ticketAddBtn").show();
				}
			});
		});
		$('#replylink').colorbox({
			iframe: false,
			transition: "none",
			open: false,
			inline: true,
			href: "#newReplydialog",
			title: "<font class=\"white\">Reply to Ticket</font>"
		}, function () {
			$("#replyTitle").val("Re:" + Params.TicketJSON.subject);
			$("#replyticketid").val(Params.Ticket_id);
			$("#replyuserid").val(User_id);
		});
		$('#ReAssignlink').colorbox({
			transition: "none",
			open: false,
			inline: true,
			href: "#reassignTicketdialog",
			title: "<font class=\"white\">Reassign Ticket</font>"
		});
		//Set the ticket type icon
		if (data.tickettype_id == 1) {
			$("#ticketStatusImage").find("#imgTicketTrouble").show();
			$("#ticketStatusImage").find("#imgTicketBug").hide();
		} else {
			$("#ticketStatusImage").find("#imgTicketBug").show();
			$("#ticketStatusImage").find("#imgTicketTrouble").hide();
		}
		//Run some functions to deal with the data.	
		pageAnator(container.find("#pageAnator").empty(), data.responseCount, 20); //add Page numbers
		loadRecentTickets(data.recentTickets, $("#recentTickets")); //Recent ticket list
		displayStatus(data.status, container.find("#ticketStatusImage")); //status icons
	});
}
/**
 * Loads the ticket value into the display
 *
 * @param {int} ticketId
 */

function loadTicket(ticketId) {
	Params.LastArea = "ticket";
	Params.Content.html($("#ticketTpl").html());
	loadTicketBody(ticketId, Params.Content);
	var hash = getHashArray();
	if (hash[2] == "page" && hash[3] > -1) {
		loadResponsesBody(Params.Ticket_id, $("#replyareabody"), hash[3]); //load the selected response page
	} else {
		loadResponsesBody(Params.Ticket_id, $("#replyareabody"), 0);
	} //load the responses page 0
}

function loadTicketList(pageNumber,queryObj) {
	Params.LastArea = "ticketlist";
	var html = "";
	if (pageNumber < 0) {
		pageNumber = 0;
	}
	$("#ticketListbody").empty();
	if(queryObj){
		O_search = queryObj;
		O_search.type = "search";
		O_search.page = pageNumber;			
	}else{
		$("#ticketListtitle").html("Tickets search Result");
		hash = getHashArray();
		O_search = {
			"type": "search",
			"page": pageNumber,
			"search": {}
		};
		if (hash[1]) {
			for (a = 1; a <= hash.length; a++) {
				if (a == hash.length) {} else {
					var holder = a + 1;
					if (!hash[holder]) {
						hash[holder] = "1";
					}
					O_search[hash[a]] = hash[holder];
					a++;
				}
			}
		}	
	}
	
	$.getJSON(uri + "ajax/tickets.php", O_search, function (data) {
		var s_ocd; //string open closed display
		var s_tr; // string time remaining
		Params.Content.empty().html($("#ticket_listTpl").html());
		Tlb = Params.Content.find("#ticketListbody");
		pageAnator(Params.Content.find("#pageAnator").empty(), data.ticketCount, 20);
		var tlistHolder = $("<div/>");
		if(!data.tickets){ //there are no tickets to display
			Tlb.html("There are no tickets that match this search")
			return;
		}
		$.each(data.tickets, function (i, item) {
			var OC = false;
			if (i % 2 == 1) {
				var color = "background-alpha-4";
			} else {
				var color = "background-alpha-3";
			}
			if (item.timeRemaining === null) {} else {} if (item.open === 0) {
				s_ocd = $("<span/>").html("Closed").addClass("font-L font-bold").css({
					paddingLeft: "3px",
					fontSize: "9px"
				});
			} else {
				OC = true;
				s_ocd = $("<span/>").html("");
			}
			if (item.timeRemaining === null) {
				s_tr = $("<span/>").html("");
			} else {
				if (item.open == 0) { //closed_on
					s_tr = $("<span/>").html("Closed On: " + Date.parse(item.closed_on).toString("M/d/yyyy HH:mm")).css({
						"paddingLeft": "3px",
						"fontSize": "9px"
					});
				}else {
					s_tr = $("<span/>").html("Due On: " + Date.parse(item.due_on).toString("M/d/yyyy HH:mm")).css({
						"paddingLeft": "3px",
						"fontSize": "9px"
					});
				}
			}

			tlistHolder.append($("#responsestpl").html());
			tlistHolder.find("#changemeColor").addClass(color).attr({
				"id": "Color" + item.id
			});
			tlistHolder.find("#changemeUserid").html($("<a/>").attr({
				"href": "#ticketlist/assigned/" + item.assigned_id
			}).addClass("nolink user ticket_button ticket_sprite").html(item.firstname + " " + item.lastname)).attr({
				"id": "User" + item.id
			});
			tlistHolder.find("#changemeSubject").html($("<a/>").attr({
				"href": "#ticket/" + item.id
			}).addClass("nolink").html(item.subject)).append(s_ocd).css({
				"fontWeight": "bold"
			}).attr({
				"id": "subject" + item.id
			});
			if (!OC) { //closed Ticket
				if (item.timeRemaining !== null) { //Ticket with due date
					if (item.timeTaken > item.timeAllowed) { //over due ticket
						tlistHolder.find("#changemeDueDate").html(s_tr).attr({
							"id": "duedate" + item.id
						});
						tlistHolder.find("#changemeTr").html($("<span/>").html("Time Allowed:" + sec2readable(item.timeAllowed))).attr({
							"id": "duedatetr" + item.id
						});
						tlistHolder.find("#changemeTT").html("Time Taken:" + sec2readable(item.timeTaken)).attr({
							"id": "timeTaken" + item.id
						});
					} else { //Completed on time or ahead of time
						tlistHolder.find("#changemeDueDate").html(s_tr).attr({
							"id": "duedate" + item.id
						});
						tlistHolder.find("#changemeTr").html(sec2readable(item.timeAllowed)).attr({
							"id": "duedatetr" + item.id
						});
					}
				} else { //old ticket
					tlistHolder.find("#changemeTT").html("Time Taken: " + sec2readable(item.timeTaken)).attr({
						"id": "timeTaken" + item.id
					});
				}

			} else { //Open ticket
				if (item.timeRemaining !== null) {
					if (item.timeRemaining > 0) {
						tlistHolder.find("#changemeDueDate").html(s_tr).attr({
							"id": "duedate" + item.id
						});
						tlistHolder.find("#changemeTr").html($("<span/>").html("Over due by: "+sec2readable(item.timeRemaining))).attr({
							"id": "duedatetr" + item.id
						});
					} else {
						tlistHolder.find("#changemeDueDate").html(s_tr).attr({
							"id": "duedate" + item.id
						});
						tlistHolder.find("#changemeTr").html("Time Remaining: "+sec2readable(item.timeRemaining)).attr({
							"id": "duedatetr" + item.id
						});
					}
				}
			}
			tlistHolder.find("#changemeBody").html(item.description).attr({
				"id": "body" + item.id
			});
			tlistHolder.find("#changemeDay").html(sec2readable(item.dago)).attr({
				"id": "created" + item.id
			});
			tlistHolder.find("#changemeCategory").html("Category: ").append($("<a/>").attr({
				"href": "#ticketlist/category/" + item.category
			}).addClass("nolink category_link").html(item.category)).css({
				"fontSize": "9px"
			}).attr({
				"id": "category" + item.id
			});
			tlistHolder.find("#changemeAssignedid").html("Created By:").append($("<a/>").attr({
				"href": "#ticketlist/created_by/" + item.created_by_id
			}).addClass("nolink user ticket_button ticket_sprite").html(item.firstname2 + " " + item.lastname2)).css({
				"fontSize": "9px"
			}).attr({
				"id": "CreatedBy" + item.id
			});
			tlistHolder.find("#changemeTicketListIcons").attr("id",item.id+"-ticketListIcons")
			displayStatus(item.status, tlistHolder.find("#"+item.id+"-ticketListIcons")); //status icons
		});
		Tlb.html(tlistHolder);
	});
}

function loadStats() {
	$.getJSON(uri + "ajax/stats.php", {
		"type": "1,2,3,4,5",
		"style": "1"
	}, function (data) {
		var dom_stats = $("#statistics");
		/*		if (null == data.error) { notice("Notice", "You suck", false);}*/
		if (null === data.error) {
			notice("Debug", "There was a strange error loading statistics", false);
		}
		if (data.error.length > 0) {
			notice("Debug", data.error, false);
		} else {
			if (data.stats.general.cntId.length > 0) {
				dom_stats.html("Total Tickets: " + data.stats.general.cntId);
				addBr(dom_stats);
				dom_stats.append("Total Responses: " + data.stats.totalResponses.cntId);
				addBr(dom_stats);
				dom_stats.append("Average Priority: " + data.stats.general.avgPriority);
				addBr(dom_stats);
			} else {
				alert(data.stats.general.length);
			}
			if (data.stats.open.length > 0) {
				stats.append("Total Open Tickets: " + data.stats.open.cntId);
				addBr(dom_stats);
			}
			dom_stats.append("Average Ticket Duration: " + sec2readable(data.stats.closed.dago));
			addBr(dom_stats);
			dom_stats.append("My Average Ticket Duration: " + sec2readable(data.stats.myclosed.dago));
			addBr(dom_stats);
		}
	}, "json");
}
	
jQuery(document).ready(function () {
	//$(window).bind( 'hashchange', function(){checkHash();});
	
	$("title").html($("title").html()+"  "+$("#version").html());
	$("#Version").html($("#newestVersion").html()); //to make sure the version on tickets is always updated
	
	if (uri.match('dev') == 'dev') {
		path = "http://dev.lapcat.org/" + $("#themegencss").attr("href");
		$("#themegencss").attr("href", path);
	} else {
		path = "http://www.lapcat.org/" + $("#themegencss").attr("href");
		$("#themegencss").attr("href", path);
	}


	$("#cboxTitle").addClass("color-E-1 border-all-B-1");
	$("#cboxClose").addClass("ticket_sprite bug");
	Params.Content = $("#content"); //lets stop searching for it a hundred times
	$("#userSecondaryEmail").blur(function () {
		jQuery.post(uri + "ajax/login.php", {
			"altEmail": $(this).val()
		}, function (data) {
			checkResponse(data);
			if (data.error.length === 0) {
				$("#depOk").show();
				$("#depError").hide();
			} else {
				$("#depOk").hide();
				$("#depError").show();
			}
		}, "json");

	});
	$("#depCancel").click(function () {
		jQuery.post(uri + "ajax/login.php", {
			"altEmail": "clear",
			"oldAltEmail": $("#userSecondaryEmail").val()
		}, function (data) {
			checkResponse(data);
			if (data.error.length === 0) {
				$("#userSecondaryEmail").val("");
				$("#depOk").show();
				$("#depError").hide();
			} else {
				$("#depOk").hide();
				$("#depError").show();
			}
		}, "json");
	});
	if (User_id > 0) {
		$("#rss1").attr("href", "ticketsrss.php?id=" + User_id);
		$("#rss2").attr("href", "ticketsrss.php?id=" + User_id + "&bookmark=1");
	}

	OuterHeight = $("body").outerHeight() - 50;
	OuterWidth = $("body").outerWidth() - 5;
	if ($("#t_userid").html === "") {} else {
		User_id = $("#t_userid").text();
	}
	if ($("#t_uI").text().length > 10) {
		updateTickets();
		if(!Params.popChange){checkHash();}
		setInterval("updateTickets()", 30000);
	} //disables running with out being logged in

	$("button,a").bind("focus", function () {
		$(this).blur();
	});
	$("#replyToggle").click(function () {
		$("#replyArea").toggle();
		if ($("#storage").html() == "1") {
			$("#storage").html("0");
		} else {
			$("#storage").html("1");
		}
	});

	$('#topperNew').colorbox({
		iframe: false,
		transition: "none",
		open: false,
		inline: true,
		href: "#newTicketdialog",
		title: "<font class=\"white\">Create a new Ticket</font>"
	}, function () {
		$("#newTicketType").val("new");
		$("#newTicketTitle,#newTicketDescription").val("");
		$("#newTicketFileList").empty();
		$(".Ticketform").css("background-color", "");

		$("#newTicketDueDate").dateter({
			"pastDayShades": true,
			"backgroundClass": "color-D-2",
			"borderClass": "border-all-B-1",
			"borderRoundClass": "corners-bottom-2 corners-top-2",
			"shadeClass": "background-alpha-3",
			"highLightToday": true,
			"highLightTodayClass": Params.HighlightClass,
			"height": "114px",
			"width": "200px",
			"uniqueName": "smallPickStart",
			"offsetX": 0,
			"offsetY": 0
		}, function (v_Month, v_Day, v_Year) {
			$("#newTicketDueDate").val(v_Month + "/" + v_Day + "/" + v_Year);
		}

		);
	});
	$('#topperSearch').colorbox({
		"transition": "none",
		"open": false,
		"inline": true,
		"href": "#newSearchdialog",
		"title": "<font class=\"white\">Search for a Ticket</font>"
	}, function () {
		$("#newSearchdialog").find(".Ticketform").val('');
	});
	$("#topperRecent").click(function () {
		var position = $(this).position();
		var outWidth = $(this).outerWidth();
		position.right = position.left + $(this).outerWidth();
		var bodyHeight = $('body').height();
		var bodyWidth = $('body').width();
		var RecTick = $("<div/>").css({
			overflow: "hidden",
			width: "150px"
		});
		$.getJSON(uri + "ajax/display_ticket.php", {
			recentOnly: true
		}, function (data) {
			loadRecentTickets(data, $("#recentTickets"));
		});
		Shadow = $("<div style=\" z-index:49;\" id=\"Shadow\"/>").click(function () {
			$("#recentTickets").fadeOut(Params.FadeTime);
			$("#Shadow").remove();
		}).css({
			display: "block",
			top: 0,
			left: 0,
			height: bodyHeight,
			width: bodyWidth,
			position: "absolute"
		});

		if ($("#recentTickets").html()) {
			$("#recentTickets").css({
				"left": position.left
			});
		} else { //no reason to make the box twice
			var recentTickets = $("<div/>").css({
				"top": position.top + 22,
				"left": position.left,
				"position": "absolute",
				"width": "150px",
				"zIndex": "50",
				"textAlign": "left",
				"overflow": "hidden"
			}).addClass("border-all-B-1 color-D-1 corners-bottom-2 corners-top-2").html(RecTick).attr({
				"id": "recentTickets"
			});
			$('body').append(recentTickets);
			$("#recentTickets").show();
		}
		$('body').append(Shadow);
	});

	$("#t_uI").click(function () {
		position = $(this).position();
		$("#departmentTpl").css({
			"top": position.top + 22,
			"left": position.left,
			"position": "absolute",
			"width": "350px"
		}).show();
		bodyHeight = $('body').height();
		bodyWidth = $('body').width();
		Shadow = $("<div style=\" z-index:49;\" id=\"Shadow\"/>").click(function () {
			$("#departmentTpl").fadeOut(Params.FadeTime);
			$("#Shadow").remove();
		}).css({
			display: "block",
			"top": 0,
			"left": 0,
			"height": bodyHeight,
			"width": bodyWidth,
			"position": "absolute"
		});
		$('body').append(Shadow);
	});
	$("#t_fT").click(function () {
		var hash = jQuery.makeArray(window.location.hash.split("\/"));
		var display = $("#imgBookmark");
		if (hash[0] == "#ticket") {
			if (display.css("display") == "block" || display.css("display") == "inline") {
				$.get(uri + "ajax/tickets.php", {
					type: "favorite",
					ticket_id: Params.Ticket_id,
					favorite: 0
				}, function (data) {
					populateAllTickets("f");
					display.toggle();
					notice("Notice", data.message, false);
				}, "json");
			} else {
				$.get(uri + "ajax/tickets.php", {
					type: "favorite",
					ticket_id: Params.Ticket_id,
					favorite: 1
				}, function (data) {
					populateAllTickets("f");
					display.toggle();
					notice("Notice", data.message, false);
				}, "json");
			}
		} else {
			notice("Notice!", "You must first select a ticket!", false);
		}
	});
	$("#btn_login").click(function () {
		if ($("#un").val() === "" || $("#un").val() === null) {
			notice("Error", "Please enter a username", false);
			return;
		} else if ($("#loginpassword").val() === "" || $("#loginpassword").val() === null) {
			notice("Error", "Please enter a password", false);
			return;
		} else {
			jQuery.post(uri + "ajax/login.php", $("#frm_login").serialize(), function (data) {
				
				if (data.error.length > 0) {
					checkResponse(data);
				} else {
					if (uri.match('dev') == 'dev') {
						$("#themegencss").attr("href","http://dev.lapcat.org/lapcat/css/themes/theme-generator.php?theme="+data.theme);
					} else {
						$("#themegencss").attr("href","http://dev.lapcat.org/lapcat/css/themes/theme-generator.php?theme="+data.theme);
					}
					
					Params.LastLogon = data.lastlogon;
					$("#t_uI").html($("<span/>").addClass("user ticket_sprite ticket_button").html(data.firstname + " " + data.lastname + " (" + data.username + ")"));
					checkResponse(data);
					User_id = data.userid;
					$("#newTicketUser_id").val(User_id);
					if (data.opt == 2) {
						$("#userDepartmentNotify").val(2).attr('checked', 'checked');
					}
					$("#userDepartmentName").html(data.departmentname);
					if (data.departmentname === "") {
						notice("Error", "No Department");
					}
					loadStats();
					$("#rss1").attr("href", "ticketsrss.php?id=" + User_id);
					$("#rss2").attr("href", "ticketsrss.php?id=" + User_id + "&bookmark=1");
					if (window.location.hash.length > 1) {
						updateTickets();
						//window.onpopstate = function(event) {checkHash();Params.popChange = true;}; //Building in support for browsers that do not support it
						if(!Params.popChange){checkHash();}
					} else {
						loadNew(data.lastlogon); //show the new tickets
						updateTickets();
					}
					$("#userSecondaryEmail").val(data.altEmail);
					$("#depOk").show();
					$("#depError").hide();
				}
			}, "json");
		}
	});
	//Just a catch for hitten enter on the form
	$("#loginpassword").keydown(function (event) {
		if (event.keyCode == 13) {
			$("#btn_login").trigger('click')
		}
	});
	$("#userDepartmentSelect").change(function () {
		jQuery.post(uri + "ajax/login.php", {
			department_id: $("#userDepartmentSelect option:selected").val(),
			user_id: User_id
		}, function () {
			$("#userDepartmentName").empty().html($("#userDepartmentSelect option:selected").text());
			notice("Notice", "Welcome to the " + $("#userDepartmentSelect option:selected").text() + " Department", false);
		});
	});
	$("#closeNotify").click(function () {
		$("#notifyTpl").fadeOut(Params.FadeTime);
	});
	$("#userDepartmentNotify").click(function () {
		if ($(this).val() == 1) {
			$(this).val(2);
		} else {
			$(this).val(1);
		}
		jQuery.post(uri + "ajax/login.php", {
			user_id: User_id,
			opt: $(this).val()
		}, function (data) {
			checkResponse(data);
		}, "json");
	});
	$('#ReAssignBtn').click(function () {
		var reassignVal = $("#reassignTicketdialog").find("#TicketAssign").val();
		$.fn.colorbox.close();
		$.getJSON(uri + "ajax/tickets.php", {
			"type": "reassign",
			"ticket_id": Params.Ticket_id,
			"user_id": reassignVal
		}, function (data) {
			checkResponse(data);
			if (data.error.length > 1) {} else {
				$("#imgReassigned").show();
				loadResponsesBody(Params.Ticket_id, $("#replyareabody"), 0);
				loadTicket(Params.Ticket_id);
			}
		});
	});
	$("#replyAddBtn").click(function () {
		$.post(uri + "/ajax/add_reply.php", $("#newReplyForm").serialize());
		$(".Ticketform").attr({
			value: ""
		});
		$.fn.colorbox.close();
		loadResponsesBody(Params.Ticket_id, $("#replyareabody"), 0);
	});
	$("#ticketSearchBtn").click(function () {
		var hash = "ticketlist";
		var s_Title = $("#searchTitle").val();
		var s_Category = $("#searchCategory").val();
		var s_Assign = $("#searchAssign").val();
		var s_Priority = $("#searchPriority").val();
		var s_Department = $("#searchDepartment").val();
		if (s_Title !== "") {
			hash += "/title/" + s_Title;
		}
		if (s_Category !== "") {
			hash += "/category/" + s_Category;
		}
		if (s_Assign !== "") {
			hash += "/assigned/" + s_Assign;
		}
		if (s_Priority !== "") {
			hash += "/priority/" + s_Priority;
		}
		if (s_Department !== "") {
			hash += "/department/" + s_Department;
		}
		setHash(hash);
		loadTicketList();
		$.fn.colorbox.close();
	});
	$("#ticketAddBtn").click(function () {
		var ticketTitle = $("#newTicketTitle");
		var ticketDesc = $("#newTicketDescription");
		if (ticketTitle.val() === "") {
			ticketTitle.focus();
			notice("Error", "You must enter a title", false);
			return false;
		} else {
			if (ticketDesc.val() === "") {
				ticketDesc.focus();
				notice("Error", "You must enter a description", false);
				return false;
			} else {
				if ($("#newTicketLocation").val() === "") {
					notice("Error", "You must select a Location", false);
					return false;
				
				}else if(($("#newTicketDueDate").val() === "")){
					notice("Error", "You must enter a Due date", false);
					return false;
				 }else {
					jQuery.getJSON(uri + "ajax/add_ticket.php", $("#newTicketForm").serialize(), function (data) {
						/*
						$.each(data.achievements,function(a,ach){
							notice("Achievement",ach,false);
						});
						*/
					});
					$(".Ticketform").attr({
						value: ""
					});
					$.fn.colorbox.close();
					loadTicket(Params.Ticket_id);
				}
			}
		}
		populateAllTickets();
	});
	$("#topperStart").click(function(){	loadNew(0); setHash("#start");});
	//Live items
	//Ticket display live items
	
	$(".actionButtons").live("click", function () {
		var queryObj = {};
		if($(this).hasClass("holdLink")){queryObj = {type:"hold",value: 1,ticket_id: Params.TicketJSON.id};}
		if($(this).hasClass("unholdLink")){queryObj = {type:"hold",value: 0,ticket_id: Params.TicketJSON.id};}
		if($(this).hasClass("closeLink")){queryObj = {type:"close",ticket_id: Params.Ticket_id};}
		if($(this).hasClass("openLink")){queryObj = {type:"open",ticket_id: Params.Ticket_id};}
		$.getJSON(uri + "ajax/tickets.php", queryObj,
		function (data) {
			checkResponse(data);
			loadTicketBody(Params.Ticket_id, Params.Content);
			loadResponsesBody(Params.Ticket_id, $("#replyareabody"), 0);; //reload the first response page
		});
	});
	//Global page live 
	$(":text").live("click", function () {
		$(this).select();
		$(this).focus();
	});
	$(".Cancel").live("click", function () {
		$.fn.colorbox.close();
	});
	$(".ticket_link,.nolink").live("click", function () {
		var pageTracker = _gat._getTracker('UA-8067208-4');
		pageTracker._trackPageview($(this).attr("href"));
		setHash($(this).attr("href"));
		if(!Params.popChange){checkHash();} //Need to force a check if the browser is not already doing it.
		
		return false; //to make sure the a isnt clicked
	});
});