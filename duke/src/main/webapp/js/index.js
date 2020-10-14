
$( "li" ).hover(
  function() {
      $(this).find("a").css("color","#555");
      $(this).find("span").stop().animate({
      width:"100%",
      opacity:"1",
    }, 600, function () {
        // Animation complete.
        // Show Navigation
    })
  }, function() {
      $(this).find("a").css("color","#e4efe9");
      $(this).find("span").stop().animate({
      width:"0%",
      opacity:"0",
    }, 600, function () {
        // Animation complete.
        // Show Navigation
    })
  }
);