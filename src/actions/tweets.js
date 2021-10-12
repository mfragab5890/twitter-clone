//handle tweets action creator
import { saveLikeToggle } from '../utils/api'

export const RECEIVE_TWEETS = 'RECEIVE_TWEETS'
export const TOGGLE_TWEET = 'TOGGLE_TWEET'

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
