import React from 'react'
import { connect } from 'react-redux'
import {Route} from 'react-router-dom'
import Tweet from './Tweet'
import NewTweet from './NewTweet'

class Dashboard extends React.Component {

  componentDidMount() {
    console.log(this.props);
  }

  render(){
    const {tweetsIds} = this.props

    return (
      <div>

        <Route exact path='/new-tweet' render ={() => (
            <NewTweet />
          )}
        />

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
