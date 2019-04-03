

function initMap(){
	var _self = this;
	clearInterval(_self.intervalMap);
	_self.mapFreq = 1500;
	_self.colorScale=['#9CCAE5', '#0F6CB7'];

	_self.backgroundColor="#000000";

	_self.map="WORLD";//US,

	_self.maps=['world_mill_en','us_mill_en_3D','us_merc_en','us_lcc_en','us_aea_en'],

	_self.mapFocus={
           x: 0.5,
           y: 0.5,
           scale: 1,
         };

         _self.zoomMax=5;

         _self.zoomMin=1;

         _self.zoomOnScroll=true;

         _self.regionStyle={
	           initial: {
	                 fill: 'gray',
	                 "fill-opacity": 1,
	                 stroke: 'none',
	                 "stroke-width": 0,
	                 "stroke-opacity": 1,
	               },
	               hover: {
	                 "fill-opacity": 0.8,
	               },
	               selected: {
	                 fill: 'yellow',
	               },
	               selectedHover: {
	               },
             };
         _self.mapData={};
         if(_self.mapIndex==0){
        	 _self.mapData['US'] = 0;
             _self.mapData['GB'] = 0;
             _self.mapData['MX'] = 0;
             _self.mapData['CA'] = 0;
             _self.mapData['DE'] = 0;

         }else{
        	 _self.mapData['US-CA'] = 0;
             _self.mapData['US-NY'] = 0;
             _self.mapData['US-WA'] = 0;
             _self.mapData['US-FL'] = 0;
             _self.mapData['US-AZ'] = 0;

         }

         _self.drawMap(_self);
         _self.intervalMap=setInterval(function(){_self.updateMap(_self);}, _self.mapFreq);

}

function toggleMap(_self,map){
	if(map=="iso"){
		_self.mapIndex = 1;
	}else if(map=="us"){
		_self.mapIndex = 4;
	}else if(map=="world"){
		_self.mapIndex = 0;
	}else{
		_self.mapIndex = 0;
	}
	initMap();

}

function updateMap(_self){
	for(var item in _self.mapData){
		_self.mapData[item]+=Math.floor(Math.random()*20);
	}
    if(_self.mapObject.series.regions){
        var ds = new jvm.DataSeries({
            values:_self.mapData,
            scale:_self.colorScale,
            normalizeFunction:'polynomial',
        },_self.mapObject.series.regions[0].elements);//need to pass in the elements from the map object otherwise nothing will get colored
        _self.mapObject.series.regions[0] = ds;

    }
}

function drawMap(_self){
	 $('#contentMap').html('');
     $('.jvectormap-label').remove();
     $('#contentMap').vectorMap({
         map: _self.maps[_self.mapIndex],
         backgroundColor:_self.backgroundColor,
         zoomMax:_self.zoomMax,
         zoomMin:_self.zoomMin,
         zoomOnScroll:_self.zoomOnScroll,
         regionStyle:_self.regionStyle,
         focusOn: _self.mapFocus,
         series: {
               regions: [{
                 scale: _self.colorScale,
                 normalizeFunction: 'polynomial',
                 values: {}
               }]
             },
         onRegionLabelShow: function(e, el, code){
             var val = 0;
             if(_self.mapData[code]){
                 val = _self.mapData[code];
                 if(_self.showNormalizedData){
                     if(val<.01){val="< .01";}
                 }
             }
           el.html(el.html()+' (count:'+val+')');
         },
         onRegionClick:function(e, code){
             _self.menuArgs.val = code;
             var pos = $('.jvectormap-label');
             var args = {'x':pos['0'].offsetLeft+95,'y':pos['0'].offsetTop};
             if(args.y!=0){
                 _self.showMenu(e,args);
             }
         },
// 	    onViewportChange:function(e,scale){
// 	    	_self.mapFocus.scale=scale;
// 	    }
       });
     try{
         _self.mapObject = $('#contentMap').vectorMap('get','mapObject');
     }catch(e){
         console.log('could not get map object');
     }

     _self.updateMap(_self);
}