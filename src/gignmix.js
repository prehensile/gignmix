var _gnmConn = null;
var _gnmTrack = null;

function gnmInit( track ){

  console.log( "gnmInit" );

  _gnmTrack = track;

  var gnmWs = window.WebSocket || window.MozWebSocket;
  _gnmConn = new gnmWs( 'ws://rd015002.local:1337' );

  _gnmConn.onmessage = function( message ){
    gnmProcessMessage( message );
  }

  _gnmConn.onopen = function(){
    gnmSendMessage( "ALIVE" );
  }
}


function gnmAudioElement(){
  return document.querySelector("#media");
}


function gnmPlayFile( file ){
  console.log( "gnmPlayFile", file );
  
  var a = gnmAudioElement();
  a.setAttribute("src", "assets/audio/" + file );
  a.setAttribute("autoplay", "autoplay");

  gnmSendMessage( "WILLPLAY " + file );
}


function gnmStop( file ){
  console.log( "gnmPlayStop" );
  var a = document.querySelector("#media");
  a.setAttribute( "src", "" ); 
}


function gnmProcessMessage( message ){
  var dat = message.data;

  console.log( message );
  console.log( dat );

  if( dat == "PLAY" ){
    //var audio_file = payload.params.file;
    //var audio_file = "mt-bass.mp3";
    var audio_file = _gnmTrack;
    gnmPlayFile( audio_file );
  }
  else if( dat == "STOP" ){
    gnmStop();
  }
  else if( dat == "PING" ){
    gnmSendMessage( "PONG!" );
  }
}

function gnmSendMessage( message ){
  if( !_gnmConn ) return;

  _gnmConn.send( message );
}