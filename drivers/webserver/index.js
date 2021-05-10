const express = require('express');

const buildExpressCallback = require('../webserver/express-callback');

const app = express();

app.use(express.json());

const controllers = require('./controllers');
const { authMiddleware } = require('./middlewares/auth');

// routes without need to authorization token:
app.post('/register', buildExpressCallback(controllers.createUser));
app.post('/login', buildExpressCallback(controllers.userlogin));

// routes with a need to authorization token:
app.use(authMiddleware);
app.post('/room', buildExpressCallback(controllers.createRoom));
app.post('/message', buildExpressCallback(controllers.sendMessageInRoom));
app.post('/joinRoom', buildExpressCallback(controllers.joinRoom));
app.get('/joinedRooms', buildExpressCallback(controllers.joinedRooms));

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ message: err.message || 'something wrong happened' });
  next();
});

app.listen(3000, () => console.log('server started'));
