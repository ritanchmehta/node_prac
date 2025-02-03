const fs = require('fs');
const os = require('os');

// we use events differently, mostly treating them as a class
//Hence using uppercase for importing the module
const EventEmitter = require('events');

class Logger extends EventEmitter{
    log(message){
        this.emit('message', {message});
    }
}

const logger = new Logger();
const logFile = './eventLog.txt';

// this method is responsible for grabbing data
const LogToFile = (event) =>{
    const logMessage = `${new Date().toISOString()} - ${event.message} \n`;

    //append meaning add data below the existing data, not affecting what already is there
    fs.appendFileSync(logFile, logMessage); //(path, data)
}

logger.on('message', LogToFile)

setInterval(()=>{
    const memoryUsage = (os.freemem()/ os.totalmem()) * 100;
    logger.log(`Current Memory Usage: ${memoryUsage.toFixed(2)}`);
}, 3000)

logger.log('Application Started');
logger.log('Application event occured')