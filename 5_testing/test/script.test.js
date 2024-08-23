// const googleSearch = require('./script'); // old way to do this combined with module.export from script.js file.
import { googleSearch } from './script';

const dbMock = ['dog.com', 'cheesepuff.com', 'disney.com', 'dogpictures.com'];

// In Jest, the describe() function is used to group related test cases together. It helps organize tests into logical sections or test suites, making the test output more readable and the tests easier to manage
describe('googlesearch', () => {
  it('is a test', () => {
    expect('hello').toBe('hello');
    // googleSearch('dog', dbMock);
  });

  it('is searching google', () => {
    expect(googleSearch('test', dbMock)).toEqual([]);
    expect(googleSearch('dog', dbMock)).toEqual(['dog.com', 'dogpictures.com']);
  });

  it('work with undefined and null input', () => {
    expect(googleSearch(undefined, dbMock)).toEqual([]);
    expect(googleSearch(null, dbMock)).toEqual([]);
  });

  it('does not return more than 3 matches', () => {
    expect(googleSearch('.com', dbMock).length).toEqual(3);
  });
});
