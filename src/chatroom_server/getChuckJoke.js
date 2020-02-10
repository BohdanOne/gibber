import axios from 'axios';

export default async (socket, user) => {
  const api_url = 'https://api.chucknorris.io/jokes/random';
  try {
    const joke = await axios.get(api_url);
    socket.emit('message', joke.data.value, user);
    socket.broadcast.emit('message', joke.data.value, user);
  } catch (e) {
    console.log(e);
  }
};
