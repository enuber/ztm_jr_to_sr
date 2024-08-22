import {
  CHANGE_SEARCH_FIELD,
  REQUEST_ROBOTS_FAILED,
  REQUEST_ROBOTS_PENDING,
  REQUEST_ROBOTS_SUCCESS,
} from './types';

const initialStateSearch = {
  searchField: '',
};

// Explanation:
// Spread Operator (...): It creates a new object with all the properties from state, and then the searchField property is updated with the value from action.payload.
// Default Case: The default case ensures that if the action type doesn't match any cases, the original state is returned unchanged. This is important to prevent the reducer from returning undefined when an unknown action is dispatched.
export const searchRobots = (state = initialStateSearch, action = {}) => {
  switch (action.type) {
    case CHANGE_SEARCH_FIELD:
      return {
        ...state,
        searchField: action.payload,
      };
    default:
      return state;
  }
};

const initialStateRobots = {
  robots: [],
  isPending: false,
  error: '',
};

export const requestRobots = (state = initialStateRobots, action = {}) => {
  switch (action.type) {
    case REQUEST_ROBOTS_PENDING:
      return { ...state, isPending: true };
    case REQUEST_ROBOTS_SUCCESS:
      return { ...state, isPending: false, robots: action.payload };
    case REQUEST_ROBOTS_FAILED:
      return { ...state, isPending: false, error: action.payload };
    default:
      return state;
  }
};
