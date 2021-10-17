import { RECEIVE_USERS, ADD_USER_TWEET } from '../actions/users'

const users = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_USERS:
      return {
        ...state,
        ...action.users
      };
    case ADD_USER_TWEET:
      console.log("action is ->", action);
      return {
        ...state,
        [action.authedUser]:{
          ...state[action.authedUser],
          tweets: state[action.authedUser].tweets.concat([action.tweetId])
        }
      };
    default:
      return state;
  }
}

export default users
