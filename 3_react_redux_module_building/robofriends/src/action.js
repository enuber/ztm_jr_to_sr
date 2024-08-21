import {
  CHANGE_SEARCH_FIELD,
  REQUEST_ROBOTS_FAILED,
  REQUEST_ROBOTS_PENDING,
  REQUEST_ROBOTS_SUCCESS,
} from './types';

// text is what is typed into the search input area.
// NOTES: 1) we wrapped it into () so there is no return statement and we are creating an object that has type and payload if you just return {} it will throw an error so has to be wrapped by (). By wrapping the object literal in parentheses, you tell JavaScript to treat it as an expression that should be returned 2) capitalized type is not required but is standard
export const setSearchField = (text) => ({
  type: CHANGE_SEARCH_FIELD,
  payload: text,
});

// It seems like the requestRobots action is expecting the dispatch function to be passed explicitly, but in the shorthand syntax used with connect, action creators are automatically bound to dispatch, so you don't need to manually call dispatch inside requestRobots.

// Here's how you can fix the requestRobots action to work properly with the connect function:

// Adjust the requestRobots Action Creator
// To work with the shorthand syntax, you should make sure requestRobots is defined as a thunk action creator. The redux-thunk middleware allows action creators to return functions instead of plain objects, and these functions receive the dispatch function as an argument.

// this is a function that returns a function. and here dispatch is already conected because of Thunk
export const requestRobots = () => (dispatch) => {
  dispatch({ type: REQUEST_ROBOTS_PENDING });
  fetch('https://jsonplaceholder.typicode.com/users')
    .then((res) => res.json())
    .then((data) => dispatch({ type: REQUEST_ROBOTS_SUCCESS, payload: data }))
    .catch((err) => dispatch({ type: REQUEST_ROBOTS_FAILED, payload: err }));
};
