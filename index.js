const Application = require('./app/server');
const DB_URI = "mongodb://localhost:27017/StoreDB";
new Application(3000 , DB_URI)