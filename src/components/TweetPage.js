import React from 'react'
import { connect } from 'react-redux'
import Reply from './Reply'
import NewTweet from './NewTweet'

class TweetPage extends React.Component {

  render(){
    const { tweetId, repliesIds, author } = this.props
    return (
      <div className = 'ui centered container comments'>
        <Reply tweetId = {tweetId}/>

        <NewTweet tweetId = { tweetId }/>
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

const mapStateToProps = ({tweets}, props) => {
  const { tweetId } = props.match.params
  const tweet =  tweets[tweetId]

  return {
    tweetId : tweet ? tweetId : null,
    repliesIds : tweet ? tweet.replies.sort((a,b) => tweets[b].timestamp - tweets[a].timestamp ) : [],
    author : tweet? tweet.author : null
  };
}

export default connect(mapStateToProps)(TweetPage)
