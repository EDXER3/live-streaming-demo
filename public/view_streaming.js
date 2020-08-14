(function (d,w, io){
  'use strict'


  diplay_streaming(io)

function diplay_streaming(io){

  var io = io()
  io.emit('new-user', room)
  io.on('play stream', function (image){

  d.querySelector('#streaming').src = image
  //console.log(image)
  })

  diplay_streaming(io)

  }

}) (document,window, io)
