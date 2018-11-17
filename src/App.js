import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { Auth } from 'aws-amplify'
import Routes from './Routes'

class App extends React.Component {
  state = {
    isAuthenticated: false,
    isAuthenticating: true
  }

  userHasAuthenticated = authenticated => {
    this.setState({ isAuthenticated: authenticated })
  }

  async componentDidMount() {
    try {
      await Auth.currentSession()
      this.userHasAuthenticated(true)
    } catch (e) {
      if (e !== 'No current user') {
        alert(e)
      }
    }
    this.setState({ isAuthenticating: false })
  }

  handleLogout = async () => {
    await Auth.signOut()
    this.userHasAuthenticated(false)
    this.props.history.push('/login')
  }

  render() {
    const childProps = {
      isAuthenticated: this.state.isAuthenticated,
      userHasAuthenticated: this.userHasAuthenticated
    }

    const linkClass =
      'no-underline block mt-4 lg:inline-block lg:mt-0 text-blue-lighter hover:text-white mr-4'

    return !this.state.isAuthenticating ? (
      <div>
        <nav className="flex items-center justify-between flex-wrap bg-blue p-6">
          <div className="flex items-center flex-no-shrink text-white mr-6">
            <Link
              to="/"
              className="text-white no-underline font-semibold text-xl tracking-tight"
            >
              Notes App
            </Link>
          </div>
          <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto justify-end">
            {!this.state.isAuthenticated ? (
              <React.Fragment>
                <div className="text-sm">
                  <Link to="/signup" className={linkClass}>
                    Sign Up
                  </Link>
                </div>
                <div className="text-sm">
                  <Link to="/login" className={linkClass}>
                    Log In
                  </Link>
                </div>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <div className="text-sm">
                  <Link to="/newNote" className={linkClass}>
                    Add Note
                  </Link>
                </div>
                <div className="text-sm">
                  <Link to="/settings" className={linkClass}>
                    Setttings
                  </Link>
                </div>
                <div className="text-sm">
                  <span
                    onClick={this.handleLogout}
                    className={`cursor-pointer ${linkClass}`}
                  >
                    Log Out
                  </span>
                </div>
              </React.Fragment>
            )}
          </div>
        </nav>
        <Routes childProps={childProps} />
      </div>
    ) : null
  }
}

export default withRouter(App)
