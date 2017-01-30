/*
* File to initialize test settings such as removing the log
*/

// Show log messages only when DEBUG is enabled
var consoleLog = console.log;
console.log = (msg) => {
  if (console.DEBUG) {
    consoleLog(msg);
  }
};

