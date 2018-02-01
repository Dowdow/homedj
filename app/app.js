require('dotenv').config();
const https = require('https');
const io = require('socket.io')();
const mongo = require('mongodb');

mongo.MongoClient.connect('mongodb://localhost/homedj', (err, db) => {
  if (err) throw err;

  io.sockets.on('connection', (client) => {
    let accessToken = '';
    let user = {};
    let friends = [];

    function updateUser(res, user) {
      return new Promise((resolve, reject) => {
        if (res === null) {
          db.collection('user').insertOne(user, (err) => {
            if (err) reject(err);
          });
        } else {
          db.collection('user').updateOne({ _id: res._id }, user, (err) => {
            if (err) reject(err);
          });
        }
        resolve();
      });
    }

    // Login or CreateAccount
    client.on('login', (data) => {
      accessToken = data.accessToken;
      db.collection('user').findOne({ facebookId: data.id }, (err, res) => {
        if (err) throw err;
        user = {
          name: data.name,
          facebookId: data.id,
          picture: data.picture.data.url,
        };
        updateUser(res, user).then(() => {
          db.collection('user').findOne({ facebookId: data.id }, (err, res2) => {
            if (err) throw err;
            user = res2;
            client.emit('logged', user);
          });
        }).catch((err) => {
          throw err;
        });
      });
    });

    // GetFriends
    client.on('getFriends', () => {
      if (accessToken === '') {
        return client.emit('error', 'Can\'t get friend list, please reconnect to the app');
      }

      const options = {
        hostname: 'graph.facebook.com',
        path: `/v2.11/${user.facebookId}/friends`,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };

      https.get(options, (res) => {
        let data = '';
        res.on('data', (d) => {
          data += d;
        });
        res.on('end', () => {
          const newFriends = JSON.parse(data);
          friends = [];
          const ids = [];
          for (const f in newFriends.data) {
            if (newFriends.data.hasOwnProperty(f)) {
              ids.push(newFriends.data[f].id);
            }
          }
          db.collection('user').find({ facebookId: { $in: ids } }, (err, cursor) => {
            if (err) throw err;
            cursor.forEach((doc) => {
              friends.push(doc);
              cursor.hasNext((err, res) => {
                if (!res) {
                  client.emit('getFriends', friends);
                }
              });
            });
          });
        });
        res.on('error', () => client.emit('error', 'Can\'t get friend list, please reconnect to the app'));
      });
    });

    // GetGroups
    client.on('getGroups', () => {
      db.collection('group').find({ users: { $in: [user._id] } }, (err, cursor) => {
        if (err) throw err;
        const groups = [];
        cursor.forEach((doc) => {
          groups.push(doc);
          cursor.hasNext((err, res) => {
            if (!res) {
              client.emit('getGroups', groups);
            }
          });
        });
      });
    });

    // CreateGroup
    client.on('createGroup', (data) => {
      const group = {
        name: data.name,
        users: [user._id],
      };
      db.collection('group').insertOne(group, (err) => {
        if (err) throw err;
        client.emit('createGroup', group);
      });
    });

    // DeleteGroup
    client.on('deleteGroup', (data) => {
      db.collection('group').deleteOne({ _id: new mongo.ObjectID(data._id) }, (err) => {
        if (err) throw err;
        client.emit('deleteGroup');
      });
    });

    // LeaveGroup
    client.on('leaveGroup', (data) => {

    });

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
});

io.listen(process.env.PORT || 3000);
