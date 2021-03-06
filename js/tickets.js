/**
 * Simple global variables that are needed everywhere
 */
var UploadCnt = 0;
var scrollTop = 0;
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
	"NavArea":"",
	"Features":[]
};
var blankId = 9999999;
var loadStorage = {
  "UserId" : function(){ // load user information
    if(!sessionStorage.userId || sessionStorage.userId == 0 || typeof sessionStorage.userId=="undefined" ){// something broke lets take care of it
      console.log("your userid is missing, let me fix that");
      $.getJSON("ajax/login.php",{"userIdFetch":1},function(data){
        sessionStorage.setItem("userId",data.user_id);
        });
    }
  },
  "Features":function(){    //Features Enabled
      if(!sessionStorage.features || sessionStorage.features == "undefined"){
        $.getJSON("ajax/get_userinfo.php",{"getFeatures":"1"},function(data){
          sessionStorage.setItem("features",JSON.stringify(data.features))
        });
      }    
    },
  "Favorites" : function(){ //Update sessionStorage in a centeral way so that it can be done in other places
      if(!sessionStorage.getItem("ticketsFavorite") || sessionStorage.getItem("ticketsFavorite") =="false" || sessionStorage.getItem("ticketsFavorite") == "undefined")
          $.getJSON("ajax/bookmark.php",{"list":"1"},function(data){
            if(data != "no user" && typeof data == "object"){
              Params.FavoriteObject = data.favIds;
              sessionStorage.setItem("ticketsFavorite",JSON.stringify(Params.FavoriteObject));
              } else
              Params.FavoriteObject = $.parseJSON(sessionStorage.getItem("ticketsFavorite"));
            });
            
  },
  "Categories":function(){
    if(!sessionStorage.getItem("ticketsCategories")){
      $.getJSON("ajax/get_categories.php",{},function(data){
          sessionStorage.setItem("ticketsCategories",JSON.stringify(data.categories));
          Params.Categories = data.categories;
      });
    }else{
      Params.Categories = $.parseJSON(sessionStorage.getItem("ticketsCategories"));
    }    
  },
  "UserInfo":function(){
    if(!sessionStorage.userInfo || sessionStorage.userInfo == "undefined" || sessionStorage.userInfo == undefined || typeof sessionStorage.userInfo != "object" || sessionStorage.userInfo == "[object Object]"){
      $.getJSON("ajax/get_userinfo.php",{"userId":sessionStorage.userId},function(data){
        sessionStorage.setItem("userInfo",JSON.stringify(data.userInfo));
      });
    }    
  },
  "All":function(){loadStorage.UserId();loadStorage.Features();loadStorage.Favorites();loadStorage.Categories();loadStorage.UserInfo();}
}


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
function checkPermissions(){
    var userInfo = $.parseJSON(sessionStorage.userInfo)
    if(userInfo == null || userInfo == undefined || userInfo == "undefined"){
      loadStorage.UserInfo()
      var userInfo = $.parseJSON(sessionStorage.userInfo)
      alert("there was an issue Loading your permissions. We will try again.")
    }
    var result = true;
      for (item in userInfo.permissions){
        var curPermission = userInfo.permissions[item];
        if (curPermission.permission == "VIEW"){
            Spinner(300,"This user has view only permissions");
            alert("This user has view only permissions")
            result = false;
          } else if (curPermission.permission == "ADMIN"){
            Spinner(300,"This user has Admin Permissions");
            result = true;
            break;
          } else if (curPermission.permission == "STAFF" || curPermission.permission == "USER"){
            result = true;
            break;
          } else {
            alert("We are sorry, but you do not have permission to view this area.")
            result = false;
          }  
      }
      return result;
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
			if(sessionStorage.userId >1){
				changeArea("tickets");
				switch (hash[2]) {
					case "page": // ticket with a page number selected
						loadTicketList(hash[3]);
					break;
					default: // ticket with out a page
						loadTicketList(0);
					break;
				}
			}else{
				setHash("#login")					
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
			if(!sessionStorage.userId || sessionStorage.userId<100){
				setHash("#login")
			}else{
				if(sessionStorage.currentTicket >0){
					setHash("#ticket/"+sessionStorage.currentTicket);
				}else{
					setHash("#ticketList/all_tickets");	
				}				
			}
			break;
		case "#userPage":
			if(hash[1] == 0 || hash[1] == ""){ // There is some strange bug we need to fix, but lets just call it good for now
				if(sessionStorage.userId > 0){ // lets just be sure we are not causing more trouble
					loadUserPage(sessionStorage.userId); // just load the local user's info page
				}
			}else{ // this is when everything works properly.
				loadUserPage(hash[1]); // load the userpage that is requested.
			}
		break;
		case "#login":
		  if("userId" in sessionStorage){ // there is a user id
  		  if(sessionStorage.userId >0){
          setHash("#ticketList/all_tickets");
        }else{
          sessionStorage.userId = -1;
          if(sessionStorage.userId == "undefined" || sessionStorage.userId == undefined || sessionStorage.userId == -1){//this comes from a broken login
            loadLoginPage();
          }else{
            alert("There was an error accessing your user information, please report the following code to I.T.\n\n "+sessionStorage.userId+".174A")  
          }
        }
		  }else{
		    loadLoginPage();
		  }
			
		break;
		case "#tickets":// this triggers when the tab tickets is clicked
			changeArea("tickets");
			case "#search":
			loadTicketList(0,{"search":"","area":"all_tickets"});
		break;
		case "#admin": // this triggers when the tab tickets is clicked
			if(sessionStorage.lastArea != "admin" || typeof admin == "undefined"){
				changeArea("admin");
				sessionStorage.lastArea = "admin";
				admin.startAdmin();
			}
			
			switch (hash[1]) {
				case "users": // ticket with a page number selected
					admin.loadAllUsers();
				break;
				case "features":
					admin.loadFeatures();
				break;
			}
		break;		
		}
	} else {
		if(sessionStorage.userId > 0 || sessionStorage.userId==null || sessionStorage.userId==undefined || sessionStorage.userId=="undefined"){
			setHash("#ticketList/all_tickets");
			/*checkHash*/
		}else{
			setHash("#login");
			/*checkHash*/
		}
	}
	
}
function checkResponse(json) {
}
function loadBlank() {
	sessionStorage.lastArea = "UpdateNotes";
	Params.Content.load("ajax/updateNotes.php");
}
function checkNotify(dt) {}
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

	sessionStorage.lastArea = "largeStats";
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
function updateTickets() {
	checkNotify(Params.LastLogon); //Use the last login time
}
function loadSessionStorage(){loadStorage.All();}
if(window.history && window.history.pushState && !jQuery.browser.opera && jQuery.browser.version > 534){
	window.onpopstate = function(event) { 
	  checkHash();
	  if($(".fakeDropDown")){$(".fakeDropDown").replaceWith();} 
	};
}else{
	window.onhashchange = function(){checkHash();}
}

