import { getInitialData, saveTweet } from '../utils/api'
import { receiveUsers, addUserTweet } from '../actions/users'
import { receiveTweets, addTweet } from '../actions/tweets'
import { setAuthedUser } from '../actions/authedUser'
import { showLoading, hideLoading } from 'react-redux-loading'

const AUTHED_ID = 'mostafa_fouad'

export const handleInitialData = () => {
  return (dispatch) => {
    dispatch(showLoading())
    return getInitialData()
      .then(({users,tweets}) => {
        dispatch(receiveUsers(users))
        dispatch(receiveTweets(tweets))
        dispatch(setAuthedUser(AUTHED_ID))
        dispatch(hideLoading())
      })
  };
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
      console.log('tweet is : ', tweet );
      dispatch(addUserTweet(tweet.author, tweet.id))
      dispatch(addTweet(tweet))
    })
    .then(() => {
      dispatch(hideLoading())
    })
}
