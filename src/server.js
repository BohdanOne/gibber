import sirv from 'sirv';
import polka from 'polka';
import compression from 'compression';
import * as sapper from '@sapper/server';
import http from 'http';
import io from 'socket.io';
import axios from 'axios';

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
let usersOnline = [];

io(server).on('connection', socket => {
  socket.emit('user connected', usersOnline);

  socket.on('user connected', user => {
    usersOnline = [...usersOnline, user];
    socket.broadcast.emit('new user', usersOnline, user);
  });

  socket.on('user disconnected', user => {
    usersOnline = [...usersOnline.filter(u => u != user)];
    socket.emit('user left', usersOnline, user);
    socket.broadcast.emit('user left', usersOnline, user);
  });

  socket.on('message', (msg, user) => {
    if (msg.startsWith('@')) {
      handleCommand(msg, user);
    } else {
      socket.broadcast.emit('message', msg, user);
    }
  });

  socket.on('user typing', user => socket.broadcast.emit('user typing', user));

  function handleCommand(message, user) {
    switch (message.slice(1)) {
      case 'hello':
        const msg = `👋`;
        return socket.broadcast.emit('message', msg, user);
      case 'chuck':
        return getChuckJoke(user);
      default:
        return;
    }
  }

  async function getChuckJoke(user) {
    const api_url = 'https://api.chucknorris.io/jokes/random';
    try {
      const joke = await axios.get(api_url);
      socket.broadcast.emit('message', joke.data.value, user);
    } catch (e) {
      console.log(e);
    }
  }
});
