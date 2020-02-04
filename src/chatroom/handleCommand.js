import getChuckJoke from './getChuckJoke';

export default function handleCommand(socket, message, user) {
  let msg;
  switch (message.slice(1)) {
    case 'h':
      msg = `👋`;
      socket.broadcast.emit('message', msg, user);
      break;
    case 'y':
      msg = `👍`;
      socket.broadcast.emit('message', msg, user);
      break;
    case 'n':
      msg = `👎`;
      socket.broadcast.emit('message', msg, user);
      break;
    case 'chuck':
      return getChuckJoke(socket, user);
    default:
      return;
  }
}