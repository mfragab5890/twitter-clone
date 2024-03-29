import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { formatTweet, formatDate } from '../utils/helpers'
import { handleTweetLikeToggle } from '../actions/tweets'

class Reply extends React.Component {

  handleToggleLike = (e) => {
    e.preventDefault();
    const { authedUser, dispatch } = this.props
    const { id, hasLiked } = this.props.tweet
    dispatch(handleTweetLikeToggle({ id, hasLiked, authedUser }))

  }

  handleAddReply = (e) => {
    e.preventDefault();
    const { id } = e.target.parentNode
    this.props.history.push(`/tweet/${id}`)
  }

  handleShowReplies = (e) => {
    e.preventDefault();
    const { id } = e.target.parentNode
    this.props.history.push(`/replies/${id}`)
  }
  handleShowParent = (e) => {
    e.preventDefault();
    const { id } = e.target
    this.props.history.push(`/replies/${id}`)
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

    return (

      <div className = "ui segment">
        <div className="ui comment">
          <a className="avatar" href = {avatar}>
            <img className="ui avatar circular image" src={avatar} alt = "avatar" />
          </a>
          <div className="content">
            <span className="author" >{name}</span>
            <div className="metadata">
              <span className="date">{date}</span>
            </div>
            <div className="metadata">
              {
                parent ?
                  <span
                    id = {parent.id}
                    style = {{cursor: 'pointer'}}
                    className="meta"
                    onClick = { this.handleShowParent}
                    >Replying to {parent.author}
                  </span>
                  : null
              }

            </div>
            <div className="text">
              {text}
            </div>
            <div id = {id} className="actions">

              <button
                className="ui tiny circular button"
                style = {{border: "none", background: "none", outline:'none'}}
                onClick = {this.handleAddReply}
                >
                <i className="reply icon"></i>
                Reply
              </button>

              <button
                className="ui tiny circular button"
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
                className = {replies > 0 ? "ui tiny circular button" : "ui tiny circular disabled button"}
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

    )
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

export default withRouter(connect(mapStateToProps)(Reply))
