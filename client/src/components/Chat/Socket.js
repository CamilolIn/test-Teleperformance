import io from 'socket.io-client';


/*************Inicializar el Socket************ */
let socket = io(('http://localhost:3001/'))


export default socket