jQuery(document).ready(function () {
  Params.Content = $("#content"); //lets stop searching for it a hundred times
	if(localStorage.userId > 0){// we are just going to take the login information that was orgionaly passed though the login page and move it over to the session
	  console.log("I need to transfer the localStorage over to sessionStorage")
	  sessionStorage.setItem("userId",localStorage.userId);
	  localStorage.userId = -1;
	}
	if(!$("html").hasClass("sessionstorage"))alert("Your browser does not support sessionStorage and can not use Tickets");
	
	//console.log("document is ready");
	
	//this should make the logout button in the drop down work.
	$("#popUpLogout")
		.attr({"href":"/ajax/login.php?logout&id="+localStorage.userId})
		.click(function(){
			$.getJSON(this.href,function(){ window.location = "/";})
			localStorage.clear(); // Lets just clear the localStorage to clear out all of the data
			sessionStorage.clear(); // need to clean up this as well
			return false;
		});

	$("li").click(function(e) {e.preventDefault();});

	Modernizr.load({
		test: Modernizr.inputtypes.date,
		yep : '',
		nope: '/js/jquery-ui/js/jquery-ui-1.8.18.custom.min.js'
	});
	
	$("#UpdateNotes").click(function(){setHash("#updateNotes");/*checkHash*/});
	
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
  	  if(checkPermissions()){
        sessionStorage.lastArea = "newTicket";
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
  	  }
  });
  	//Clicking login with google button
	$("#googleLogin").live("click",function(){window.location = "/classes/lightopenid/google.php?login";	}); 
	
	//Just a catch for hitten enter on the form
	$("#ticketAddButton").live("click",function () {
    if(!checkPermissions()){
      return false;
    }	
		var ticketTitle = $("#newTicketTitle");
		var ticketDesc = $("#newTicketDescription");
		if (ticketTitle.val() === "") {
			ticketTitle.focus();
			return false;
		} else {
			if (ticketDesc.val() === "") {
				ticketDesc.focus();
				return false;
			} else { 
				if ($("#newTicketLocation").val() === "" && this.id=="ticketAddButton") {
					return false;
				}else if(($("#newTicketDueDate").val() === "" && this.id=="ticketAddButton")){
					return false;
				}else if($("#newTicketAssign").val()==0 && this.id=="ticketAddButton"){
          return false;
				}else {
					$.getJSON(uri + "ajax/add_ticket.php", $("#newTicketForm").serialize(), function (data) {
						if(data.error==""){	
						  setHash("#ticket/"+data.newTicketId); 
						  loadTicket(data.newTicketId);
						  sessionStorage.removeItem("TicketId"+data.newTicketId);
						}else{}
					});
					$(".Ticketform").attr({
						value: ""
					});
				}
			}
		}
	});
	$("#ticketSearchButton").live("click",function(){
		loadTicketList(0,{"search":$("#ticketSearch").val(),"area":"all_tickets"});//			loadTicketList(0,{"search":"","area":"all_tickets"});
	});
	$(".tab").bind("click",function(){
		$(".tab").removeClass("selectedTab shadowUp");
		me = $(this);
		me.addClass("selectedTab shadowUp").blur();
		//me.find(":first-child").trigger("click");
	});


	//
	//Live items
	//
	
	//Ticket display live items
	$(".actionButtons").live("click", function () {
		if(sessionStorage.userId == 0){
			setHash("#login");return;
		}
		var queryObj = {};
		if($(this).hasClass("holdLink")){queryObj = {type:"hold",value: 1,ticket_id: Params.TicketJSON.id};}
		if($(this).hasClass("unholdLink")){queryObj = {type:"hold",value: 0,ticket_id: Params.TicketJSON.id};}
		if($(this).hasClass("closeLink")){
			queryObj = {type:"close",ticket_id: Params.TicketId};
			var closeResponse = prompt("Why are you closing this ticket","");
			if (closeResponse!=null && closeResponse!=""){
				$.post(uri + "/ajax/add_reply.php", {"title":"Ticket Finished","description":closeResponse+" #fin","ticket_id":sessionStorage.currentTicket,"type":"new","user_id":sessionStorage.userId},function(data){
				  loadTicket(sessionStorage.currentTicket);
          loadResponsesBody(Params.TicketId, $("#replyareabody"), 0);
				});
			}else{
				return;
			}	
		}
		if($(this).hasClass("openLink")){queryObj = {type:"open",ticket_id: Params.TicketId};}
		$.getJSON(uri + "ajax/tickets.php", queryObj,
		function (data) {
      loadTicket(sessionStorage.currentTicket);
      loadResponsesBody(Params.TicketId, $("#replyareabody"), 0);
		});
	});
	
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
	$(".ticket_link,.nolink,.bug_link").live("click", function (e) {
		me = $(this);
		var pageTracker = _gat._getTracker('UA-8067208-4');
		switch(me.attr("id")){
      case "topperUserInfo":
        pageTracker._trackPageview(me.attr("href"));
        return false;
        e.preventDefault();
			break;
			default:
        pageTracker._trackPageview(me.attr("href"));
        setHash(me.attr("href"));
      break;
		}
    e.preventDefault();
    return false; //to make sure the a isnt clicked
	});
	// Last but not least after all the rest of the code is run lets make sure that something gets loaded
	Spinner(false)
  $(window).scroll(function() {
    if($(window).scrollTop()>0)
      $("header").addClass("shadow");
    else
      $("header").removeClass("shadow");
    
    if($(window).scrollTop() + $(window).height() +1 >= $(document).height()) {
      //console.log("near Bottom");
      if(sessionStorage.lastArea == "ticketList"){
        Spinner(true);
        loadTicketList(parseInt(sessionStorage.currentPage)+1,"",true,function(){Spinner(false)})
      }
    }else{
      Spinner(false);
    }
  });
  checkHash(); // firefox does not fireoff a pop change on a reload like chrome does 
  loadStorage.Favorites();
  loadStorage.UserInfo();
});