import React from 'react'
import { connect } from 'react-redux'
import {Route} from 'react-router-dom'
import Tweet from './Tweet'
import NewTweet from './NewTweet'
import TweetPage from './TweetPage'
import Replies from './Replies'

class Dashboard extends React.Component {

  render(){
    const {tweetsIds} = this.props

    return (
      <div className = 'ui container'>

        <Route exact path='/new-tweet' render ={() => (
            <NewTweet />
          )}
        />
      <Route exact path='/tweet/:tweetId' component = { TweetPage } />
      <Route exact path='/replies/:tweetId' component = { Replies } />
      <Route exact path = '/' render ={() => (
          <div className="ui centered container comments">
            {
              tweetsIds.map((tweetId) => <Tweet key = {tweetId} tweetId = {tweetId}/> )
            }
          </div>
          )}
        />

      </div>

    );
  };
}

const mapStateToProps = ({tweets}) => {

  return {
    tweetsIds : Object.keys(tweets)
    .sort( (a,b) => tweets[b].timestamp - tweets[a].timestamp )
  };
}

export default connect(mapStateToProps)(Dashboard)
