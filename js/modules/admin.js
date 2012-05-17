var pageTracker = _gat._getTracker('UA-8067208-4');
var newUserTpl = 
	$("<div/>",{"class":"ticketBox roundAll4  newTicketTpl insideBoxShadow"})
		.html(
			$("<div/>",{id:"userDisplay","class":"userItem"})
				.append( // User Icon Box
					$("<div/>",{"class":"ticketUserIconBox color260 roundAll4 mainBorder",id:"userPic"})
				)	
				.append( // Ticket ID
					$("<div/>",{"class":"ticketIdBox color260 mainBorder roundAll2","html":"C0FFEE",id:"ticketId"})
				)
				.append( //Ticket Title
					$("<div/>",{"class":"ticketTitleBox ticketTitle",id:"title"}).html("Title of the ticket")
				)
				.append( // Ticket Body
					$("<div/>",{"class":"ticketBodyBox ",id:"body"}).html("Body of the ticket asdf asdfasdf asd fsasdfasdf <br>stuff asddddddd<br>")
				)
        .append( // Ticket permissions
          $("<div/>",{"class":"",id:"permissions",css:{"position":"absolute","bottom":"0","right":"0"}})
        )
		);
var newPermissionTpl = $("<div/>",{"class":" color260 mainBorder ticketCategoryBox",id:"permInfo",css:{"width":"auto"}}).html("On: Aug. 8, 1982")

var newFeature = $("<div/>")
					.html(
						$("<button/>",{"classes":"ui-button ui-button-text-only ui-widget ui-state-default"})
					);

var menu = $("<nav/>")
	.html(
		$("<div/>",{css:{"display":"table"}})
			.html( // manage users
				$("<div/>",{css:{"display":"table-cell"}})
					.html(
						$("<div/>",{"class":"topMenuItem"})
							.html(
								$("<button/>",{"class":"user nolink",href:"#admin/users",id:"topperManageUsers",html:"Manage Users"})
							)
					)
			)
			.append( // manage departments
				$("<div/>",{css:{"display":"table-cell"}})
					.html(
						$("<div/>",{"class":"topMenuItem"})
							.html(
								$("<button/>",{"class":"group nolink",href:"#admin/departments",id:"topperManageDepartments",html:"Manage Departments"})
							)
					)
			)
			.append( // manage departments
				$("<div/>",{css:{"display":"table-cell"}})
					.html(
						$("<div/>",{"class":"topMenuItem"})
							.html(
								$("<button/>",{"class":"gear nolink",href:"#admin/features",id:"topperManageFeatures",html:"Manage Features"})
							)
					)
			)
			
	)

