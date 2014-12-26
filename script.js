
document.ontouchmove = function(e){
  e.preventDefault();
};

(function(){
  var theList = $('#shapeD20')[0],
    hammer = new Hammer(theList);

  var sides = [
  {x:-60, y:0},
  {x:-60, y:-72},
  {x:-60, y:-144},
  {x:-60, y:-216},
  {x:-60, y:-288},
  {x:0, y:324},
  {x:0, y:144},
  {x:0, y:252},
  {x:0, y:216},
  {x:0, y:180},
  {x:0, y:288},
  {x:0, y:108},
  {x:0, y:0},
  {x:0, y:36},
  {x:0, y:72},
  {x:60, y:180},
  {x:60, y:252},
  {x:60, y:324},
  {x:60, y:396},
  {x:60, y:108}
  ];

  var missingSides = [13, 15, 7, 9, 11];


  var index = 20;

  hammer.get('pan').set({direction: Hammer.DIRECTION_ALL, threshold: 2, pointers: 0})

  var rotateX = 0;
  var rotateY = 0;


  //var elementHeight = 130;
  //var minFontRatio = 0.8;
  //var maxFontRatio = 1.4;
  //
  //snapTo(parseInt(getListLength() / 2));
  //


  hammer.on('pan', function(ev){
    var x = ev.deltaX % 360;
    var y = ev.deltaY % 360;
    scroll((rotateX + x), (rotateY + y));
  });

  hammer.on('panstart', function(){
    $('#shapeD20').removeClass('animated');
    missingSides.forEach(function(side){
      $('.side' + side).removeClass('fade');
    });
  });

  hammer.on('panend', function(ev){
    $('#shapeD20').addClass('animated');
    rotateX = ev.deltaX % 360;
    rotateY = ev.deltaY % 360;
    index = closest(rotateX, rotateY);

    rotateX = sides[index].x;
    rotateY = sides[index].y;
    snapTo(index);

  });

  function closest(x, y) {
    var diff = compare((sides[0].x - x), (sides[0].y - y));
    var index = 0;

    for (var n = 0; n < sides.length; n++) {
      var newdiff = compare((sides[n].x - x), (sides[n].y - y));
      if (newdiff < diff) {
        diff = newdiff;
        index = n;
      }
    }
    return index;
  }

  function compare(x, y) {
    return Math.pow(x, 2) + Math.pow(y, 2);
  }

  function snapTo(index){

    var property = 'rotateX(' + sides[index].x + 'deg) rotateY(' + sides[index].y + 'deg)';
    $('#shapeD20').css('transform', property);

    if (index >= 16) {
      $('.side' + missingSides[index-16]).addClass('fade');
    }

    //index = limit(index, getListLength() - 1);
    //
    //scrollPosition = -elementHeight * ((index + 1) - 0.5);
    //scroll(scrollPosition);
    //adjustItems(scrollPosition)
    //setActive(index);
  }



  //
  //function adjustItems(scrollPosition) {
  //  _(_.range(getListLength())).forEach(function (index) {
  //    var delta = Math.abs(((index + 0.5) * elementHeight) + scrollPosition);
  //    delta = (delta > 400) ? 400 : delta;
  //    var fontSize = (1 - delta / 400) * (maxFontRatio - minFontRatio) + minFontRatio;
  //    var fontMove = Math.sqrt(Math.pow(400, 2)  - Math.pow(delta, 2)) - 250;
  //
  //    $('#funky li:nth-child(' + (index + 1) + ') p').css({'-webkit-transform': 'scale(' + fontSize + ') translate(' + fontMove + 'px)'});
  //  });
  //}
  //
  //function limit(value, maxValue, minValue){
  //  minValue = minValue || 0;
  //  switch (true){
  //    case value < minValue: return minValue;
  //    case value > maxValue: return maxValue;
  //    default: return value;
  //  }
  //}
  //
  //function getListLength(){
  //  return $('#funky').children().length;
  //}
  //
  function scroll(deltaX, deltaY) {

    var value = 'rotateX(' + (deltaX) + 'deg) rotateY(' + (deltaY) + 'deg)';
    //var value = 'rotateY(' + (deltaX) + 'deg) rotateX(' + (-deltaY) + 'deg)';
    $('#shapeD20').css({transform: value});

    rotateX = (deltaX % 360) / 360;
    rotateY = (deltaY % 360) / 360;
  }

})();






