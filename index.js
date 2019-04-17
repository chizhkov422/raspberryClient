const io = require('socket.io-client');
const Gpio = require('onoff').Gpio;
const LED = new Gpio(4, 'out');

const connectUrl = process.argv[2] === 'PROD' ? 'https://remote-control-iot-server.herokuapp.com/' : 'http://localhost:3000';
console.log(connectUrl)
const socket = io.connect(connectUrl, { reconnect: true });

// Add a connect listener
socket.on('connect', () => {
  console.log('Connected!');
});

socket.on('checkbox state', (state) => {
  console.log('State: ', state);
  LED.writeSync(parseInt(state, 10));
});