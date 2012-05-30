/**
 * Started November 19, 2009
 * @author Joseph Harry
 */
var uri = window.location.toString();
uri = uri.replace(window.location.hash, "");

function sec2readable(seconds) {
    var wt;
    var week;
    //var mabs = new Math;
    seconds = Math.abs(seconds);
    if (seconds < 31536000) { //Year
        if (seconds < 2419200) { //Month
            if (seconds < 604800) { //week
                if (seconds < 86400) { //day
                    if (seconds < 3600) { //hour
                        if (seconds < 60) { //miniutes
                            return seconds + " Seconds";
                        } else {
                            return parseInt(seconds / 60, 10) + " Minutes";
                        }
                    } else {
                        return parseInt(seconds / 3600, 10) + " Hours";
                    }
                } else {
                    return parseInt(seconds / 86400, 10) + " Days";
                }
            } else {
                week = parseInt(seconds / 604800, 10);
                wt = "";
                if (week > 1) {
                    wt = "s";
                }
                return week + " Week" + wt;
            }
        } else {
            week = parseInt(seconds / 2419200, 10);
            wt = "";
            if (week > 1) {
                wt = "s";
            }
            return week + " Month" + wt;
        }
    } else {
        week = parseInt(seconds / 31536000, 10);
        wt = "";
        if (week > 1) {
            wt = "s";
        }
        return week + " Year" + wt;
    }
}

function getHash() {
    return window.location.hash;
}

function getHashArray() {
    var hash = jQuery.makeArray(getHash().split("\/"));
    return hash;
}

function setHash(htbs) {
    if (getHash() != htbs) {
        window.location.hash = htbs;
    }
}

function pageAnator(container, count, perPage,curPage) {
	if(!curPage){curPage = 0;}
    var hash = getHashArray();
    var totalPages = 0;
    container.html(
    $("<span/>").addClass("roundAll4 lapcatButton").css({
        "width": "auto",
        "padding": "1px",
        "textAlign": "center",
        "textDecoration": "none",
        "float":"left"
    }).html($("<font/>").html("Pages:")));
    if (count === 0) {
        container.append($("<button/>").addClass("minimal nolink").attr("href", hash[0] + "/" + hash[1] + "/page/" + 0).css({
            "width": "20px",
            "padding": "1px",
            "marginRight":"2px",
            "textAlign": "center",
            "textDecoration": "none",
            "float":"left"
        }).html(1));
    } else {
        var pages = count / perPage;
        if(pages > 10){
			totalPages = parseInt(pages);
			pages = 10;	
        }
        if(curPage>5){// if the current page is greater than 5, lets start shifting
			if(totalPages==curPage || totalPages<curPage){
				//alert("totalPages");
				var a = curPage-9;
				pages = parseInt(curPage);				
			}else{
				var a = curPage-5;
				if(a<0){a=0;}
				if(parseInt(curPage)+4 > totalPages){
					pages = totalPages
				}else{
					pages = parseInt(curPage)+4;	
				}
				
				//alert("a=>"+a+" pages=>"+pages);
        	}
        }else{
			var a = 1;
			//alert("a=>"+a+" pages=>"+pages);	
        }
        
        
        for (a; a < pages + 1; a++) {
            var b = parseInt(a - 1, 10);
            container.append($("<button/>").addClass("minimal nolink").attr("href", hash[0] + "/" + hash[1] + "/page/" + b).css({
                width: "20px",
                padding: "1px",
                marginRight:"2px",
                textAlign: "center",
                textDecoration: "none",
                "float":"left"
            }).html(a));
        } // end of for loop

        if(totalPages > 10){
	        if(parseInt(curPage)+4 < totalPages){
				container.append($("<div/>",{css:{width: "10px",padding: "1px",marginRight:"2px",display:"inline-block"}}));
	            container.append($("<button/>").addClass("minimal nolink").attr("href", hash[0] + "/" + hash[1] + "/page/" + totalPages).css({
	                width: "20px",
	                padding: "1px",
	                marginRight:"2px",
	                textAlign: "center",
	                textDecoration: "none",
	                "float":"left"
	            }).html(totalPages));			
			}

        }
        
    }
}

