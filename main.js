const express = require("express")
const path = require('path');
const app = express();
const routes = require('./routes');

app.use(express.static(path.join(__dirname, 'public')));
app.use('/',routes);

app.listen(3000, () => console.log('Server running on port 3000'));