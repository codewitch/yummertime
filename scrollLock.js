$.fn.sidebarScrollLock = function (pos) {
  var $this = this,
      $window = $(window);
      $sidebar $('#sidebar');

  var $sidebarLength = $sidebar.height();
      $sidebarTop = $sidebar.offset();

  $window.scroll(function (e) {
  
    //while scroll down if you pass side bar legth, sticky side bar bottom
    //while scroll up if you sticky side bar top if you havent reach the top of side bar yet 
  });
};