function stripslashes(str) {
    str = str.replace(/\\'/g, '\'');
    str = str.replace(/\\"/g, '"');
    str = str.replace(/\\\\/g, '\\');
    return str;
}

function buildTable(o_data,o_target){
	var table = $("<div/>",{css:{"display":"table","width":"100%"}}).addClass("generated");
	var lables = {};
	$.each(o_data,function(key,tableRowdata){
		table
			.append(
				$("<div/>",{css:{"display":"table-row","width":"100%","box-sizing":"border-box","-moz-box-sizing":"border-box","-webkit-box-sizing":"border-box"}})
					.bind("build_row",{"tableDef":tableRowdata},function(event){
						var o_table = event.data.tableDef;
						for (var v_key in o_table){
							if(!o_table[v_key].o_jQ){//this should be for a simple display
								alert(v_key);
								$(this)
									.append(
										$("<div/>")
											.css({"display":"table-cell","box-sizing":"border-box","-moz-box-sizing":"border-box","-webkit-box-sizing":"border-box"})
											.html(o_table[v_key])
									);
							}else{//Complex display
								$(this)
									.append(
										$("<div/>",o_table[v_key].o_jQ)
											.css({"display":"table-cell","box-sizing":"border-box","-moz-box-sizing":"border-box","-webkit-box-sizing":"border-box"})
											
									);
							}
						}
					}).trigger("build_row")
					
			);
	});
	o_target.append(table);
}

function addEditControls(itemEdit,selector,type,obj,callBack){
	callBack = callBack ? callBack : false;
	var idSelector = selector.attr("id");
  selector
    .append(
      $("<div/>",{id:idSelector+"Edit","class":"ticketSprite pencil fakelink",css:{"display":"inline-block"}})
        .click(function(){
          var me = $(this);
          var myParent = me.parent();
          localStorage.setItem(myParent.attr("id"),myParent.find(".contentEdit").html());
          switch(type){
            case "textarea":
              var edit = myParent.find(".contentEdit").html();
              myParent.find(".contentEdit").html(
                $("<textarea/>",{id:"editor"}).val(edit)
              );
            break;
            default:case "text":
              myParent.find(".ticketSprite.cross").css("display","inline-block");
              myParent.find(".ticketSprite.tick").css("display","inline-block");
              edit = myParent.find(".contentEdit").attr("contentEditable","true").focus();
            break;

            case "select":
              edit = myParent.find(".contentEdit").text();
              myParent.find(".ticketSprite.cross").css("display","inline-block");
              myParent.find(".ticketSprite.tick").css("display","inline-block");
              myParent.find(".contentEdit").html(
                $("<select/>")
                  .append(function(){
                    var html = "";
                    $.each(obj,function(i,item){
                      if(item.name == edit){
                       html +="<option selected=selected value="+item.id+">"+item.name+"</option>"; 
                      }else{
                       html +="<option value="+item.id+">"+item.name+"</option>";  
                      }
                    });
                    return html;
                  })
              );
            break;
            
          }
          me.css("display","none");

        })
    )
    .append(
      $("<div/>",{id:idSelector+"Accept","class":"ticketSprite tick fakelink",css:{"display":"none"}})
        .click(function(){
          var me = $(this);
          var myParent = me.parent();
          switch (type) {
            case "textarea":
              if (callBack) {
                callBack(itemEdit, $("#editor").val(), myParent.attr("id"));
              }
              myParent.find(".contentEdit").html($("#editor").val());            
            break;
            default:
            case "text":
              if (callBack) {
                callBack(itemEdit, myParent.find(".contentEdit").text(), myParent.attr("id"));
              }
              myParent.find(".contentEdit").attr("contentEditable","false");
            break;

            case "select":
              if (callBack) {
                callBack(itemEdit, myParent.find("select option:selected").val(), myParent.attr("id"));
              }
              myParent.find(".contentEdit").html(myParent.find("select option:selected").text());
            break;
          }
          myParent.find(".ticketSprite.pencil").css("display","inline-block");
          me.css("display","none");
          myParent.find(".ticketSprite.cross").css("display","none");
        })
    )
    .append(
      $("<div/>",{id:idSelector+"Cancel","class":"ticketSprite cross fakelink",css:{"display":"none"}})
        .click(function(){
          var me = $(this);
          var myParent = me.parent();
          myParent.find(".ticketSprite.pencil").css("display","inline-block");
          myParent.find(".contentEdit").attr("contentEditable","false");
          me.css("display","none");
          myParent.find(".ticketSprite.tick").css("display","none");
          myParent.find(".contentEdit").text(localStorage.getItem(myParent.attr("id")));
          localStorage.removeItem(myParent.attr("id"));
        })
    );
}

function selectBoxReplace(target,value,possibleValues){
   target.data("prevValue",value).html(
    $("<select id='' name='"+target.parent().attr('id')+"' class='ticketModifyForm'/>")
      .append(function(){
        var html = "";
        $.each(possibleValues,function(i,item){
          if(item.name == value){
           html +="<option selected=selected value="+item.id+">"+item.name+"</option>"; 
          }else{
           html +="<option value="+item.id+">"+item.name+"</option>";  
          }
        });
        return html;
      })
      
  );
}
function textBoxReplace(target,value,type){
	if(type){inputType = type;}else{inputType = "text";}
	if(value == "" || value == undefined){
		value = target.text();
	}
	target
		.data("prevValue",value)
		.html(
			function(){
				ret = $("<input type='"+inputType+"' name='"+target.parent().attr('id')+"' class='ticketModifyForm' value='"+value+"'/>")
					.data("editedItem",target.attr("id"));
				
				if(type == "date"){ret.datepicker();}
				return ret;
			}
		)  		
  		//alert(target.data("prevValue"));
}
function textAreaReplace(target,value){
   target.data("prevValue",value).html(
    $("<textarea class='ticketModifyForm' name='"+target.parent().attr('id')+"' resize='false'/>").val(value).css({
      "height":"230px",
      "width":"250px"
    })
  );
}
var MD5 = function (string) {

   function RotateLeft(lValue, iShiftBits) {
           return (lValue<<iShiftBits) | (lValue>>>(32-iShiftBits));
   }

   function AddUnsigned(lX,lY) {
           var lX4,lY4,lX8,lY8,lResult;
           lX8 = (lX & 0x80000000);
           lY8 = (lY & 0x80000000);
           lX4 = (lX & 0x40000000);
           lY4 = (lY & 0x40000000);
           lResult = (lX & 0x3FFFFFFF)+(lY & 0x3FFFFFFF);
           if (lX4 & lY4) {
                   return (lResult ^ 0x80000000 ^ lX8 ^ lY8);
           }
           if (lX4 | lY4) {
                   if (lResult & 0x40000000) {
                           return (lResult ^ 0xC0000000 ^ lX8 ^ lY8);
                   } else {
                           return (lResult ^ 0x40000000 ^ lX8 ^ lY8);
                   }
           } else {
                   return (lResult ^ lX8 ^ lY8);
           }
   }

   function F(x,y,z) { return (x & y) | ((~x) & z); }
   function G(x,y,z) { return (x & z) | (y & (~z)); }
   function H(x,y,z) { return (x ^ y ^ z); }
   function I(x,y,z) { return (y ^ (x | (~z))); }

   function FF(a,b,c,d,x,s,ac) {
           a = AddUnsigned(a, AddUnsigned(AddUnsigned(F(b, c, d), x), ac));
           return AddUnsigned(RotateLeft(a, s), b);
   };

   function GG(a,b,c,d,x,s,ac) {
           a = AddUnsigned(a, AddUnsigned(AddUnsigned(G(b, c, d), x), ac));
           return AddUnsigned(RotateLeft(a, s), b);
   };

   function HH(a,b,c,d,x,s,ac) {
           a = AddUnsigned(a, AddUnsigned(AddUnsigned(H(b, c, d), x), ac));
           return AddUnsigned(RotateLeft(a, s), b);
   };

   function II(a,b,c,d,x,s,ac) {
           a = AddUnsigned(a, AddUnsigned(AddUnsigned(I(b, c, d), x), ac));
           return AddUnsigned(RotateLeft(a, s), b);
   };

   function ConvertToWordArray(string) {
           var lWordCount;
           var lMessageLength = string.length;
           var lNumberOfWords_temp1=lMessageLength + 8;
           var lNumberOfWords_temp2=(lNumberOfWords_temp1-(lNumberOfWords_temp1 % 64))/64;
           var lNumberOfWords = (lNumberOfWords_temp2+1)*16;
           var lWordArray=Array(lNumberOfWords-1);
           var lBytePosition = 0;
           var lByteCount = 0;
           while ( lByteCount < lMessageLength ) {
                   lWordCount = (lByteCount-(lByteCount % 4))/4;
                   lBytePosition = (lByteCount % 4)*8;
                   lWordArray[lWordCount] = (lWordArray[lWordCount] | (string.charCodeAt(lByteCount)<<lBytePosition));
                   lByteCount++;
           }
           lWordCount = (lByteCount-(lByteCount % 4))/4;
           lBytePosition = (lByteCount % 4)*8;
           lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80<<lBytePosition);
           lWordArray[lNumberOfWords-2] = lMessageLength<<3;
           lWordArray[lNumberOfWords-1] = lMessageLength>>>29;
           return lWordArray;
   };

   function WordToHex(lValue) {
           var WordToHexValue="",WordToHexValue_temp="",lByte,lCount;
           for (lCount = 0;lCount<=3;lCount++) {
                   lByte = (lValue>>>(lCount*8)) & 255;
                   WordToHexValue_temp = "0" + lByte.toString(16);
                   WordToHexValue = WordToHexValue + WordToHexValue_temp.substr(WordToHexValue_temp.length-2,2);
           }
           return WordToHexValue;
   };

   function Utf8Encode(string) {
           string = string.replace(/\r\n/g,"\n");
           var utftext = "";

           for (var n = 0; n < string.length; n++) {

                   var c = string.charCodeAt(n);

                   if (c < 128) {
                           utftext += String.fromCharCode(c);
                   }
                   else if((c > 127) && (c < 2048)) {
                           utftext += String.fromCharCode((c >> 6) | 192);
                           utftext += String.fromCharCode((c & 63) | 128);
                   }
                   else {
                           utftext += String.fromCharCode((c >> 12) | 224);
                           utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                           utftext += String.fromCharCode((c & 63) | 128);
                   }

           }

           return utftext;
   };

   var x=Array();
   var k,AA,BB,CC,DD,a,b,c,d;
   var S11=7, S12=12, S13=17, S14=22;
   var S21=5, S22=9 , S23=14, S24=20;
   var S31=4, S32=11, S33=16, S34=23;
   var S41=6, S42=10, S43=15, S44=21;

   string = Utf8Encode(string);

   x = ConvertToWordArray(string);

   a = 0x67452301; b = 0xEFCDAB89; c = 0x98BADCFE; d = 0x10325476;

   for (k=0;k<x.length;k+=16) {
           AA=a; BB=b; CC=c; DD=d;
           a=FF(a,b,c,d,x[k+0], S11,0xD76AA478);
           d=FF(d,a,b,c,x[k+1], S12,0xE8C7B756);
           c=FF(c,d,a,b,x[k+2], S13,0x242070DB);
           b=FF(b,c,d,a,x[k+3], S14,0xC1BDCEEE);
           a=FF(a,b,c,d,x[k+4], S11,0xF57C0FAF);
           d=FF(d,a,b,c,x[k+5], S12,0x4787C62A);
           c=FF(c,d,a,b,x[k+6], S13,0xA8304613);
           b=FF(b,c,d,a,x[k+7], S14,0xFD469501);
           a=FF(a,b,c,d,x[k+8], S11,0x698098D8);
           d=FF(d,a,b,c,x[k+9], S12,0x8B44F7AF);
           c=FF(c,d,a,b,x[k+10],S13,0xFFFF5BB1);
           b=FF(b,c,d,a,x[k+11],S14,0x895CD7BE);
           a=FF(a,b,c,d,x[k+12],S11,0x6B901122);
           d=FF(d,a,b,c,x[k+13],S12,0xFD987193);
           c=FF(c,d,a,b,x[k+14],S13,0xA679438E);
           b=FF(b,c,d,a,x[k+15],S14,0x49B40821);
           a=GG(a,b,c,d,x[k+1], S21,0xF61E2562);
           d=GG(d,a,b,c,x[k+6], S22,0xC040B340);
           c=GG(c,d,a,b,x[k+11],S23,0x265E5A51);
           b=GG(b,c,d,a,x[k+0], S24,0xE9B6C7AA);
           a=GG(a,b,c,d,x[k+5], S21,0xD62F105D);
           d=GG(d,a,b,c,x[k+10],S22,0x2441453);
           c=GG(c,d,a,b,x[k+15],S23,0xD8A1E681);
           b=GG(b,c,d,a,x[k+4], S24,0xE7D3FBC8);
           a=GG(a,b,c,d,x[k+9], S21,0x21E1CDE6);
           d=GG(d,a,b,c,x[k+14],S22,0xC33707D6);
           c=GG(c,d,a,b,x[k+3], S23,0xF4D50D87);
           b=GG(b,c,d,a,x[k+8], S24,0x455A14ED);
           a=GG(a,b,c,d,x[k+13],S21,0xA9E3E905);
           d=GG(d,a,b,c,x[k+2], S22,0xFCEFA3F8);
           c=GG(c,d,a,b,x[k+7], S23,0x676F02D9);
           b=GG(b,c,d,a,x[k+12],S24,0x8D2A4C8A);
           a=HH(a,b,c,d,x[k+5], S31,0xFFFA3942);
           d=HH(d,a,b,c,x[k+8], S32,0x8771F681);
           c=HH(c,d,a,b,x[k+11],S33,0x6D9D6122);
           b=HH(b,c,d,a,x[k+14],S34,0xFDE5380C);
           a=HH(a,b,c,d,x[k+1], S31,0xA4BEEA44);
           d=HH(d,a,b,c,x[k+4], S32,0x4BDECFA9);
           c=HH(c,d,a,b,x[k+7], S33,0xF6BB4B60);
           b=HH(b,c,d,a,x[k+10],S34,0xBEBFBC70);
           a=HH(a,b,c,d,x[k+13],S31,0x289B7EC6);
           d=HH(d,a,b,c,x[k+0], S32,0xEAA127FA);
           c=HH(c,d,a,b,x[k+3], S33,0xD4EF3085);
           b=HH(b,c,d,a,x[k+6], S34,0x4881D05);
           a=HH(a,b,c,d,x[k+9], S31,0xD9D4D039);
           d=HH(d,a,b,c,x[k+12],S32,0xE6DB99E5);
           c=HH(c,d,a,b,x[k+15],S33,0x1FA27CF8);
           b=HH(b,c,d,a,x[k+2], S34,0xC4AC5665);
           a=II(a,b,c,d,x[k+0], S41,0xF4292244);
           d=II(d,a,b,c,x[k+7], S42,0x432AFF97);
           c=II(c,d,a,b,x[k+14],S43,0xAB9423A7);
           b=II(b,c,d,a,x[k+5], S44,0xFC93A039);
           a=II(a,b,c,d,x[k+12],S41,0x655B59C3);
           d=II(d,a,b,c,x[k+3], S42,0x8F0CCC92);
           c=II(c,d,a,b,x[k+10],S43,0xFFEFF47D);
           b=II(b,c,d,a,x[k+1], S44,0x85845DD1);
           a=II(a,b,c,d,x[k+8], S41,0x6FA87E4F);
           d=II(d,a,b,c,x[k+15],S42,0xFE2CE6E0);
           c=II(c,d,a,b,x[k+6], S43,0xA3014314);
           b=II(b,c,d,a,x[k+13],S44,0x4E0811A1);
           a=II(a,b,c,d,x[k+4], S41,0xF7537E82);
           d=II(d,a,b,c,x[k+11],S42,0xBD3AF235);
           c=II(c,d,a,b,x[k+2], S43,0x2AD7D2BB);
           b=II(b,c,d,a,x[k+9], S44,0xEB86D391);
           a=AddUnsigned(a,AA);
           b=AddUnsigned(b,BB);
           c=AddUnsigned(c,CC);
           d=AddUnsigned(d,DD);
                }

        var temp = WordToHex(a)+WordToHex(b)+WordToHex(c)+WordToHex(d);

        return temp.toLowerCase();
}
function createSelect(selector,callback,options){
  var baseOptions={
    showIcon      :true,
    showSelected  :true,
    css           :{},
    displayText   :""
  }
  options = $.extend(baseOptions,options);
	var callBackFn = "";
	//alert(selector.html())
	if(selector.html() == null){return false;}
	callBackFn = callback ? callback : false;
	if(selector.attr('data-select-items') == undefined || !selector.attr('data-select-items')){return false;}
	var dropDown = $("<ul/>",{id:"","class":"downRightShadow dropDown"});
	var container = $("<div/>",{"class":"selectBox ",css:{"position":"relative"}});
	var ddIcon = $("<div/>",{"class":"ddIcon","html":"&#9660;"});
	var newSelector = selector.clone();
	var selectData = $.parseJSON(newSelector.attr('data-select-items'));
	newSelector.attr('data-select-items',"parsed");
  
  if(options.showIcon)
    newSelector.append(ddIcon);	

	container.css(options.css)

	newSelector.click(function(){return false;}).attr({"tabindex":Math.floor(Math.random()*11)})
	selector.replaceWith(container);

	$.each(selectData,function(key,item){
		if(typeof item == "object" && Object.keys(item).length > 0){ // this is an array
			if(typeof key == 'string'){ // stick in the header
				dropDown
					.append(
						$("<li/>",{html:key,"class":"categorySelect"})
					)
				}
			$.each(item,function(key2,item2){
				dropDown
					.append(
						$("<li/>",{"data-item":item2,html:item2,css:{"padding":"1px 1px 1px 10px"},"class":"selectable fastAnimate"})
						.click(function(){
						  if(options.showSelected)
						    newSelector.html(item2)
							if(options.showIcon)
							 newSelector.append(ddIcon)
							 
							newSelector.attr("data-value",key2)
							if(callBackFn)callBackFn(key2);
						})
					)
			});	

		}else{// this is not an array
			dropDown
				.append(
					$("<li/>",{"data-item":item,html:item,css:{"padding":"1px 1px 1px 1px"},"class":"selectable fastAnimate"})
						.click(function(){
							if(callBackFn)callBackFn(key);
              newSelector.attr("data-value",key)
              if(options.showSelected)
                newSelector.html(item)
              if(options.showIcon)
               newSelector.append(ddIcon)
						})
				);
		}
	});

	var conPos = container.position();
	container
		.css({"display":"inline-block"})
		.append(
			$("<ul/>")
				.css({"width":newSelector.outerWidth()})
				.html(
					$("<li/>")
						.html(newSelector.css({"display":"block","width":"100%"}))
						.append(
							dropDown
								.css({"display":"block","padding":"0 5px 0 5px"})
							)
				)
		)
}

function notice(){
	
}
