var newTicketTpl = 
  $("<div/>",{"class":"ticketBox insideBorder roundAll4 insideBoxShadow newTicketTpl"})
    .html(
      $("<div/>",{"class":"ticketItem"})
        .html( // Ticket Bookmark
          $("<div/>",{"class":"ticketBookmarkBox fake-link roundTopRight4 ticketSprite",id:"ticketFavorite"})
        )
        .append( // User Icon Box
          $("<div/>",{"class":"ticketUserIconBox color260 insideBoxShadow roundAll4",id:"userPic"})
        ) 
        .append( // Ticket ID
          $("<div/>",{"class":"ticketIdBox color260 insideBoxShadow roundAll2","html":8888,id:"ticketId"})
        )
        .append( // Ticket Priority
          $("<div/>",{"class":"ticketPriorityBox color260 insideBoxShadow roundAll2","html":"",id:"ticketPriority"})
        )
        .append( //Ticket Title
          $("<div/>",{"class":"ticketTitleBox ticketTitle",id:"title"}).html("Title of the ticket")
        )
        .append( // Ticket Body
          $("<div/>",{"class":"ticketBodyBox ",id:"body"}).html("Body of the ticket asdf asdfasdf asd fsasdfasdf <br>stuff asddddddd<br>")
        )
        .append( // Ticket Created On
          $("<div/>",{"class":"roundBottomRight4",id:"ticketInfoContainer",css:{"bottom":0,"right":0,"position":"absolute","width":"70%","overflow":"hidden","height":"20px"}})
            .html( // Ticket Created On
              $("<div/>",{"class":" color260 mainBorder roundBottomRight4 ticketCreatedOnBox",id:"tickCreatedOn"}).html("On: Aug. 8, 1982")
            )
            .append( // Ticket Created By
              $("<div/>",{"class":" color260 mainBorder ticketCreatedByBox",id:"tickCreatedBy"}).html("By: John Doe")
            )
            .append( // Ticket Category
              $("<div/>",{"class":" color260 mainBorder ticketCategoryBox",id:"tickCategory"}).html("Cool Category")
            )
            .append( // Ticket Location
              $("<div/>",{"class":" color260 mainBorder ticketLocationBox",id:"tickLocation"}).html("Cool Location")
            )
            .append( // Ticket Assign
              $("<div/>",{"class":" color260 mainBorder ticketLocationBox",id:"tickAssign"}).html("To: John Doe")
            )
        )
    );

