(function (d,w, io){
  'use strict'
  var checkjoin = false
/*
  diplay_streaming(d, io)

  function diplay_streaming(d, io){

  var io = io('http://localhost:3000'),
    live_streaming = d.querySelector('#streaming')
  //io.emit('new-streaming', room)
  //function diplay_streaming(d, io){

  io.on('play stream', function (image){
    live_streaming.src = image

  })
    diplay_streaming(d, io)
  }
*/

diplay_streaming(d, io)

function diplay_streaming(d, io){

var io = io('http://localhost:3000'),
  live_streaming = d.querySelector('#streaming')
//io.emit('new-streaming', room)
//function diplay_streaming(d, io){

io.emit('new-user', room )

io.on('play stream', function (image){

  live_streaming.src = image

})


  diplay_streaming(d, io)
}

}) (document,window, io )
