

function initForce(){

	_self.w = $('#funFeature').width();
	_self.h = 250;
	_self.node;
	_self.link;
	_self.root;

	_self.force = d3.layout.force()
	    .on("tick", tick)
	    .charge(function(d) { return d._children ? -d.size / 100 : -30; })
	    .linkDistance(function(d) { return d.target._children ? 80 : 30; })
	    .size([w, h - 160]);

	_self.visFun = d3.select("#canvas")
	    .attr("width", w)
	    .attr("height", h);

	d3.json("data/flare.json", function(json) {
	  root = json;
	  root.fixed = true;
	  root.x = w / 2;
	  root.y = h / 2 - 80;
	  update();
	});

}


function update() {
	var _self=this;
	  var nodes = flatten(_self.root),
	      links = d3.layout.tree().links(nodes);

	  // Restart the force layout.
	  force
	      .nodes(nodes)
	      .links(links)
	      .start();

	  // Update the links…
	  link = _self.visFun.selectAll("line.link")
	      .data(links, function(d) { return d.target.id; });

	  // Enter any new links.
	  link.enter().insert("svg:line", ".node")
	      .attr("class", "link")
	      .attr("x1", function(d) { return d.source.x; })
	      .attr("y1", function(d) { return d.source.y; })
	      .attr("x2", function(d) { return d.target.x; })
	      .attr("y2", function(d) { return d.target.y; });

	  // Exit any old links.
	  link.exit().remove();

	  // Update the nodes…
	  node = _self.visFun.selectAll("circle.node")
	      .data(nodes, function(d) { return d.id; })
	      .style("fill", color);

	  node.transition()
	      .attr("r", function(d) { return d.children ? 4.5 : Math.sqrt(d.size) / 10; });

	  // Enter any new nodes.
	  node.enter().append("svg:circle")
	      .attr("class", "node")
	      .attr("cx", function(d) { return d.x; })
	      .attr("cy", function(d) { return d.y; })
	      .attr("r", function(d) { return d.children ? 4.5 : Math.sqrt(d.size) / 10; })
	      .style("fill", color)
	      .on("click", click)
	      .on("mouseover",function(d){
	    	  var x = d3.event.pageX;
	    	  var y = d3.event.pageY;
	    	  showToolTipForce({'x':x,'y':y},d);
	      })
	      .on("mouseout",function(d){
	    	  var x = d3.event.pageX;
	    	  var y = d3.event.pageY;
	    	  hideToolTipForce({'x':x,'y':y},d);
	      })
	      .on("mousemove",function(d){
	    	  var x = d3.event.pageX;
	    	  var y = d3.event.pageY;
	    	  showToolTipForce({'x':x,'y':y},d);
	      })


	      .call(force.drag);

	  // Exit any old nodes.
	  node.exit().remove();
	}


function tick() {
  link.attr("x1", function(d) { return d.source.x; })
      .attr("y1", function(d) { return d.source.y; })
      .attr("x2", function(d) { return d.target.x; })
      .attr("y2", function(d) { return d.target.y; });

  node.attr("cx", function(d) { return d.x; })
      .attr("cy", function(d) { return d.y; });
}

// Color leaf nodes orange, and packages white or blue.
function color(d) {
  return d._children ? "#3182bd" : d.children ? "#c6dbef" : "#fd8d3c";
}

// Toggle children on click.
function click(d) {
  if (d.children) {
    d._children = d.children;
    d.children = null;
  } else {
    d.children = d._children;
    d._children = null;
  }
  update();
}

// Returns a list of all nodes under the root.
function flatten(root) {
  var nodes = [], i = 0;

  function recurse(node) {
    if (node.children) node.size = node.children.reduce(function(p, v) { return p + recurse(v); }, 0);
    if (!node.id) node.id = ++i;
    nodes.push(node);
    return node.size;
  }

  root.size = recurse(root);
  return nodes;
}

function showToolTipForce(mouse,data){
	var offset = {'right':10,'top':40};
	$('#toolTip').show();
	$('#toolTip').css('left',mouse.x+offset.right);
	$('#toolTip').css('top',mouse.y-offset.top);
	$('#toolTip').html(data.name+ "<br>" +
			" Temp: " + data.size + "");

}

function hideToolTipForce(mouse,data){
	$('#toolTip').hide();
	$('#toolTip').html('');
}

