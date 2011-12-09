function changeArea(area){
	var location = $("#subAreaBar");
	if($(".fakeDropDown")){$(".fakeDropDown").replaceWith();} 
		switch(area){
		case "tickets":
			$("#ticketTab").trigger("click");
			location.load("/ajax/subMenuRender.php?menu=tickets");
			Params.NavArea="tickets";
			$("#tldPageAnator").show();
		break;
		case "search":
			$("#searchTab").trigger("click");	
			location.load("/ajax/subMenuRender.php?menu=search");
			$("#tldPageAnator").hide();
		break;
		case "stats":
			$("#statsTab").trigger("click");	
			location.html("");
			$("#tldPageAnator").hide();
		break;
		case "admin":
			$("#adminTab").trigger("click");	
			location.load("/ajax/subMenuRender.php?menu=admin");
			Params.NavArea="admin";
			$("#tldPageAnator").hide();
		break;
		default:break;
	}
}
function loadNew(timestamp){
	loadTicketList(0,{"area":"new","dateTime":timestamp});
	$("#ticketListtitle").html("Tickets with activity since your last visit");
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
    $.getJSON("/ajax/edit_ticket.php",values,function(data){
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
		//displayTable = $("<table/>",{"id":"displayTable","class":"fontMain","cellpadding":"2px","cellspacing":"0",css:{"width":"100%"},id:"ticketListTable"});
		
		displayTable = $("<div/>",{"id":"ticketListTable","class":" fontMain",css:{"width":"100%","position":"relative"}});
		
		displayTable
			.append(function(){
					var selectValue = "Sort";
					if(hash[2]){
						selectValue = hash[2];		
					}
					return $("<button/>",{html:selectValue,id:"tableSort","class":"selectButton",css:{"width":"100px","right":"10px","position":"relative"},value:selectValue}).attr("data-select-items",JSON.stringify({"id":"id","priority":"Priority","title":"Title","location":"Location","category":"Category","createdBy":"Created By","CreatedOn":"Created On"}));	
			})
			.append($("<div/>",{id:"tableBody","class":"t",css:{"width":"100%","clear":"both"}}));
			
			createSelect(displayTable.find("#tableSort"),function(value){
				var newHash = "";
				if(hash[2]==value && hash[3]=="asc"){
					newHash = hash[0]+"/"+hash[1]+"/"+value+"/desc";
				}else{
					newHash = hash[0]+"/"+hash[1]+"/"+value+"/asc";	
				}
				setHash(newHash);
				pageTracker._trackPageview(newHash);
			});
	}
	Tlb.html(displayTable) // lets make sure something gets on the page
	var tableBody = displayTable.find("#tableBody"); 
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
		pageAnator($("#tldPageAnator"), data.ticketCount, 30,pageNumber);
		tableBody.empty();
		$.each(data.tickets,function(index,value){
			smallTicket = newTicketTpl.clone();
			smallTicket.find("#ticketId").attr("id","ticketId-"+value.id).html(value.id.toString(16));
			smallTicket.find("#ticketPriority").attr("id","ticketPriority-"+value.id).html(
	    		function(i,html){
	     			if(value.priority>0){
	       				if(value.priority>5){value.priority = value.priority-5;}
	       				if(value.priority == 5)value.priority --;
	       				//result = Params.Priority_string[item.priority].name;
	       				result = $("<div/>",{title:Params.Priority_string[value.priority].name}).addClass("pSquare p"+Params.Priority_string[value.priority].name.replace(" ",""));
					}else{result = Params.Priority_string[0].name;}
					return result;
	    		})	
			smallTicket.find("#title").attr("id","title-"+value.id).html($("<a/>").attr({"href": "#ticket/" + value.id}).addClass("nolink fontBold fontMain").html(value.subject).attr({"id": "subject" + value.id }));
			smallTicket.find("#body").attr("id","body-"+value.id).html(value.description);
			smallTicket.find("#tickCreatedBy").attr("id","tickCreatedBy-"+value.id).html("By: "+value.firstname2+ " " + value.lastname2 );
			smallTicket.find("#tickCreatedOn").attr("id","tickCreatedOn-"+value.id).html("On: "+value.created_on);
			smallTicket.find("#tickCategory").attr("id","tickCategory-"+value.id).html(value.category);
			smallTicket.find("#tickLocation").attr("id","tickLocation-"+value.id).html(value.locationName);
			smallTicket.find("#userPic").attr("id","userPic-"+value.id).css("background-image","url(http://www.gravatar.com/avatar/"+value.md5Email+"?s=32&d=identicon&r=g)");
			tableBody.append(smallTicket);
		});
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
							"class":"fontBold fontMain rotate90 transformTopLeft"
						})
					)
				)
		)
		.append(
			$("<div>",{css:{"display":"table-cell","vertical-align":"top","width":"250px","text-align":"left"}})
				.append( $("<div>",{id:"userName","class":"",css:{"display":"block","margin":"5px","width":"auto"},html:"Username: "})	)
				.append( $("<div>",{id:"realName","class":"",css:{"display":"block","margin":"5px","width":"auto"},html:"Real Name: "})	)
				.append( $("<div>",{id:"joinedOn","class":"",css:{"display":"block","margin":"5px","width":"auto"},html:"Joined On: "})	)
				.append( $("<div>",{id:"userType","class":"",css:{"display":"block","margin":"5px","width":"auto"},html:"Permissions: "})	)
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
				$("<button style='width:150px;' id='ticketDepartment' name='ticketDepartment' data-select-items='"+JSON.stringify(data.departments)+"' class='selectButton'>"+data.userInfo.tickets.departmentName+"</button>")
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
					
					$("#userDepartmentStatus").show();
				});
					
			});
		if(data.userInfo.openIdLinks > 0){
			Tlb.find("#googleLogin").before("Linked with "+ data.userInfo.openIdLinks + " Google account(s)<br>");
		}
		Tlb.find("#userName").append(data.userInfo.username);
		Tlb.find("#realName").append(data.userInfo.firstname+" "+data.userInfo.lastname);
		Tlb.find("#joinedOn").append(data.userInfo.joined);
		Tlb.find("#userType").append(
			function(){
				var returnData = "";
				$.each(data.userInfo.permissions,function(key,value){
					returnData += "<a class='nolink' href='#permissions/"+value.permission_id+"'>"+value.display+"</a> ";
				})
				return returnData;
			}
		);
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