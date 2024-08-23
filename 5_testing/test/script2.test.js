// import fetch = require('node-fetch');  // old way
// const swapi = require('./script2'); //old way, would then use swapi.getPeople(fetch) to call a function

import { getPeople, getPeoplePromise } from './script2';

// The expect.assertions(number) function in Jest is used to ensure that a certain number of assertions are called within a test. This is particularly useful for asynchronous tests to confirm that they are executed correctly.

//In Jest, the done keyword is used in asynchronous tests to indicate when a test is complete. This is particularly useful when dealing with asynchronous code such as callbacks or promises. Use async/await for modern asynchronous code handling without needing done.

//note that getPeople is async/await
// it('calls swapi to get people', (done) => {
//   expect.assertions(1);
//   getPeople().then((data) => {
//     expect(data.count).toEqual(87);
//     done();
//   });
// });

// it('calls swapi to get people with a promise', (done) => {
//   expect.assertions(1);
//   getPeoplePromise().then((data) => {
//     expect(data.count).toEqual(87);
//     done();
//   });
// });

//left "done" in code above to show how it works. Below is using return instead which solves the problem as we are returning the promise. Jest understands it needs to wait for the promise to return and if it does then we get what we need. If it doesn't return it auto fails.

it('calls swapi to get people', () => {
  expect.assertions(1);
  return getPeople().then((data) => {
    expect(data.count).toEqual(87);
  });
});

it('calls swapi to get people with a promise', () => {
  expect.assertions(2);
  return getPeoplePromise().then((data) => {
    // console.log(data.results.length); // can use console logs to make sure data is what you expect
    expect(data.count).toEqual(87);
    expect(data.results.length).toBeGreaterThan(5);
  });
});

// mocking the fetch call. based on fetch, we get json back first that goes through response.json then we get the data back as another promise where we return count and results. So we are nesting promises to mock what was done within fetch.
it('getPeople2 returns count and results', () => {
  const mockFetch = jest.fn().mockReturnValue(
    Promise.resolve({
      json: () =>
        Promise.resolve({
          count: 87,
          results: [0, 1, 2, 3, 4, 5],
        }),
    })
  );
  expect.assertions(5);
  return getPeoplePromise(mockFetch).then((data) => {
    //helpful to see the data itself and see it's coming from mockFetch
    console.log(data);
    // we can use this as we are spying on mockFetch. mockFetch is a mock and a spy. We can spy on this and what this function did inside of getPeoplePromise function.
    expect(mockFetch.mock.calls.length).toBe(1);
    expect(mockFetch).toHaveBeenCalledTimes(1);
    expect(mockFetch).toBeCalledWith('http://swapi.py4e.com/api/people');
    expect(data.count).toEqual(87);
    expect(data.results.length).toBeGreaterThan(5);
  });
});
