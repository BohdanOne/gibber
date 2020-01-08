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

// chatroom

let usersCount = 0;

io(server).on('connection', socket => {
	++usersCount;
	socket.emit('user connected', usersCount);
	socket.broadcast.emit('user connected', usersCount);

	socket.on('message', msg => socket.broadcast.emit('message', msg));

  socket.on('disconnect', () => {
    --usersCount;
		socket.broadcast.emit('user disconnected', usersCount);
  });
});