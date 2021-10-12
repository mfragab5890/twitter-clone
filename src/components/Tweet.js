import React from 'react'
import { connect } from 'react-redux'
import { formatTweet, formatDate } from '../utils/helpers'
import { handleTweetLikeToggle } from '../actions/tweets'

class Tweet extends React.Component {

  handleToggleLike = (e) => {
    e.preventDefault();
    const { authedUser, dispatch } = this.props
    const { id, hasLiked } = this.props.tweet
    dispatch(handleTweetLikeToggle({ id, hasLiked, authedUser }))

  }

  handleAddReply = (e) => {
    e.preventDefault();
    console.log(e.target.id, 'commented');
  }

  handleShowReplies = (e) => {
    e.preventDefault();
    console.log(e.target.id, 'replies');
  }

  componentDidMount() {
  }

  render(){
    const { tweet } = this.props
    const date = formatDate(tweet.timestamp)
    const {id, avatar, name, text, hasLiked, likes, replies, parent} = tweet
    if (tweet === null) {
      return (<p>This Tweet Dosen't Exists!!!</p>);
    }

    return !parent ? (

      <div className = "ui segment">
        <div className="ui comment">
          <a className="avatar" href = {avatar}>
            <img className="ui avatar circular image" src={avatar} alt = "avatar" />
          </a>
          <div className="content">
            <a className="author" href = '/'>{name}</a>
            <div className="metadata">
              <span className="date">{date}</span>
            </div>
            <div className="text">
              {text}
            </div>
            <div id = {id} className="actions">

              <button
                className="ui button"
                style = {{border: "none", background: "none", outline:'none'}}
                onClick = {this.handleAddReply}
                >
                <i className="reply icon"></i>
                &nbsp;Reply
              </button>

              <button
                className="ui button"
                style = {{border: "none", background: "none", outline:'none'}}
                onClick = {this.handleToggleLike}
                >
                <i className={hasLiked ? "heart like red icon" : "heart like grey icon"}></i>
                &nbsp;
                {
                  likes > 0 ?
                  (likes === 1 ? likes + ' Like' : likes + ' Likes') :
                  null
                }
              </button>

              <button
                className = {replies > 0 ? "ui button" : "ui disabled button"}
                style = {{border: "none", background: "none", outline:'none'}}
                onClick = {this.handleShowReplies}
                >
                <i className = { replies > 0 ? "comment blue icon" : "comment icon" } >
                </i>

                &nbsp;{
                  replies > 0 ?
                  (replies === 1 ? replies + ' Comment' : replies + ' Comments') :
                  null
                }
              </button>

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
  const parentTweet = tweet ? tweets[tweet.replyingTo] : null
  const formatedTweet = tweet ? formatTweet( tweet, user, authedUser, parentTweet ) : null

  return {
    tweet : formatedTweet,
    authedUser : authedUser,
  };
}

export default connect(mapStateToProps)(Tweet)
