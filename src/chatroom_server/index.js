import io from 'socket.io';
import handleCommand from './handleCommand';

export default server => {
  let usersOnline = [];

  io(server).on('connection', socket => {
    socket.on('new user', name => {
      const newUser = { name: name, isWriting: false };
      usersOnline = [...usersOnline, newUser];
      socket.broadcast.emit('usersOnline', usersOnline, newUser);
      socket.emit('usersOnline', usersOnline, newUser);
    });

    socket.on('user disconnected', user => {
      usersOnline = [...usersOnline.filter(u => u.name != user.name)];
      socket.emit('user left', usersOnline, user);
      socket.broadcast.emit('user left', usersOnline, user);
    });

    socket.on('message', (msg, user) => {
      if (msg.startsWith('/')) {
        handleCommand(socket, msg, user);
      } else {
        socket.emit('message', msg, user);
        socket.broadcast.emit('message', msg, user);
      }
    });

    socket.on('user typing', user =>
      socket.broadcast.emit('user typing', user)
    );
  });
};