admin = {
	"startAdmin":function(){
		if($("#generic").html() != null){
			Params.Content.html($("#generic").html());
			Tlb = Params.Content.find("#ticketListbody");
			Tlb.html(menu)
		}
	},
	"loadFeatures":function(){
		pageTracker._trackPageview("admin/loadFeatures");
		Tlb.html(menu)
		var display = $("<div/>");
		if(sessionStorage.features == "undefined"){
			loadLocalStorage();
		}
		var siteFeatures = $.parseJSON(sessionStorage.features);
		$.each(siteFeatures,function(i,item){
			display.append(
				$("<div/>",{css:{"padding":"3px","margin":"5px","height":"30px"},"class":"ticketBox roundAll4 insideBoxShadow"})
					.html(
						$("<div/>",{html:item.name,css:{"display":"table-cell","width":"100%"}})
					)
					.append(
						$("<div/>",{html:function(){
							if(item.status == 1){ // this feature is turned on
								return $("<button>",{"html":"On","value":1}).click(function(){
									var me = $(this);
									if(me.val() == 1)
										me.text("Off").val(0)
									else
										me.text("On").val(1)
									
									$.getJSON("/ajax/admin/features.php",{"changeFeat":item.id},function(data){
										sessionStorage.features = JSON.stringify(data.features)
									})
								});
								
							}else{ // this feature is turned off
								return $("<button>",{"html":"Off","value":0}).click(function(){
									var me = $(this);
									if(me.val() == 1)
										me.text("Off").val(0)
									else
										me.text("On").val(1)
									
									$.getJSON("/ajax/admin/features.php",{"changeFeat":item.id},function(data){
										sessionStorage.features = JSON.stringify(data.features)
									})
								});
							}
						},css:{"display":"table-cell"}})
					)
			)
		});
		Tlb.append(display);
	},
	"loadAllUsers":function(){
			Tlb.html(menu)
			pageTracker._trackPageview("admin/loadAllUsers");
			$.getJSON("ajax/admin/users.php",{"type":"allUsers"},function(json){
				Params.allPermissions = json.data.allPermissions;
				var display = $("<div/>");
				$.each(json.data.users,function(i,data){
					var userDisplay = newUserTpl.clone();
					userDisplay.find("#userDisplay").attr("id","userDisplay"+data.id)
					userDisplay.find("#ticketId").attr("id","userId-"+data.id).html(data.id);
					
					userDisplay.find("#title").attr("id","UserName-"+data.id).html(
						data.firstname + " " + data.lastname + " (" + data.username + " )"
					);
					userDisplay.find("#userPic").attr("id","userPic-"+data.id).css("background-image","url(http://www.gravatar.com/avatar/"+data.md5Email+"?s=32&d=monsterid&r=g)");
					userDisplay.find("#body").attr("id","body-"+data.id).html(
						data.email_address+"<br/>"+data.joined
					);
					addPerm = newPermissionTpl.clone();
					addPerm.css("width","20px").attr("id",data.id+"addPerm").addClass("roundBottomRight8").html(
						$("<a/>",{"html":"+","id":"permAdd"+data.id,"class":"","css":{"font-size":"20px","cursor":"pointer","padding":"0px","width":"20px","position":"relative"},value:0,"data-select-items":JSON.stringify(json.data.allPermissions)})
					);
					createSelect(addPerm.find("#permAdd"+data.id),function(value){
							var Tlb = Params.Content.find("#ticketListbody");
							var paramName = Params.allPermissions[value];
							if($("#permInfo_"+data.id+"_"+value).html() == null){
								$.getJSON("ajax/admin/users.php",{"type":"adjustPerms","value":1,"userId":data.id,"perm":value},function(data){
									if(data.error.length > 0 ){
										alert(data.error)
									}
								});
								perm = newPermissionTpl.clone();
								perm.attr("id","permInfo_"+data.id+"_"+value).html(
									$("<span/>",{"class":"remove","html":paramName,css:{"cursor":"pointer"}})
										.click(function(){
											$.getJSON("ajax/admin/users.php",{"type":"adjustPerms","value":0,"userId":data.id,"perm":value},function(result){
												if(result.error.length > 0 ){
													alert(result.error)
												}else{													
													$("#permInfo_"+data.id+"_"+value).animate({"width":0},"fast",function(){
														$(this).replaceWith("");
													});
												}
											});
										})
									);
								Tlb.find("#userDisplay"+data.id).append(perm);
							}
						
					},"+",false);
				
					userDisplay.find("#userDisplay"+data.id+" #permissions").append(addPerm);
					display.append(userDisplay);
				}); // End of creating the user boxes
				
				$.each(json.data.permissions,function(i,data){
					perm = newPermissionTpl.clone();
					perm.attr("id","permInfo_"+data.user_id+"_"+data.permission_id).html(
						$("<span/>",{"class":"remove","html":data.display})
							.click(function(){
								$.getJSON("ajax/admin/users.php",{"type":"adjustPerms","value":0,"userId":data.user_id,"perm":data.permission_id},function(result){
									if(result.error.length > 0 ){
										alert(result.error)
									}else{
										$("#permInfo_"+data.user_id+"_"+data.permission_id).animate({"width":0},"fast",function(){
											$(this).replaceWith("");
										});
									}
								});
							})
					);
					display.find("#userDisplay"+data.user_id +" #permissions").append(perm);
				});// end of displaying the permissions
				Tlb.append(display);	
			});	
	}
};