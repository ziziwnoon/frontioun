const Application = require('./app/server');
const DB_URI = "mongodb://0.0.0.0:27017/FrontiounDB";
new Application(3000 , DB_URI)