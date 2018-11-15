import React from 'react'
import { Auth } from 'aws-amplify'

export default class Login extends React.Component {
  state = {
    email: '',
    password: '',
    isLoading: false
  }
  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0
  }

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  handleSubmit = async e => {
    e.preventDefault()
    this.setState({ isLoading: true })
    try {
      await Auth.signIn(this.state.email, this.state.password)
      this.props.userHasAuthenticated(true)
      this.props.history.push('/')
    } catch (e) {
      alert(e.message)
      this.setState({ isLoading: false })
    }
  }

  render() {
    return (
      <div className="Login pt-12">
        <div className="flex justify-center">
          <div className="w-full max-w-xs">
            <form
              className="bg-white shadow-md rounded px-8 pt-6 pb-8"
              onSubmit={this.handleSubmit}
            >
              <div className="mb-4">
                <label
                  className="block text-grey-darker text-sm font-bold mb-2"
                  htmlFor="email"
                >
                  Email Address
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline"
                  autoFocus
                  id="email"
                  type="email"
                  value={this.state.email}
                  onChange={this.handleChange}
                  placeholder="email"
                />
              </div>
              <div className="mb-6">
                <label
                  className="block text-grey-darker text-sm font-bold mb-2"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline"
                  id="password"
                  type="password"
                  placeholder="******************"
                  value={this.state.password}
                  onChange={this.handleChange}
                />
                {/* <p className="text-red text-xs italic">
                  Please choose a password.
                </p> */}
              </div>
              <div className="flex items-center justify-between">
                {!this.validateForm() || this.state.isLoading ? (
                  <button
                    onClick={e => e.preventDefault()}
                    className="bg-blue text-white font-bold py-2 px-4 rounded opacity-50 cursor-not-allowed"
                  >
                    {!this.state.isLoading ? 'Log In' : 'Loading'}
                  </button>
                ) : (
                  <button
                    className="bg-blue hover:bg-blue-dark text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit"
                  >
                    Log In
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
}
