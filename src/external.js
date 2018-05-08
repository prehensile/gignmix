const appName = window.location.pathname.replace(/\//g, '');
const websocket = createWebsocket();

const main = async () => {
  websocket.ready.then(() => {
    console.log('Websocket connected');

    websocket.publish({
      topic: `${appName}/event/ready`,
      payload: { msg: 'External app ready!' }
    });
  });

  websocket.subscribe(new RegExp(`${appName}/.*`), ({ topic, payload }) => {
    console.log('Recieved message', topic, payload);
  });

  console.log('External app loaded');
};

_gnmPingInterval = null;

function initUI(){
  
  var a = document.querySelector("#play");
  a.onclick = function(e){
    gnmSendMessage( "PLAY" );

    _gnmPingInterval = setInterval( function(){
      gnmSendMessage( "PING" );
    }, 1000);
  }

  a = document.querySelector("#stop");
  a.onclick = function(e){
    gnmSendMessage( "STOP" );
  }

  

}

main();
gnmInit( "bowie-bass.mp3" );
initUI();

