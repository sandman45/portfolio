$(document).ready(function(){
    _self = this;

    $('#usBtn').click(function(){
        toggleMap(_self,'us');
    });
    $('#worldBtn').click(function(){
        toggleMap(_self,'world');
    });
    $('#isoBtn').click(function(){
        toggleMap(_self,'iso');
    });


    $('#oldStuff1').on('click',function(){
        window.open('https://s3-us-west-2.amazonaws.com/mattsanders-portfolio/BrokeCityPlayer/index.html','Broke City','width=900,height=450');
    });
    $('#oldStuff2').on('click',function(){
        window.open('https://s3-us-west-2.amazonaws.com/mattsanders-portfolio/Audax/index.html','Audax Capacitor','width=500,height=450');
    });
    $('#oldStuff3').on('click',function(){
        window.open('http://www.miltonwsanders.net/','MWS');
    });
    $('#oldStuff4').on('click',function(){
        window.open('https://s3-us-west-2.amazonaws.com/mattsanders-portfolio/AircraftStrategy/AircraftStrategyGame.html','AirWar');
    });
    $('#oldStuff5').on('click',function(){
        window.open('https://s3-us-west-2.amazonaws.com/mattsanders-portfolio/AirWar/Alternativa_Test.html','AirWar3D');
    });
    $('#oldStuff6').on('click',function(){
        window.open('https://s3-us-west-2.amazonaws.com/mattsanders-portfolio/SystemCreator/index.html','sysCreate');
    });
    $('#oldStuff7').on('click',function(){
        window.open('https://s3-us-west-2.amazonaws.com/mattsanders-portfolio/Physics/BattleShips.html','physicsFun');
    });
    $('#oldStuff8').on('click',function(){
        window.open('https://s3-us-west-2.amazonaws.com/mattsanders-portfolio/UnityTestProject/mattsTest.html','unity engine fun');
    });



    _self.resetFreq=10000;
    _self.intervalReset=setInterval(function(){_self.initBar();}, _self.resetFreq);
    initBar();
    initCloud();
    initLines();
    initForce();
    toggleMap(_self,'world');
});

$(window).resize(function(){
    _self = this;
    clearInterval(_self.intervalRef);
    clearInterval(_self.intervalDraw);
    clearInterval(_self.intervalMap);
    initBar();
    initCloud();
    initLines();
    initForce();
    initMap();
});
