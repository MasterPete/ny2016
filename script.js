
var wallRatio = 1.5 ;

d3.json("flare.json", function (json) {
  var maxValue = d3.max(json.children, function (element) { return element.value; });

  var yScale = d3.scale.linear()
    .domain([0, maxValue])
    .range([0, 350]);

  var wall = d3.select("#wall");

  var data = json.children;

  var bricks = wall.selectAll(".brick")
    .data(data)
    .enter()
    .append("div")
    .attr("class", function (data) {
      return "brick " + data.color;})
    .style("width", function (data) { return yScale(data.value) + "px"; })
    .text(function(data){ return data.name; })


  var widthUpdate = function() {
    d3.select('#wall').style("width", yScale(maxValue)*wallRatio + "px");
  }

  d3.select("#slider")
    .on("change", function() {
      yScale.range([0, this.value]);
      bricks.style("width", function (data) { return yScale(data.value) + "px"; })
      widthUpdate();
    });


  d3.select('#sort-reset')
    .on('click', function(){
      d3.selectAll(".brick").data(data)
        .style("width", function (data) { return yScale(data.value) + "px"; })
        .attr("class", function (data) {
          return "brick " + data.color;});
      widthUpdate();
  });

  d3.select('#sort-value')
    .on('click', function(){
      console.log("value");
      d3.selectAll(".brick").data(_.sortBy(data, function(el){return -el.value;}))
      .style("width", function (data) { return yScale(data.value) + "px"; })
      .attr("class", function (data) {
        return "brick " + data.color;});
      widthUpdate();
    });

  var colorValues = {
    "green-a": 10,
    "green-b": 9,
    "green-c": 8,
    "light-grey": 7,
    "red-c": 6,
    "red-b": 5,
    "red-a": 4,
    'no-data': 3
  };
  d3.select('#sort-color')
    .on('click', function(){
      console.log("color");
      d3.selectAll(".brick").data(_.sortBy(data, function(el){
          return -(colorValues[el.color] * 1000 + el.value);
        }))
        .style("width", function (data) { return yScale(data.value) + "px"; })
        .attr("class", function (data) {
          return "brick " + data.color;});
    });

  widthUpdate();

//  resize();
//  window.addEventListener("resize", resize);
})