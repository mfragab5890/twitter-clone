//handle users action creator

export const RECEIVE_USERS = 'RECEIVE_USERS'
export const ADD_USER_TWEET = 'ADD_USER_TWEET'

export const receiveUsers = (users) => {
  return {
    type : RECEIVE_USERS,
    users,
  };
}
export const addUserTweet  =(authedUser, tweetId) => {
  return {
    type : ADD_USER_TWEET,
    authedUser,
    tweetId,
  };
}
