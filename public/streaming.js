(function (d, w, n, io){
  'use strict'
/*
  const name_Channel  = prompt('name room?')
  document.getElementById('name-channel').innerHTML = "Channel: " + name_Channel
  document.getElementById('room').innerHTML = name_Channel
*/

  var io = io('http://localhost:3000'),
    startCamera = false,
    video = d.querySelector('#video'),
    canvas = d.querySelector('#canvas'),
    vendorUrl = (w.URL || w.webkitURL),
    context = canvas.getContext('2d')

    if(n.mediaDevices && n.mediaDevices.getUserMedia) {
      // Not adding `{ audio: true }` since we only want video now
      n.mediaDevices.getUserMedia({ video: true,audio :false }).then(function(stream) {
        startCamera = true
        try{
          video.srcObject = stream
        }catch (error) {
          video.src = vendorUrl.createObjectURL(stream)
        }
          video.play()
      })
  }

  // Legacy code below: getUserMedia
  else if(n.getUserMedia) { // Standard
      n.getUserMedia({ video: true }, function(stream) {
          startCamera = true
          video.src = stream
          video.play()
      }, errBack)
  } else if(n.webkitGetUserMedia) { // WebKit-prefixed
      n.webkitGetUserMedia({ video: true }, function(stream){
          startCamera = true
          video.src = vendorUrl.createObjectURL(stream)
          video.play()
      }, errBack);
  } else if(n.mozGetUserMedia) { // Mozilla-prefixed
      n.mozGetUserMedia({ video: true }, function(stream){
          startCamera = true
          video.srcObject = stream
          video.play()
      }, errBack)
  }


 //io.emit('new-user', room )



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

    if(startCamera){
      //io.emit('streaming',(outputStream))
      io.emit('new-user', room)
      io.emit('start-streaming',room , outputStream)
    }
    playVideo(function(){
      streamVideo(context, canvas, video)
    })
  }

  w.addEventListener('load', function(){
    //video.autoplay = true
    video.style.display = 'none'
    //canvas.style.display = 'none'
    canvas.style.display = 'block'
    streamVideo(context, canvas, video)
  })

})(document, window, navigator, io)
