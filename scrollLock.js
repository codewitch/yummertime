$(document).ready(function () {
  $.fn.scrollLock = function () {
    var $this = this,
        $window = $(window);

    var $lastScrollTop = $window.scrollTop();
        $currentStatus = 0;
        // 0 = scrolling, 1 = sticky top, 2 = sticky bottom

    var $thisTop = $this.offset().top;
        $headerOffset = 60;
    $window.scroll(function (e) {

      var $thisHeight = $this.outerHeight(false);
          $thisCurrentTop = $this.offset().top;
          $parentHeight = $this.parent().outerHeight(false);
          $parentTop = $this.parent().offset().top;
          $windowHeight = $window.height();
          $currentScrollTop = $window.scrollTop();

      var $windowBottom = $currentScrollTop + $windowHeight;

      if( $currentScrollTop > $lastScrollTop ){
        //scroll down
        if( $windowBottom >= $thisHeight + $thisCurrentTop ){
          //if at end of side bar and not yet at end of main section, sticky the bottom
          if( $windowBottom < $parentHeight + $parentTop ){
            $this.css({
              position: 'fixed',
              bottom: 0,
              top: ''
            });
            $currentStatus = 2;
          }else{
            //else, aboslute bottom position
            $this.css({
              position: 'absolute',
              bottom: 0,
              top: ''
            });
            $currentStatus = 0;
          }
        }else{
          //window bottom is in the middle of sidebar
          if( $currentStatus == 1 ){
            //if scroll down while side bar is sticky top
            //absolute position it.
            $this.css({
              position: 'absolute',
              top: $currentScrollTop - $parentTop + $headerOffset, 
              bottom: ''
            });
            $currentStatus = 0;
          }
        }
      }else{
        //scroll up
        if( $currentScrollTop <= $thisCurrentTop - $headerOffset ){
          //if at top of side bar and not yet top of main section, sticky the top
          if( $currentScrollTop > $parentTop ){
            $this.css({
              position: 'fixed',
              top: $headerOffset,
              bottom: ''
            });
            $currentStatus = 1;
          }else{
            $this.css({
              position: 'relative',
              top: '',
              bottom: ''
            });
            $currentStatus = 0;
          }
        }else{
          //window top is in the middle of sidebar
          if( $currentStatus == 2 ){
            //if scroll up while side bar is sticky bottom
            //absolute position it.
            $this.css({
              position: 'absolute',
              bottom: $parentTop + $parentHeight - $currentScrollTop - $windowHeight, 
              top: ''
            });
            $currentStatus = 0;
          }
        }
      }
      $lastScrollTop = $currentScrollTop;
    });
  };

  $('#sidebar').scrollLock();
});

