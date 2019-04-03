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
        window.open('http://www.lightsandperfections.net/DEV_PROJECTS/MUSIC3D/Music3D.swf','Broke City','width=900,height=450');
    });
    $('#oldStuff2').on('click',function(){
        window.open('http://www.lightsandperfections.net/DEV_PROJECTS/Audax/','Audax Capacitor','width=500,height=450');
    });
    $('#oldStuff3').on('click',function(){
        window.open('http://www.miltonwsanders.net/','MWS');
    });
    $('#oldStuff4').on('click',function(){
        window.open('http://www.lightsandperfections.net/fileRep/FB4_projects/persProjects/AircraftStrategyGame/bin-debug/AircraftStrategyGame.html','AirWar');
    });
    $('#oldStuff5').on('click',function(){
        window.open('http://www.lightsandperfections.net/DEV_PROJECTS/AirWar3D/Alternativa_Test/bin-debug/Alternativa_Test.html','AirWar3D');
    });
    $('#oldStuff6').on('click',function(){
        window.open('http://www.lightsandperfections.net/DEV_PROJECTS/SYSTEMCREATOR/systemCreator.swf','sysCreate');
    });
    $('#oldStuff7').on('click',function(){
        window.open('http://www.lightsandperfections.net/DEV_PROJECTS/PROJECTILE_PHYSICS/BattleShips.swf','physicsFun');
    });
    $('#oldStuff8').on('click',function(){
        window.open('http://www.lightsandperfections.net/DEV_PROJECTS/UNITY/mattsTest.html','unity engine fun');
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