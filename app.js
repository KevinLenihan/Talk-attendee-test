const app = require('express')();
const routes = require('./routes');
const bodyParser = require('body-parser');

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

//  Connect routes
app.use('/', routes);

app.get('/', function(req, res){
  res.send('Hello World');
});

// initiate
app.listen(3000, () => {
  console.log('App listening on port 3000');
});