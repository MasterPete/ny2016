
document.ontouchmove = function(e){
  e.preventDefault();
};

(function(){
  var theList = $('#funky')[0],
    hammer = new Hammer(theList);

  hammer.get('pan').set({direction: Hammer.DIRECTION_ALL, threshold: 2, pointers: 0})


  var offset = 250;
  var scrollPosition = 0;
  var elementHeight = 130;
  var minFontRatio = 0.8;
  var maxFontRatio = 1.4;



  snapTo(parseInt(getListLength() / 2));

  function foo(scrollPosition) {
    _(_.range(getListLength())).forEach(function (index) {
      var delta = Math.abs(((index + 0.5) * elementHeight) + scrollPosition);
      delta = (delta > 400) ? 400 : delta;
      var fontSize = (1 - delta / 400) * (maxFontRatio - minFontRatio) + minFontRatio;
      var fontMove = (1 - delta / 400) * 150;

      console.log(index, delta, fontSize);
      $('#funky li:nth-child(' + (index + 1) + ') p').css({'-webkit-transform': 'scale(' + fontSize + ') translate(' + fontMove + 'px)'});
    });
  }

  hammer.on('pan', function(ev){
    var activeIndex = limit(-parseInt((scrollPosition + ev.deltaY) / elementHeight), getListLength() - 1);
    scroll(scrollPosition + ev.deltaY);
    setActive(activeIndex);
    foo(scrollPosition + ev.deltaY);
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
//    snapTo(activeIndex);
    snapTo(activeIndex + parseInt(ev.velocityY * 2));

    foo(scrollPosition);
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

  function setActive(activeIndex){
    $('#funky .active').removeClass('active');
    $('#funky li:nth-child('+ (activeIndex+1) +')').addClass('active');
    $('#funky li').removeClass('small-0');
    $('#funky li').removeClass('small-1');
    $('#funky li').removeClass('small-2');
    $('#funky li').removeClass('small-3');


    _(_.range(getListLength())).forEach(function(index){
      $('#funky li:nth-child('+ (index+1) +')').addClass('small-'+Math.abs(activeIndex - index));
    });
  }
})();

