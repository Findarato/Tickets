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
	"Debug":false,
	"TicketJSON": "",
	"LastArea": "",
	"popChange":false,
	"LastLogon":0,
	"Departments":{},
	"Priority_string":{
	  1:{"id":1,"name":"Very Low"},
	  2:{"id":2,"name":"Low"},
	  3:{"id":3,"name":"Tolerable"},
	  4:{"id":4,"name":"Important"},
	  5:{"id":5,"name":"Mission Critical"}
	 },
	"Categories":{}
	
};
var uri = window.location.toString();
uri = uri.replace(window.location.hash, "");
//alert($(window).height());
//alert($(window).width());

function addEditControls(itemEdit,selector,type,obj,callBack){
  callBack = callBack ? callBack : false;
	idSelector = selector.attr("id");
	selector
		.append(
			$("<div/>",{id:idSelector+"Edit","class":"ticket_sprite pencil fakelink",css:{"display":"inline-block"}})
				.click(function(){
					me = $(this);
					myParent = me.parent();
					localStorage.setItem(myParent.attr("id"),myParent.find(".contentEdit").html());
					switch(type){
						default:case "text":
		          myParent.find(".ticket_sprite.cross").css("display","inline-block");
              myParent.find(".ticket_sprite.tick").css("display","inline-block");
							edit = myParent.find(".contentEdit").attr("contentEditable","true").focus();
						break;
						case "textarea":
						  edit = myParent.find(".contentEdit").html();
              myParent.find(".contentEdit").html(
                $("<textarea/>",{id:"editor"}).val(edit)
              );
              //aec =  {markupSet: [{name:'Save', className:'ticket_sprite tick save', replaceWith:} ]};


              mySettings.markupSet.save.replaceWith = function(markitup) {
                callBack(itemEdit, $("#editor").val(), myParent.attr("id"));
                myParent.find(".contentEdit").html(markitup.textarea.value);
                myParent.find(".ticket_sprite.pencil").css("display","inline-block"); 
              }; 
              //test = $.extend({},aec,mySettings);
              $("#editor").markItUp(mySettings);
              //$("#editor").markItUp(mySettings);
						break;
						case "select":
							edit = myParent.find(".contentEdit").text();
					    myParent.find(".ticket_sprite.cross").css("display","inline-block");
              myParent.find(".ticket_sprite.tick").css("display","inline-block");
							myParent.find(".contentEdit").html(
								$("<select/>")
									.append(function(){
										html = "";
										$.each(obj,function(i,item){
											if(item.name == edit){
											 html +="<option selected=selected value="+item.id+">"+item.name+"</option>"; 
											}else{
											 html +="<option value="+item.id+">"+item.name+"</option>";  
											}
												
										})
										return html;
									})
							);
						break;
						
					}
					me.css("display","none");

				})
		)
		.append(
			$("<div/>",{id:idSelector+"Accept","class":"ticket_sprite tick fakelink",css:{"display":"none"}})
				.click(function(){
					me = $(this);
					myParent = me.parent();
					switch (type) {
						default:
						case "text":
							if (callBack) {
								callBack(itemEdit, myParent.find(".contentEdit").text(), myParent.attr("id"))
							}
							myParent.find(".contentEdit").attr("contentEditable","false");
						break;
            case "textarea":
              if (callBack) {
                callBack(itemEdit, $("#editor").val(), myParent.attr("id"));
              }
              myParent.find(".contentEdit").html($("#editor").val());            
            break;
						case "select":
							if (callBack) {
								callBack(itemEdit, myParent.find("select option:selected").val(), myParent.attr("id"))
							}
							myParent.find(".contentEdit").html(myParent.find("select option:selected").text());
						break;
					}
          myParent.find(".ticket_sprite.pencil").css("display","inline-block");
          me.css("display","none");
          myParent.find(".ticket_sprite.cross").css("display","none");
				})
		)
		.append(
			$("<div/>",{id:idSelector+"Cancel","class":"ticket_sprite cross fakelink",css:{"display":"none"}})
				.click(function(){
					me = $(this);
					myParent = me.parent();
					myParent.find(".ticket_sprite.pencil").css("display","inline-block");
					myParent.find(".contentEdit").attr("contentEditable","false");
					me.css("display","none");
					myParent.find(".ticket_sprite.tick").css("display","none");
					myParent.find(".contentEdit").text(localStorage.getItem(myParent.attr("id")));
				})
		)
}

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

