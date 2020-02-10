import io from 'socket.io';

// import handleCommand from './handleCommand';

export default server => {
  let usersOnline = [];
  // let messages = []

  io(server).on('connection', socket => {
    // socket.emit('usersOnline', usersOnline);

    socket.on('new user', user => {
      usersOnline = [...usersOnline, user];
      socket.broadcast.emit('usersOnline', usersOnline, user);
      socket.emit('usersOnline', usersOnline, user);
    })

  //   socket.on('user connected', user => {
  //     usersOnline = [...usersOnline, user];
  //     socket.broadcast.emit('new user', usersOnline, user);
  //   });

  //   socket.on('user disconnected', user => {
  //     usersOnline = [...usersOnline.filter(u => u != user)];
  //     socket.emit('user left', usersOnline, user);
  //     socket.broadcast.emit('user left', usersOnline, user);
  //   });

  //   socket.on('message', (msg, user) => {
  //     if (msg.startsWith('/')) {
  //       handleCommand(socket, msg, user);
  //     } else {
  //       socket.emit('message', msg, user);
  //       socket.broadcast.emit('message', msg, user);
  //     }
  //   });

  //   socket.on('user typing', user =>
  //     socket.broadcast.emit('user typing', user)
  //   );
  });
};
