jQuery(document).ready(function ($) {
  $.fn.scrollLock = function (mainContentHeight) {
    var $this = this,
        $window = $(window);

    var $lastScrollTop = $window.scrollTop(),
        $currentStatus = 0;
        // 0 = scrolling, 1 = sticky top, 2 = sticky bottom

    var $thisTop = $this.offset().top,
        $headerOffset = 80;
    $window.scroll(function (e) {
      if( mainContentHeight > $this.outerHeight(false)){
        var $thisHeight = $this.outerHeight(false),
            $thisCurrentTop = $this.offset().top,
            $parentHeight = $this.parent().outerHeight(false),
            $parentTop = Math.round($this.parent().offset().top),
            $windowHeight = $window.height(),
            $currentScrollTop = $window.scrollTop(),
            $rightOffset = $this.parent().parent().css('margin-right');

        var $windowBottom = $currentScrollTop + $windowHeight;

        var $isLargeWindow = $windowHeight > $thisHeight;
        var $isScrollDown = $currentScrollTop > $lastScrollTop;

        if($isScrollDown){
          if($isLargeWindow){
            if( $currentScrollTop >= $parentTop - $headerOffset ){
              if( $windowBottom < $parentHeight + $parentTop ){
              // if not yet at end of main section
                $currentStatus = $this.fixTop($headerOffset, $rightOffset);
              }else{
                //else, aboslute bottom position
                $currentStatus = $this.absBottom();
              }
            }else{
            //else at top of page
              $currentStatus = $this.returnNormal();
            }
          } else {
            if( $windowBottom >= $thisHeight + $thisCurrentTop ){
              //if at end of sidebar
              if( $windowBottom < $parentHeight + $parentTop ){
                //if not yet at end of main section
                $currentStatus = $this.fixBottom($rightOffset);
              }else{
                //else, aboslute bottom position
                $currentStatus = $this.absBottom();
              }
            }else{
              //window bottom is in the middle of sidebar
              if( $currentStatus == 1 ){
                //if scroll down while side bar is sticky top
                //absolute position it.
                $this.css({
                  position: 'absolute',
                  top: $currentScrollTop - $parentTop + $headerOffset, 
                  bottom: '',
                  right: 0
                });
                $currentStatus = 0;
              }
            }
          }
        }else{
          //scroll up
          if( $currentScrollTop <= $thisCurrentTop - $headerOffset ){
            //if at top of side bar and not yet top of main section, sticky the top
            if( $currentScrollTop > $parentTop ){
              $currentStatus = $this.fixTop($headerOffset, $rightOffset);
            }else{
            //else at top of page
              $currentStatus = $this.returnNormal();
            }
          }else{
            //window top is in the middle of sidebar
            if( $currentStatus == 2 ){
              //if scroll up while side bar is sticky bottom
              //absolute position it.
              $this.css({
                position: 'absolute',
                bottom: $parentTop + $parentHeight - $currentScrollTop - $windowHeight, 
                top: '',
                right: 0
              });
              $currentStatus = 0;
            }
          }
        }
        $lastScrollTop = $currentScrollTop;
      }
    });
  };

  $.fn.fixBottom = function(rightOffset){
    var $this = this;
    $this.css({
      position: 'fixed',
      bottom: 0,
      right: rightOffset,
      top: ''
    });

    return 2;
  };

  $.fn.absBottom = function(){
    var $this = this;
    $this.css({
      position: 'absolute',
      bottom: 0,
      right: 0,
      top: ''
    });
    
    return 0;
  };

  $.fn.fixTop = function(headerOffset, rightOffset){
    var $this = this;
    $this.css({
      position: 'fixed',
      top: headerOffset,
      bottom: '',
      right: rightOffset,
    });

    return 1;
  };

  $.fn.returnNormal = function(){
    var $this = this;
    $this.css({
      position: 'relative',
      top: '',
      bottom: '',
      right: ''
    });

    return 0;
  };

  $('#sidebar').scrollLock($('#main').outerHeight(false));
});

/*
 * CSS 
#sidebar {
	display: inline-block;
}

#content {
	position: relative;
}

@media only screen and (max-width: 767px) {
	#sidebar {
		display: none !important;
	}
}

@media only screen and (min-width: 768px) and (max-width: 960px) {
	#sidebar {
		display: none !important;
	}
}
 * */
