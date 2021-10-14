import React from 'react'
import { connect } from 'react-redux'
import Reply from './Reply'
import NewTweet from './NewTweet'

class TweetPage extends React.Component {

  render(){
    const { tweetId, repliesIds } = this.props
    return (
      <div>
        <Reply tweetId = {tweetId}/>
        <NewTweet />
        <div className = 'replies'>
          <h3>previuos replies</h3>
          {
            repliesIds.map((id) => {
              return (
                <Reply key = {id} tweetId = {id}/>
              );
          })
        }
        </div>
      </div>
    );
  };
}

const mapStateToProps = ({tweets},{tweetId}) => {
  const tweet =  tweets[tweetId]

  return {
    tweetId : tweet ? tweetId : null,
    repliesIds : tweet ? tweet.replies : null,
  };
}

export default connect(mapStateToProps)(TweetPage)
