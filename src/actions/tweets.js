import { saveTweet } from '../utils/api'
import { showLoading, hideLoading } from 'react-redux-loading'

//handle tweets action creator
import { saveLikeToggle } from '../utils/api'

export const RECEIVE_TWEETS = 'RECEIVE_TWEETS'
export const TOGGLE_TWEET = 'TOGGLE_TWEET'
export const ADD_TWEET = 'ADD_TWEET'

export const addTweet = (tweet) => {
  return {
    type : ADD_TWEET,
    tweet,
  };
}

export const receiveTweets = (tweets) => {
  return {
    type : RECEIVE_TWEETS,
    tweets,
  };
}

export const toggleTweet = ({ id, hasLiked, authedUser }) => {
  return {
    type : TOGGLE_TWEET,
    id,
    authedUser,
    hasLiked,
  };
}

export const handleTweetLikeToggle = (info) => (dispatch) => {
  dispatch(toggleTweet(info))
  return saveLikeToggle(info).catch((e) => {
    dispatch(toggleTweet(info))
    console.warn('Error in handleTweetLikeToggle' ,e);
  })
}

export const handleAddTweet = (text, replyingTo) => (dispatch, getState) =>{
  dispatch(showLoading)
  const { authedUser } = getState()
  return saveTweet({
    text,
    author : authedUser,
    replyingTo,
    })
    .then((tweet) => {
      dispatch(addTweet(tweet))
    })
    .then(() => {
      dispatch(hideLoading())
    })
}
