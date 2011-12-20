var adminLoaded = true;
var newUserTpl = 
	$("<div/>",{"class":"ticketBox insideBorder roundAll4 border-all-Main-1 newTicketTpl"})
		.html(
			$("<div/>",{id:"userDisplay","class":"ticketItem"})
				.append( // User Icon Box
					$("<div/>",{"class":"ticketUserIconBox colorMain-2 border-all-B-1 roundAll4",id:"userPic"})
				)	
				.append( // Ticket ID
					$("<div/>",{"class":"ticketIdBox colorMain-2 border-all-B-1 roundAll2","html":blankId.toString(16),id:"ticketId"})
				)
				.append( //Ticket Title
					$("<div/>",{"class":"ticketTitleBox ticketTitle",id:"title"}).html("Title of the ticket")
				)
				.append( // Ticket Body
					$("<div/>",{"class":"ticketBodyBox ",id:"body"}).html("Body of the ticket asdf asdfasdf asd fsasdfasdf <br>stuff asddddddd<br>")
				)
		);
var newPermissionTpl = $("<div/>",{"class":" colorMain-2 border-all-B-1 roundBottomRight4 ticketCategoryBox",id:"permInfo"}).html("On: Aug. 8, 1982")

admin = {
	"loadAllUsers":function(){
			Params.Content.html($("#generic").html());
			Tlb = Params.Content.find("#ticketListbody");
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
					userDisplay.find("#userPic").attr("id","userPic-"+data.id).css("background-image","url(http://www.gravatar.com/avatar/"+data.md5Email+"?s=32&d=identicon&r=g)");
					userDisplay.find("#body").attr("id","body-"+data.id).html(
						data.email_address+"<br/>"+data.joined
					);
					addPerm = newPermissionTpl.clone();
					addPerm.css("width","20px").attr("id",data.id+"addPerm").removeClass("roundBottomRight4").addClass("roundBottomRight8").html(
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
									$("<span/>",{"class":"remove","html":paramName})
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
						
					},"+");
					userDisplay.find("#userDisplay"+data.id).append(addPerm);
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
					display.find("#userDisplay"+data.user_id).append(perm);
				});// end of displaying the permissions
				Tlb.append(display);		
			});	
	},"test":"cool"
};

admin.loadAllUsers()
