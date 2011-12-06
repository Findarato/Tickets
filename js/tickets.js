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
var blankId = 9999999;
var newTicketTpl = 
	$("<div/>",{"class":"ticketBox insideBorder roundAll4 border-all-Main-1 newTicketTpl"})
		.html(
			$("<div/>",{"class":"ticketItem"})
				.append( // Ticket Bookmark
					$("<div/>",{"class":"ticketBookmarkBox colorMain-2 roundTopRight4 ticketSprite nolink bookmarkOff",id:"ticketFavorite"})
				)
				.append( // User Icon Box
					$("<div/>",{"class":"ticketUserIconBox colorMain-2 border-all-B-1 roundAll4",id:"userPic"})
				)	
				.append( // Ticket ID
					$("<div/>",{"class":"ticketIdBox colorMain-2 border-all-B-1 roundAll2","html":blankId.toString(16),id:"ticketId"})
				)
				.append( // Ticket Priority
					$("<div/>",{"class":"ticketPriorityBox colorMain-2 border-all-B-1 roundAll2","html":"",id:"ticketPriority"})
				)
				.append( //Ticket Title
					$("<div/>",{"class":"ticketTitleBox ticketTitle",id:"title"}).html("Title of the ticket")
				)
				.append( // Ticket Body
					$("<div/>",{"class":"ticketBodyBox ",id:"body"}).html("Body of the ticket asdf asdfasdf asd fsasdfasdf <br>stuff asddddddd<br>")
				)
				.append( // Ticket Created On
					$("<div/>",{"class":" colorMain-2 border-all-B-1 roundBottomRight4 ticketCreatedOnBox",id:"tickCreatedOn"}).html("On: Aug. 8, 1982")
				)
				.append( // Ticket Created By
					$("<div/>",{"class":" colorMain-2 border-all-B-1 ticketCreatedByBox",id:"tickCreatedBy"}).html("By: John Doe")
				)
				.append( // Ticket Category
					$("<div/>",{"class":" colorMain-2 border-all-B-1 ticketCategoryBox",id:"tickCategory"}).html("Cool Category")
				)
				.append( // Ticket Location
					$("<div/>",{"class":" colorMain-2 border-all-B-1 ticketLocationBox",id:"tickLocation"}).html("Cool Location")
				)

		);
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
	if(localStorage.userId == null || localStorage.userId  == undefined || localStorage.userId  == "undefined" && hash[0] != "#login"){setHash("#login");return;}
	
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
		if(localStorage.userId > 0 || localStorage.userId==null || localStorage.userId==undefined || localStorage.userId=="undefined"){
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
function loadLoginPage(){ 
	var loginNewBox = Params.Content.find("#ticketLoginList");
	if(loginNewBox.html()==null){
		Params.Content.load("templates/login.tpl");
		loginNewBox = Params.Content.find("#ticketLoginList");
	}
	$.getJSON(uri + "ajax/get_ticketList.php", {"area":"recent","login":1,"count":5}, function (data) {
		loginNewBox.empty();
		$.each(data.tickets.reverse(),function(index,value){
			smallTicket = newTicketTpl.clone();
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
function loadLocalStorage(clear){

	//Clear every version update
	if(localStorage.getItem("ticketsVersion") != $("#version").html()){ //Lets just go ahead and clear out the localStorage every time there is a version change.
		localStorage.clear();
		localStorage.setItem("ticketsVersion",$("#version").html());
		loadLocalStorage();
		return; 
	}

	// Userid
	if(!localStorage.userId || localStorage.userId == 0 || typeof localStorage.userId=="undefined" || typeof localStorage.userId=="string"){// something broke lets take care of it
		$.getJSON("ajax/login.php",{"userIdFetch":1},function(data){
			localStorage.setItem("userId",data.user_id);
		});	
	}
 
	// Favorites 
	if(!localStorage.getItem("ticketsFavorite") || localStorage.getItem("ticketsFavorite") =="false" || localStorage.getItem("ticketsFavorite") == "undefined"){
		$.getJSON("ajax/tickets.php",{"type":"small","index":"flist","style":1},function(data){
			Params.FavoriteObject = data.favIds;
			updateFavorites(); //Update localStorage in a centeral way so that it can be done in other places
		});
	}else{
    	Params.FavoriteObject = $.parseJSON(localStorage.getItem("ticketsFavorite"));
	}

  	//Categories
	if(!localStorage.getItem("ticketsCategories")){
    	$.getJSON("ajax/get_categories.php",{},function(data){
      		localStorage.setItem("ticketsCategories",JSON.stringify(data.categories));
      		Params.Categories = data.categories;
    	});
  	}else{
    	Params.Categories = $.parseJSON(localStorage.getItem("ticketsCategories"));
  	}
	
	//Projects for bugs
  	if(!localStorage.getItem("ticketsProjects")){
    	$.getJSON("ajax/get_projects.php",{},function(data){
      		localStorage.setItem("ticketsProjects",JSON.stringify(data.projects));
     	 	Params.Projects = data.projects;
    	});
  	}else{
    	Params.Projects = $.parseJSON(localStorage.getItem("ticketsProjects"));
  	}
	//User info
	if(!localStorage.userInfo && !localStorage.userInfo){
		$.getJSON("ajax/get_userinfo.php",{"userId":localStorage.userId},function(data){
			Params.userInfo = data.userInfo;
		//	alert(JSON.stringify(data.userInfo))
			localStorage.setItem("userInfo",JSON.stringify(data.userInfo));
		});	
	}

}
function login(data){ //We need a json array, probably need to parse it, who knows
	//alert(data.message);

	loadLocalStorage(); // Lets make sure that we load up localStorage
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
			localStorage.clear(); // Lets just clear the localStorage to clear out all of the data
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
	

	//localStorage.clear();
	loadLocalStorage();

	if(localStorage.userId > 0){ // Lets make sure that there is a user 
		uI = $.parseJSON(localStorage.userInfo);
		//alert(localStorage.userId);
		//alert(JSON.stringify(localStorage.userInfo.permissions));
		$.each(uI,function(key,value){
			//value
		});		
	}
/*

	*/	
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
		$(".tab").removeClass("selectedTab shadowUp");
		me = $(this);
		me.addClass("selectedTab shadowUp").blur();
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