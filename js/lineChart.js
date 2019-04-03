
function initLines(){

	var margin = {top: 10, right: 40, bottom: 50, left: 25};
	var lWidth=$("#feature3").width();
	var lHeight=250;


	var parseDate = d3.time.format("%Y%m%d").parse;

	var x = d3.time.scale()
	    .range([0, lWidth]);

	var y = d3.scale.linear()
	    .range([lHeight, 0]);

	var color = d3.scale.category10();

	var xAxis = d3.svg.axis()
	    .scale(x)
	    .orient("bottom");

	var yAxis = d3.svg.axis()
	    .scale(y)
	    .orient("left");

	var line = d3.svg.line()
	    .interpolate("cardinal")
	    .x(function(d) { return x(d.date); })
	    .y(function(d) { return y(d.temperature); });

	 d3.select('#lineChart').selectAll("*").remove();

	var svg = d3.select("#lineChart").append("svg")
	    .attr("width", lWidth + margin.left + margin.right)
	    .attr("height", lHeight + margin.top + margin.bottom)
		.append("g")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")");


	d3.tsv("data/lineChart.tsv", function(error, data) {
	  color.domain(d3.keys(data[0]).filter(function(key) { return key !== "date"; }));

	  data.forEach(function(d) {
	    d.date = parseDate(d.date);
	  });

	  var cities = color.domain().map(function(name) {
	    return {
	      name: name,
	      values: data.map(function(d) {
	        return {date: d.date, temperature: +d[name]};
	      })
	    };
	  });

	  x.domain(d3.extent(data, function(d) { return d.date; }));

	  y.domain([
	    d3.min(cities, function(c) { return d3.min(c.values, function(v) { return v.temperature; }); }),
	    d3.max(cities, function(c) { return d3.max(c.values, function(v) { return v.temperature; }); })
	  ]);

	  svg.append("g")
	      .attr("class", "x axis")
	      .attr("transform", "translate(0," + lHeight + ")")
	      .call(xAxis);

	  svg.append("g")
	      .attr("class", "y axis")
	      .call(yAxis)
	      .append("text")
	      .attr("transform", "rotate(-90)")
	      .attr("y", 6)
	      .attr("dy", ".71em")
	      .style("text-anchor", "end")
	      .text("Temperature (F)");

	  var city = svg.selectAll(".city")
	      .data(cities)
	      .enter().append("g")
	      .attr("class", "city");

	  city.append("path")
	      .attr("class", "line")
	      .attr("d", function(d) { return line(d.values); })
	      .style("stroke", function(d) { return color(d.name); })
	      .on("mouseover",function(d){
	    	  //d3.select(this).style('stroke',"orange");
	    	  var mPos = d3.mouse(this);



	      })
	      .on("mouseout",function(d){
	    	  //d3.select(this).style('stroke',"blue");
	    	  var mPos = d3.mouse(this);
	      });

	  city.append("text")
	      .datum(function(d) { return {name: d.name, value: d.values[d.values.length - 1]}; })
	      .attr("transform", function(d) { return "translate(" + x(d.value.date) + "," + y(d.value.temperature) + ")"; })
	      .attr("x", 3)
	      .attr("dy", ".35em")
	      .text(function(d) { return d.name; });

	  for(var i=0;i<3;i++){
		  var points = svg.selectAll(".point")
	       .data(cities[i].values)
	       .enter().append("svg:circle")
	       .attr("stroke", "black")
	       .attr("fill", function(d, i) { return "black"; })
	       .attr("cx", function(d, i) { return x(d.date); })
	       .attr("cy", function(d, i) { return y(d.temperature); })
	       .attr("r", function(d, i) { return 2.5; })
	       .on("mouseover",function(d){
		    	  //d3.select(this).style('stroke',"orange");
		    	  //var mPos = d3.mouse(this);
		    	  d3.select(this).style('fill','orange');
		    	  d3.select(this).attr('r',5);
		    	  var x = d3.event.pageX;
		    	  var y = d3.event.pageY;
		    	  showToolTip({'x':x,'y':y},d);
		      })
		   .on("mouseout",function(d){
		    	  //d3.select(this).style('stroke',"blue");
		    	  //var mPos = d3.mouse(this);
		    	  d3.select(this).style('fill','black');
		    	  d3.select(this).attr('r',2.5);
		    	  var x = d3.event.pageX;
		    	  var y = d3.event.pageY;
		    	  hideToolTip({'x':x,'y':y},d);
		     });
	  }
	});

}

function showToolTip(mouse,data){
	var offset = {'right':10,'top':40};
	$('#toolTip').show();
	$('#toolTip').css('left',mouse.x+offset.right);
	$('#toolTip').css('top',mouse.y-offset.top);
	$('#toolTip').html(data.date.toLocaleDateString() + "<br>" +
			" Temp: " + data.temperature + "&deg F");

}

function hideToolTip(mouse,data){
	$('#toolTip').hide();
	$('#toolTip').html('');
}



