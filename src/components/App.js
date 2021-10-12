import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import Dashboard from './Dashboard'
import Loader from './Loader'
import LoadingBar from 'react-redux-loading'

class App extends Component {

  async componentDidMount() {
    this.props.dispatch(handleInitialData())
  }

  render() {
    const {loading} = this.props
    return (
      <div>
        <LoadingBar />
        <div className="ui pointing menu">
          <a className="active item" href = "/">
            Home
          </a>
          <a className="item" href = "/">
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
        {
          loading ?
            <Loader /> :
            <div className="ui centered container segment">
              <Dashboard />
            </div>
        }

      </div>
    )
  }
}

const mapStateToProps = ({authedUser}) => {
  return {
    loading : authedUser === null
  };
}

export default connect(mapStateToProps)(App)