function Spinner(run,body){
  notice = $("#notice");
  if(body)notice.text(body);
  if(run){
  	if(run>100){
  		notice.css("bottom","0");
  		//setTimeOut(run,function(){notice.css("bottom","-2em")});
  	}else{
  		notice.css("bottom","0");
  	}
  }else{
    notice.css("bottom","-2em");
  }
}
function changeArea(area){
  var location = $("#subAreaBar");
    switch(area){
      case "tickets":
        sessionStorage.lastArea = area;
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
			Params.NavArea="admin";
			location.html("");
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
	        resCont.find("#replyIcon").attr({id: "icon" + item.id}).css({"background-image":"url(http://www.gravatar.com/avatar/"+item.mdEmail+"?s=32&d=monsterid&r=g)"});
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
  toggles = {due:true, category:true,assign:true,location:true};
  if(sessionStorage.features == "undefined")loadStorage.Features();
  features = $.parseJSON(sessionStorage.features); 
  for(f in features){
   console.log(features[f].feature+ "=" + features[f].status)
   switch(features[f].feature){
     case "DUEDATE":
       if(features[f].status == 0){
          console.log("due date is off")
          toggles.due = false;
        }
     break;
     case "LOCATION":
       if(features[f].status == 0){
          console.log("location is off")
          toggles.location= false;
        }
     break;     
     case "PRIORITY":
       if(features[f].status == 0){
          console.log("location is off")
          toggles.location= false;
        }
     break;   
   }
    
  }
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
        		sessionStorage.setItem("TicketId" + inputData.id,JSON.stringify(inputData));
      		}
      		data = inputData;
		}else{ // Something odd happened
			console.log("tried to parse out the inputData");
			data = $.parseJSON(inputData);
		}
	}else{ // data is not a string or an object	
	   
	}
	if(typeof data != "object"){
    if(data === null) 
      return false; 
		else
			return false;
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
	container.find("#replyIcon").attr({id: "icon" + data.id}).css({"background-image":"url(http://www.gravatar.com/avatar/"+data.mdEmail+"?s=32&d=monsterid&r=g)"});
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
	
	container.find("#categoryBox").show();
	
	container
    	.find("#ticketProject")
     	.addClass("ilb")
     	.append(
			$("<div/>",{"class":"ilb contentEdit ticketData",css:{"font-weight":"normal","margin-left":"4px","width":"auto"}})
				.html(
					$("<div/>",{id:"ticketProjectDisplay",html:data.project_name})
				)
     	);
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
				$("<div/>",{id:"ticketAssignedByDisplay",html:data.firstname2 + " " + data.lastname2,data:data.created_by_id,"title":data.username2})
			)
   		);
	
	container
		.find("#ticketAssignedTo")
		.html(
			$("<div/>")
				.html(
					$("<span/>",{"html":"Assigned To ",css:{"font-weight":"bold"}})
				)
				.append(
					$("<div/>",{"html":data.firstname +" " + data.lastname,"class":"ilb","title":data.username})
				)
		)
		if(toggles.due){ // check to see if due dates are turned on.  If they are insert the code
      container
        .find("#ticketDueDate")
        .html(
          $("<div/>")
            .html(
              $("<span/>",{"html":"Due On ",css:{"font-weight":"bold"}})
            )
            .append(
              $("<div/>",{"html":data.due_on,"class":"ilb"})
            )
        )		  
		}
  if(toggles.location){// turn off location if its not needed
    container
      .find("#ticketLocation")
      .html(
        $("<div/>")
          .html(
            $("<span/>",{"html":"Location ",css:{"font-weight":"bold"}})
          )
          .append(
            $("<div/>",{"html":data.locationName,"class":"ilb"})
          )
      )  
  }
			
	
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
    if(!checkPermissions()){return false;}
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
			sessionStorage.removeItem("TicketId"+data.modifiedTicket);
	      	loadResponsesBody(data.modifiedTicket, $("#replyareabody"), 0);
	    });
	});
	$("#modifyButton").click(function(){
	  if(!checkPermissions()){return false;}
    	$(this).hide();
    	$("#ticketModifySaveButton,#ticketModifyCancelButton").show();
    //category edit code
		textAreaReplace(container.find("#ticketBody").find(".contentEdit"),container.find("#ticketBody").find(".contentEdit").html());
    //Global Boxes
		selectBoxReplace(container.find("#ticketPriority").find(".contentEdit"),Params.Priority_string[Params.TicketJSON.priority].name,Params.Priority_string);
    selectBoxReplace(container.find("#ticketCategory").find(".contentEdit"),Params.TicketJSON.category,Params.Categories);
		selectBoxReplace(container.find("#ticketLocation").find(".contentEdit"),Params.TicketJSON.locationName,Params.Locations);
		textBoxReplace(container.find("#ticketDueDate").find(".contentEdit"),"","date");
  	});
  $("#ticketModifyCancelButton").click(function(){
    if(!checkPermissions()){return false;}
    $("#modifyButton").show();
    $("#ticketModifySaveButton,#ticketModifyCancelButton").hide();
    $(".ticketModifyForm").each(function(f,frm){
      me = $(frm);
      myParent = me.parent();
      myParent.html(myParent.data("prevValue"));
    });    
  });
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
	  if(!checkPermissions()){return false;}
		if($("#newReplyForm").find("#replyDescription").val() != ""){
			$.post(uri + "/ajax/add_reply.php", $("#newReplyForm").serialize(),function(){
				loadResponsesBody(Params.TicketId, $("#replyareabody"), 0);
				$(".Ticketform").attr({value: ""}); 
			});
		}
  	});
  
  //
  // Reassign button 
  //	 
   	
	 
	$('#reAssignButton').click(function(){
	  createSelect($("#ticketAssign"),function(id){},{})
    $("#reassignBox").css({"height":"30px","overflow":"visible"})
	});
	$("#ReAssignCancelButton").click(function(){
		$("#reassignBox").css({"height":"0px","overflow":"hidden"});
  });
  $('#reAssignAcceptButton').click(function () {
    $.getJSON(uri + "ajax/tickets.php", {
      "type": "reassign",
      "ticket_id": sessionStorage.currentTicket,
      "user_id": $("#ticketAssign").attr('data-value')
    }, function (data) {
      $("#ticketAssignedToDisplay").html($("#TicketAssign option:selected").text());
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
	Params.Content.html($("#ticketTpl").html());
	if(sessionStorage.lastArea != "ticket"){
    sessionStorage.lastArea = "ticket";	  
  }
  sessionStorage.setItem("currentTicket",ticketId);
  $.getJSON(uri + "ajax/get_ticket.php", {"ticket_id": ticketId}, function (data) {
    loadTicketBody(data,Params.Content);
  });
}
function loadTicketList(pageNumber,queryObj,append,callback) {
  //Lets setup the variables
  callBackFn = function(){};
  append = append ? append : false;
  callBackFn = callback ? callback : false;
	var html = "";
	var bugs = false;
	var ticketCount = 0;
	var feat = $.parseJSON(sessionStorage.features);
	if (pageNumber < 0) {	pageNumber = 0;}
	sessionStorage.currentPage = pageNumber;
	var hash = getHashArray();
	//Lets start processing the variables
	if(sessionStorage.lastArea == "ticketList"){ // this just needs to be rebuilt with out replacing the headers
		if($("#ticketListTable").html() == null){
			sessionStorage.lastArea = ""; // this is a bug and needs to be reset to keep working;
			loadTicketList(pageNumber,queryObj,append,callback); // lets just take what was passed to this function and recall it 
			return false; // lets get out of the function already
		}else
      displayTable = $("#ticketListTable");
  }else{ // This is a new diplay
		sessionStorage.lastArea = "ticketList";
		
		if(append){
		  Tlb = $("#ticketListbody");
		}else{
		  Params.Content.html($("#generic").html());
		  Tlb = $("#ticketListbody").empty();  
		}
		
		displayTable = $("<div/>",{"id":"ticketListTable","class":" fontMain",css:{"width":"100%","position":"relative"}});
		displayTable
      .append(
				$("<nav/>",{css:{"position":"relative","margin-bottom":"10px"}})
					.append(function(){
						var selectValue = "";
						if(hash[2])
							selectValue = hash[2];		
						return $("<a/>",{html:selectValue,id:"tableSort","class":"gear ddBox ",css:{"width":"80px","font-size":"1em"},value:selectValue}).attr("data-select-items",JSON.stringify({"id":"id","priority":"Priority","title":"Title","location":"Location","category":"Category","createdBy":"Created By","CreatedOn":"Created On"}));	
					})
			)
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
			},{"position":"absolute","right":"10px"});
	}
	
	if(!append)Tlb.html(displayTable) // lets make sure something gets on the page
	if(Params.NavArea!="tickets"){changeArea("tickets");}
	var tableBody = displayTable.find("#tableBody"); 
	if(queryObj && typeof queryObj == "object"){ // lets just make sure we are dealing with the correct information
		O_search = queryObj;
		O_search.type = "search";
		O_search.page = pageNumber;	
	}else{ //this happens when there is no query object being sent.  Also when the tabs are clicked, as a specific query is being used by the tabs
		O_search = {
			"page": pageNumber,
			"search": {}
		};
    if (hash[1]) { //there is something other than #ticketlist
      for (a = 1; a < hash.length; a++) { //we will now loop though search
        if (a == hash.length) {
          alert("Something is broke :Error #775A2")
				} else {
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
		}	
	}
	
	$.getJSON(uri + "ajax/get_ticketList.php", O_search, function (data) {
	  if(typeof data.tickets == "string"){if(callBackFn)callBackFn();return true;};
		if(!append){tableBody.empty();}
		$.each(data.tickets,function(index,value){
			smallTicket = newTicketTpl.clone().addClass("fadeInOpacity");
			smallTicket.find("#ticketFavorite").addClass(function(){
				if($.inArray(value.id,Params.FavoriteObject) != -1){
					return "bookmarkOn";
				}else{
					return "bookmarkOff";
				}
			}).attr("id","ticketFavorite"+value.id).click(function(){
				var me = $(this);
				me.toggleClass("bookmarkOff").toggleClass("bookmarkOn");
				var toggle = "on";
				if(me.hasClass("bookmarkOff")){	toggle = "off";	}
				$.getJSON("ajax/bookmark.php",{"toggle":toggle,"ticket":value.id},function(data){
					if(data.error.length == 0){
						updateFavorites();
					}
				});
			});
			smallTicket.find("#ticketId").attr("id","ticketId-"+value.id).html(value.id);
			smallTicket.find("#ticketPriority").attr("id","ticketPriority-"+value.id).html(
	    		function(i,html){
	    			if(value.priority == undefined){
	    				value.priority = 1;
	    			}
	     			if(value.priority>0){
	       				if(value.priority>5){value.priority = value.priority-5;}
	       				if(value.priority == 5)value.priority --;
	       				result = $("<div/>",{title:Params.Priority_string[value.priority].name}).addClass("pSquare p"+Params.Priority_string[value.priority].name.replace(" ",""));
					}else{$("<div/>",{title:Params.Priority_string[value.priority].name}).addClass("pSquare p"+Params.Priority_string[value.priority].name.replace(" ",""));}
					return result;
	    		})	
			smallTicket.find("#title").attr("id","title-"+value.id).html($("<a/>").attr({"href": "#ticket/" + value.id}).addClass("nolink fontBold fontMain").html(
				function(){
					var returnValue ="";
					$.each(feat,function(i,item){
						if(item.status==0)
							returnValue = value.subject;
						else
							returnValue = "<span style='font-size:.7em'>["+value.category+"]</span> "+value.subject;
					});
					return returnValue;
				})
				.attr({"id": "subject" + value.id }));
			smallTicket.find("#body").attr("id","body-"+value.id).html(value.description);
			smallTicket.find("#tickCreatedBy").attr("id","tickCreatedBy-"+value.id).html("By: "+value.firstname2+ " " + value.lastname2 );
			smallTicket.find("#tickAssign").attr("id","tickAssign-"+value.id).html("To: "+value.firstname+ " " + value.lastname );
			smallTicket.find("#tickCreatedOn").attr("id","tickCreatedOn-"+value.id).html("On: "+value.created_on);
			smallTicket.find("#tickCategory").attr("id","tickCategory-"+value.id).html(value.category);
			smallTicket.find("#tickLocation").attr("id","tickLocation-"+value.id).html(value.locationName);
			smallTicket.find("#userPic").attr("id","userPic-"+value.id).addClass("roundAll4 mainBorder").css("background-image","url(http://www.gravatar.com/avatar/"+value.md5Email+"?s=32&d=monsterid&r=g)");
			tableBody.append(smallTicket);
		});
		if(callBackFn)callBackFn(); // this is now finished. Lets run the call back function if there is one
		$(".ticketCategoryBox").css({"display":"none"});
		$.each(feat,function(i,item){
			switch(item.name){
				case "Categories":
					if(item.status==0)
						$(".ticketCategoryBox").css({"display":"none"});
				break;
				case "Location":
					if(item.status==0)
						$(".ticketLocationBox").css({"display":"none"});
				break;
				case "Due Date":
					if(item.status==0)
						$(".ticketLocationBox").css({"display":"none"});
				break;
				case "Assigned Box":
					if(item.status==0)
						$(".ticketAssignBox").css({"display":"none"});
				break;
				default:break;
			}
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
	if (sessionStorage.userId == userId){localUser = true;}
	
	$("<div/>",{id:"userInfoBox","class":" ",css:{"width":"auto","height":"auto","display":"table","margin-bottom":"3px"}})
		.append(
			$("<div>",{css:{"display":"table-cell","width":"110px"}})
				.append(
					$("<div>",
						{
							id:"userIconBox",
							"class":"insideBoxShadow color2 mainBorder roundAll4",
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
		)
		.append(
			function(index,html){
				if(!localUser){return "";} // this is blocking the view of other user's page
				 return $("<div>",{css:{"display":"table-cell","vertical-align":"top","width":"300px"}})
					.append( $("<div>",{id:"userDepartment","class":"",css:{},html:"<span>Department: </span>"})	)
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
					/*
					.append(function(){
						return $("<button>",{
							"class":"button ticketPadding3",
							id:"changeTheme",
							"css":{"width":"auto"},
							html:"Change Theme"							
						});
					})
					*/
					.append(function(){
						return $("<button>",{
							"class":"button ticketPadding3",
							"css":{"width":"auto","margin-left":"3px"},
							html:"Reset Tickets",
							click:function(){
								localStorage.clear();
								loadSessionStorage();
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
		userId = sessionStorage.userId;
	}
	defaultImage = "http://tickets.lapcat.org/images/tree.png";
	$.getJSON("ajax/get_userinfo.php",{"userId":userId},function(data){
		$("#userIconBox").css({"background-image":"url(http://www.gravatar.com/avatar/"+data.userInfo.mdEmail+"?s=100&d=monsterid&r=g)"});
		if(data.userInfo.tickets.departmentName == undefined){
			data.userInfo.tickets.departmentName = "None!";
		}		
		Tlb
			.find("#userDepartment")
				.css({"height":"auto"})
				.append(
					$("<a style='width:150px;position:relative' id='ticketDepartment' name='ticketDepartment' data-select-items='"+JSON.stringify(data.departments)+"' class='selectButton'>"+data.userInfo.tickets.departmentName+"</a>")
				)
				.append(
					$("<div/>",{"id":"userDepartmentStatus","html":"temp data","class":"",css:{"display":"inline-block","padding-left":"5px"}}).hide()
				);
			if(data.userInfo.tickets.departmentName == "None!"){
				Tlb.find("#ticketDepartment").addClass("errorPulse");
			}
			createSelect(Tlb.find("#ticketDepartment"),function(value){
				$.getJSON("ajax/login.php",{"user_id":sessionStorage.userId,"department_id":value},function(data){
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
				});
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
function loadLoginPage(){ 
  var loginNewBox = Params.Content.find("#ticketLoginList");
  if(loginNewBox.html()==null){
    Params.Content.load("templates/login.tpl");
    loginNewBox = Params.Content.find("#ticketLoginList");
  }
  loadSessionStorage(); // Lets make sure that we load up localStorage
  var feat = $.parseJSON(sessionStorage.features);
  $.each(feat,function(i,item){
    if(item.name=="Local Login" && item.status==0){
      $("#showOldLoginButton").hide();
    }else if(item.name=="Local Login" && item.status==1){
      $("#showOldLoginButton").show();
    }
  });
  
  $.getJSON(uri + "ajax/get_ticketList.php", {"area":"recent","login":1,"count":5}, function (data) {
    loginNewBox.empty();
    $.each(data.tickets.reverse(),function(index,value){
      smallTicket = newTicketTpl.clone();
      smallTicket.find("tickCreatedBy")
      smallTicket.find("#ticketId").attr("id","ticketId-"+value.id).html(value.id.toString(16));
      smallTicket.find("#title").attr("id","title-"+value.id).html(value.subject);
      smallTicket.find("#body").attr("id","body-"+value.id).html(value.description);
      smallTicket.find("#tickCreatedBy").attr("id","tickCreatedBy-"+value.id).html("By: "+value.firstname2+ " " + value.lastname2 );
      smallTicket.find("#tickCreatedOn").attr("id","tickCreatedOn-"+value.id).html("On: "+value.created_on);
      smallTicket.find("#userPic").attr("id","userPic-"+value.id).css("background-image","url(http://www.gravatar.com/avatar/"+value.md5Email+"?s=32&d=identicon&r=g)");
      loginNewBox.append(smallTicket);
    });
  });
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