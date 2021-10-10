import React from 'react'
import { connect } from 'react-redux'
import { formatTweet, formatDate } from '../utils/helpers'

class Tweet extends React.Component {

  componentDidMount() {
    console.log(this.props);
  }

  render(){
    const {tweetId} = this.props
    const {tweet} = this.props
    const {user} = this.props
    const {authedUser} = this.props
    const date = formatDate(tweet.timestamp)
    const tweetData = formatTweet(tweet,user,authedUser,tweet.replyingTo)


    return !tweetData.parent ? (

      <div className = "ui segment">
        <div className="ui comment">
          <a className="avatar">
            <img className="ui avatar image" src={tweetData.avatar} alt = "avatar" />
          </a>
          <div className="content">
            <a className="author">{tweetData.name}</a>
            <div className="metadata">
              <span className="date">{date}</span>
            </div>
            <div className="text">
              {tweetData.text}
            </div>
            <div className="actions">
              <a className="reply">
                <i class="reply icon"></i>
                &nbsp;Reply
              </a>
              <a className="left floated">
                <i className={tweetData.hasLiked ? "heart like red icon" : "heart like grey icon"}></i>
                  &nbsp;{tweetData.likes} likes
              </a>
              <a className="right floated">
                <i className="comment blue icon"></i>
                &nbsp;{tweetData.replies} comments
              </a>
            </div>
          </div>
        </div>

      </div>

    ) : null
  };
}

const mapStateToProps = ({authedUser,tweets, users},{tweetId}) => {
  const tweet =  tweets[tweetId]
  const user = users[tweet.author]
  return {
    tweet : tweet,
    user : user,
    authedUser : authedUser,
  };
}

export default connect(mapStateToProps)(Tweet)
