const returnClarafiaRequestOptions = (imgURL) => {
  const PAT = 'dca58c86145443cb840b66346e8cbc7b';
  const USER_ID = 'enuber';
  const APP_ID = 'face-recognition-24';
  const IMAGE_URL = imgURL;

  const raw = JSON.stringify({
    user_app_id: {
      user_id: USER_ID,
      app_id: APP_ID,
    },
    inputs: [
      {
        data: {
          image: {
            url: IMAGE_URL,
          },
        },
      },
    ],
  });
  const requestOptions = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      Authorization: 'Key ' + PAT,
    },
    body: raw,
  };
  return requestOptions;
};

export const handleApiCall = (req, res) => {
  const MODEL_ID = 'face-detection';
  fetch(
    `https://api.clarifai.com/v2/models/${MODEL_ID}/outputs`,
    returnClarafiaRequestOptions(req.body.input)
  )
    .then((res) => res.json())
    .then((data) => {
      if (data.outputs) {
        res.json(data);
      } else {
        res.status(400).json('API response error');
      }
    })
    .catch((err) => res.status(400).json('unable to work with the API'));
};

export const handleImage = (req, res, db) => {
  const { id } = req.body;
  db('users')
    .where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then((entries) => res.json(entries[0].entries))
    .catch((err) => res.status(400).json('unable to get enteries'));

  // let found = false;
  // database.users.forEach((user) => {
  //   if (user.id === id) {
  //     found = true;
  //     user.entries++;
  //     return res.json(user.entries);
  //   }
  // });
  // if (!found) {
  //   res.status(400).json('no such user');
  // }
};
