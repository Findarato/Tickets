Object.size = function(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};


/**
 * Simple global variables that are needed everywhere
 */
var UploadCnt = 0;
//Setup the global variables for selectors
var Tlb = "";
var uri = window.location.toString();
uri = uri.replace(window.location.hash, "");
//End global selectors
var Params = {
	"FadeTime": 0,
	"Ticket_id": 0,
	"Content": "",
	"Debug":false,
	"TicketJSON": {},
	"LastArea": "",
	"popChange":false,
	"LastLogon":0,
	"Departments":{},
	"UserId":0,
	"Priority_string":{
		1:{"id":1,"name":"Low"},
		2:{"id":2,"name":"Medium"},
		3:{"id":3,"name":"High"},
		4:{"id":4,"name":"Mission Critical"}
	 },
	"Projects":{
		1:{"id":1,"name":"Test 1"},
		2:{"id":2,"name":"Test 2"}
	},
	"Categories":{},
	"Locations":{},
	"FavoriteObject":[],
	"NavArea":""
};

function alertTest(tst){alert(tst);}
function focusMe(id){
	window.scrollBy(0,5000);
	$(id).focus();
}
function oc(a)
{
  var o = {};
  for(var i=0;i<a.length;i++)
  {
    o[a[i]]='';
  }
  return o;
}
function checkHash() {
	var hash = getHashArray();
	if (window.location.hash.length > 1) {
		//This checks for a url passed hash, otherwise its just going to go in there.
		switch (hash[0]) {
		case "#ticket":
			changeArea("tickets");
			switch (hash[2]) {
  			case "page": // ticket with a page number selected
  				if ($("#ticketId").html().length < 1) {
  					//This should fix the directly accessing a response page bug
  				} else {
  					loadResponsesBody(hash[1], $("#replyareabody"), hash[3]);
  				}
  				break;
  			default: // ticket with out a page
          loadTicket(hash[1]);
          loadResponsesBody(hash[1], $("#replyareabody"), 0);
  			 break;
  			}
  			break;
		case "#ticketList":
			changeArea("tickets");
			switch (hash[2]) {
				case "page": // ticket with a page number selected
					loadTicketList(hash[3]);
				break;
			
				default: // ticket with out a page
					loadTicketList(0);
				break;
			}
        break;
			break;
		case "#search":
			changeArea("search");
			break;
		case "#largestats": case "#stats":
			changeArea("stats");
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
			if(hash[1] == 0 || hash[1] == ""){ // There is some strange bug we need to fix, but lets just call it good for now
				if(localStorage.userId > 0){ // lets just be sure we are not causing more trouble
					loadUserPage(localStorage.userId); // just load the local user's info page
				}
			}else{ // this is when everything works properly.
				loadUserPage(hash[1]); // load the userpage that is requested.
			}
		break;
		case "#login":
			loadLoginPage();
		break;
		case "#tickets":// this triggers when the tab tickets is clicked
			changeArea("tickets");
			case "#search":
			loadTicketList(0,{"search":"","area":"all_tickets"});
		break;
		case "#bugs": // this triggers when the tab tickets is clicked
			changeArea("bugs");
			loadTicketList(0,{"search":"","area":"all_bugs"});
		break;
		case "#admin": // this triggers when the tab tickets is clicked
			Modernizr.load('js/admin.js');		
			changeArea("admin");
			Params.LastArea = "admin";
			//Params.Content.load("templates/email.tpl");
		break;		
		}
		//if(Params.NavArea!="tickets"){changeArea("tickets");Params.NavArea=="tickets"}
	} else {
		//loadNew(Params.LastLogon);
		//alert("blah");
		if(localStorage.userId > 0){
			setHash("#ticketList/all_tickets");
			/*checkHash*/
		}else{
			setHash("#login");
			/*checkHash*/
		}
	}
}
function updateFavorites(){
  localStorage.setItem("ticketsFavorite",JSON.stringify(Params.FavoriteObject));
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
	loadTicketList(0,{"area":"new","dateTime":timestamp});
	$("#ticketListtitle").html("Tickets with activity since your last visit");
}
function loadBlank() {
	Params.LastArea = "UpdateNotes";
	Params.Content.load("ajax/updateNotes.php");
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
   if(data.status===0){
     notice("Error","You have been logged out for inactivity",true);     
   }
	});
	var dat = new Date();
	var Lastcheck = Math.round(dat.getTime() / 1000.0); //set the global variable to now
	
}
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
	}).addClass("rountAll4 color-B-2 border-all-B-1").append($("<font/>").css({
		margin: "5px"
	}).html("Large Stats for tickets"))).append(holder = $("<div/>").addClass("color-E-2 rountAll4 border-all-B-1").css({
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
function populateAllBugs(Area) {
	var cnt,html,Ttype;
	$.getJSON(uri + "ajax/get_bugs.php", {"all": "1","small":"1"},function (data, text) {
		$("#cBugsOpen").html(data.bugs.open);
		$("#cBugsClosed").html(data.bugs.closed);
	});
}
function updateTickets() {
	checkNotify(Params.LastLogon); //Use the last login time
	//populateAllTickets();
	//populateAllBugs();
}
function loadResponsesBody(ticketId, container, page) {
	var params = {
		"ticket_id": ticketId
	};
	if(page !== undefined){
		if (page.length !== 0) {
			params.page = page;
		} // adds the page number to the request  
	}
	
	$.getJSON(uri + "ajax/display_reply.php", params, function (data) {
		var cnt = 0;
		var resCont = $("<div id=\"responseContainer\" />");
		if(data!==undefined){ //need to make sure there are responses
  		$.each(data.reply, function (i, item) {
	        resCont.append($("#responsestpl").html());
	        resCont.find("#ticketListDueDate").hide();
	        resCont.find("#changemeColor").addClass("").attr({ 
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
	        resCont.find("#replyIcon").attr({id: "icon" + item.id}).css({"background-image":"url(http://www.gravatar.com/avatar/"+item.mdEmail+"?s=32&d=identicon&r=g)"});
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
function loadTicketBody(inputData, container) {
  // lets make sure the previous tickets modifications are gone.
  
  if($("#replyuserid").val()==""){
  	$("#replyuserid").val(localStorage.userId);
  }
  $("#modifyButton").show();
  $(".ticketData").remove();
  $("#ticketModifySaveButton,#ticketModifyCancelButton").hide();
  $(".ticketModifyForm").each(function(f,frm){
    me = $(frm);
    myParent = me.parent();
    myParent.html(myParent.data("prevValue"));
  }); 
	//Basically figures out what kind of data is being send to the function and how to deal with it.
	var data = {};
	var bug = false;

	if(typeof inputData == "string" || typeof inputData == "object"){
		if(typeof inputData == "object"){ // this is JSON from loadTicket
		  if (!localStorage.getItem("TicketId" + inputData.id)) { 
        localStorage.setItem("TicketId" + inputData.id,JSON.stringify(inputData));
      }
      data = inputData;
		}else{ // Something odd happened
		  console.log("tried to parse out the inputData");
			data = $.parseJSON(inputData);
		}
	}else{ // data is not a string or an object	
	  notice("Error",inputData+"<br>Error: 100382B",true); 
	}
  if(typeof data != "object"){
      if(data === null){ 
        notice("Error","Data Null<br>Error: 100334B",true);
        return false; 
      }else{
        notice("Error","Data not an Object<br>Error: 100337B",true);
        return false;
      }
  } 
  
  	$("#replyTitleBox").val("RE:"+data.subject)
	if(data.tickettype_id==2){bug=true;}

	if(data.priority>5){data.priority = data.priority -5;} //normalize old data with new numbering scheme
	container.find(".statusImage ").hide();
	Params.TicketId = ticketId = data.id; //set the global
	Params.TicketJSON = data;
		
	bmClass = "bookmarkOff";
  for(var a in Params.FavoriteObject){
    if(Params.FavoriteObject[a]==data.id){
      bmClass = "bookmark";
    }
  }
   container.find("#replyIcon").attr({id: "icon" + data.id}).css({"background-image":"url(http://www.gravatar.com/avatar/"+data.mdEmail+"?s=32&d=identicon&r=g)"});
	container
	 .find("#ticketTitle").html(data.subject)
	
	//alert(data.id)
	container
		.find("#ticketBookmark").addClass(bmClass)
	   		.attr({"name":"bookmark"+data.id});
	
	container
   .find("#ticketDate")
   .addClass("ilb")
   .append(
     $("<div/>",{"class":"ilb ticketData",css:{"font-weight":"normal","margin-left":"4px","width":"auto"}})
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
       $("<div/>",{"class":"ilb contentEdit ticketData",css:{"font-weight":"normal","margin-left":"4px","width":"auto"}})
         .html(
           $("<div/>",{id:"ticketProjectDisplay",html:data.project_name})
         )
     );
	
	if(!bug){ //just ticket stuff
		container.find("#projectBox").hide()
		container.find("#categoryBox").show();
		container.find("#ticketId").html("Ticket ID:");
		container.find("#dueOnBox").show();
		container.find("#assignedToBox").show();
		container.find("#locationBox").show();
		container.find("#ticketBox").show();
    
   container
     .find("#ticketDueDate")
     .addClass("ilb")
     .append(
       $("<div/>",{id:"ticketDueDateDisplay","class":"ilb ticketData contentEdit",css:{"font-weight":"normal","margin-left":"4px","width":"auto"},"html":data.due_on})
     );
  
	container
		.find("#ticketAssignedTo")
			.addClass("ilb")
				.append(
					$("<div/>",{"class":"ilb ticketData",css:{"font-weight":"normal","margin-left":"4px","width":"auto"}})
						.html(
							$("<div/>",{id:"ticketAssignedToDisplay","class":"highLight",html:data.firstname + " " + data.lastname,data:data.assigned_id})
						)
				);				
	container
	  .find("#ticketLocation")
	    .addClass("ilb")
	    .append(
	      $("<div/>",{"class":"ilb contentEdit ticketData",css:{"font-weight":"normal","margin-left":"4px"}})
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
     $("<div/>",{"class":"ilb contentEdit ticketData",css:{"font-weight":"normal","margin-left":"4px"},html:data.description})
   );

  container
   .find("#ticketCategory")
   .addClass("ilb")
   .append(
     $("<div/>",{"class":"ilb contentEdit ticketData",css:{"font-weight":"normal","margin-left":"4px"},html:data.category})
   );

  container
   .find("#ticketCreatedBy")
   .addClass("ilb")
   .append(
     $("<div/>",{"class":"ilb contentEdit ticketData",css:{"font-weight":"normal","margin-left":"4px","width":"auto"}})
       .html(
         $("<div/>",{id:"ticketAssignedByDisplay",html:data.firstname2 + " " + data.lastname2,data:data.created_by_id})
       )
   );
	container.find("#replyticketid").val(ticketId);
	
	container
   .find("#ticketId")
   .addClass("ilb")
   .append(
     $("<div/>",{"class":"ilb ticketData",css:{"font-weight":"normal","margin-left":"4px","width":"auto"}})
       .html(
         $("<div/>",{id:"ticketIdDisplay",html:data.id})
       )
   );
	container
	 .find("#ticketPriority")
	 .addClass("ilb")
	 .append(
	   $("<div/>",{"class":"ilb contentEdit ticketData",css:{"font-weight":"normal","margin-left":"4px"},html:Params.Priority_string[data.priority].name})
	 );
	 
	//
	// Adding edit controls to the page
	//
	$("#ticketModifySaveButton").click(function(){
	  $("#modifyButton").show();
	  $("#ticketModifySaveButton,#ticketModifyCancelButton").hide();
	  values = {"edit":1,"ticketId":data.id};
	  ticketBodyBox = {};
	  $(".ticketModifyForm").each(function(f,frm){ 
      me = $(frm);
      myParent = me.parent();
      switch(this.tagName){
        case "SELECT":
          values[this.name] = me.find(":selected").val();
          myParent.html($(frm).find(":selected").text());
        break;
        case "TEXTAREA":
          values[this.name] = me.val();
          myParent.html($(frm).val());
          ticketBodyBox = myParent;
        break;
        case "INPUT":
          switch(this.type){
            case "text":
              values[this.name] = me.val();
              myParent.html($(frm).val());
            break;
            default:break;  
          }
        break;
        default:alert(this.tagName);break;
      }
    });
    $.getJSON("/tickets/ajax/edit_ticket.php",values,function(data){
      localStorage.removeItem("TicketId"+data.modifiedTicket);
      loadResponsesBody(data.modifiedTicket, $("#replyareabody"), 0);
     // ticketBodyBox.html(data.modifiedTicketBody);
    });
	});
  $("#modifyButton").click(function(){
    $(this).hide();
    $("#ticketModifySaveButton,#ticketModifyCancelButton").show();
    
    //category edit code
    textAreaReplace(container.find("#ticketBody").find(".contentEdit"),container.find("#ticketBody").find(".contentEdit").html());
    //Global Boxes
    selectBoxReplace(container.find("#ticketPriority").find(".contentEdit"),Params.Priority_string[Params.TicketJSON.priority].name,Params.Priority_string);
    if(bug){//this is for the project
      selectBoxReplace(container.find("#ticketProject").find(".contentEdit"),data.project_name,Params.Projects);
    }else{
      selectBoxReplace(container.find("#ticketCategory").find(".contentEdit"),Params.TicketJSON.category,Params.Categories);
      selectBoxReplace(container.find("#ticketLocation").find(".contentEdit"),Params.TicketJSON.locationName,Params.Locations);
      //dueOn = container.find("#ticketDueDate").find(".contentEdit");
      textBoxReplace(container.find("#ticketDueDate").find(".contentEdit"),"","date");
    }
   //textBoxReplace(container.find("#ticketBody").find(".contentEdit"),container.find("#ticketBody").find(".contentEdit").html());
  });
  $("#ticketModifyCancelButton").click(function(){
    $("#modifyButton").show();
    $("#ticketModifySaveButton,#ticketModifyCancelButton").hide();
    $(".ticketModifyForm").each(function(f,frm){
      me = $(frm);
      myParent = me.parent();
      myParent.html(myParent.data("prevValue"));
    });    
  });
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
         $("<div/>",{"class":"ilb contentEdit ticketData",css:{"font-weight":"normal","margin-left":"4px","width":"auto"}})
           .html(
             $("<div/>",{id:"ticketClosedOnDateDisplay",html:data.closed_on})
           )
       );
		if (data.dagoc <  31536000 || data.open == 1) { //newly closed
			container.find(".openTicket").hide();
			container.find(".closedTicket").show();
		} else { //very old closed 
			container.find(".openTicket").hide();
			container.find(".closedTicket").hide();
		}
	} else { //open tickets
		container.find(".openTicket").show();
		container.find(".closedTicket").hide();
	}
	var pri = parseInt(container.find("#ticketPriority").text() - 2, 10);
	$("#replyareaTitle").text("Replies (" + data.responseCount + ")"); //display the total response count
	
	
	//
	//Reply Button
	//
  $("#replyButton").bind('click',function () {
	if($("#newReplyForm").find("#replyDescription").val() != ""){
		//$("#replyBox").css({"height":"0px"});
		$.post(uri + "/ajax/add_reply.php", $("#newReplyForm").serialize(),function(){
			loadResponsesBody(Params.TicketId, $("#replyareabody"), 0);
			$(".Ticketform").attr({value: ""}); 
		});
	}else{}
  });
  
  //
  // Reassign button 
  //	 
   
	 $('#reAssignButton').click(function(){
	   $("#reassignBox").css("height","30px");
	   createSelect($("#TicketAssign"),function(id){})
	 });
	 $("#ReAssignCancelButton").click(function(){
    $("#reassignBox").css({"height":"0px"});
    
   });
  $('#reAssignAcceptButton').click(function () {
    var reassignVal = $("#TicketAssign").val();
    $("#reassignBox").css({"height":"0px"});
    $.getJSON(uri + "ajax/tickets.php", {
      "type": "reassign",
      "ticket_id": Params.TicketId,
      "user_id": reassignVal
    }, function (data) {
      $("#ticketAssignedToDisplay").html($("#TicketAssign option:selected").text());
      localStorage.removeItem("TicketId"+ticketId);
      checkResponse(data);
      if (data.error.length > 1) {} else {
        $("#imgReassigned").show();
        loadResponsesBody(Params.TicketId, $("#replyareabody"), 0);
      }
    });
  });
    	$("#replyBox")
  		.css({
  			"height":"90px"
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
	pageAnator(container.find("#pageAnator").empty(), data.responseCount, 30); //add Page numbers
	displayStatus(data.status, container.find("#ticketStatusImage")); //status icons
	
	$("#ticketTitle").click(function(){
	  me = $(this)
    if(me.hasClass("bookmarkOff")){favVal = 1;}else{favVal = 0;}
    bookmarkId = me.attr("name").replace("bookmark","");
    $.getJSON("ajax/tickets.php",{"type":"favorite","ticket_id":bookmarkId,"favorite":favVal},function(data){
      checkResponse(data);
      if(favVal ==0){//removing a favorite
        for(var i in Params.FavoriteObject){
          if(Params.FavoriteObject[i]==bookmarkId){
           delete Params.FavoriteObject[i];
          }
        }
      }else{
        Params.FavoriteObject[Params.FavoriteObject.length+1] = bookmarkId;
      }
      updateFavorites();
    });
    me.toggleClass("bookmarkOff").toggleClass("bookmark");
	});
}
function loadTicket(ticketId,update) {
	if(Params.LastArea != "ticket"){
	  Params.Content.html($("#ticketTpl").html());
	  Params.LastArea = "ticket";
	}
	if(data = $.parseJSON(localStorage.getItem("TicketId"+ticketId))){
  	loadTicketBody(data,Params.Content);
	}else{
		$.getJSON(uri + "ajax/get_ticket.php", {"ticket_id": ticketId}, function (data) {
  		loadTicketBody(data,Params.Content);
  		localStorage.setItem("TicketId"+ticketId,JSON.stringify(data)); // lets stick it inside of the storage.  
		});
	}
	var hash = getHashArray();
	if (hash[2] == "page" && hash[3] > -1) {
		loadResponsesBody(ticketId, $("#replyareabody"), hash[3]); //load the selected response page
	} else {
		loadResponsesBody(ticketId, $("#replyareabody"), 0);
	} //load the responses page 0
}
function loadTicketList(pageNumber,queryObj) {
	var html = "";
	var bugs = false;
	var ticketCount = 0;
	if (pageNumber < 0) {	pageNumber = 0;}
	var hash = getHashArray();
	if(Params.LastArea == "ticketList"){ // This is a new display of data, not a change of locations
		//alert(Params.Content.html());
		if($("#displayTable").html() == null){
			Params.LastArea = ""; // this is a bug and needs to be reset to keep working;
			//alert("There was an error :255AA Could not find table")
			loadTicketList(pageNumber,queryObj); // lets just take what was passed to this function and recall it 
			return false; // lets get out of the function already
		}
		displayTable = $("#displayTable");
	}else{ // this just needs to be repopulated with out replacing the headers
		Params.LastArea = "ticketList";	
		Params.Content.html($("#generic").html());
		Tlb = $("#ticketListbody").empty();
		displayTable = $("<table/>",{"id":"displayTable","class":"fontMain","cellpadding":"2px","cellspacing":"0",css:{"width":"100%"},id:"ticketListTable"});
		displayTable
			.html(
				$("<tr/>")
					.append(function(){
						var defaultColmns = [
							['','',"20px",true],
							['id','ID',"45px",true],
							['priority','Priority',"70px",true],
							['title','Title',"auto",true],
							['location','Location',"150px",true],
							['category','Category',"150px",true],
							['createdBy','Created By',"150px",true],
							['dueOn','Due On',"150px",false],
							['assigned','Assigned By',"150px",true],
							['createdOn','Created On',"100px",true]
						];
						toolBar = "";
						$.each(defaultColmns,function(index,value){
							if(value[3]==true){ // the colmn is being displayed. this will be useful when you can turn off colmns
								
								toolBar +="<td class='ticketListSortable' style='width:"+value[2]+"'><a href='' style='width:"+value[2]+";position:relative;' data-order='asc' data-value='"+value[0]+"' class=' '>"+value[1]+"</a></td>";	
							}
						});
						return toolBar;
					})
			)
			displayTable
				.find(".ticketListSortable a")
					.attr("href",function(){
						if(hash[2]==$(this).attr('data-value')){
							if(hash[3]!=$(this).attr('data-order')){// lets make some quick adjustments
								$(this).attr('data-order','desc')
							}
						}
						return hash[0]+"/"+hash[1]+"/"+$(this).attr('data-value')+"/"+$(this).attr('data-order')
					})
					.addClass(function(){
						if(hash[2]==$(this).attr('data-value')){
							if(hash[3]==$(this).attr('data-order')){
								if(hash[3] == "asc"){
									return "sortDisplayAsc";
								}else{
									return "sortDisplayDesc";
								}
							}
						}
					})
					.click(function(){
						me = $(this);
						
						
						if(me.attr("data-order")=="desc"){
							me.attr("data-order","asc");
						}else{
							me.attr("data-order","desc");
						}
						me.attr("href",hash[0]+"/"+hash[1]+"/"+me.attr('data-value')+"/"+me.attr('data-order'));
						pageTracker._trackPageview(me.attr("href"));
						setHash(me.attr("href"));
						//return false;
					});
	}
	Tlb.html(displayTable); // lets make sure something gets on the page
	/*
		if(bugs == 1){ //bugs display
		 displayTable.html("<tr><td style='width:20px;'>&nbsp;</td><td>ID</td><td style='width:350px;'>Title</td><td class='ticketProjectLocation'>Project</td><td>Priority</td><td class='ticketCreatedBy'>Created By</td><td>Created On</td></tr>");
		}else{ //tickets display
		}
		*/	
	if(queryObj){
		O_search = queryObj;
		O_search.type = "search";
		O_search.page = pageNumber;	
	    if(hash[0]=="#bugs"){
	    	if(Params.NavArea!="bugs"){changeArea("bugs");Params.NavArea=="bugs";}
	    }else{
	    	if(Params.NavArea!="tickets"){changeArea("tickets");Params.NavArea=="tickets";}
	    }				
	}else{ //this happens when there is no query object being sent.  Also when the tabs are clicked, as a specific query is being used by the tabs
		O_search = {
			"page": pageNumber,
			"search": {}
		};
		if (hash[1]) { //there is something other than #ticketlist
			for (a = 1; a < hash.length; a++) { //we will now loop though search
				if (a == hash.length) {alert("Something is broke :Error #775A2")
				} else {
					/*
					var holder = a + 1;
					if (!hash[holder]) {hash[holder] = "1";	}
					*/
					switch (a){
						case 1: //this should always be the category
							O_search["area"] = hash[1]; 
						break;
						case 2:
							O_search["sort"] = hash[2];
						break;
						case 3:
							O_search["direction"] = hash[3];
						break;						
						default:break;
					}
				}
			} // end for loop
			
		    if(hash[1] == "bugs_open" || hash[1] == "bugs_closed" || O_search.bugs_open == 1 || hash[1]=="bugs"){
		    	if(Params.NavArea!="bugs"){changeArea("bugs");Params.NavArea=="bugs";}
		    }else{
		    	if(Params.NavArea!="tickets"){changeArea("tickets");Params.NavArea=="tickets";}
		    }		
		}	
	}
	$.getJSON(uri + "ajax/get_ticketList.php", O_search, function (data) {
		var s_ocd; //string open closed display
		var s_tr; // string time remaining
    if(O_search.bugs_open == 1 || O_search.bugs_closed == 1){bugs = true}else{bugs = false}
		pageAnator($("#tldPageAnator"), data.ticketCount, 30,pageNumber);
		// This part just adds creates the table and puts the results in it		
		$.each(data.tickets, function (i, item) {
		  bmClass = "bookmarkOff";
		  for(var a in Params.FavoriteObject){
		    if(Params.FavoriteObject[a]==item.id){
		      bmClass = "bookmark";
		    }
		  }
		  displayTable
		    .append(
		     $("<tr/>")
		      .css({"padding":"3px","margin":"3px"})
		      .html(
		        $("<td/>",{"class":"bookmark"})
		          .html(
                $("<div/>",{id:"bookmark"+item.id,css:{},"class":" ticketSprite nolink "+bmClass})
                .click(function(){
                  me = $(this);
                  if(me.hasClass("bookmarkOff")){favVal = 1;}else{favVal = 0;}
                  bookmarkId = this.id.replace("bookmark","");
                  $.getJSON("ajax/tickets.php",{"type":"favorite","ticket_id":bookmarkId,"favorite":favVal},function(data){
                    checkResponse(data);
                    if(favVal ==0){//removing a favorite
                      for(var i in Params.FavoriteObject){
                        if(Params.FavoriteObject[i]==bookmarkId){
                          delete Params.FavoriteObject[i];
                        }
                      }
                    }else{
                      Params.FavoriteObject[Params.FavoriteObject.length+1] = bookmarkId;
                    }
                    updateFavorites();
                  });
                  me.toggleClass("bookmark-off").toggleClass("bookmark");
                })
              )
		      )
		      .append(
		        function(){
	            html = $("<td/>",{"class":"ticketId"})
                .addClass("borderBottomBlack")
                .html($("<a/>").attr({"href": "#ticket/" + item.id}).addClass("nolink fontMain").html(item.id).attr({"id": "ID" + item.id }))
		          return html;
		        }
		         
		      )
		      .append( 
		        $("<td/>")
		          .addClass("borderBottomBlack fontMain ticketPriority")
		          .css({"width":"70px","text-align":"right"})
		          .html(
    		        function(i,html){
    		         if(item.priority>0){
    		           if(item.priority>5){item.priority = item.priority-5;}
    		           //alert(item.priority);
    		           //result = Params.Priority_string[item.priority].name;
    		           result = $("<div/>",{title:Params.Priority_string[item.priority].name}).addClass("pSquare p"+Params.Priority_string[item.priority].name.replace(" ",""));
    		           
    		           }
    		         else{result = Params.Priority_string[0].name;}
    		           return result;
    		        }
    		      )
    		   )		      
		      .append($("<td/>")
		        .addClass("borderBottomBlack",{"class":"ticketTitle"})
		        .html($("<a/>").attr({"href": "#ticket/" + item.id}).addClass("nolink fontBold fontMain").html(item.subject).attr({"id": "subject" + item.id }))
		      )
		      .append(
		        function(){
		          if(bugs){
		            if(item.project_id === undefined || item.project_id == 0){ item.project_id = 1; } // fix bugs that do not have a project.  Default them to the first project
		            return $("<td/>").html(Params.Projects[item.project_id-1].name).addClass("borderBottomBlack fontMain ticketProjectLocation")
		          }else{
		            return $("<td/>").html(item.locationName).addClass("borderBottomBlack fontMain ticketProjectLocation")
		          }
		        }
		      )

		      .append(
		        function(){
		          if(bugs){
		            return $("<td/>").html(item.firstname2+" "+item.lastname2).addClass("borderBottomBlack fontMain ticketCreatedBy")
		          }else{
		            return $("<td/>").html(item.category).addClass("borderBottomBlack fontMain ticketCategory");    
		          }
		        }
		        
		      )
		      .append(
		        function(i,html){
		          if(bugs){
		            return $("<td/>").html(item.created_on).addClass("borderBottomBlack fontMain ticketCreatedOn")
		          }else{
		            return $("<td/>").html(item.firstname2+" "+item.lastname2).addClass("borderBottomBlack fontMain ticketCreatedBy")
		          } 
		        }
		       )
		      .append(
		        function(i,html){
		          if(bugs){
		            return $("<td/>").html(item.created_on).addClass("borderBottomBlack fontMain ticketCreatedOn")
		          }else{
		            return $("<td/>").html(item.firstname+" "+item.lastname).addClass("borderBottomBlack fontMain ticketAssigned")
		          } 
		        }
		       )
		       
		      .append(
		        function(){
		          if(!bugs){
		            return $("<td/>").html(item.due_on).addClass("borderBottomBlack fontMain ticketListDueOn");
		          }  
		        }
		      )
		      .append(
		        function(){
		        	if(!bugs){
		            	return $("<td/>").html(item.created_on).addClass("borderBottomBlack fontMain ticketListCreatedOn");
		           }
		        }
		      )		      
		    )
		});// end of each loop
		
	//	displayTable.append(display);
		
	});
}
function loadUserPage(userId){
	//alert(userId)
	Params.Content.html($("#generic").html());
	Tlb = Params.Content.find("#ticketListbody");
	/*
	Params.Content.find("#ticketListtitle").html("UserPage for "+userId);
	*/
	var localUser = false;
	if (localStorage.userId == userId){localUser = true;}
	
	$("<div/>",{id:"userInfoBox","class":" ",css:{"width":"auto","height":"auto","display":"table","margin-bottom":"3px"}})
		.append(
			$("<div>",{css:{"display":"table-cell","width":"110px"}})
				.append(
					$("<div>",
						{
							id:"userIconBox",
							"class":"small-shadow-black-1 color-B-2 border-all-B-1 roundAll4",
							css:{
								"overflow":"hidden","display":"block","height":"100px","width":"100px","margin":"5px","position":"relative"
							}
						}
					)
					.append(
						$("<div/>",{
							html:"ID:"+userId,
							css:{"font-size":"20px","text-shadow":"2px 2px 2px rgba(255,255,255,.75)","position": "absolute","left": "25px"},
							"class":"fontBold fontMain rotate90 transformTL"
						})
					)
				)
		)
		.append(
			$("<div>",{css:{"display":"table-cell","vertical-align":"top","width":"250px","text-align":"left"}})
				.append( $("<div>",{id:"userName","class":"",css:{"display":"block","margin":"5px","width":"auto"},html:"Username: "})	)
				.append( $("<div>",{id:"realName","class":"",css:{"display":"block","margin":"5px","width":"auto"},html:"Real Name: "})	)
				.append( $("<div>",{id:"joinedOn","class":"",css:{"display":"block","margin":"5px","width":"auto"},html:"Joined On: "})	)
				.append( $("<div>",{id:"userType","class":"",css:{"display":"block","margin":"5px","width":"auto"},html:"Type: "})	)
				.append( $("<div>",{id:"totalTickets","class":"",css:{"display":"block","margin":"5px","width":"auto"},html:"Total Tickets Created: "})	)
				.append( $("<div>",{id:"openTickets","class":"",css:{"display":"block","margin":"5px","width":"auto"},html:"Open Tickets: "})	)
				.append( $("<div>",{id:"avgTicketsTime","class":"",css:{"display":"block","margin":"5px","width":"auto"},html:"Average Ticket Duration: "})	)
				.append( $("<div>",{id:"totalResponses","class":"",css:{"display":"block","margin":"5px","width":"auto"},html:"Total Responses: "})	)
				.append( $("<div>",{id:"totalBugs","class":"",css:{"display":"block","margin":"5px","width":"auto"},html:"Bugs Filed: "})	)
				.append( $("<div>",{id:"openBugs","class":"",css:{"display":"block","margin":"5px","width":"auto"},html:"Open Bugs: "})	)
		)
		.append(
			function(index,html){
				if(!localUser){	alert("broke");return "";} // this is blocking the view of other user's page
				 return $("<div>",{css:{"display":"table-cell","vertical-align":"top","width":"300px"}})
					.append( $("<div>",{id:"userDepartment","class":"",css:{"display":"block","margin":"5px","width":"auto"},html:"Department: "})	)
					.append( $("<div>",{id:"followDepartment","class":"",css:{"position":"relative","display":"block","margin":"5px","width":"auto"},html:"Follow Your Department? "})
						.append(
							$("<button>",{
							"class":"button left ",
							id:"follow",
							"css":{"width":"40px"},
							html:"Yes"})						
						)
						.append(
							$("<button>",{
							"class":"button right negative ",
							id:"unfollow",
							"css":{"width":"40px"},
							html:"No"})						
						)
					)
					.append( $("<div>",{id:"ticketSpecificEmail","class":"",css:{"display":"block","margin":"5px","width":"auto"},html:"Tickets Specific Email: <input id=\"userSecondaryEmail\" style=\"width:125px;\" type=\"email\" value=\"\"> "}) 	)
					//.append( $("<div>",{id:"myTicketsRSS","class":"",css:{"display":"block","margin":"5px","width":"auto"},html:"<a class=\"ticket_button ticketSprite feed\" id=rss1 href=\"ticketsrss.php?id="+Params.UserId+"\" title=\"Tickets involving you\">My Tickets</a>"})	)
					//.append( $("<div>",{id:"myBookmarksRSS","class":"",css:{"display":"block","margin":"5px","width":"auto"},html:"<a class=\"ticket_button ticketSprite feed\" id=rss1 href=\"ticketsrss.php?id="+Params.UserId+"&bookmark=1 \" title=\"Tickets involving you\">My Bookmarks</a>"})	)
					.append(function(){
						//openIdLinks
						return $("<button>",{
							"class":"button ticketPadding3",
							id:"googleLogin",
							"css":{"width":"auto"},
							html:"Link to Google Account"
						});
					})
					.append("<br><br>")
					.append(function(){
						return $("<button>",{
							"class":"button ticketPadding3",
							id:"changeTheme",
							"css":{"width":"auto"},
							html:"Change Theme"							
						});
					})
					.append(function(){
						return $("<button>",{
							"class":"button ticketPadding3",
							"css":{"width":"auto","margin-left":"3px"},
							html:"Reset Tickets",
							click:function(){
								localStorage.clear();
								loadLocalStorage();
								setHash("#ticketList/all_tickets");
								/*checkHash*/
							}							
						});
					})
			} 
		)
		.appendTo(Tlb);
		infoBox = $("<div/>",{"class": "message_body",id:"infoBox"}).html($("#generic").html()).appendTo(Tlb);
		infoBox.find("#ticketListtitle").attr({id:"infoBoxTitle"}).html("Tickets Created");
		infoBox.find("#ticketListbody").attr({id:"infoBoxBody"}).html($("<canvas width=\"730px\" height=\"300px\" id=\"graphDisplay\">Please use a browser that supports canvas</canvas>"));

	if(userId == undefined){
		//alert("test")
		userId = localStorage.userId;
	}
	$.getJSON("ajax/get_userinfo.php",{"userId":localStorage.userId},function(data){
		$("#userIconBox").css({"background-image":"url(http://www.gravatar.com/avatar/"+data.userInfo.mdEmail+"?s=100&d=identicon&r=g)"});
		if(data.userInfo.tickets.departmentName == undefined){
			data.userInfo.tickets.departmentName = "None!";
		}		
		Tlb
			.find("#userDepartment").css("white-space","nowrap")
			.append(
				$("<button style='width:150px;' id='ticketDepartment' name='ticketDepartment' data-select-items='"+JSON.stringify(data.userInfo.departments)+"' class='selectButton'>"+data.userInfo.tickets.departmentName+"</button>")
			)
			.append(
				$("<div/>",{"id":"userDepartmentStatus","html":"temp data","class":"",css:{"display":"inline-block","padding-left":"5px"}}).hide()
			);
			if(data.userInfo.tickets.departmentName == "None!"){
				Tlb.find("#ticketDepartment").addClass("errorPulse");
			}
			createSelect(Tlb.find("#ticketDepartment"),function(value){
				$.getJSON("ajax/login.php",{"user_id":localStorage.userId,"department_id":value},function(data){
					if(data.error != "")
						$("#userDepartmentStatus").text(data.error);
					else
						$("#userDepartmentStatus").text(data.message);
					
					$("#userDepartmentStatus").fadeIn().fadeOut(1500);
				});
					
			});
		if(data.userInfo.openIdLinks > 0){
			Tlb.find("#googleLogin").before("Linked with "+ data.userInfo.openIdLinks + " Google account(s)<br>");
		}
		Tlb.find("#userName").append(data.userInfo.username);
		Tlb.find("#realName").append(data.userInfo.firstname+" "+data.userInfo.lastname);
		Tlb.find("#joinedOn").append(data.userInfo.joined);
		Tlb.find("#userType").append(data.userInfo.type);
		Tlb.find("#userSecondaryEmail").val(data.userInfo.email_address);
		
		Tlb
			.find("#totalTickets")
				.append(data.tickets.byMe)
				.append(
					$("<div/>",{css:{"display":"inline-block","margin-left":"2px"},"class":"fakelink ticketSprite chart"})
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
					$("<div/>",{css:{"display":"inline-block","margin-left":"2px"},"class":"fakelink ticketSprite chart"})
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
					$("<div/>",{css:{"display":"inline-block","margin-left":"2px"},"class":"fakelink ticketSprite chart"})
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
	});
	
	if (localUser) {
		Tlb.find("#follow").click(function(){
			jQuery.post(uri + "ajax/login.php", {
				user_id: localStorage.userId,
				opt: 2
			}, function(data){
				checkResponse(data);
			}, "json");
		});
		Tlb.find("#unfollow").click(function(){
			jQuery.post(uri + "ajax/login.php", {
				user_id: localStorage.userId,
				opt: 1
			}, function(data){
				checkResponse(data);

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
function loadLoginPage(){ 
	Params.Content.load("templates/login.tpl");
}
function changeArea(area){
	var location = $("#subAreaBar");
	if($(".fakeDropDown")){$(".fakeDropDown").replaceWith();} 
		switch(area){
		case "tickets":
			$("#ticketTab").trigger("click");
			location.load("templates/top_ticket.tpl");
			Params.NavArea="tickets";
			$("#tldPageAnator").show();
		break;
		case "bugs":
			$("#bugTab").trigger("click");	
			location.load("templates/top_bug.tpl");
			Params.NavArea="bugs";
		break;
		case "search":
			$("#searchTab").trigger("click");	
			location.load("templates/top_search.tpl");
			$("#tldPageAnator").hide();
		break;
		case "stats":
			$("#statsTab").trigger("click");	
			location.html("");
			$("#tldPageAnator").hide();
		break;
		case "admin":
			$("#adminTab").trigger("click");	
			location.load("templates/top_admin.tpl");
			Params.NavArea="admin";
			$("#tldPageAnator").hide();
		break;
		default:break;
	}
}
function loadLocalStorage(clear){
	if(localStorage.getItem("ticketsVersion") != $("#version").html()){ //Lets just go ahead and clear out the localStorage every time there is a version change.
		localStorage.clear();
		localStorage.setItem("ticketsVersion",$("#version").html());
		loadLocalStorage();
		return; 
	}
 
 
  if(!localStorage.getItem("ticketsFavorite") || localStorage.getItem("ticketsFavorite") =="false" || localStorage.getItem("ticketsFavorite") == "undefined"){
    $.getJSON("ajax/tickets.php",{"type":"small","index":"flist","style":1},function(data){
      Params.FavoriteObject = data.favIds;
      updateFavorites();
    })
  }else{
    Params.FavoriteObject = $.parseJSON(localStorage.getItem("ticketsFavorite"));
  }
  //lets make sure there are categories in the localStorage. Remember to assume localStorage does not work, or is not available
  if(!localStorage.getItem("ticketsCategories")){
    $.getJSON("ajax/get_categories.php",{},function(data){
      localStorage.setItem("ticketsCategories",JSON.stringify(data.categories));
      Params.Categories = data.categories;
    })
  }else{
    Params.Categories = $.parseJSON(localStorage.getItem("ticketsCategories"));
  }
  if(!localStorage.getItem("ticketsProjects")){
    $.getJSON("ajax/get_projects.php",{},function(data){
      localStorage.setItem("ticketsProjects",JSON.stringify(data.projects));
      Params.Projects = data.projects;
    })
  }else{
    Params.Projects = $.parseJSON(localStorage.getItem("ticketsProjects"));
  }

	
 	if(!localStorage.userId || localStorage.userId == 0 || typeof localStorage.userId=="undefined" || typeof localStorage.userId=="string"){// something broke lets take care of it
		$.getJSON("ajax/login.php",{"userIdFetch":1},function(data){
			localStorage.setItem("userId",data.user_id);
		//	localStorage.setItem("mdEmail",data.mdEmail);
    	});	
	}
}
function login(data){ //We need a json array, probably need to parse it, who knows
	//alert(data.message);
	loadLocalStorage();
	
	$.getJSON("ajax/login.php",{"userIdFetch":1},function(data2){
		//alert(data2.mdEmail);
		//localStorage.setItem("userId",data2.user_id);
		localStorage.setItem("mdEmail",data2.mdEmail);
	});
	
	if (data.error.length > 0) {
		checkResponse(data);
	} else {
		Params.LastLogon = data.lastlogon;
		$("#topperUserInfo")
			.html(data.firstname + " " + data.lastname ).attr("href","#");
		
		if($("#headerAvatar").html() != null){
			$("#headerAvatar").css("background-color","#F00").attr("src","http://www.gravatar.com/avatar/"+localStorage.mdEmail+"?s=24&d=identicon&r=g");	
		}else{
			$("#topperUserInfo").append(
				$("<img/>").attr("src","http://www.gravatar.com/avatar/"+localStorage.mdEmail+"?s=24&d=identicon&r=g")
			)	
		}
		
		
		checkResponse(data);
		localStorage.userId = data.userid;
		if(localStorage.tickets = true){
			localStorage.setItem("userId",data.userid);
		}
		
		$("#newTicketUser_id").val(Params.UserId);
		if (data.departmentname === "" || data.departmentname == "None!") {
			setHash("#userPage/"+data.userid);
		}else{
			setHash("#ticketList/all_tickets");
		}
		$("#rss1").attr("href", "ticketsrss.php?id=" + Params.UserId);
		$("#rss2").attr("href", "ticketsrss.php?id=" + Params.UserId + "&bookmark=1");

		//alert(localStorage.mdEmail);
	}
}
window.onpopstate = function(event) { 
  //alert("location: " + document.location + ", state: " + JSON.stringify(event.state)); 
  checkHash(); 
  if($(".fakeDropDown")){$(".fakeDropDown").replaceWith();} 
};

jQuery(document).ready(function () {


	//this should make the logout button in the drop down work.
	$("#popUpLogout")
		.attr({"href":"/ajax/login.php?logout&id="+localStorage.userId})
		.click(function(){
			$.getJSON(this.href,function(){ window.location = "/";})
			localStorage.userId = 0; // lets make sure they can not sneak back in
			return false;
		});

/*
	$("body").live("mousedown :not(.categorySelect)",function(){
		//alert('!')
		if($(".fakeDropDown")){
			$(".fakeDropDown").replaceWith();
		}
	});
*/
	Modernizr.load({
		test: Modernizr.inputtypes.date,
		yep : '',
		nope: '/js/jquery-ui/js/jquery-ui-1.8.15.custom.min.js'
	});


	
	loadLocalStorage(true);
	//localStorage.clear();
	Params.Content = $("#content"); //lets stop searching for it a hundred times
	
	$("#UpdateNotes").click(function(){setHash("#updateNotes");/*checkHash*/});
  	if(Params.UserId>0){
	  	$("#topperUserInfo").attr({"href":"#userPage/"+Params.UserId});	
  	}
	
	$("title").html($("title").html()+"  "+$("#version").html());
	$("#Version").text($("#version").text()); //to make sure the version on tickets is always updated

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
  
  $("#topperNew").live("click",function(){
    Params.LastArea = "newTicket";
    Params.Content.html($("#newTicketdialog").html());
    Params.Content.find("#ticketAssignBox").show();
    Params.Content.find("#newTicketType").val("new");
    Params.Content.find("#newTicketTitle,#newTicketDescription").val("");
    
    try{
    	//$("input[type=date]").live(datepicker());
    	Params.Content.find("#newTicketDueDate").datepicker();
    }catch(e){
    	alert(e);
    }
    
  });
  $("#topperNewBug").live("click",function(){
    Params.LastArea = "newBug";
    Params.Content.html($("#newBugdialog").html());
    Params.Content.find("#ticketAssignBox").show();
    Params.Content.find("#newTicketType").val("new");
    Params.Content.find("#newTicketTitle,#newTicketDescription").val("");
  });  
  	//Clicking login with google button
  	$("#googleLogin").live("click",function(){
  		//window.location = "classes/lightopenid/google.php?login";
 		URL = "classes/lightopenid/google.php?login";
		window.open(URL, '" + id + "', 'toolbar=0,scrollbars=0,location=1,statusbar=0,menubar=0,resizable=0,width=350,height=400,left = 810,top = 290');
  	}); 
	$("#loginButton").live("click",function () {
		if ($("#un").val() === "" || $("#un").val() === null) {
			notice("Error", "Please enter a username", false);
			return;
		} else if ($("#loginpassword").val() === "" || $("#loginpassword").val() === null) {
			notice("Error", "Please enter a password", false);
			return;
		} else {
			jQuery.post(uri + "ajax/login.php", $("#frm_login").serialize(), function (data) {
				login(data);
			}, "json");
		}
	});
	//Just a catch for hitten enter on the form
	$("#loginpassword").keydown(function (event) {
		if (event.keyCode == 13) {
			$("#btn_login").trigger('click')
		}
	});
	$("#ticketAddButton,#bugAddButton").live("click",function () {
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
				if ($("#newTicketLocation").val() === "" && this.id=="ticketAddButton") {
					notice("Error", "You must select a Location", false);
					return false;
				}else if(($("#newTicketDueDate").val() === "" && this.id=="ticketAddButton")){
					notice("Error", "You must enter a Due date", false);
					return false;
				}else if($("#newTicketAssign").val()==0 && this.id=="ticketAddButton"){
          		notice("Error", "You must select a user!", false);
          return false;
				}else {
					$.getJSON(uri + "ajax/add_ticket.php", $("#newTicketForm").serialize(), function (data) {
						if(data.error==""){	
						  setHash("#ticket/"+data.newTicketId); 
						  loadTicket(data.newTicketId);
						  localStorage.removeItem("TicketId"+data.newTicketId);
						}else{}
					});
					$(".Ticketform").attr({
						value: ""
					});
				}
			}
		}
		//populateAllTickets();
	});
	//$("#topperStart").click(function(){	loadNew(0); setHash("#start");});
	
	$("#ticketSearchButton").live("click",function(){
		loadTicketList(0,{"search":$("#ticketSearch").val(),"area":"all_tickets"});//			loadTicketList(0,{"search":"","area":"all_tickets"});
	});

	$(".tab").bind("click",function(){
		$(".tab").removeClass("selectedTab");
		me = $(this);
		me.addClass("selectedTab").blur();
		//me.find(":first-child").trigger("click");
	});

	//
	// Events that need to happen late in the page rendering
	//
	if ($("#topperUserInfo").text().length > 10) {
		/*checkHash*/
		if (localStorage.userId  > 0) {
			$("#rss1").attr("href", "ticketsrss.php?id=" + localStorage.userId );
			$("#rss2").attr("href", "ticketsrss.php?id=" + localStorage.userId  + "&bookmark=1");
		}		
	} //disables running with out being logged in

	//
	//Live items
	//
	
	//Ticket display live items
	$(".actionButtons").live("click", function () {
		if(localStorage.userId == 0){
			setHash("#login");
    		/*checkHash*/
    		return;
		}
		var queryObj = {};
		if($(this).hasClass("holdLink")){queryObj = {type:"hold",value: 1,ticket_id: Params.TicketJSON.id};}
		if($(this).hasClass("unholdLink")){queryObj = {type:"hold",value: 0,ticket_id: Params.TicketJSON.id};}
		if($(this).hasClass("closeLink")){
			queryObj = {type:"close",ticket_id: Params.TicketId};
			var closeResponse = prompt("Why are you closing this ticket","");
			if (closeResponse!=null && closeResponse!=""){
				$.post(uri + "/ajax/add_reply.php", {"title":"Ticket Finished","description":closeResponse,"ticket_id":Params.TicketId,"type":"new","user_id":localStorage.userId},function(){});
			}else{
				return;
			}	
		}
		if($(this).hasClass("openLink")){queryObj = {type:"open",ticket_id: Params.TicketId};}
		$.getJSON(uri + "ajax/tickets.php", queryObj,
		function (data) {
			checkResponse(data);
			localStorage.removeItem("TicketId"+Params.TicketId);
			loadTicket(Params.TicketId);
		});
	});
	$("#forgotPasswordButton").live("click",function(){
		$("#forgotPasswordBox").css({"height":"125px"})
		$("#requestSent").css({"opacity":"0"})
	});
	$("#forgotPasswordSubmitButton").live("click",function(){
		jQuery.post(uri + "ajax/resetPassword.php", $("#frm_resetPassword").serialize(), function (data) {
			data = $.parseJSON(data);
			if(data.error != ""){
				$("#loginErrorMessage").text(data.error).css({"opacity":"1"})
			}else{
				$("#requestSent").css({"opacity":"1"})
				$("#forgotPasswordBox").css({"height":"0"})
			}
		});		
	});
	$("#frm_login").live("focus",function(){
		$("#requestSent").css({"opacity":"0"})
	})
	$("#createForButton").live("click",function(){
		$("#ticketCreateForBox").show();
	});
	//Global page live 
	$(":text").live("click", function () {
		$(this).select();
		$(this).focus();
	});
	
	$("#showOldLoginButton").live("click",function(){
		$("#oldLogin").css({"height":"50px"});
	});
	$(".ticket_link,.nolink,.bug_link").live("click", function () {
		me = $(this);
		var pageTracker = _gat._getTracker('UA-8067208-4');
		switch(me.attr("id")){
			case "topperUserInfo":
				if(me.attr("href")=="#"){
					//me.toggleClass("colorMain-2")
					$("#idBox").toggleClass("colorMain-2");
					$("#userPopup").toggle();
				}
			break;
			default:
				$("#userPopup").hide();
				$("#idBox").removeClass("colorMain-2");
				pageTracker._trackPageview(me.attr("href"));
				setHash(me.attr("href"));
			break;
		}

    	/*checkHash*/
		return false; //to make sure the a isnt clicked
	});
	
	// Last but not least after all the rest of the code is run lets make sure that something gets loaded
	
	checkHash();
	
});