import io from 'socket.io';

import handleCommand from './handleCommand';

export default server => {
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
      if (msg.startsWith('/')) {
        handleCommand(socket, msg, user);
      } else {
        socket.broadcast.emit('message', msg, user);
      }
    });

    socket.on('user typing', user =>
      socket.broadcast.emit('user typing', user)
    );
  });
};
