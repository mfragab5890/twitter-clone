import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'

class App extends Component {

  async componentDidMount() {
    this.props.dispatch(handleInitialData())
  }

  render() {
    return (
      <div>
        <div className="ui pointing menu">
          <a className="active item">
            Home
          </a>
          <a className="item">
            <i className="plus circle green icon"></i>New Tweet
          </a>
          <div className="right menu">
            <div className="item">
              <div className="ui transparent icon input">
                <input type="text" placeholder="Search by users..." />
                <i className="search link icon"></i>
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

export default connect()(App)
