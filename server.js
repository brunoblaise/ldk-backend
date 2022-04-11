const express = require('express');
const app = express();
const http = require('http');
const cors = require('cors');
var morgan = require('morgan');
var compression = require('compression');

// const io = require('socket.io')(http);
const PORT = process.env.PORT || 5000;
const Interface = require('./Interface/Interface');
const server = http.createServer(app);
const io = require('socket.io')(server, {
  cors: {
    origin: "https://cxrgo.ml",
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  },
});
//middleware
app.use(compression());
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

//route
app.use(express.urlencoded({extended: false}));
app.use('/uploads', express.static('uploads'));
app.use('/create', require('./routes/register'));

app.use('/create', require('./routes/create'));
app.use('/get', require('./routes/get'));
app.use('/res', require('./routes/forget'));
app.use('/res', require('./routes/reset'));
app.use('/', require('./routes/email'));
app.use('/rese', require('./routes/forgetT'));
app.use('/rese', require('./routes/resetT'));

io.on('connection', (socket) => {
  socket.on('sendMessage', async (data) => {
    //socket.join(data.messageRoomId);
    let result = await Interface.sendMessage(data);
    //let allMessages = await Interface.returnMessages(data.messageRoomId);
    io.emit('messages', data);
  });

  socket.on('messages', async (data) => {
    let allMessages = await Interface.returnMessages();
    io.emit('messages', allMessages);
  });
});
server.listen(PORT, () => {
  console.log(`server started ${PORT}`);
});
