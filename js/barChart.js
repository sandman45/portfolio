
function initBar(){
	 _self = this;
	 _self.frequency = 1500;
	 _self.anim=1000;
	 if(_self.intervalRef){
		 clearInterval(_self.intervalRef);
	 }
	 var width = $('#feature1').width();
	 var height = 250;
	 $('#barChart').width(width);
	 $('#barChart').height(height);
	 _self.canvasBar = d3.select('#barChart');
     _self.chartvals={w:$('#barChart').width(),h:20};
     _self.chartvals.x=d3.scale.linear().domain([0,100]).rangeRound([0,_self.chartvals.w]);
     _self.chartvals.y=d3.scale.linear().domain([0,1]).range([0,_self.chartvals.h]);
     _self.intervalRef=setInterval(function(){_self.updateGraph(_self);}, _self.frequency);

     _self.valueTextColor='#666666';
     _self.underTextColor='#666666';
     _self.barTextColor='#ffffff';
     _self.barStroke='white';
     _self.barFill='steelblue';
	 _self.data = [
				{label:'Enders Game',value:350},
				{label:'Ghost Protocal',value:325},
				{label:'Sherlock Holmes',value:245},
	            {label:'Oblivion',value:100},
				{label:'Oz',value:98},
				{label:'Earth',value:50},
				{label:'TopGun',value:30},
				{label:'V',value:25},
				{label:'Star Wars',value:21},
				{label:'Star Trek',value:15},
				{label:'Total Recall',value:1}];
	drawChart(_self);

}
function drawChart(_self){
	 var vtext = _self.canvasBar.selectAll('.vtext').data(data);
     vtext.enter()
     .insert('svg:text')
     .attr('class','vtext')
     .attr('id',function(d,i){return 'vtext'+i;})
     .attr('y', function(d,i){return _self.chartvals.y(i)+14.5;})
     .attr('x', 10.5)
     .attr('style','text-anchor:middle;')
     .style('cursor','default')
     .text(function(d){return d.value;})
     .attr('fill',function(d){
         return _self.valueTextColor;
     });
     vtext.text(function(d){return d.value;});
     var valwidth = 0;

     if(document.getElementById('vtext0')){
          valwidth=document.getElementById('vtext0').getBBox().width;
     }
     vtext.attr('x',function(d){return 5.5+Math.floor(valwidth*0.5);});
     _self.chartvals.x=data.length>0?d3.scale.linear().domain([0,data[0].value+10]).rangeRound([0,_self.chartvals.w-valwidth]):0;
     vtext.exit().remove();
     var rOff = 20;
     var utext = _self.canvasBar.selectAll('.utext').data(data);
     utext.enter()
     .insert('svg:text')
     .attr('class', 'utext')
     .attr('y', function(d,i){return _self.chartvals.y(i)+14.5;})
     .attr('x', valwidth+rOff+4)
     .style('cursor','default')
     .attr('id',function(d,i){return 'utext'+i;})
     .text(function(d){return d.label;})
     .attr('fill',function(d){return _self.underTextColor;});
     utext.text(function(d){return d.label;}).attr('x', valwidth+rOff+4);
     utext.exit().remove();

     var rect = _self.canvasBar.selectAll('.rect').data(data);
     rect.enter()
         .insert('svg:rect')
         .attr('class','rect')
         .attr('id',function(d,i){return 'rect'+i;})
         .attr("y", function(d, i) { return _self.chartvals.y(i) - .5; })
         .attr("x", valwidth+rOff)
         .attr("height", _self.chartvals.h)
         .style('cursor','default')
         .attr("width", function(d) { return Math.floor(_self.chartvals.x(d.value)); });
     rect.attr('x', valwidth+rOff).transition()
         .duration(_self.anim)
         .attr("width", function(d) { return Math.floor(_self.chartvals.x(d.value)); });
     rect.exit().remove();

     var text = _self.canvasBar.selectAll('.otext').data(data);
     text.enter()
         .insert('svg:text')
         .attr('clip-path',function(d,i){return 'url(#clip'+i+')';})
         .attr('class','otext')
         .attr('y', function(d,i){return _self.chartvals.y(i)+14.5;})
         .attr('x', valwidth+rOff+4)
         .style('cursor','default')
         .text(function(d){return d.label;})
         .attr('fill',function(d){
             return _self.barTextColor;
         });
     text.text(function(d){return d.label;}).attr('x', valwidth+rOff+4);
     text.exit().remove();

     var clip=_self.canvasBar.selectAll('.clip').data(data);
     clip.enter()
         .insert('svg:clipPath')
         .attr('class','clip')
         .attr('id',function(d,i){return  'clip'+i;})
         .style('cursor','default')
         .append('use').attr('xlink:href',function(d,i){return '#rect'+i;});
     clip.exit().remove();


}

function updateGraph(_self){

	for(var item in _self.data){
		_self.data[item].value+= Math.floor(Math.random()*11);
	}
	_self.drawChart(_self);
}