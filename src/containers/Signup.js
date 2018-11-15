import React from 'react'
import { Auth } from 'aws-amplify'
import Input from '../components/Input'
import Button from '../components/Button'
import Form from '../components/Form'
import Label from '../components/Label'

export default class Signup extends React.Component {
  state = {
    isLoading: false,
    email: '',
    password: '',
    confirmPassword: '',
    confirmationCode: '',
    newUser: null
  }

  validateForm() {
    return (
      this.state.email.length > 0 &&
      this.state.password.length > 0 &&
      this.state.password === this.state.confirmPassword
    )
  }

  validateConfirmationForm() {
    return this.state.confirmationCode.length > 0
  }

  handleChange = event => {
    this.setState({ error: null })
    this.setState({
      [event.target.id]: event.target.value
    })
  }

  handleSubmit = async event => {
    event.preventDefault()
    this.setState({ isLoading: true, error: null })
    const { email, password } = this.state
    try {
      const newUser = await Auth.signUp({
        username: email,
        password
      })
      this.setState({ newUser })
    } catch (e) {
      if (e.code === 'UsernameExistsException') {
        alert(e.message + ' Attempting log in')
        return this.handleLogin()
      }
      this.setState({ error: e.message })
    }

    this.setState({ isLoading: false })
  }

  handleLogin = async () => {
    this.setState({ isLoading: true, error: null })
    const { email, password } = this.state
    const { userHasAuthenticated, history } = this.props
    try {
      await Auth.signIn(email, password)
      userHasAuthenticated(true)
      history.push('/')
    } catch (e) {
      alert(e.message)
      this.setState({ isLoading: false })
      history.push('/login')
    }
  }

  handleConfirmationSubmit = async event => {
    event.preventDefault()
    this.setState({ isLoading: true, error: null })
    const { email, password, confirmationCode } = this.state
    const { userHasAuthenticated, history } = this.props
    try {
      await Auth.confirmSignUp(email, confirmationCode)
      await Auth.signIn(email, password)
      userHasAuthenticated(true)
      history.push('/')
    } catch (e) {
      this.setState({ error: e.message })
      this.setState({ isLoading: false })
    }
  }

  renderForm = () => (
    <div className="Signup pt-12">
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
            </div>
            <div className="mb-4">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="******************"
                value={this.state.confirmPassword}
                onChange={this.handleChange}
              />
            </div>
            {this.state.error && (
              <p className="text-red mb-2 text-xs italic">{this.state.error}</p>
            )}
            <div className="flex items-center justify-between">
              {!this.validateForm() || this.state.isLoading ? (
                <Button onClick={e => e.preventDefault()} disabled>
                  {!this.state.isLoading ? 'Sign Up' : 'Loading'}
                </Button>
              ) : (
                <Button type="submit">Sign Up</Button>
              )}
            </div>
          </Form>
        </div>
      </div>
    </div>
  )

  renderConfirm = () => (
    <div className="Signup pt-12">
      <div className="flex justify-center">
        <div className="w-full max-w-xs">
          <Form onSubmit={this.handleConfirmationSubmit}>
            <div className="mb-2">
              <Label htmlFor="confirmationCode">Confirmation Code</Label>
              <Input
                autoFocus
                id="confirmationCode"
                type="text"
                value={this.state.confirmationCode}
                onChange={this.handleChange}
                placeholder="confirmationCode"
              />
              <p className="text-grey-dark text-xs italic mt-2">
                Please check your email for the code.
              </p>
            </div>
            {this.state.error && (
              <p className="text-red text-xs italic mb-2">{this.state.error}</p>
            )}
            <div className="flex items-center justify-between">
              {!this.validateConfirmationForm() || this.state.isLoading ? (
                <Button onClick={e => e.preventDefault()} disabled>
                  {!this.state.isLoading ? 'Verify' : 'Loading'}
                </Button>
              ) : (
                <Button type="submit">Verify</Button>
              )}
            </div>
          </Form>
        </div>
      </div>
    </div>
  )

  render() {
    return this.state.newUser ? this.renderConfirm() : this.renderForm()
  }
}
