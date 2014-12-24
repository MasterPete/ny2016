
document.ontouchmove = function(e){
  e.preventDefault();
};

(function(){
  var theList = $('#shapeD20')[0],
    hammer = new Hammer(theList);

  var sides = {
    side1: [-60, 0, 0],
    side2: [-60, -72, 0],
    side3: [-60, -144, 0],
    side4: [-60, -216, 0],
    side5: [-60, -288, 0],
    side6: [0, 324, 0],
    side7: [0, 144, 0],
    side8: [0, 252, 0],
    side9: [0, 216, 0],
    side10: [0, 180, 0],
    side11: [0, 288, 0],
    side12: [0, 108, 0],
    side13: [0, 0, 0],
    side14: [0, 36, 0],
    side15: [0, 72, 0],
    side16: [60, 180, 13],
    side17: [60, 252, 15],
    side18: [60, 324, 7],
    side19: [60, 396, 9],
    side20: [60, 108, 11]
  };

  var arrayY = [0 ,-72 ,-144 ,-216 ,-288 ,324 ,144 ,252 ,216 ,180 ,288 ,108 ,0 ,36 ,72 ,180 ,252 ,324 ,396 ,108];

  var index = 20;

  hammer.get('pan').set({direction: Hammer.DIRECTION_ALL, threshold: 2, pointers: 0})
  //
  //var offset = 250;


  var positionX = 0;
  var positionY = 0;


  //var elementHeight = 130;
  //var minFontRatio = 0.8;
  //var maxFontRatio = 1.4;
  //
  //snapTo(parseInt(getListLength() / 2));
  //


  hammer.on('pan', function(ev){
    //var activeIndex = limit(-parseInt((scrollPosition + ev.deltaY) / elementHeight), getListLength() - 1);
    //scroll(scrollPosition + ev.deltaY);
    //setActive(activeIndex);
    //adjustItems(scrollPosition + ev.deltaY);


    //scroll(ev.deltaX, ev.deltaY);
    scroll((positionX + ev.deltaX), (positionY + ev.deltaY));

  });

  hammer.on('panstart', function(){
    $('#shapeD20').removeClass('animated');

    $('.side13').removeClass('fade');
    $('.side15').removeClass('fade');
    $('.side7').removeClass('fade');
    $('.side9').removeClass('fade');
    $('.side11').removeClass('fade');
  });

  hammer.on('panend', function(ev){
    $('#shapeD20').addClass('animated');



    index = (closest(ev.deltaY, arrayY)+1);

    positionX = sides['side'+index][0];
    positionY = sides['side'+index][1];

    console.log(positionX + ' posX and posY ' + positionY);

    snapTo(index);




    //var activeIndex = -parseInt((scrollPosition) / elementHeight);
    //snapTo(activeIndex);



  });
  //
  //

  function closest(num, arr) {
    var curr = arr[0];
    var diff = Math.abs(num - curr);
    for (var val = 0; val < arr.length; val++) {
      var newdiff = Math.abs(num - arr[val]);
      if (newdiff < diff) {
        diff = newdiff;
        curr = arr[val];
      }
    }
    return arr.indexOf(curr);
  }

  //array = [2, 42, 82, 122, 162, 202, 242, 282, 322, 362];
  //number = 112;
  //alert(closest(number, array));


  function snapTo(index){

    var property = 'rotateX(' + sides['side'+index][0] + 'deg) rotateY(' + sides['side'+index][1] + 'deg)';
    $('#shapeD20').css('transform', property);
    $('.side' + sides['side' + index][2]).addClass('fade');





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


    console.log(deltaX + " x and y " + deltaY);
    //console.log("deltaY " + deltaY);

  }
  //
  //function setActive(activeIndex){
  //  $('#funky .active').removeClass('active');
  //  $('#funky li:nth-child('+ (activeIndex+1) +')').addClass('active');
  //}

})();

