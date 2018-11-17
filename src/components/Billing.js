import React, { Component } from 'react'
import Form from './Form'
import Label from './Label'
import Button from './Button'
import Input from './Input'
import { CardElement, injectStripe } from 'react-stripe-elements'

class Billing extends Component {
  state = {
    name: '',
    storage: '',
    isProcessing: false,
    isCardComplete: false
  }

  validateForm() {
    return (
      this.state.name !== '' &&
      this.state.storage !== '' &&
      this.state.isCardComplete
    )
  }

  handleFieldChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    })
  }

  handleCardFieldChange = event => {
    this.setState({
      isCardComplete: event.complete
    })
  }

  handleSubmitClick = async event => {
    event.preventDefault()

    const { name } = this.state

    this.setState({ isProcessing: true })

    const { token, error } = await this.props.stripe.createToken({ name })

    this.setState({ isProcessing: false })

    this.props.onSubmit(this.state.storage, { token, error })
  }

  render() {
    const loading = this.state.isProcessing || this.props.loading

    return (
      <div className="Login pt-12">
        <div className="flex justify-center">
          <div className="w-full max-w-sm">
            <Form onSubmit={this.handleSubmitClick}>
              <div className="mb-4">
                <Label htmlFor="storage">Storage</Label>
                <Input
                  autoFocus
                  id="storage"
                  type="number"
                  value={this.state.storage}
                  onChange={this.handleFieldChange}
                  placeholder="Number of notes to store"
                />
              </div>
              <hr />
              <div className="mb-4">
                <Label htmlFor="storage">Cardholder&apos;s name</Label>
                <Input
                  autoFocus
                  id="name"
                  type="text"
                  value={this.state.name}
                  onChange={this.handleFieldChange}
                  placeholder="Name on the card"
                />
              </div>
              <div className="mb-4">
                <Label>Credit Card Info</Label>
                <CardElement
                  className="card-field shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline"
                  onChange={this.handleCardFieldChange}
                  style={{
                    base: {
                      fontSize: '18px',
                    }
                  }}
                />
              </div>
              <div className="flex items-center justify-between">
                {!this.validateForm() || loading ? (
                  <Button onClick={e => e.preventDefault()} disabled>
                    {!loading ? 'Purchase' : 'Loading'}
                  </Button>
                ) : (
                  <Button type="submit">Purchase</Button>
                )}
              </div>
            </Form>
          </div>
        </div>
      </div>
    )
  }
}

export default injectStripe(Billing)
