$(document).ready(function () {
  $.fn.scrollLock = function () {
    var $this = this,
        $window = $(window);

    var $thisHeight = $this.height();
        $thisTop = $this.offset().top;

    var $lastScrollTop = $window.scrollTop();
    $window.scroll(function (e) {

      var $windowHeight = $window.height();
          $currentScrollTop = $window.scrollTop();

      if( $currentScrollTop > $lastScrollTop ){
        //scroll down
        if( $currentScrollTop + $windowHeight == $thisHeight + $thisTop ){
          //sticky the bottom 
          $this.css({
            position: 'fixed',
            bottom: 0
          });
        }
        //if past the side bar container, then unsticky
        //while scroll down if you pass side bar legth, sticky side bar bottom
      }else{
        //scroll up
        //while scroll up if you sticky side bar top if you havent reach the top of side bar yet 
      }
    });
  };
});

$('#sidebar').scrollLock();
