import React, { Component } from 'react'
import { API } from 'aws-amplify'
import { Elements, StripeProvider } from "react-stripe-elements";
import Billing from "../components/Billing";
import config from "../config";

export default class Settings extends Component {
  state = {
    isLoading: false
  }

  billUser(details) {
    return API.post('notes', '/billing', {
      body: details
    })
  }

  handleFormSubmit = async (storage, { token, error }) => {
    if (error) {
      alert(error)
      return
    }

    this.setState({ isLoading: true })

    try {
      await this.billUser({
        storage,
        source: token.id
      })

      alert('Your card has been charged successfully!')
      this.props.history.push('/')
    } catch (e) {
      alert(e)
      this.setState({ isLoading: false })
    }
  }

  render() {
    return (
      <div className="Settings">
        <StripeProvider apiKey={config.STRIPE_KEY}>
          <Elements>
            <Billing
              loading={this.state.isLoading}
              onSubmit={this.handleFormSubmit}
            />
          </Elements>
        </StripeProvider>
      </div>
    )
  }
}
