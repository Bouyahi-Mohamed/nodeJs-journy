// core module in => come // Node.js environment
const http = require('http');


// custom module

// This is a Node.js script that imports the custom logging module
// and uses it to log a message to the console. 
const customModule = require('./customModule.js');
customModule.log('This is a custom log message using a custom module.');



// you can do the DESTRUCTURE
const { log } = require('./customModule.js');
log('This is a custom log message using a custom module.');




// This is a Node.js script that imports the core 'console' module
// and uses it to log a message to the console.

console.log('This is a Node.js script running in the context of a Node.js environment.');


// third-party module
const express = require('express');