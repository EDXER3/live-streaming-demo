(function (d, io){

var socket = io()
var roomContainer = d.getElementById('room-container')

socket.on('room-created', room => {
  var roomElement = d.createElement('div')
  roomElement.innerText = room
  var roomLink = d.createElement('a'),
      viewRoomLink = d.createElement('a')
  roomLink.href = `/${room}`
  viewRoomLink.href = `/v${room}`
  roomLink.innerText = 'streaming'
  viewRoomLink.innerText = 'view'
  roomContainer.append(roomElement)
  roomContainer.append(roomLink)
  roomContainer.append(viewRoomLink)
})

}) (document, io)
