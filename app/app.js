require('dotenv').config();
const DatabaseManager = require('./lib/DatabaseManager');
const express = require('express');
const session = require('express-session');
const http = require('http');
const https = require('https');
const socketIO = require('socket.io');

const app = express();
const server = http.Server(app);
const io = socketIO(server);
const dbManager = new DatabaseManager({
  mongoURL: process.env.MONGO_URL,
});

app.use(express.json());
app.all('*', (req, res, next) => {
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE');
  next();
});
app.use(express.static(`${__dirname}/../client/build`));
app.use(session({
  secret: 'homedj',
  resave: true,
  saveUninitialized: true,
  cookie: {
    secure: false,
  },
}));

/** Root controller */
app.get('/', (req, res) => {
  res.sendFile('../client/index.html');
});

/** Login controller */
app.post('/login', async (req, res) => {
  const data = req.body;
  req.session.accessToken = data.accessToken;
  try {
    const user = await dbManager.findOneUserByFacebookId(data.id);
    const newUser = {
      name: data.name,
      facebookId: data.id,
      picture: data.picture.data.url,
    };
    if (user === null) {
      await dbManager.insertOneUser(newUser);
    } else {
      await dbManager.updateOneUserById(user._id, newUser);
    }
    const lastUser = await dbManager.findOneUserByFacebookId(data.id);
    req.session.user = lastUser;
    return res.json(lastUser);
  } catch (err) {
    res.json({ error: 'Error' });
  }
});

/** Friends controller */
app.get('/friends', (req, res) => {
  // console.log(req.session);
  if (typeof req.session.accessToken === typeof undefined) {
    return res.json({ error: 'Pas de token' });
  }
  const options = {
    hostname: 'graph.facebook.com',
    path: `/v2.11/${req.session.user.facebookId}/friends`,
    headers: {
      Authorization: `Bearer ${req.session.accessToken}`,
    },
  };

  https.get(options, (httpRes) => {
    let data = '';
    httpRes.on('data', (d) => {
      data += d;
    });
    httpRes.on('end', async () => {
      const newFriends = JSON.parse(data);
      const ids = [];
      newFriends.data.forEach((element) => {
        ids.push(element.id);
      });
      const friends = await dbManager.findUsersByFacebookIds(ids);
      res.json(friends);
    });
    httpRes.on('error', () => res.json({ error: 'Can\'t get friend list, please reconnect to the app' }));
  });
});

/** Groups controller */
app.get('/groups', async (req, res) => {
  try {
    const groups = await dbManager.findGroupsByUserId(req.session.user._id);
    res.json(groups);
  } catch (err) {
    res.json({ error: 'Error' });
  }
});

app.post('/group', async (req, res) => {
  try {
    const group = {
      name: req.body.name,
      users: [req.session.user._id],
    };
    const dbGroup = await dbManager.insertOneGroup(group);
    res.json(dbGroup);
  } catch (err) {
    res.json({ error: 'Error' });
  }
});

app.delete('/group/:id', async (req, res) => {
  try {
    await dbManager.deleteOneById(req.params.id);
    res.json({ acknowledged: true });
  } catch (err) {
    res.json({ error: 'Error' });
  }
});

app.post('/group/:id/user', async (req, res) => {
  try {
    await dbManager.addUserToGroup(req.params.id, req.body.user);
    res.json({ acknowledged: true });
  } catch (err) {
    res.json({ error: 'Error' });
  }
});

app.delete('/group/:id/user/:user', async (req, res) => {
  try {
    await dbManager.removeUserFromGroup(req.params.id, req.params.user);
    res.json({ acknowledged: true });
  } catch (err) {
    res.json({ error: 'Error' });
  }
});

/** Socket IO */
io.sockets.on('connection', (client) => {
  // AddSong
  client.on('addSong', () => {

  });

  // DeleteSong
  client.on('deleteSong', () => {

  });

  // Disconnect
  client.on('disconnect', () => {

  });
});

async function start() {
  try {
    await dbManager.connect();
  } catch (err) {
    console.log(`Oh no, there was an error connecting to the databases! Quick fix it: ${err}`);
  }
  server.listen(process.env.PORT || 3000, () => {
    console.log('Example app listening on port 3000!');
  });
}

start();
