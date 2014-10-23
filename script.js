
var wallRatio = 1.4 ;

d3.json("flare.json", function (json) {
  var maxValue = d3.max(json.children, function (element) { return element.value; });

  var yScale = d3.scale.linear()
    .domain([0, maxValue])
    .range([0, 200]);

  var wall = d3.select("#wall");

  var data = json.children;

  var bricks = wall.selectAll(".brick")
    .data(data)
    .enter()
    .append("div")
    .attr("class", function (data) {
      return "brick " + data.color;})
    .style("height", function (data) { return yScale(data.value) + "px"; })
    .text(function(data){ return data.name; })


  var heightUpdate = function() {
    d3.select('#wall').style("height", yScale(maxValue)*wallRatio + "px");
    console.log(yScale(maxValue) + " wallHeight")
  }

  d3.select("#slider")
    .on("change", function() {
      yScale.range([0, this.value]);
      bricks.style("height", function (data) { return yScale(data.value) + "px"; })
      heightUpdate();
    });


  d3.select('#sort-reset')
    .on('click', function(){
      d3.selectAll(".brick").data(data)
        .style("height", function (data) { return yScale(data.value) + "px"; })
        .attr("class", function (data) {
          return "brick " + data.color;});
      heightUpdate();
  });

  d3.select('#sort-value')
    .on('click', function(){
      d3.selectAll(".brick").data(_.sortBy(data, function(el){return -el.value;}))
      .style("height", function (data) { return yScale(data.value) + "px"; })
      .attr("class", function (data) {
        return "brick " + data.color;});
      heightUpdate();
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
      d3.selectAll(".brick").data(_.sortBy(data, function(el){
          return -(colorValues[el.color] * 1000 + el.value);
        }))
        .style("height", function (data) { return yScale(data.value) + "px"; })
        .attr("class", function (data) {
          return "brick " + data.color;});
    });

  heightUpdate();

//  resize();
//  window.addEventListener("resize", resize);
})