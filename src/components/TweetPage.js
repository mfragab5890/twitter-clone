import React from 'react'
import { connect } from 'react-redux'
import Reply from './Reply'
import NewTweet from './NewTweet'

class TweetPage extends React.Component {

  render(){
    const { tweetId, repliesIds, author } = this.props
    return (
      <div>
        <Reply tweetId = {tweetId}/>

        <NewTweet />
        {
          repliesIds.length > 0 ?
          (
            <div className = 'replies'>
              <h3 className = "ui center aligned header">previuos replies</h3>
              {
                repliesIds.map((id) => {
                  return (
                    <Reply key = {id} tweetId = {id}/>
                  );
                })
              }
            </div>
          )
          :(<h4 className = "ui center aligned header">No previuos replies!! be the first to reply to {author}</h4>)
        }

      </div>
    );
  };
}

const mapStateToProps = ({tweets},{tweetId}) => {
  const tweet =  tweets[tweetId]

  return {
    tweetId : tweet ? tweetId : null,
    repliesIds : tweet ? tweet.replies : null,
    author : tweet.author
  };
}

export default connect(mapStateToProps)(TweetPage)
