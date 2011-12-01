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