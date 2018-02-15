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

/**
 * Root controller
 */
app.get('/', (req, res) => {
  res.sendFile('../client/index.html');
});

/**
 * Login controller
 */
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
    return res.json(err);
  }
});

/**
 * Friends controller
 */
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

/**
 * Groups controller
 */
app.get('/groups', async (req, res) => {
  const groups = await dbManager.findGroupsByUserId(req.session.user._id);
  res.json(groups);
});
app.post('/group', async (req, res) => {
  const group = {
    name: req.body.name,
    users: [req.session.user._id],
  };
  const dbGroup = await dbManager.insertOneGroup(group);
  res.json(dbGroup);
});
app.delete('/group', (req, res) => {
  db.collection('group').deleteOne({ _id: new mongo.ObjectID(data._id) }, (err) => {
    if (err) throw err;
    client.emit('deleteGroup');
  });
});

/** Socket IO */
io.sockets.on('connection', (client) => {
  // AddUserToGroup
  client.on('addUserToGroup', (data) => {
    const update = { $addToSet: { users: new mongo.ObjectID(data.friend) } };
    db.collection('group').updateOne({ _id: new mongo.ObjectID(data.group) }, update, (err) => {
      if (err) reject(err);
      client.emit('addUserToGroup', new mongo.ObjectID(data.friend));
    });
  });

  // RemoveUserFromGroup
  client.on('removeUserFromGroup', (data) => {
    const update = { $pull: { users: new mongo.ObjectID(data.friend) } };
    db.collection('group').updateOne({ _id: new mongo.ObjectID(data.group) }, update, (err) => {
      if (err) reject(err);
      client.emit('removeUserFromGroup', new mongo.ObjectID(data.friend));
    });
  });

  // AddSong
  client.on('addSong', (data) => {

  });

  // DeleteSong
  client.on('deleteSong', (data) => {

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
