import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { handleInitialData } from '../actions/shared'
import Dashboard from './Dashboard'
import Loader from './Loader'
import LoadingBar from 'react-redux-loading'

class App extends Component {
  state = {
    activeTab : 1,
  }

  async componentDidMount() {
    this.props.dispatch(handleInitialData())
  }

  handleActiveTab = (e) => {
    const {id} = e.target
    if (id === 'home') {
      this.setState({
        activeTab : 1
      })
    }
    else {
      this.setState({
        activeTab : 2
      })
    }
  }

  render() {
    const {loading} = this.props
    const { activeTab } = this.state
    return (
      <Fragment>
        <LoadingBar />
        <div className="ui pointing menu">
          <Link id = 'home' to = '/' className={ activeTab === 1 ? "active item" : "item" } onClick = {this.handleActiveTab}>
            Home
          </Link>
          <Link id = 'new' className={ activeTab === 2 ? "active item" : "item" } to = '/new-tweet' onClick = {this.handleActiveTab}>
            <i className="plus circle green icon"></i>New Tweet
          </Link>
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

      </Fragment>
    )
  }
}

const mapStateToProps = ({authedUser}) => {
  return {
    loading : authedUser === null
  };
}

export default connect(mapStateToProps)(App)
