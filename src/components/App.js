import React, { Component } from 'react'

class App extends Component {
  render() {
    return (
      <div>
        <div className="ui secondary pointing menu">
          <a className="active item">
            Home
          </a>
          <a className="item">
            <i class="plus circle green icon"></i>New Tweet
          </a>
          <div class="right menu">
            <div class="item">
              <div class="ui transparent icon input">
                <input type="text" placeholder="Search by users..." />
                <i class="search link icon"></i>
              </div>
            </div>
          </div>
        </div>
        <div className="ui segment">
          <p></p>
        </div>
      </div>
    )
  }
}

export default App
