// Using updated code with ASYNC/AWAIT, A bit simpler to understand than code block below.
export const handleRegister = async (req, res, db, bcrypt) => {
  const { email, name, password } = req.body;
  if (!email || !name || !password) {
    console.log('Missing fields:', { email, name, password }); // Log missing fields
    return res.status(400).json('incorrect form submission');
  }
  const hash = bcrypt.hashSync(password);
  try {
    await db.transaction(async (trx) => {
      const loginEmail = await trx('login')
        .insert({
          hash: hash,
          email: email,
        })
        .returning('email');

      console.log('Login email returned:', loginEmail); // Log the returned email

      const user = await trx('users').returning('*').insert({
        email: loginEmail[0].email,
        name: name,
        joined: new Date(),
      });
      console.log('User registered:', user[0]); // Log the registered user

      res.json(user[0]);
    });
  } catch (err) {
    console.error('Error during registration:', err); // Log the specific error

    res.status(400).json('unable to register');
  }
};

// app.post('/register', (req, res) => {
//   const { email, name, password } = req.body;
//   const hash = bcrypt.hashSync(password);
//   db.transaction((trx) => {
//     trx
//       .insert({
//         hash: hash,
//         email: email,
//       })
//       .into('login')
//       .returning('email')
//       .then((loginemail) => {
//         return trx('users')
//           .returning('*')
//           .insert({
//             email: loginemail[0].email,
//             name: name,
//             joined: new Date(),
//           })
//           .then((user) => {
//             res.json(user[0]);
//           });
//       })
//       .then(trx.commit)
//       .catch(trx.rollback);
//   }).catch((err) => res.status(400).json('unable to register'));

// database.users.push({
//   id: '125',
//   name: name,
//   email: email,
//   password: password,
//   entries: 0,
//   joined: new Date(),
// });
//note got this set up from the knex docs on how to write an insert
// also .returning('*') is apart of knex
// });
