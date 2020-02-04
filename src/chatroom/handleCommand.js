import getChuckJoke from './getChuckJoke';

export default (socket, message, user) => {
  let msg;
  switch (message.slice(1)) {
    case 'h':
      msg = `👋`;
      return socket.broadcast.emit('message', msg, user);
    case 'y':
      msg = `👍`;
      return socket.broadcast.emit('message', msg, user);
    case 'n':
      msg = `👎`;
      return socket.broadcast.emit('message', msg, user);
    case 'l':
      msg = `❤️`;
      return socket.broadcast.emit('message', msg, user);
    case 'chuck':
      return getChuckJoke(socket, user);
    default:
      return;
  }
}