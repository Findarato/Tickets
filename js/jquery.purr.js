( function( $ ) {	$.purr = function ( notice, options ){ 		// Convert notice to a jQuery object		notice = $( notice);		// Add a class to denote the notice as not sticky		if ( !options.isSticky ){			notice.addClass( 'not-sticky' );		};		// Get the container element from the page		var cont = document.getElementById( 'purr-container' );				// If the container doesn't yet exist, we need to create it		if ( !cont ){			cont = '<div id="purr-container"></div>';		}		// Convert cont to a jQuery object		cont = $( cont );		// Add the container to the page		$( 'body' ).append( cont );		notify();		function notify ()		{				// Set up the close button			var close = document.createElement( 'a' );			$( close ).attr(					{					className: 'close ticketSprite cross',					href: '#close',					innerHTML: ''				}			)				.appendTo( notice )					.click( function ()						{							removeNotice();							return false;						}					);						// Add the notice to the page and keep it hidden initially			notice.appendTo( cont )				.css({"opacity":0})				.hide();							if ( jQuery.browser.msie && options.usingTransparentPNG ){				// IE7 and earlier can't handle the combination of opacity and transparent pngs, so if we're using transparent pngs in our				// notice style, we'll just skip the fading in.				notice.show();			}			else{				//Fade in the notice we just added				notice.css({"opacity":1}).show();			}						function sto(options){				if ( !options.isSticky ){					setTimeout( function (){							removeNotice();													}, options.removeTimer					);				}			};sto(options);		}				function removeNotice (){			// IE7 and earlier can't handle the combination of opacity and transparent pngs, so if we're using transparent pngs in our			// notice style, we'll just skip the fading out.			if ( jQuery.browser.msie && options.usingTransparentPNG )			{								notice.css( { opacity: 0	} )					.animate( 						{ 							height: '0px' 						}, 						{ 							duration: options.fadeOutSpeed, 							complete:  function ()								{									notice.remove();								} 							} 					);			}else{				notice					.css({"opacity":0,"height":0,"display":"none"}).remove();			}		};			};		$.fn.purr = function ( options )	{		options = options || {};		options.fadeInSpeed = options.fadeInSpeed || 500;		options.fadeOutSpeed = options.fadeOutSpeed || 500;		options.removeTimer = options.removeTimer || 4000;		options.isSticky = options.isSticky || false;		options.usingTransparentPNG = options.usingTransparentPNG || false;				this.each( function() 			{				new $.purr( this, options );			}		);				return this;	};})( jQuery );