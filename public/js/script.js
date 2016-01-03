
//document.ontouchmove = function(e){
//  e.preventDefault();
//};

(function(){
  console.log("hahaha");
  $(window).scroll(function(){

    if($(window).scrollTop() <= 100) {
      $("#pete").removeClass("timetravel").removeClass("after");
    } else if($(window).scrollTop() + $(window).height() > getDocHeight() - 200) {
      $("#pete").removeClass("timetravel").addClass("after");
    } else {
      $("#pete").removeClass("after").addClass("timetravel");
    }

  });


  function getDocHeight() {
    var D = document;
    return Math.max(
        D.body.scrollHeight, D.documentElement.scrollHeight,
        D.body.offsetHeight, D.documentElement.offsetHeight,
        D.body.clientHeight, D.documentElement.clientHeight
    );
  }

})();



