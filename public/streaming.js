(function (d, w, n, io){
  'use strict'

  var io = io(),
    video = d.querySelector('#video'),
    canvas = d.querySelector('#canvas'),
    vendorUrl = (w.URL || w.webkitURL),
    context = canvas.getContext('2d')


 io.emit('new-user', room )


  w.playVideo = (function(cd){
    return w.requestAnimationFrame ||
      w.WebkitRequestAnimationFrame ||
      w.mozRequestAnimationFrame ||
      w.msRequestAnimationFrame ||
      function (cd){
        FPS = 30
        w.setTimeout(cd, 1000/FPS)
      }
  })()


  function streamVideo(context, canvas, video){

    var outputStream = canvas.toDataURL('image/jpeg',0.3)

    context.drawImage(video, 0, 0)

      //io.emit('new-user', room)
    io.emit('start-streaming',room , outputStream)
    playVideo(function(){
      streamVideo(context, canvas, video)
    })
  }

  w.addEventListener('load', function(){
    //video.autoplay = true
    //video.style.display = 'none'
    canvas.style.display = 'none'
    //canvas.style.display = 'block'
    streamVideo(context, canvas, video)
  })
/*
  var unloadEvent = function (e) {
        var confirmationMessage = "Warning: Leaving this Live Streaming will lost. Are you sure you wish to continue?";

        (e || w.event).returnValue = confirmationMessage//Gecko + IE
        return confirmationMessage //Webkit, Safari, Chrome etc.
  }
  w.addEventListener("beforeunload", unloadEvent)

  io.on('room-delete', room => {})
*/
})(document, window, navigator, io)
