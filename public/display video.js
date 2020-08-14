(function (d,w,n){
  'use strict'
  var video = d.querySelector('#video'),
      canvas = d.querySelector('#canvas')

  // Get access to the camera!

  if(n.mediaDevices && n.mediaDevices.getUserMedia) {
      // Not adding `{ audio: true }` since we only want video now
      n.mediaDevices.getUserMedia({ video: true }).then(function(stream) {
          try{
            video.srcObject = stream
          }catch (error) {
            video.src = w.URL.createObjectURL(stream)
          }
          video.play()
          let {width, height} = stream.getTracks()[0].getSettings();
          setConvas(canvas,width,height)
      })
  } /*else if(navigator.getUserMedia) { // Standard
      navigator.getUserMedia({ video: true }, function(stream) {
          video.src = stream
          video.play()
      }, errBack)
  } else if(navigator.webkitGetUserMedia) { // WebKit-prefixed
      navigator.webkitGetUserMedia({ video: true }, function(stream){
          video.src = window.webkitURL.createObjectURL(stream)
          video.play()
      }, errBack)
  } else if(navigator.mozGetUserMedia) { // Mozilla-prefixed
      navigator.mozGetUserMedia({ video: true }, function(stream){
          video.srcObject = stream
          video.play()
      }, errBack)
  }*/

  function setConvas(canvas,w,h) {
    canvas.width  = w
    canvas.height = h
  }

}) (document,window,navigator)
