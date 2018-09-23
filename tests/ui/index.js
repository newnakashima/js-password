const { spawn } = require('child_process');

const parcel = spawn('parcel', ['serve', '../../index.html', '-p', '8888']);

parcel.stdout.on('data', data => {
    process.stdout.write(data);
});
parcel.stderr.on('data', data => {
    process.stdout.write(data);
});

parcel.on('exit', (code, signal) => {
    console.log(`Exsited with code: ${code}, signal: ${signal}`);
});

parcel.kill();

