'use strict'

var express = require('express'),
  app = express(),
	http = require('http').createServer(app),
	io = require('socket.io')(http),
	port = process.env.PORT || 3000

  
app.set('views', './views')
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))


http.listen(port, () => {
	console.log('localhost port:%d',port)
})

const rooms = { }

app.get('/',(req, res) => {
	res.render('index',{rooms: rooms})
})

app.post('/room',(req, res) => {
  if (rooms[req.body.room] != null) {
    return res.redirect('/')
  }
  rooms[req.body.room] = { users: {} }
  res.redirect(req.body.room)
})
/*
app.get('/view',(req, res) => {
  res.render('view_streaming', { roomName: 'view' })
})
*/


app.get('/v:room',(req, res) => {
  if (rooms[req.params.room] == null) {
    return res.redirect('/')
  }
  res.render('view_streaming', { roomName: req.params.room })
})


app.get('/:room',(req, res) => {
  if (rooms[req.params.room] == null) {
    return res.redirect('/')
  }
  res.render('streaming', { roomName: req.params.room })
})


io.on('connection', (socket) => {

/*
	socket.on('streaming', (image) => {
		io.emit('play stream', image)
		//console.log(image)
	})
*/

	socket.on('new-user', (room) => {
    socket.join(room)
  })

  socket.on('start-streaming', (room, image) => {
    socket.to(room).emit('play stream', image)
    //console.log(image)
    //console.log(room)
  })
/*
  socket.on('disconnect', () => {
    getRooms(socket).forEach(room => {
    socket.to(room).emit('room-delete', room =>{
      delete rooms[room]
    })

  })

  })
*/


})

function getRooms(socket) {
  return Object.entries(rooms)
}
