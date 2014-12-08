
document.ontouchmove = function(e){
  e.preventDefault();
};

(function(){
  var theList = $('#funky')[0],
    hammer = new Hammer(theList);

  hammer.get('pan').set({direction: Hammer.DIRECTION_ALL, threshold: 2, pointers: 0})


  var offset = 250;
  var scrollPosition = 0;
  var elementHeight = 120;

  snapTo(parseInt(getListLength() / 2));

  hammer.on('pan', function(ev){
    var activeIndex = limit(-parseInt((scrollPosition + ev.deltaY) / elementHeight), getListLength() - 1);
    if(scrollPosition + ev.deltaY < -60) {
      scroll(scrollPosition + ev.deltaY);
    }
    setActive(activeIndex);
  });

  hammer.on('panstart', function(){
    log('panstart');
    $('#funky').removeClass('animated');
  });

  hammer.on('panend', function(ev){
    log('panend');
    $('#funky').addClass('animated');


    scrollPosition = scrollPosition + ev.deltaY;

    var activeIndex = -parseInt((scrollPosition) / elementHeight);
    snapTo(activeIndex + parseInt(ev.velocityY * 2));
  });


  function snapTo(index){
    index = limit(index, getListLength() - 1);

    scrollPosition = -elementHeight * ((index + 1) - 0.5);
    scroll(scrollPosition);
    setActive(index);
  }

  function log(text){
    $('#console').append(text + "\n");
  }

  function limit(value, maxValue, minValue){
    minValue = minValue || 0;
    switch (true){
      case value < minValue: return minValue;
      case value > maxValue: return maxValue;
      default: return value;
    }
  }

  function getListLength(){
    return $('#funky').children().length;
  }

  function scroll(scrollPosition) {
    $('#funky').css({transform: 'translateY(' + (offset + scrollPosition) + 'px)'});
  }

  function cos(degree) {
    return Math.cos(degree/180*Math.PI);
  }

  function setActive(activeIndex){
    $('#funky .active').removeClass('active');
    $('#funky li:nth-child('+ (activeIndex+1) +')').addClass('active');
    _(_.range(4).forEach(function(index){
      $('#funky li').removeClass('small-'+index);
    }));
    _(_.range(getListLength())).forEach(function(index){
      $('#funky li:nth-child('+ (index+1) +')').addClass('small-'+Math.abs(activeIndex - index));
    });
  }
})();



