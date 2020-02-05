import getChuckJoke from './getChuckJoke';

export default (socket, message, user) => {
  let msg;
  switch (message.slice(1)) {
    case 'h':
      msg = `👋`;
      socket.emit('message', msg, user);
      return socket.broadcast.emit('message', msg, user);
    case 'y':
      msg = `👍`;
      socket.emit('message', msg, user);
      return socket.broadcast.emit('message', msg, user);
    case 'n':
      msg = `👎`;
      socket.emit('message', msg, user);
      return socket.broadcast.emit('message', msg, user);
    case 'l':
      msg = `❤️`;
      socket.emit('message', msg, user);
      return socket.broadcast.emit('message', msg, user);
    case 'chuck':
      return getChuckJoke(socket, user);
    default:
      return;
  }
}