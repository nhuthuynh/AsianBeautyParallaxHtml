/*! Copyright (c) 2011 Brandon Aaron (http://brandonaaron.net)
 * Licensed under the MIT License (LICENSE.txt).
 *
 * jquery.mousewheel - A jQuery plugin that adds cross-browser mouse wheel support.
 *
 * Thanks to: http://adomas.org/javascript-mouse-wheel/ for some pointers.
 * Thanks to: Mathias Bank(http://www.mathias-bank.de) for a scope bug fix.
 * Thanks to: Seamus Leahy for adding deltaX and deltaY
 *
 * Version: 3.0.6
 *
 * Requires: 1.2.2+
 */
(function(a){function d(b){var c=b||window.event,d=[].slice.call(arguments,1),e=0,f=!0,g=0,h=0;return b=a.event.fix(c),b.type="mousewheel",c.wheelDelta&&(e=c.wheelDelta/120),c.detail&&(e=-c.detail/3),h=e,c.axis!==undefined&&c.axis===c.HORIZONTAL_AXIS&&(h=0,g=-1*e),c.wheelDeltaY!==undefined&&(h=c.wheelDeltaY/120),c.wheelDeltaX!==undefined&&(g=-1*c.wheelDeltaX/120),d.unshift(b,e,g,h),(a.event.dispatch||a.event.handle).apply(this,d)}var b=["DOMMouseScroll","mousewheel"];if(a.event.fixHooks)for(var c=b.length;c;)a.event.fixHooks[b[--c]]=a.event.mouseHooks;a.event.special.mousewheel={setup:function(){if(this.addEventListener)for(var a=b.length;a;)this.addEventListener(b[--a],d,!1);else this.onmousewheel=d},teardown:function(){if(this.removeEventListener)for(var a=b.length;a;)this.removeEventListener(b[--a],d,!1);else this.onmousewheel=null}},a.fn.extend({mousewheel:function(a){return a?this.bind("mousewheel",a):this.trigger("mousewheel")},unmousewheel:function(a){return this.unbind("mousewheel",a)}})})(jQuery);



/**
 * jQuery Plugin to obtain touch gestures from iPhone, iPod Touch and iPad, should also work with Android mobile phones (not tested yet!)
 * Common usage: wipe images (left and right to show the previous or next image)
 *
 * @author Andreas Waltl, netCU Internetagentur (http://www.netcu.de)
 * @version 1.1.1 (9th December 2010) - fix bug (older IE's had problems)
 * @version 1.1 (1st September 2010) - support wipe up and wipe down
 * @version 1.0 (15th July 2010)
 */
(function($) {
   $.fn.touchwipe = function(settings) {
     var config = {
      min_move_x: 20,
      min_move_y: 20,
      wipeLeft: function() { },
      wipeRight: function() { },
      wipeUp: function() { },
      wipeDown: function() { },
      preventDefaultEvents: true
   };

     if (settings) $.extend(config, settings);

     this.each(function() {
       var startX;
       var startY;
     var isMoving = false;

       function cancelTouch() {
         this.removeEventListener('touchmove', onTouchMove);
         startX = null;
         isMoving = false;
       }

       function onTouchMove(e) {
         if(config.preventDefaultEvents) {
           e.preventDefault();
         }
         if(isMoving) {
           var x = e.touches[0].pageX;
           var y = e.touches[0].pageY;
           var dx = startX - x;
           var dy = startY - y;
           if(Math.abs(dx) >= config.min_move_x) {
            cancelTouch();
            if(dx > 0) {
              config.wipeLeft();
            }
            else {
              config.wipeRight();
            }
           }
           else if(Math.abs(dy) >= config.min_move_y) {
              cancelTouch();
              if(dy > 0) {
                config.wipeDown();
              }
              else {
                config.wipeUp();
              }
             }
         }
       }

       function onTouchStart(e)
       {
         if (e.touches.length == 1) {
           startX = e.touches[0].pageX;
           startY = e.touches[0].pageY;
           isMoving = true;
           this.addEventListener('touchmove', onTouchMove, false);
         }
       }
       if ('ontouchstart' in document.documentElement) {
         this.addEventListener('touchstart', onTouchStart, false);
       }
     });

     return this;
   };

 })(jQuery);
;

$(document).bind('ready', function () {
    var $win = $(window),
    section = $('#main .section'),
    nav = $('#nav .navbar'),
    links = $('#nav .navbar .nav-item');

    $win.stellar({
        horizontalScrolling: false,
        verticalScrolling: true
    });

    section.waypoint(function (ev, direction) {
        dataslide = $(this).attr('data-slide');
        $('.nav-item[href*=' + dataslide + ']', nav).parent().addClass('active').siblings().removeClass('active');
    }, { offset: 108 });

    links.bind('click', function (e) { e.preventDefault(); AB.slide.goScroll($(this).attr('href')); return false; })
    
    var AB = {};

    AB.slide = {
        htmlbody: $('html, body'),
        sections: ["intro", "who-exhibits", "visitor", "about"],
        scrollReady: true,
        currentSection: 0,
        sectionAnimationTime: 1500,
        setupScrollHandler: function (){
            $("body").bind("mousewheel", function (delta, aS, aQ, deltaY) {        
                delta.preventDefault();
                // aS limits helps prevent double scroll on touchpad with inertia.
                console.log(deltaY, aS);
                if (deltaY > 0 && aS > 0.4) {
                    AB.slide.goPrev();
                } else if (deltaY < 0 && aS < -0.4) {
                    AB.slide.goNext();
                }
                return false;
            });
        
            $("body").touchwipe({
              wipeUp: function() { AB.slide.goPrev(); },
              wipeDown: function() { AB.slide.goNext(); }
            });
        },
        goNext: function(){
            if( this.currentSection < this.sections.length-1 && this.scrollReady == true ) {
              this.currentSection++;
              AB.slide.goScroll();
            } else if(this.currentSection < this.sections.length){
                this.currentSection++;
                AB.slide.goScroll('footer');
            }
        },
        goPrev: function(){
            if( this.currentSection > 0 && this.scrollReady == true ) {
              this.currentSection--;
              AB.slide.goScroll();
            }
        },
        goScroll: function(target){
            if (typeof target === "undefined"){
              target = this.sections[this.currentSection];
            }else{
              // If target is set add extra delay to slide.
            }
            this.currentSection = $.inArray(target, this.sections);
            this.scrollReady = false;
            if(target=='footer'){
                // Scroll to top of footer or bottom of page depending on screen height;
              var newYPos = $(document).height() - $win.height();
              var footerTop = $(document).height() - ($('#footer').height());
              newYPos = (footerTop < newYPos) ? footerTop : newYPos;
              this.currentSection = this.sections.length;
            } else{
                var newYPos =  Math.ceil($('#'+target).offset().top);
            }
            
            this.htmlbody.stop().animate(
              {scrollTop: newYPos},
              this.sectionAnimationTime,
              'easeInOutQuint',
              function() { 
                // Slight delay helps prevent double scroll on touchpad with inertia.
                // setTimeout( function(){scrollReady = true}, 150);
                AB.slide.scrollReady = true
              }
            );    
          }
    }

    AB.slide.setupScrollHandler();

});