function loadLargeBarGraph(selectorId,data,lables) {
	var Bar = new RGraph.Bar(selectorId, data);
	RGraph.Clear(Bar.canvas);
    Bar.Set('chart.labels', lables);
    Bar.Set('chart.gutter',45);
    Bar.Set('chart.background.barcolor1', 'rgba(255,255,255,1)');
    Bar.Set('chart.background.barcolor2', 'rgba(255,255,255,1)');
	  Bar.Set('chart.linewidth', 2);
    Bar.Set('chart.ylabels.count', 3);
    Bar.Set('chart.filled', true);
    Bar.Set('chart.background.grid', true);
    Bar.Set('chart.colors', ['rgba(0,0,0,.60)']);
    Bar.Draw();
}
function loadLargeLineGraph(selectorId,data,lables) {
	//RGraph.Clear(document.getElementById(selectorId));graphDisplay
	RGraph.Clear(document.getElementById("graphDisplay"));
    var line = new RGraph.Line(selectorId, data);
    line.Set('chart.labels', lables);
    line.Set('chart.gutter',45);
    line.Set('chart.background.barcolor1', 'rgba(255,255,255,1)');
    line.Set('chart.background.barcolor2', 'rgba(255,255,255,1)');
    line.Set('chart.linewidth', 2);
    line.Set('chart.ylabels.count', 3);
    line.Set('chart.filled', true);
    line.Set('chart.background.grid', true);
    line.Set('chart.colors', ['rgba(0,0,0,.60)']);
    line.Draw();
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
	var cnt,html,Ttype;
	$.getJSON(uri + "ajax/tickets.php", {"type": "small","index": "all","area": Area,"style": 1},function (data, text) {
		$.each(data.ticket,	function (i, item) {
			cnt = 0;html = "";Ttype = "";
			$("#c" + item.type)
				.html(item.Count);
				Ttype = item.type;
			}
		);
	});
}
function populateAllBugs(Area) {
	var cnt,html,Ttype;
	$.getJSON(uri + "ajax/get_bugs.php", {"all": "1","small":"1"},function (data, text) {
		$("#cBugsOpen").html(data.bugs.open);
		$("#cBugsClosed").html(data.bugs.closed);
	});
}
function updateTickets() {
	checkNotify(Params.LastLogon); //Use the last login time
	populateAllTickets();
	populateAllBugs();
}
function loadResponsesBody(ticketId, container, page) {
	var params = {
		"ticket_id": ticketId
	};
	if(page !== undefined){
  	if (page.length !== 0) {
      params["page"] = page;
    } // adds the page number to the request  
	}
	
	//var resCont = $("<div/>");
	$.getJSON(uri + "ajax/display_reply.php", params, function (data) {
		var cnt = 0;
		var resCont = $("<div/>");
		if(data!==undefined){ //need to make sure there are responses
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
		}
		
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

function loadTicketBody(inputData, container) {
	//Basically figures out what kind of data is being send to the function and how to deal with it.
	var data = {};
	var bug = false;
	if(typeof inputData == "string" || typeof inputData == "object"){
		if(typeof inputData == "object"){
			data = inputData;
		}else{
			data = $.parseJSON(inputData);
		}
		if (typeof data == "object" ) { //We now have an object and need to deal with it
			if (!localStorage.getItem("TicketId" + data.id)) {//local storage Support
				localStorage.setItem("TicketId" + data.id,JSON.stringify(inputData));
			}
		}else{ // received the string ID of a ticket to load
			notice("Debug", inputData+"<br>Error: 100380A", true);
		}
	}else{	notice("Debug",inputData+"<br>Error: 100382B",true); }
	
	if(data.tickettype_id==2){bug=true;}
//Display code.	
	if(data.priority>5){data.priority = data.priority -5;} //normalize old data with new numbering scheme
	container.find(".statusImage ").hide();
	Params.Ticket_id = ticketId = data.id; //set the global
	Params.TicketJSON = data;
	container.find("#ticketTitle").html(data.subject);
	container
   .find("#ticketDate")
   .addClass("ilb")
   .append(
     $("<div/>",{"class":"ilb",css:{"font-weight":"normal","margin-left":"4px","width":"auto"}})
       .html(
         $("<div/>",{id:"ticketDateDisplay",html:data.created_on})
       )
   );
	
	container.find("#ticketId").html("Bug ID:");
	container.find("#projectBox").show()
	container.find("#categoryBox").hide();
	
	container
     .find("#ticketProject")
     .addClass("ilb")
     .append(
       $("<div/>",{"class":"ilb",css:{"font-weight":"normal","margin-left":"4px","width":"auto"}})
         .html(
           $("<div/>",{id:"ticketDueDateDisplay",html:data.project_name})
         )
     );
	
	
	if(!bug){ //just ticket stuff
		container.find("#projectBox").hide()
		container.find("#categoryBox").show();
		container.find("#ticketId").html("Ticket ID:");
		container.find("#dueOnBox").show();
		container.find("#assignedToBox").show();
		container.find("#locationBox").show();
		container.find("#lockBox").show();

//		if (data.timeRemaining > 0) { //ticket is over due.
    
   container
     .find("#ticketDueDate")
     .addClass("ilb")
     .append(
       $("<div/>",{"class":"ilb",css:{"font-weight":"normal","margin-left":"4px","width":"auto"}})
         .html(
           $("<div/>",{id:"ticketDueDateDisplay",html:data.due_on})
         )
     );
  
  
  container
   .find("#ticketAssignedTo")
   .addClass("ilb")
   .append(
     $("<div/>",{"class":"ilb contentEdit ticket_button ticket_sprite user",css:{"font-weight":"normal","margin-left":"4px","width":"auto"}})
       .html(
         $("<div/>",{id:"ticketCreatedByDisplay",html:data.firstname + " " + data.lastname,data:data.assigned_id})
       )
   );				
		container
		  .find("#ticketLocation")
		    .addClass("ilb")
		    .append(
		      $("<div/>",{"class":"ilb contentEdit",css:{"font-weight":"normal","margin-left":"4px"}})
		        .html(
		          $("<div/>",{id:"ticketlocationDisplay",html:data.locationName})
		        )
		    );
	}
	//Global stuff for bugs and tickets

	container
   .find("#ticketBody")
   .addClass("ilb")
   .append(
     $("<div/>",{"class":"ilb contentEdit",css:{"font-weight":"normal","margin-left":"4px"},html:data.description})
   );

  container
   .find("#ticketCategory")
   .addClass("ilb")
   .append(
     $("<div/>",{"class":"ilb contentEdit",css:{"font-weight":"normal","margin-left":"4px"},html:data.category})
   );

  container
   .find("#ticketCreatedBy")
   .addClass("ilb")
   .append(
     $("<div/>",{"class":"ilb contentEdit ticket_button ticket_sprite user",css:{"font-weight":"normal","margin-left":"4px","width":"auto"}})
       .html(
         $("<div/>",{id:"ticketCreatedByDisplay",html:data.firstname2 + " " + data.lastname2,data:data.created_by_id})
       )
   );
	container.find("#replyticketid").val(ticketId);
	container
   .find("#ticketId")
   .addClass("ilb")
   .append(
     $("<div/>",{"class":"ilb",css:{"font-weight":"normal","margin-left":"4px","width":"auto"}})
       .html(
         $("<div/>",{id:"ticketIdDisplay",html:data.id})
       )
   );
	container
	 .find("#ticketPriority")
	 .addClass("ilb")
	 .append(
	   $("<div/>",{"class":"ilb contentEdit",css:{"font-weight":"normal","margin-left":"4px"},html:Params.Priority_string[data.priority].name})
	 );
	 
	 
	/// Adding edit controls to the page
  
  addEditControls(Params.UserId,container.find("#ticketBody"),"textarea",{},
  function(userId,value,item){
    $.getJSON("ajax/add_ticket.php",{"user_id":userId,"val":value,"item":item,"edit":1,"debug":1},function(){
      
      //do some stuff here      
    });
  });

  addEditControls(Params.UserId,container.find("#ticketPriority"),"select",Params.Priority_string,
  function(userId,value,item){
    $.getJSON("ajax/add_ticket.php",{"user_id":userId,"val":value,"item":item,"edit":1,"debug":1},function(){
      //some actions need to happen
    });
  });
  addEditControls(Params.UserId,container.find("#ticketCategory"),"select",Params.Priority_string,
  function(userId,value,item){
    //some actions need to happen
    $.getJSON("ajax/add_ticket.php",{"user_id":userId,"val":value,"item":item,"edit":1,"debug":1},function(){
    });
  });


	if (data.favorite !== null && data.favorite!==0) {
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
	    container
       .find("#ticketClosedOnDate")
       .addClass("ilb")
       .append(
         $("<div/>",{"class":"ilb contentEdit",css:{"font-weight":"normal","margin-left":"4px","width":"auto"}})
           .html(
             $("<div/>",{id:"ticketClosedOnDateDisplay",html:data.closed_on})
           )
       );
		
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
	var pri = parseInt(container.find("#ticketPriority").text() - 2, 10);
	$("#replyareaTitle").text("Replies (" + data.responseCount + ")"); //display the total response count
/*
	$('#editlink').colorbox({
		iframe: false,
		transition: "none",
		open: false,
		inline: true,
		href: "#newTicketdialog",
		title: "<font class=\"white\">Edit Ticket</font>"
	}, function () {
	  $("#ticketAssignBox").hide();
		$("#newTicketDescription").val(Params.TicketJSON.dbDescription);
		$("#newTicketTitle").val(Params.TicketJSON.subject);
		$("#newTicketLocation").val(Params.TicketJSON.locationName);
		$("#newTicketTicket_id").val(Params.TicketJSON.id);
		$("#newTicketType").val("edit");
		$("#newTicketPriority").val(Params.TicketJSON.priority - 1);
		$("#newTicketAssign").val(Params.TicketJSON.firstname + " " + Params.TicketJSON.lastname);
		$("#newTicketCategory").val(Params.TicketJSON.category);
		$("#newTicketDueDate").val(Params.TicketJSON.due_on);
		$("#ticketAddBtn").text("Commit Changes").css("width","auto");
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
	*/
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
		$("#replyuserid").val(Params.UserId);
	});
	$('#ReAssignlink').colorbox({
		transition: "none",
		open: false,
		inline: true,
		href: "#reassignTicketdialog",
		title: "<font class=\"white\">Reassign Ticket</font>"
	});
	$(".popImageSmallLink").colorbox({
		transition: "none",
		open: false,
		photo:true,
		title: "<span class=\"white\">Zoomed Image</span>"
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
	//loadRecentTickets(data.recentTickets, $("#recentTickets")); //Recent ticket list
	displayStatus(data.status, container.find("#ticketStatusImage")); //status icons
}
/**
 * Loads the ticket value into the display
 *
 * @param {int} ticketId
 */

function loadTicket(ticketId,display) {
	Params.LastArea = "ticket";
	if(!display){Params.Content.html($("#ticketTpl").html());}
	if(data = localStorage.getItem("TicketId"+ticketId)){
		if (Params.Debug) {	$("#DebugLog").append("Pulled from localStorage<br>");	}
		loadTicketBody(data,Params.Content);
	}else{
		if (Params.Debug) {	$("#DebugLog").append("Pulled from Database<br>");}
		$.getJSON(uri + "ajax/get_ticket.php", {"ticket_id": ticketId}, function (data) {loadTicketBody(data,Params.Content);});	
	}
	var hash = getHashArray();
	if (hash[2] == "page" && hash[3] > -1) {
		if (Params.Debug) {
			$("#DebugLog").append("Loaded Responses #" + hash[3] + "<br>");
		}
		loadResponsesBody(ticketId, $("#replyareabody"), hash[3]); //load the selected response page
	} else {
		if (Params.Debug) {
			$("#DebugLog").append("Loaded Responses<br>");
		}
		loadResponsesBody(ticketId, $("#replyareabody"), 0);
	} //load the responses page 0
}
function loadTicketList(pageNumber,queryObj) {
	Params.LastArea = "ticketList";
	var html = "";
	var bugs = false;
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
	    if(hash[1] == "bugs_open" || hash[1] == "bugs_closed" || O_search.bugs_open == 1){bugs == true;}		
		}	
	}
	
	
	$.getJSON(uri + "ajax/tickets.php", O_search, function (data) {
		var s_ocd; //string open closed display
		var s_tr; // string time remaining
		Params.Content.html($("#generic").html());
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
				"href": "#ticketList/assigned/" + item.assigned_id
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
			if(item.tickettype_id == 1){ //This information is only needed on tickets, not bug reports
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
        }else { //Open ticket
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
			}
			tlistHolder.find("#changemeBody").html(item.description).attr({
				"id": "body" + item.id
			});
			tlistHolder.find("#changemeDay").html(sec2readable(item.dago)).attr({
				"id": "created" + item.id
			});
			tlistHolder.find("#changemeCategory").html("Category: ").append($("<a/>").attr({
				"href": "#ticketList/category/" + item.category
			}).addClass("nolink category_link").html(item.category)).css({
				"fontSize": "9px"
			}).attr({
				"id": "category" + item.id
			});
			tlistHolder.find("#changemeAssignedid").html("Created By:").append($("<a/>").attr({
				"href": "#ticketList/created_by/" + item.created_by_id
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
function loadUserPage(userId){
	Params.Content.html($("#generic").html());
	Tlb = Params.Content.find("#ticketListbody");
	Params.Content.find("#ticketListtitle").html("UserPage for "+userId);
	var localUser = false;
	if (Params.UserId == userId){localUser = true;}
	if (localStorage.Userid == userId){localUser = true;}

	$("<div/>",{id:"userInfoBox","class":"",css:{"width":"auto","height":"auto","display":"table","margin-bottom":"3px"}})
		.append(
			$("<div>",{css:{"display":"table-cell","width":"110px"}})
				.append(
					$("<div>",
						{
							id:"userIconBox",
							"class":"small-shadow-black-1 color-B-2 border-all-B-1 corners-bottom-2 corners-top-2",
							css:{
								"overflow":"hidden","display":"block","height":"100px","width":"100px","margin":"5px","position":"relative"
							}
						}
					)
						.append(
							$("<div/>",{
								html:"ID:"+userId,
								css:{"font-size":"20px","text-shadow":"2px 2px 2px rgba(100,100,100,.75)","position": "absolute","left": "25px"},
								"class":"font-bold font-X rotate90 transformTL"
							})
						)
				)
		)
		.append(
			$("<div>",{css:{"display":"table-cell","vertical-align":"top","width":"250px","text-align":"left"}})
				.append( $("<div>",{id:"userName","class":"",css:{"display":"block","margin":"5px","width":"auto"},html:"Username: "})	)
				.append( $("<div>",{id:"realName","class":"",css:{"display":"block","margin":"5px","width":"auto"},html:"Real Name: "})	)
				.append( $("<div>",{id:"joinedOn","class":"",css:{"display":"block","margin":"5px","width":"auto"},html:"Joined On: "})	)
			//	.append( $("<div>",{id:"userType","class":"",css:{"display":"block","margin":"5px","width":"auto"},html:"Type: "})	)
				.append( $("<div>",{id:"totalTickets","class":"",css:{"display":"block","margin":"5px","width":"auto"},html:"Total Tickets Created: "})	)
				.append( $("<div>",{id:"openTickets","class":"",css:{"display":"block","margin":"5px","width":"auto"},html:"Open Tickets: "})	)
				.append( $("<div>",{id:"avgTicketsTime","class":"",css:{"display":"block","margin":"5px","width":"auto"},html:"Average Ticket Duration: "})	)
				.append( $("<div>",{id:"totalResponses","class":"",css:{"display":"block","margin":"5px","width":"auto"},html:"Total Responses: "})	)
				.append( $("<div>",{id:"totalBugs","class":"",css:{"display":"block","margin":"5px","width":"auto"},html:"Bugs Filed: "})	)
				.append( $("<div>",{id:"openBugs","class":"",css:{"display":"block","margin":"5px","width":"auto"},html:"Open Bugs: "})	)
		)
		.append(
			function(index,html){
				if(!localUser){	return "";}
				 return $("<div>",{css:{"display":"table-cell","vertical-align":"top","width":"250px"}})
					.append( $("<div>",{id:"userDepartment","class":"",css:{"display":"block","margin":"5px","width":"auto"},html:"Department: "})	)
					.append( $("<div>",{id:"followDepartment","class":"",css:{"position":"relative","display":"block","margin":"5px","width":"auto"},html:"Follow Your Department? "})
						.append(
							$("<div/>",{"class":"corners-bottom-2 corners-top-2 border-all-B-1 color-B-1",css: {"display":"block","width":"70px","position":"relative","height":"23px"}})
								.append(
									$("<div>",{id:"follow",css:{"text-align":"center","display":"inline-block","float":"left","width":"30px","padding":"0","margin":"2px","height":"20px"},"class":"font-Y fakelink",html:"Yes"})
								)
								.append(
									$("<div>",{id:"unfollow",css:{"text-align":"center","display":"inline-block","float":"left","width":"30px","padding":"0","margin":"2px","height":"20px"},"class":"font-Y fakelink",html:"No"})
								)
								.append(
									$("<div/>",{id:"followUnfollowHighlight",css:{"display":"none","position":"absolute","width":"25px","padding":"0","height":"20px","color":"rgba(0,0,0,0)"},"class":"font-Y corners-bottom-2 corners-top-2 border-all-K-1 fuzzyoutlineBlack"})
								)
						)

					)
					.append( $("<div>",{id:"ticketSpecificEmail","class":"",css:{"display":"block","margin":"5px","width":"auto"},html:"Tickets Specific Email: <input id=\"userSecondaryEmail\" style=\"width:125px;\" type=\"email\" value=\"\"> "}) 	)
					.append( $("<div>",{id:"myTicketsRSS","class":"",css:{"display":"block","margin":"5px","width":"auto"},html:"<a class=\"ticket_button ticket_sprite feed\" id=rss1 href=\"ticketsrss.php?id="+Params.UserId+"\" title=\"Tickets involving you\">My Tickets</a>"})	)
					.append( $("<div>",{id:"myBookmarksRSS","class":"",css:{"display":"block","margin":"5px","width":"auto"},html:"<a class=\"ticket_button ticket_sprite feed\" id=rss1 href=\"ticketsrss.php?id="+Params.UserId+"&bookmark=1 \" title=\"Tickets involving you\">My Bookmarks</a>"})	)
			} 
		)
		.appendTo(Tlb);
		infoBox = $("<div/>",{"class": "message_body",id:"infoBox"}).html($("#generic").html()).appendTo(Tlb);
		infoBox.find("#ticketListtitle").attr({id:"infoBoxTitle"}).html("Tickets Created");
		infoBox.find("#ticketListbody").attr({id:"infoBoxBody"}).html($("<canvas width=\"730px\" height=\"300px\" id=\"graphDisplay\">Please use a browser that supports canvas</canvas>"));


	$.getJSON("ajax/get_userinfo.php",{"userId":userId},function(data){
		Tlb.find("#userDepartment").append($("<div/>",{"class":"ilb contentEdit",html:data.userInfo.tickets.departmentName}));
		addEditControls(Params.UserId,$("#userDepartment"),"select",data.userInfo.departments,function(userId,value,item){
			$.getJSON("ajax/login.php",{"user_id":userId,"department_id":value})
		});
		Tlb.find("#userName").append(data.userInfo.username);
		Tlb.find("#realName").append(data.userInfo.firstname+" "+data.userInfo.lastname);
		Tlb.find("#joinedOn").append(data.userInfo.joined);
		Tlb.find("#userType").append(data.userInfo.type);
		Tlb.find("#userSecondaryEmail").val(data.userInfo.tickets.altEmail);
		Tlb
			.find("#totalTickets")
				.append(data.tickets.byMe)
				.append(
					$("<div/>",{css:{"display":"inline-block","margin-left":"2px"},"class":"fakelink ticket_sprite chart"})
						.click(function(){
							$("#infoBoxTitle").html(data.tickets.graph.byMe.title);
							graphData = [];
							lables = [];
							$.each(data.tickets.graph.byMe.data,function(i,item){
								graphData.push(parseInt(item.total));
								lables.push(data.tickets.graph.monthLables[item.month-1]);
							});
							loadLargeBarGraph("graphDisplay",graphData,lables);
						}).trigger("click")
				);
		Tlb.find("#openTickets").append(data.tickets.toMe);
		Tlb
			.find("#totalResponses")
				.append(data.responses.created)
				.append(
					$("<div/>",{css:{"display":"inline-block","margin-left":"2px"},"class":"fakelink ticket_sprite chart"})
						.click(function(){
							$("#infoBoxTitle").html(data.responses.graph.byMe.title);
							graphData = [];
							lables = [];
							$.each(data.responses.graph.byMe.data,function(i,item){
								graphData.push(parseInt(item.total));
								lables.push(data.tickets.graph.monthLables[item.month-1]);
							});
							loadLargeBarGraph("graphDisplay",graphData,lables);
						})
				);
		Tlb
			.find("#totalBugs")
				.append(data.bugs.byMe)
				.append(
					$("<div/>",{css:{"display":"inline-block","margin-left":"2px"},"class":"fakelink ticket_sprite chart"})
						.click(function(){
							$("#infoBoxTitle").html(data.bugs.graph.byMe.title);
							graphData = [];
							lables = [];
							$.each(data.bugs.graph.byMe.data,function(i,item){
								graphData.push(parseInt(item.total));
								lables.push(data.tickets.graph.monthLables[item.month-1]);
							});
							loadLargeBarGraph("graphDisplay",graphData,lables);
						})
						
				);
		Tlb.find("#openBugs").append(data.bugs.byMeOpen);
		if (localUser) {
			if (data.userInfo.tickets.notify == 2) { //1 = following. 0,2,nothing = not following
				loc = Tlb.find("#follow").position();
				Tlb.find("#followUnfollowHighlight").css({
					"top": loc.top,
					"left": loc.left + 5
				}).html("Yes").show();
			}
			else {
				loc = Tlb.find("#unfollow").position();
				Tlb.find("#followUnfollowHighlight").css({
					"top": loc.top,
					"left": loc.left + 5
				}).html("No").show();
			}
			
		}
	});
	
	if (localUser) {
		Tlb.find("#follow").click(function(){
			jQuery.post(uri + "ajax/login.php", {
				user_id: Params.UserId,
				opt: 2
			}, function(data){
				checkResponse(data);
				loc = Tlb.find("#follow").position();
				Tlb.find("#followUnfollowHighlight").css({
					//"top": loc.top,
					"left": loc.left + 5
				});
			}, "json");
		});
		Tlb.find("#unfollow").click(function(){
			jQuery.post(uri + "ajax/login.php", {
				user_id: Params.UserId,
				opt: 1
			}, function(data){
				checkResponse(data);
				loc = Tlb.find("#unfollow").position();
				Tlb.find("#followUnfollowHighlight").css({
					//"top": loc.top,
					"left": loc.left + 5
				});
			}, "json");
		});
		Tlb.find("#userSecondaryEmail").blur(function(){
			jQuery.post(uri + "ajax/login.php", {
				"altEmail": $(this).val()
			}, function(data){
				checkResponse(data);
				if (data.error.length === 0) {
					$("#depOk").show();
					$("#depError").hide();
				}
				else {
					$("#depOk").hide();
					$("#depError").show();
				}
			}, "json");
			
		});
	}

}
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
		case "#ticketList":
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
		case "#userPage":
			loadUserPage(hash[1]);
		break;
		}
	} else {
		loadNew(Params.LastLogon);
	}
}

jQuery(document).ready(function () {
  
  if(localStorage.getItem("version") != $("#version").html()){ //Lets just go ahead and clear out the localStorage every time there is a version change.
    localStorage.clear();
    localStorage.setItem("version",$("#version").html()); 
  }
  
  $("#UpdateNotes").click(function(){setHash("#updateNotes");checkHash();});
  
	localStorage.tickets = "true";
	if(Params.UserId == 0 || Params.UserId===undefined || !localStorage.userId){
		Params.UserId = $("#userIdHolder").text();
		localStorage.userId = Params.UserId;
	}
	populateAllBugs();
	if (Params.Debug) {	$("#DebugLogDisplay").show();}
	$("#clearLocalStorage").click(function(){
		localStorage.clear();
		if (Params.Debug) {	$("#DebugLog").append("Cleared Local Storage<br>");}
		if(!localStorage.tickets){notice("Debug","Local Storage is cleared!",true);}
		localStorage.tickets = "true";
		return false;
	});
	if(localStorage.tickets = true){$("#featuresBoxDisplay").append($("<div/>",{"class":"table ticket_sprite",title:"Local Storage",css:{"display":"inline-block"}}));}
	if (("WebSocket" in window)) {
		$("#featuresBoxDisplay").append($("<div/>",{"class":"gear ticket_sprite",title:"Web Sockets",css:{"display":"inline-block"}}));
	}
	
	$("title").html($("title").html()+"  "+$("#version").html());
	$("#Version").html($("#version").html()); //to make sure the version on tickets is always updated
	

	if (uri.match('dev') == 'dev') {
		$("#themegencss").attr("href", "http://dev.lapcat.org/" + $("#themegencss").attr("href"));	
	} else {
		$("#themegencss").attr("href", "http://www.lapcat.org/" + $("#themegencss").attr("href"));	
	}
	
	$("#cboxTitle").addClass("color-E-1 border-all-B-1");
	$("#cboxClose").addClass("ticket_sprite bug");
	Params.Content = $("#content"); //lets stop searching for it a hundred times

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
		function ut(){
			updateTickets();
			setTimeout(function(){ut();},30000);
		};ut();
		checkHash();
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
	  $("#ticketAssignBox").show();
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
	$('#topperNewBug').colorbox({
		iframe: false,
		transition: "none",
		open: false,
		inline: true,
		href: "#newBugdialog",
		title: "<font class=\"white\">Report a Bug</font>"
	}, function () {
		$("#newTicketType").val("new");
		$("#newTicketTitle,#newTicketDescription").val("");
		$("#newTicketFileList").empty();
		$(".Ticketform").css("background-color", "");

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
	$("#t_uI").click(function () {setHash("#userPage/"+Params.UserId);checkHash();});
	$("#t_fT").click(function () {
		var hash = jQuery.makeArray(window.location.hash.split("\/"));
		var display = $("#imgBookmark");
		if (hash[0] == "#ticket") {
			localStorage.removeItem("TicketId"+Params.Ticket_id);
			if (display.css("display") == "block" || display.css("display") == "inline") { //Add bookmark
				$.get(uri + "ajax/tickets.php", {
					type: "favorite",
					ticket_id: Params.Ticket_id,
					favorite: 0
				}, function (data) {
					populateAllTickets("f");
					display.toggle();
					notice("Notice", data.message, false);
				}, "json");
				
			} else { //remove bookmark
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
					Params.UserId = data.userid;
					if(localStorage.tickets = true){
						localStorage.setItem("userId",data.userid);
					}
					$("#newTicketUser_id").val(Params.UserId);
					if (data.departmentname === "") {
						notice("Error", "No Department");
					}
					$("#rss1").attr("href", "ticketsrss.php?id=" + Params.UserId);
					$("#rss2").attr("href", "ticketsrss.php?id=" + Params.UserId + "&bookmark=1");
					if (window.location.hash.length > 1) {
						updateTickets();
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
		$.post(uri + "/ajax/add_reply.php", $("#newReplyForm").serialize(),function(){
			loadResponsesBody(Params.Ticket_id, $("#replyareabody"), 0);	
		});
		$(".Ticketform").attr({
			value: ""
		});
		$.fn.colorbox.close();
		
	});
	$("#ticketSearchBtn").click(function () {
		var hash = "ticketList";
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
	$("#ticketAddBtn,#bugAddBtn").click(function () {
		var ticketBug = $("#newTicketBugTrouble");
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
				if ($("#newTicketLocation").val() === "" && ticketBug.val() == 1) {
					notice("Error", "You must select a Location", false);
					return false;
				
				}else if(($("#newTicketDueDate").val() === "" && ticketBug.val() == 1)){
					notice("Error", "You must enter a Due date", false);
					return false;
				 }else {
					$.getJSON(uri + "ajax/add_ticket.php", $("#newTicketForm").serialize(), function (data) {
						/*
						$.each(data.achievements,function(a,ach){
							notice("Achievement",ach,false);
						});
						*/
						if(data.error==""){	setHash("#ticket/"+data.newTicketId); loadTicket(data.newTicketId);}
						
					});
					$(".Ticketform").attr({
						value: ""
					});
					$.fn.colorbox.close();
					localStorage.removeItem("TicketId"+Params.Ticket_id);
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
		if($(this).hasClass("closeLink")){	queryObj = {type:"close",ticket_id: Params.Ticket_id};	}
		if($(this).hasClass("openLink")){queryObj = {type:"open",ticket_id: Params.Ticket_id};}
		$.getJSON(uri + "ajax/tickets.php", queryObj,
		function (data) {
			checkResponse(data);
			localStorage.removeItem("TicketId"+Params.Ticket_id);

			loadTicket(Params.Ticket_id);
			//loadResponsesBody(Params.Ticket_id, $("#replyareabody"), 0);; //reload the first response page
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