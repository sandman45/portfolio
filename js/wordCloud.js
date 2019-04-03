


function initCloud(){
	  var _self=this;
	  _self.frequency=3500;// tag cloud will redraw automatically at this
		// interval if no new data causes the cloud to
		// redraw
      d3.select('#wordCloud').selectAll("*").remove();
	  _self.layout=d3.layout.cloud();
	  _self.fill=d3.scale.category20b();
	  _self.stopWords="i|me|my|myself|we|us|our|ours|ourselves|you|your|yours|yourself|yourselves|he|him|his|himself|she|her|hers|herself|it|its|itself|they|them|their|theirs|themselves|what|which|who|whom|whose|this|that|these|those|am|is|are|was|were|be|been|being|have|has|had|having|do|does|did|doing|will|would|should|can|could|ought|i'm|you're|he's|she's|it's|we're|they're|i've|you've|we've|they've|i'd|you'd|he'd|she'd|we'd|they'd|i'll|you'll|he'll|she'll|we'll|they'll|isn't|aren't|wasn't|weren't|hasn't|haven't|hadn't|doesn't|don't|didn't|won't|wouldn't|shan't|shouldn't|can't|cannot|couldn't|mustn't|let's|that's|who's|what's|here's|there's|when's|where's|why's|how's|a|an|the|and|but|if|or|because|as|until|while|of|at|by|for|with|about|against|between|into|through|during|before|after|above|below|to|from|up|upon|down|in|out|on|off|over|under|again|further|then|once|here|there|when|where|why|how|all|any|both|each|few|more|most|other|some|such|no|nor|not|only|own|same|so|than|too|very|say|says|said|shall",
	  _self.showMouseOverAnim=true;
	  _self.rotateWords=true;
	  _self.rangeLow=10;
	  _self.rangeHigh=60;
	  _self.scaleType="log";
	  _self.spiral="archimedean";
	  _self.rotationAngleNeg=-20;// minimum rotation angle of the word
	  _self.rotationAnglePos=20;// maximum rotation angle of the word

	  _self.wordCountMax=50;// number of words tag cloud renders
	  _self.rotateWords=false;// turn on/off the tagclouds ability to rotate
								// the words
	  _self.showMenuHide=true;
	  _self.useColorRange=true;// turn on off the color range.. turning off the
								// color range will allow for specific color
								// customization based on the the word
								// etc..realtime only for now
	  _self.cloudColorRange=["A3CAF7","398DED","0065D9","52769E"];
	  _self.defaultColor="000000";// default color for the words if colorRange
									// is false
	  _self.sentimentColors=["green","red","blue","black"],
      _self.width=$('#feature2').width();
      _self.height=250;

      _self.canvas = d3.select('#wordCloud')
           .attr("width", _self.width)
           .attr("height", _self.height);

      _self.background = _self.canvas.append("g")
           .attr('width',_self.width)
           .attr('height',_self.height);

      _self.vis = _self.canvas.append('g')
           .attr('width',_self.width)
           .attr('height',_self.height)
           .attr("transform", "translate(" + [_self.width >> 1, _self.height >> 1] + ")");


      _self.wordData={};
      _self.wordData["TRUTH"] = {key:"Truth",value:100,sentiment:"POSITIVE"};
      _self.wordData["DOUBT"] = {key:"Doubt",value:26,sentiment:"NEGATIVE"};
      _self.wordData["FEAR"] = {key:"Fear",value:45,sentiment:"NEGATIVE"};
      _self.wordData["LIGHT"] = {key:"Light",value:200,sentiment:"POSITIVE"};
      _self.wordData["INTELLIGENCE"] = {key:"Intelligence",value:150,sentiment:"POSITIVE"};
      _self.wordData["WISDOM"] = {key:"Wisdom",value:95,sentiment:"POSITIVE"};
      _self.wordData["HATRED"] = {key:"Hatred",value:30,sentiment:"NEGATIVE"};
      _self.wordData["SORROW"] = {key:"Sorrow",value:20,sentiment:"NEGATIVE"};
      _self.wordData["GOOD"] = {key:"Good",value:134,sentiment:"POSITIVE"};
      _self.wordData["RESPECT"] = {key:"Respect",value:176,sentiment:"POSITIVE"};
      _self.wordData["FAITH"] = {key:"Faith",value:201,sentiment:"POSITIVE"};


      _self.fill.range = _self.cloudColorRange; // color ranges
      _self.fontSize = d3.scale[_self.scaleType]().range([_self.rangeLow, _self.rangeHigh]);// fontsize

      _self.layout = d3.layout.cloud()
      .rotate(function(d) {
          if(_self.rotateWords){
              var val = Math.floor(Math.random() * (_self.rotationAnglePos*2)) + _self.rotationAngleNeg;
              return val;
          }else{return 0;}})
      .font(_self.font)
      .timeInterval(20)
      .size([_self.width,_self.height])
      .fontSize(function(d) { return _self.fontSize(d.value); })
      .text(function(d) { return d.key; })
      .on('word',function(d){_self.progress(_self);})
      .on('end',function(a1,a2){_self.draw(a1,a2,_self);})
      .start();

      _self.updateCloudGraph(_self);
      _self.intervalDraw=setInterval(function(){_self.updateCloudGraph(_self);}, _self.frequency);
}

