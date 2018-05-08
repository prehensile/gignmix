const appName = window.location.pathname.replace(/\//g, '');
const websocket = createWebsocket();

const main = async () => {
  websocket.ready.then(() => {
    console.log('Websocket connected');

    websocket.publish({
      topic: `${appName}/event/ready`,
      payload: { msg: 'Internal app ready!' }
    });
  });

  websocket.subscribe(new RegExp(`${appName}/.*`), ({ topic, payload }) => {
    // console.log('Recieved message', topic, payload);
  });

  initAll();
  console.log('Internal app loaded');
};


function hardwareInit(){

  console.log( "hardwareInit" );

  websocket.publish({ topic: 'serial/command/open', payload: { path: '/dev/ttyUSB0' } });

  websocket.subscribe('serial/event/receive', ({ payload }) => {
      // console.log('recieved', payload);
      const data = payload.data.trim();
      onSerialEvent( data );
  });
}

function onSerialEvent( data ){
  // console.log( data );
  var vol = parseFloat( data );
  var a = gnmAudioElement();
  var v = vol / 100.0;
  // console.log( v );
  a.volume = v;
}


function initAll(){

  console.log( "initAll" );
  
  hardwareInit();
  gnmInit( "local.mp3" );
}


main();