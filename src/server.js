import sirv from 'sirv';
import polka from 'polka';
import compression from 'compression';
import * as sapper from '@sapper/server';
import http from 'http';
import io from 'socket.io';

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';

// server
const server = http.createServer();

polka({ server })
	.use(
		compression({ threshold: 0 }),
		sirv('static', { dev }),
		sapper.middleware()
	)
	.listen(PORT, err => {
		if (err) console.log('error', err);
	});

// ============== CHATROOM =====================
let usersCount = 0;
let usersOnline = [];

io(server).on('connection', socket => {
	socket.emit('user connected', usersOnline);

	socket.on('user connected', user => {
		usersOnline = [...usersOnline, user];
		socket.emit('usersOnline', usersOnline);
	});

	socket.on('message', msg => socket.broadcast.emit('message', msg));

  socket.on('disconnect', () => {
    --usersCount;
		socket.broadcast.emit('user disconnected', usersCount);
  });
});