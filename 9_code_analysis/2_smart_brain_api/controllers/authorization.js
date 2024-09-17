// import { redisClient } from './signin';

// const requireAuth = async (req, res, next) => {
//   const { authorization } = req.headers;

//   if (!authorization) {
//     return res
//       .status(401)
//       .json({ message: 'Unauthorized: No authorization header' });
//   }

//   try {
//     const reply = await new Promise((resolve, reject) => {
//       redisClient.get(authorization, (err, reply) => {
//         if (err) return reject(err);
//         resolve(reply);
//       });
//     });

//     if (!reply) {
//       return res.status(401).json({ message: 'Unauthorized: Invalid token' });
//     }

//     console.log('Authorization successful');
//     next();
//   } catch (error) {
//     console.error('Redis error:', error);
//     res.status(500).json({ message: 'Internal Server Error' });
//   }
// };

// export default requireAuth;

import { redisClient } from './signin.js';

export const requireAuth = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json('Unauthorized');
  }
  return redisClient.get(authorization, (err, reply) => {
    if (err || !reply) {
      return res.status(401).json('Unauthorized');
    }
    console.log('you shall pass');
    return next();
  });
};
