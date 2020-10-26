/** The possible log levels */
const Levels = require('./logLevels');

/** The console's separator */
const SEPARATOR = '-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-';

module.exports = {
    /**
     * Add a separator on the console.
     */
    addSeparator() {
        console.log(SEPARATOR);
    },
    /**
     * Delete a created group on the console.
     */
    closeGroup() {
        console.groupEnd();
    },
    /**
     * Ask toPring() to display an error message.
     * 
     * @param {*} message the message to display
     */
    error(message) {
        this.toPrint(Levels.ERROR, message);
    },
    /**
     * Ask toPring() to display a log message.
     * 
     * @param {*} message the message to display
     */
    log(message) {
        this.toPrint(Levels.LOG, message);
    },
    /**
     * Create a group in the console.
     */
    startGroup() {
        console.group();
    },
    /**
     * Display a message on the console.
     * 
     * @param {string} logLevel the log level of the message to display.
     * @param {string} message the message to display.
     */
    toPrint(logLevel, message) {
        const date = new Date(Date.now());
        console.log(`[${logLevel}]`, date.toLocaleString(), '-', (message ? message : ''));
    },
    /**
     * Ask toPring() to display a warning message.
     * 
     * @param {*} message the message to display
     */
    warn(message) {
        this.toPrint(Levels.WARNING, message);
    }
}