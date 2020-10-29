
const content = require('fs').readFileSync(__dirname + '/index.html', 'utf8');
//const content = require('fs').readFileSync(__dirname , 'utf8');


const fs = require('fs');
const options = {
  key: fs.readFileSync('/etc/letsencrypt/live/daft-ideas.co.uk-0001/privkey.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/live/daft-ideas.co.uk-0001/fullchain.pem')
};
//const fs = require('fs');


const server = require('https').createServer(options, function(req, res)  {
  // serve the index.html file
  res.setHeader('Content-Type', 'text/html');
  res.setHeader('Content-Length', Buffer.byteLength(content));
  res.end(content);
});

//const fs = require('fs');


const io = require('socket.io')(server);

io.on('connect', socket => {
  socket.on('pushed', data => {
    console.log('Someone hit the button', data);

   //need to tell all clients who pushed the button
io.emit('stop', data);

setTimeout(function(){
io.emit('release');
},7000);


  });
});

server.listen(8080, function() {
    console.log('listening on *:8080');
});