function updateCloudGraph(_self) {

        var words = _self.filterWords();
        words.sort(
                function(a,b){
                    return a.value-b.value;
                    });
        words.reverse();
        _self.complete=0;
        words = _self.stripData(words);
        _self.wordLength = words.length;

        _self.layout
          .font('Helvetica')
          .spiral(_self.spiral);

        if(words.length==0){
            words.push({key:"No Data",value:1,sentiment:'none'});
        }
        if(words.length>0){
            _self.fontSize = d3.scale[_self.scaleType]().range([_self.rangeLow,_self.rangeHigh]);
            _self.fontSize.domain([words[words.length - 1].value || 1, (words[0].value+200)]);
            _self.layout.stop().words(words).start();
        }else if(words.length==0){
            _self.loading = false;
        }
}

function draw(words,bounds,_self) {
            scale = bounds ? Math.min(
                      _self.width / Math.abs(bounds[1].x - _self.width / 2),
                      _self.width / Math.abs(bounds[0].x - _self.width / 2),
                      _self.height / Math.abs(bounds[1].y - _self.height / 2),
                      _self.height / Math.abs(bounds[0].y - _self.height / 2)) / 2 : 1;

            var text = _self.vis.selectAll('text').data(words,function(d)
                    {
                        return d.text;
                });

            text.transition().duration('1000')
            .attr("transform", function(d) { return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")"; })
            .style("font-size", function(d) { return d.size + "px"; });

            text.enter().append("text")
            .attr("text-anchor", "middle")
            .attr("transform", function(d) { return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")"; })
            .style("font-size", function(d) { return d.size + "px"; })
            .style('cursor',function(){ return _self.showPopupMenu?"hand":"default";})
            .style("opacity", 1e-6)
            .transition()
            .duration(1000)
            .style("opacity", 1);
            // set color fills
            text.style("font-family", function(d) { return d.font; })
            .style("fill", function(d) {
                var color="";
                if(_self.useColorRange){
                    color=_self.fill(d.text);
                }else{
                    color=_self.getSentColor(_self,d.text);
                }
                return color;
                })
            .text(function(d) { return d.text; });

            text.on("click", function(d) { })
            .on('mouseover',function(){
                _self.showMouseOverAnim?$(this).stop().animate({ opacity: 0.5 }, 500):"";
            })
            .on('mouseout',function(){
                _self.showMouseOverAnim?$(this).stop().animate({ opacity: 1.0 }, 500):"";
            });
            var exitGroup = _self.background.append("g")
            .attr("transform", _self.vis.attr("transform"));
            var exitGroupNode = exitGroup.node();
            text.exit().each(function() {
              exitGroupNode.appendChild(this);
            });

            exitGroup.transition()
            .duration(1000)
            .style("opacity", 1e-6)
            .remove();
            _self.vis.transition()
            .delay(1000)
            .duration(750)
            .attr("transform", "translate(" + [_self.width >> 1, _self.height >> 1] + ")scale(" + scale + ")");

//            _self.timeOut = setTimeout(function(){_self.resetChartLoading();}, _self.frequency);
            }

function progress(_self){
    //_self.statusText.text(++_self.complete + "/" + _self.wordLength);
}

function getSentColor(_self,val){
		var type = "";
		for(var word in _self.wordData){
		    if(val==_self.wordData[word].key){
		        type = _self.wordData[word].sentiment;
		    }
		}
		var color=_self.defaultColor;
		if(type=="POSITIVE"){
		    color=_self.sentimentColors[0];
		}else if(type=="NEGATIVE"){
		    color=_self.sentimentColors[1];
		}else if(type=="MIXED"){
		    color = _self.sentimentColors[2];
		}else if(type=="NEUTRAL"){
		    color = _self.sentimentColors[3];
		}
		return color;
}

function resetChartLoading(){
		var _self = this;
		clearTimeout(_self.timeOut);
		_self.loading = false;
}
function filterWords(){
	var _self = this;
	var words = [];

//	_self.wordData.forEach(function(word){
//	    val = _.indexOf(filtered,word.key,false);
//	    ign = _.indexOf(_self.ignore,word.key,false);
//	    if(val==-1&&ign==-1){
//	        words.push(word);
//	    }else{
//
//	    }
//	});
	for(var word in _self.wordData){
		words.push(_self.wordData[word]);
	}
	return words;
}

function stripData(words){
    var _self = this;
    var splicedArr = words.splice(0,_self.wordCountMax);
    return splicedArr;
}


