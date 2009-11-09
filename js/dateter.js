/**
 * Requires datejs
 * @author Joseph Harry, a.k.a., Mr. Roboto Findarato
 * @version 1.0
 * @copyright August 5, 2009 
 */
(function(jQuery){
	jQuery.dateter={
		settings : {
			height:"500px",
			width:"500px",
			cellHeight:0,
			cellWidth:0,
			borderWidth:"1px",
			borderStyle:"solid",
			dayNames:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
			smallDayNames:["S","M","T","W","T","F","S"],
			daysToHighlight:{}
		},display:{
			daysInMonth:31,
			monthStartOn:0,
			leapYear:false,
			year:2009,
			month:8,
			startofMonth:0,
			monthsMoved:0
		}
	};
	var hideme=true;
	var callback;
	var Settings = jQuery.dateter.settings;
	var Display = jQuery.dateter.display;
	/**
	 * Main part of the script.  Pass it a series of options and a custom call back.
	 * @param {Object} options
	 * @param {Object} custom_callback
	 */
	jQuery.fn.hideBox=function(targetBox,speed,that){
		if(typeof speed != "number"){speed=300;}
		if(hideme){	$("#"+targetBox).fadeOut(speed);jQuery('#button-date-selector').css('z-index',6);}else{hideme=true;$('#'+that).focus();}
	}
 	jQuery.fn.dateter = function(options,custom_callback){
		callback = custom_callback ? custom_callback : false;
		Settings = jQuery.extend({}, Settings, options);
		Settings.cellHeight=Math.floor((parseInt(Settings.height)-20)/7);
		Settings.cellWidth=Math.floor((parseInt(Settings.width)-20)/7);
		this.attr("onBlur","javascript:setTimeout(\'jQuery.fn.hideBox(\"calBox\",300,\""+this.attr("id")+"\")\',200);");
		
		jQuery.fn.dateter.init(this);
		
	}
	jQuery.fn.keyInArray = function (key,looparray){for(v_key in looparray){if(key == looparray[v_key]){return v_key;}}}
	/**
	 * Initialization function.  This is where all of the stuff happens.
	 * @param {Object} target
	 */
	jQuery.fn.dateter.init = function(target){
		Display.startofMonth = jQuery.fn.keyInArray(Date.today().set({ day: 1}).toString("dddd"),Settings.dayNames);
		Display.year = Date.today().toString("yyyy");
		Display.month = Date.today().toString("M");
		Display.daysInMonth = Date.getDaysInMonth(Display.year,Display.month-1);
		Display.leapYear = Date.isLeapYear (Display.year );
		jQuery('#calBox').replaceWith();//remove any calBoxes that are around	
		jQuery(target).click(function(){jQuery("#calBox").show();jQuery('#button-date-selector').css('z-index',-20);hideme=true;});
		jQuery('body').append(calBox = jQuery('<div class="OL-fred color-darker" id="calBox" style="padding:3px; height:'+Settings.height+';width:'+Settings.width+';" />').hide());
		jQuery.fn.dateter.drawCalendar(calBox,Display,target);
		//position the box below the element that called it.
		position = jQuery(target).position();
		heightAdjust = jQuery(target).height();
		heightAdjust=0;
		calBox.css({top:position.top+heightAdjust,left:position.left,position:"absolute"});
		
	}
	/**
	 * This area allows the calendar to be redrawn each time sone one clicks back and forward on the calendar buttons
	 * @param {Object} calHolder
	 * @param {Object} displaySettings
	 */
	jQuery.fn.dateter.drawCalendar = function(calHolder,displaySettings,target){
		calHolder.empty().html(
			jQuery('<table cellpadding="0" cellspacing="0" style="height:20px;width:'+Settings.width+';"/>')
				.append(
				jQuery('<tr/>')
				.append(jQuery('<td id="calBackMonth" style="text-align:center; width:20px;"/>').css({cursor:"pointer"}).html("<img src='/lapcat/layout/icons/4-7-2.png' style='margin-bottom:3px;'/>").click(function(){
					hideme=false;
					//$(this).blur();
					displaySettings.monthsMoved--;
					var NewMonth = Date.today().add(displaySettings.monthsMoved).months().toString("M");
					var NewYear = Date.today().add(displaySettings.monthsMoved).months().toString("yyyy");
					var NewMonthStart = jQuery.fn.keyInArray(Date.parse(parseInt(NewMonth)+"/1/"+"/"+NewYear).toString("dddd"),Settings.dayNames);
					jQuery.fn.dateter.drawCalendar(calHolder,{year:NewYear,monthsMoved:displaySettings.monthsMoved,month:NewMonth,startofMonth:NewMonthStart,daysInMonth:Date.getDaysInMonth(NewYear,NewMonth-1)});
				}))
				.append(jQuery('<td class="font white" id="caltitle" style="width:auto;text-align:center"/>').css("font-size","14px").html(Date.today().set({month:parseInt(displaySettings.month)-1}).toString("MMMM")+" "+displaySettings.year))
				.append(jQuery('<td id="calNextMonth" style="text-align:center; width:20px;"/>').css({cursor:"pointer"}).html("<img src='/lapcat/layout/icons/4-7-1.png' style='margin-bottom:3px;'/>").click(function(){
					hideme=false;
					//$(this).blur();
					displaySettings.monthsMoved++;
					var NewMonth = Date.today().add(displaySettings.monthsMoved).months().toString("M");
					var NewYear = Date.today().add(displaySettings.monthsMoved).months().toString("yyyy");
					var NewMonthStart = jQuery.fn.keyInArray(Date.parse(parseInt(NewMonth)+"/1/"+"/"+NewYear).toString("dddd"),Settings.dayNames);
					jQuery.fn.dateter.drawCalendar(calHolder,{year:NewYear,monthsMoved:displaySettings.monthsMoved,month:NewMonth,startofMonth:NewMonthStart,daysInMonth:Date.getDaysInMonth(NewYear,NewMonth-1)});
				}))
			)
		);
		var cnt =0;
		var dayCnt = 0;
		var monthStart = false;
		calHolder.append(calTable = jQuery('<table cellpadding="0" cellspacing="0" style="width:'+Settings.width+';"/>'));
		//weeklist = jQuery('<tr id="weeklist"/>');
		//for (var c=0; c < 7; c++) {weeklist.append(jQuery('<td id="weeklist'+Settings.smallDayNames[c]+'"/>').html(Settings.smallDayNames[c]));}
		calTable.empty();
		//calTable.append(weeklist);
		for(var a = 0; a < 6; a++){//Y
			calTable.append(jQuery('<tr id="w'+a+'"/>'));
			for (var b = 0; b < 7; b++) {//X
				jQuery("#w"+a).append(
					jQuery('<td class="font white" id="d'+cnt+'" style="width:'+Settings.cellWidth+'px;height:'+Settings.cellHeight+'px;border-width:'+Settings.borderWidth+';border-style:'+Settings.borderStyle+';" />')
					.css({fontSize:"11px",textAlign:"center"})
				);
				var a_Pass=new Array();
				a_Pass[0]=displaySettings.year==parseInt(Date.today().toString("yyyy"));
				a_Pass[1]=displaySettings.year<parseInt(Date.today().toString("yyyy"));
				a_Pass[2]=a_Pass[0]&&displaySettings.month<parseInt(Date.today().toString("M"));
				a_Pass[3]=a_Pass[0]&&displaySettings.month==Date.today().toString("M")&&dayCnt<parseInt(Date.today().toString("d"));
				if(cnt>=displaySettings.startofMonth&&dayCnt<displaySettings.daysInMonth){
					dayCnt++;
					jQuery("#d"+cnt).addClass(((a_Pass[1]||a_Pass[2]||a_Pass[3])?"color-off":"calendar-cell")).html(dayCnt).css({cursor:"pointer"}).click(function(){
						if (callback) {
							callback(displaySettings.month, $(this).text(), displaySettings.year);
							calHolder.fadeOut(300);
						}
					});
				}
				if (Settings.daysToHighlight[dayCnt]) {jQuery("#d" + cnt).css({backgroundColor: "#00FF00"}).attr("title",Settings.daysToHighlight[dayCnt]);	}
				cnt++;	
			}
		}
		for(v_key in Settings.daysToHighlight){
			jQuery("#d" + Settings.daysToHighlight[v_key]).css({backgroundColor:"#00FF00"});
		}
	}
	
	
 })(jQuery);