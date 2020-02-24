const config = require('config'),
    winston = require('winston'),
    {
        format
    } = winston,
    {
        combine,
        label,
        json,
        printf,
        timestamp,
        errors
    } = format;

const logger = winston.createLogger({
    level: 'info',
    format: function() {
        return combine(
            timestamp({
                format: 'YYYY-MM-DD HH:mm:ss'
            }),
            errors({
                stack: true
            }),
            json()
        );
    }(),
    transports: [
        new winston.transports.File({
            filename: config.logFile
        })
    ]
});

module.exports = {
    log: function(e) {
        if (config.logFile) {
            logger.error(e);
        }
    }
};