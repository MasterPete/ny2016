
document.ontouchmove = function(e){
  e.preventDefault();
};

$(function(){
  var theList = $('#shapeD20')[0];
  var hammer = new Hammer.Manager(theList);

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
  var index = 1;

  hammer.add(new Hammer.Pan({direction: Hammer.DIRECTION_ALL, threshold: 2, pointers: 0}));
  hammer.add(new Hammer.Swipe()).recognizeWith(hammer.get('pan'));
  hammer.get('swipe').set({direction: Hammer.DIRECTION_VERTICAL});

  var rotateX = 0;
  var rotateY = 0;

  var dicing = false;

  hammer.on('pan', function(ev){
    if(!dicing){
      var damper = 0.3;

      var x = (-ev.deltaY*damper) % 360;
      var y = (ev.deltaX*damper) % 360;
      scroll((rotateX + x), (rotateY + y));
    }
  });

  hammer.on('panstart', function(){
    if(!dicing) {
      $('#shapeD20').removeClass('animated');
      missingSides.forEach(function(side){
        $('.side' + side).removeClass('fade');
      });
    }

    $('#ray').addClass('animated');
    $('aside').addClass('animated');
    $('#ray').one(animationEvent,
      function(event) {
        $('#ray').remove();
      });

  });

  hammer.on('panend', function(ev){
    if(!dicing) {
      $('#shapeD20').addClass('animated');
      rotateX = -ev.deltaY % 360;
      rotateY = ev.deltaX % 360;
      index = closest(rotateX, rotateY);

      rotateX = sides[index].x;
      rotateY = sides[index].y;
      snapTo(index);
    }

  });

  hammer.on('swipeup', function(ev) {
    if(!dicing) {
      dicing = true;
      missingSides.forEach(function(side){
        $('.side' + side).removeClass('fade');
      });
      $('#container').addClass('bounce');

      $('#shadow').one(animationEvent,
        function(event) {
          dicing = false;
          $('#container').css('transform', '');
          $('#shapeD20').addClass('stop');
          $('#shapeD20').one(animationEvent,
            function(event) {
              $('#message').addClass('animated');
            });
        });
    }
  })

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
  }

  function scroll(deltaX, deltaY) {
    var value = 'rotateX(' + (deltaX) + 'deg) rotateY(' + (deltaY) + 'deg)';
    $('#shapeD20').css({transform: value});
  }

  function whichAnimationEvent(){
    var t,
      el = document.createElement("fakeelement");

    var animations = {
      "animation"      : "animationend",
      "OAnimation"     : "oAnimationEnd",
      "MozAnimation"   : "animationend",
      "WebkitAnimation": "webkitAnimationEnd"
    }

    for (t in animations){
      if (el.style[t] !== undefined){
        return animations[t];
      }
    }
  }

  var animationEvent = whichAnimationEvent();

});






