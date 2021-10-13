import React from 'react'

class NewTweet extends React.Component {
  state = {
    text : '',
    enableSubmit : false,
    charLeft : 200
  }

  handleTextChange = (e) => {
    e.preventDefault()
    const value  = e.target.value
    if (value !== '') {
      this.setState({
        text : value,
        enableSubmit : true,
        charLeft : 200 - value.length
      })
    }
    else {
      this.setState({
        text : value,
        enableSubmit : false,
        charLeft : 200,
      })
    }
  }

  handleAddReply = (e) => {
    e.preventDefault()
    const text = this.state.text
    console.log(text);
    this.setState({
      text : '',
      enableSubmit : false,
      charLeft : 200,
    })
  }

  render() {
    const { enableSubmit, text, charLeft } = this.state
    return (
      <div className = "ui container">
        <h3 className = "ui center aligned header">Add New Tweet</h3>
        <form className="ui reply form">
          <div className="field">
            <textarea
              onChange = {this.handleTextChange}
              value = {text}
              placeholder="Write your tweet here..."
              maxLength = {200}
              >
            </textarea>
            <div className = "">
              <span className="right floated ui placeholder">{charLeft} characters left!</span>
            </div>
          </div>

          <div className={ enableSubmit
            ? "ui blue labeled submit icon button"
            : "ui blue labeled submit icon disabled button"}
            onClick = {this.handleAddReply}>
            <i className="icon edit"></i> Add Tweet Reply
          </div>
        </form>
      </div>

    );
  }
}

export default NewTweet
