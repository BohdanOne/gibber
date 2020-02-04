import axios from 'axios';

export default async function getChuckJoke(socket, user) {
  const api_url = 'https://api.chucknorris.io/jokes/random';
  try {
    const joke = await axios.get(api_url);
    socket.broadcast.emit('message', joke.data.value, user);
  } catch (e) {
    console.log(e);
  }
}