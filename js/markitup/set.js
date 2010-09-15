// ----------------------------------------------------------------------------
// markItUp!
// ----------------------------------------------------------------------------
// Copyright (C) 2008 Jay Salvat
// http://markitup.jaysalvat.com/
// ----------------------------------------------------------------------------
// Html tags
// http://en.wikipedia.org/wiki/html
// ----------------------------------------------------------------------------
// Basic set. Feel free to add more tags
// ----------------------------------------------------------------------------
mySettings = {
	onShiftEnter:	{keepDefault:false, replaceWith:'<br />\n'},
	onCtrlEnter:	{keepDefault:false, openWith:'\n<p>', closeWith:'</p>\n'},
	onEnter:  {keepDefault:false, replaceWith:'<br />\n'},
	onTab:			{keepDefault:false, openWith:'	 '},
	markupSet: {
		"b":{name:'Bold', key:'B', openWith:'(!(<strong>|!|<b>)!)', closeWith:'(!(</strong>|!|</b>)!)' },
		"i":{name:'Italic', key:'I', openWith:'(!(<em>|!|<i>)!)', closeWith:'(!(</em>|!|</i>)!)' },
		"s":{name:'Stroke through', key:'S', openWith:'<del>', closeWith:'</del>' },
		"sep1":{separator:'---------------' },
		"ul":{name:'Ul', openWith:'<ul>\n', closeWith:'</ul>\n' },
		"ol":{name:'Ol', openWith:'<ol>\n', closeWith:'</ol>\n' },
		"li":{name:'Li', openWith:'<li>', closeWith:'</li>' },
		"sep2":{separator:'---------------' },
		"l":{name:'Link', key:'L', openWith:'<a href="[![Link:!:http://]!]"(!( title="[![Title]!]")!)>', closeWith:'</a>', placeHolder:'Your text to link...' },
		"sep3":{separator:'---------------' },
		"save":{name:'Save', className:'ticket_sprite tick save', replaceWith:function(markitup) { }},
		"close":{name:'Close', className:'ticket_sprite cross cancel', replaceWith:function(markitup) { 
		  myParent.find(".contentEdit").html(localStorage.getItem(myParent.attr("id")).replace(/\n/g,'<br />'));
		  myParent.find(".ticket_sprite.pencil").css("display","inline-block");
		  localStorage.removeItem(myParent.attr("id"));
		} 
		}
	}
} 

mui = {
  callback:function(){}
}
