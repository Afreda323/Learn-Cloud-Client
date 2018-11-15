import React from 'react'
import { Auth } from 'aws-amplify'
import Input from '../components/Input'
import Button from '../components/Button'
import Form from '../components/Form'
import Label from '../components/Label'

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
    this.setState({ error: null })
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  handleSubmit = async e => {
    e.preventDefault()
    this.setState({ isLoading: true, error: null })
    try {
      await Auth.signIn(this.state.email, this.state.password)
      this.props.userHasAuthenticated(true)
    } catch (e) {
      this.setState({ isLoading: false, error: e.message })
    }
  }

  render() {
    return (
      <div className="Login pt-12">
        <div className="flex justify-center">
          <div className="w-full max-w-xs">
            <Form onSubmit={this.handleSubmit}>
              <div className="mb-4">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  autoFocus
                  id="email"
                  type="email"
                  value={this.state.email}
                  onChange={this.handleChange}
                  placeholder="email"
                />
              </div>
              <div className="mb-4">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="******************"
                  value={this.state.password}
                  onChange={this.handleChange}
                />
                {this.state.error && (
                  <p className="text-red text-xs mt-4 italic">{this.state.error}</p>
                )}
              </div>
              <div className="flex items-center justify-between">
                {!this.validateForm() || this.state.isLoading ? (
                  <Button onClick={e => e.preventDefault()} disabled>
                    {!this.state.isLoading ? 'Log In' : 'Loading'}
                  </Button>
                ) : (
                  <Button type="submit">Log In</Button>
                )}
              </div>
            </Form>
          </div>
        </div>
      </div>
    )
  }
}
