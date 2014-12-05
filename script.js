var theList = $('#funky')[0],
  hammer = new Hammer(theList);

document.ontouchmove = function(e){
  e.preventDefault();
};

hammer.get('pan').set({direction: Hammer.DIRECTION_ALL, threshold: 0, pointers: 0})


var offset = 250;
var scrollPosition = 0;
$('#funky').css({transform: 'translateY(' + (offset + scrollPosition) + 'px)'})

var height = 120;


hammer.on('pan', function(ev){
  var activeIndex = -parseInt((scrollPosition + ev.deltaY) / height) + 1;
  console.log(activeIndex);
  $('#funky .active').removeClass('active');
  $('#funky li:nth-child('+ activeIndex +')').addClass('active');
  $('#funky').css({transform: 'translateY(' + (offset + scrollPosition + ev.deltaY) + 'px)'})
});

hammer.on('panstart', function(){
  $('#funky').removeClass('animated');
});

hammer.on('panend', function(ev){
  $('#funky').addClass('animated');


  scrollPosition = scrollPosition + ev.deltaY;


  var activeIndex = -parseInt((scrollPosition) / height) + 1;
  console.log((activeIndex - 0.5) * height);
  snapTo(activeIndex);
});

snapTo(5);

function snapTo(index){
  scrollPosition = -height * (index - 0.5);
  $('#funky').css({transform: 'translateY(' + (offset + scrollPosition) + 'px)'})
  $('#funky li:nth-child('+ index +')').addClass('active');
}

