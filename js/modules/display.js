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
		
		displayTable = $("<div/>",{"id":"ticketListTable","class":"t fontMain","cellpadding":"2px","cellspacing":"0",css:{"width":"100%"}});
		displayTable
			.html(
				$("<div/>",{id:"tableHeader","class":"tr",css:{"width":"100%","display":"block"}})
					.html(function(){
						var defaultColmns = [
							['&nbsp;','&nbsp;',"0px",true,],
							['&nbsp;','&nbsp;',"20px",true,],
							['id','ID',"45px",true],
							['priority','Priority',"85px",true],
							['title','Title',"600px",true],
							['location','Location',"150px",true],
							['category','Category',"150px",true],
							['createdBy','Created By',"150px",true],
							['dueOn','Due On',"150px",false],
							['assigned','Assigned By',"150px",false],
							['createdOn','Created On',"100px",true]
						];
						toolBar = "";
						$.each(defaultColmns,function(index,value){
							if(value[3]==true){ // the colmn is being displayed. this will be useful when you can turn off colmns
								toolBar +="<div class='td ticketListSortable' style='width:"+value[2]+"'><a href='' style='width:"+value[2]+";position:relative;' data-order='asc' data-value='"+value[0]+"' class=' '>"+value[1]+"</a></div>";	
							}
						});
						return toolBar;
					})
			).append($("<div/>",{id:"tableBody","class":"t",css:{"width":"100%","clear":"both"}}))
	}
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
	
	Tlb.html(displayTable) // lets make sure something gets on the page
	var tableBody = displayTable.find("#tableBody"); 
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
	

	
	/*
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
		  tableBody
		    .append(
		     $("<div/>",{id:"row"+item.id,"class":"ticketBox"}) // Row of the table
		      .html(
                $("<div/>",{id:"bookmark"+item.id,css:{"width":"20px"},"class":"ticketBookmarkBox nolink "+bmClass})
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
		      .append(
	            $("<div/>",{"class":"ticketId td",css:{"width":"45px"}})
                .addClass("borderBottomBlack")
                .html($("<a/>").attr({"href": "#ticket/" + item.id}).addClass("nolink fontMain").html(item.id).attr({"id": "ID" + item.id }))
		      )
		      .append( 
		        $("<div/>") // Priority
		          .addClass("borderBottomBlack fontMain ticketPriority td")
		          .css({"width":"70px","text-align":"right"})
		          .html(
    		        function(i,html){
    		         if(item.priority>0){
    		           if(item.priority>5){item.priority = item.priority-5;}
    		           if(item.priority == 5)item.priority --;
    		           //result = Params.Priority_string[item.priority].name;
    		           result = $("<div/>",{title:Params.Priority_string[item.priority].name}).addClass("pSquare p"+Params.Priority_string[item.priority].name.replace(" ",""));
    		           
    		           }
    		         else{result = Params.Priority_string[0].name;}
    		           return result;
    		        }
    		      )
    		   )		      
		      .append($("<div/>",{css:{"width":"600px","overflow":"hidden"},"class":"ticketTitle ticketTitleBox borderBottomBlack"})
		        .html($("<a/>").attr({"href": "#ticket/" + item.id}).addClass("nolink fontBold fontMain").html(item.subject).attr({"id": "subject" + item.id }))
		      )
		      .append(
		        function(){
		          if(bugs){
		            if(item.project_id === undefined || item.project_id == 0){ item.project_id = 1; } // fix bugs that do not have a project.  Default them to the first project
		            return $("<div/>").html(Params.Projects[item.project_id-1].name).addClass("borderBottomBlack fontMain ticketProjectLocation td")
		          }else{
		            return $("<div/>").html(item.locationName).addClass("borderBottomBlack fontMain ticketProjectLocation td")
		          } 
		        }
		      )

		      .append(
		        function(){
		          if(bugs){
		            return $("<div/>").html(item.firstname2+" "+item.lastname2).addClass("borderBottomBlack fontMain ticketCreatedBy td")
		          }else{
		            return $("<div/>").html(item.category).addClass("borderBottomBlack fontMain ticketCategory td");    
		          }
		        }
		      )
		      .append(
		        function(i,html){
		          if(bugs){
		            return $("<div/>").html(item.created_on).addClass("borderBottomBlack fontMain ticketCreatedOn td")
		          }else{
		            return $("<div/>").html(item.firstname2+" "+item.lastname2).addClass("borderBottomBlack fontMain ticketCreatedBy td")
		          } 
		        }
		       )
		      .append(
		        function(i,html){
		          if(bugs){
		            return $("<div/>").html(item.created_on).addClass("borderBottomBlack fontMain ticketCreatedOn td")
		          }else{
		            return $("<div/>").html(item.firstname+" "+item.lastname).addClass("borderBottomBlack fontMain ticketAssigned td")
		          } 
		        }
		       )
		      .append(
		        function(){
		          if(!bugs){
		            return $("<div/>").html(item.due_on).addClass("borderBottomBlack fontMain ticketListDueOn ticketLeft");
		          }  
		        }
		      )
		      .append(
		        function(){
		        	if(!bugs){
		            	return $("<div/>").html(item.created_on).addClass("borderBottomBlack fontMain ticketListCreatedOn ticketLeft");
		           }
		        }
		      )		      
		    )
		});// end of each loop
		
	//	displayTable.append(display);
		
	});
	*/
}