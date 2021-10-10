import React from 'react'
import { connect } from 'react-redux'
import Tweet from './Tweet'

class Dashboard extends React.Component {

  componentDidMount() {
    console.log(this.props);
  }

  render(){
    const {tweetsIds} = this.props

    return (
      <div className="ui centered container comments">
        {
          tweetsIds.map((tweet) => <Tweet key = {tweet} tweetId = {tweet}/> )
        }

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
