import jwt from 'jsonwebtoken';
import { createClient } from 'redis';

//setup Redis:
export const redisClient = createClient({
  url: process.env.REDIS_URI,
  legacyMode: true,
});

redisClient.on('error', (err) => console.error('Redis Client Error', err));

// Connect to Redis
(async () => {
  try {
    await redisClient.connect();
    console.log('Connected to Redis');
  } catch (err) {
    console.error('Could not connect to Redis', err);
  }
})();

export const handleSignin = (req, res, db, bcrypt) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return Promise.reject('incorrect form submission');
  }
  return db
    .select('email', 'hash')
    .from('login')
    .where('email', '=', email)
    .then((data) => {
      const isValid = bcrypt.compareSync(password, data[0].hash);
      if (isValid) {
        return db
          .select('*')
          .from('users')
          .where('email', '=', email)
          .then((user) => user[0])
          .catch((err) => Promise.reject('unable to get user'));
      } else {
        Promise.reject('wrong credentials');
      }
    })
    .catch(() => Promise.reject('wrong credentials'));
};

const getAuthTokenId = (req, res) => {
  const { authorization } = req.headers;
  return redisClient.get(authorization, (err, reply) => {
    if (err || !reply) {
      return res.status(400).json('Unauthorized');
    }
    return res.json({ id: reply });
  });
};

const signToken = (email) => {
  const jwtPayload = { email };
  return jwt.sign(jwtPayload, 'JWT_SECRET', { expiresIn: '2 days' });
};

//key and value in this...
const createSessions = async (user) => {
  const { email, id } = user;
  const token = signToken(email);

  try {
    await redisClient.set(token, id); // Store token with user ID in Redis
    return {
      success: 'true',
      userId: id,
      token: token,
    };
  } catch (err) {
    console.error('Error setting token in Redis', err);
    throw new Error('Session creation failed');
  }
};

export const signinAuthentication = (req, res, db, bcrypt) => {
  const { authorization } = req.headers;
  return authorization
    ? getAuthTokenId(req, res)
    : handleSignin(req, res, db, bcrypt)
        .then((data) => {
          return data.id && data.email
            ? createSessions(data)
            : Promise.reject(data);
        })
        .then((session) => res.json(session))
        .catch((err) => res.status(400).json(err));
};

// OLD

// export const handleSignin = (req, res, db, bcrypt) => {
//   const { email, password } = req.body;
//   if (!email || !password) {
//     return res.status(400).json('incorrect form submission');
//   }
//   db.select('email', 'hash')
//     .from('login')
//     .where('email', '=', email)
//     .then((data) => {
//       const isValid = bcrypt.compareSync(password, data[0].hash);
//       if (isValid) {
//         return db
//           .select('*')
//           .from('users')
//           .where('email', '=', email)
//           .then((user) => {
//             res.json(user[0]);
//           })
//           .catch((err) => res.status(400).json('unable to get user'));
//       } else {
//         res.status(400).json('wrong credentials');
//       }
//     })
//     .catch((err) => res.status(400).json('wrong credentials'));

// };
