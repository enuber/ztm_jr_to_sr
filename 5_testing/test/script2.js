// const fetch = require('node-fetch'); you no longer need this package if you have the latest version of Node!

//note: with the old way requiring fetch above, you have to pass fetch into the function = (fetch) =>
// ***********************IMORTANT for testing we need to add the fetch parameter. So it will still run as expected without having to pass fetch in since we no longer need to require it, we can set it to global.fetch
export const getPeoplePromise = (fetch = global.fetch) => {
  return fetch('http://swapi.py4e.com/api/people')
    .then((response) => response.json())
    .then((data) => {
      return {
        count: data.count,
        results: data.results,
      };
    })
    .catch((err) => console.log('Error fetching data: ', err));
};
export const getPeople = async (fetch = global.fetch) => {
  const getRequest = await fetch('http://swapi.py4e.com/api/people');
  const data = await getRequest.json();
  // console.log(data);
  return {
    count: data.count,
    results: data.results,
  };
};

//again have to pass fetch in if doing it with the require from above.
// getPeople().then(console.log);
// getPeoplePromise().then(console.log);

//old way, just exporting.
// module.exports = {
//   getPeople,
//   getPeoplePromise,
// };
