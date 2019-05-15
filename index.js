const io = require('socket.io-client');
const Gpio = require('onoff').Gpio;
// const HEATING_ELEMENT = new Gpio(4, 'out');
const TEMPERATURE_SENSOR = new Gpio(17, 'in', 'both');

const connectUrl = process.argv[2] === 'PROD' ? 'https://remote-control-iot-server.herokuapp.com/' : 'http://localhost:3000';
const socket = io.connect(connectUrl, { reconnect: true });

// Add a connect listener
socket.on('connect', () => {
  console.log('Connected!');
});

// let mode;
// let minValue;
// let maxValue;
// let manualValue;

// socket.on('temperatureStateRaspberry', (state) => {
//   mode = state.mode;

//   switch (mode) {
//     case 'auto': {
//       minValue = state.minValue;
//       maxValue = state.maxValue;
//       break;
//     }
//     case 'manual': {
//       manualValue = state.manualValue;
//       break;
//     }
//   }
// });
console.log('BEFORE_TEMP', TEMPERATURE_SENSOR);
TEMPERATURE_SENSOR.watch((err, currentValue) => {
  if (err) {
    console.error(err);
    return;
  }

  console.log(currentValue)

  // switch (mode) {
  //   case 'auto': {
  //     if (currentValue > maxValue) {
  //       HEATING_ELEMENT.writeSync(0);
  //     }
  //     if (currentValue < minValue) {
  //       HEATING_ELEMENT.writeSync(1);
  //     }
  //     break;
  //   }
  //   case 'manual': {
  //     if (currentValue > manualValue) {
  //       HEATING_ELEMENT.writeSync(0);
  //     }
  //     if (currentValue < manualValue) {
  //       HEATING_ELEMENT.writeSync(1);
  //     }
  //     break;
  //   }
  // }

  socket.emit('temperatureSensorValue', currentValue);

});
console.log('After_TEMP');