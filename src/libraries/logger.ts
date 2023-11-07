import winston from 'winston';
const coloring = {
    levels: {
        emerg: 0,
        alert: 1,
        crit: 2,
        error: 3,
        warning: 4,
        notice: 5,
        info: 6,
        debug: 7
    },
    colors: {
        emerg: 'red',
        alert: 'red',
        crit: 'red',
        error: 'red',
        warning: 'orange',
        notice: 'blue',
        info: 'green',
        debug: 'green'
    }
};

winston.addColors(coloring.colors);

const logger = winston.createLogger({
    levels: coloring.levels,
    transports: [new winston.transports.Console],
    format: winston.format.printf(log => `${log.level.toUpperCase()} :: ${log.message}`)
});

export default logger;