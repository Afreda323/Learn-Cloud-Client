import React from 'react'
import config from '../config'
import { API } from 'aws-amplify'
import { s3Upload } from '../helpers'
import TextArea from '../components/TextArea'
import Button from '../components/Button'
import Form from '../components/Form'
import Label from '../components/Label'
import FileUpload from '../components/FileUpload'

export default class NewNote extends React.Component {
  file = null
  state = {
    isLoading: null,
    content: ''
  }

  validateForm() {
    return this.state.content.length > 0
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    })
  }

  handleFileChange = event => {
    this.file = event.target.files[0]
    this.setState({ fileName: this.file.name })
  }

  handleSubmit = async event => {
    event.preventDefault()

    if (this.file && this.file.size > config.MAX_ATTACHMENT_SIZE) {
      alert(`Please pick a file smaller than
   ${config.MAX_ATTACHMENT_SIZE / 1000000} MB.`)
      return
    }

    this.setState({ isLoading: true })

    try {
      const attachment = this.file ? await s3Upload(this.file) : null
      await this.createNote({
        attachment,
        content: this.state.content
      })
      this.props.history.push('/')
    } catch (e) {
      alert(e)
      this.setState({ isLoading: false })
    }
  }

  createNote(note) {
    return API.post('notes', '/notes', {
      body: note
    })
  }

  render() {
    return (
      <div className="NewNote pt-12">
        <div className="flex justify-center">
          <div className="w-full max-w-md">
            <Form onSubmit={this.handleSubmit}>
              <div className="mb-2">
                <Label htmlFor="email">Enter your note</Label>
                <TextArea
                  autoFocus
                  id="content"
                  value={this.state.content}
                  onChange={this.handleChange}
                />
              </div>
              <div className="mb-4">
                <Label htmlFor="file">Attachment</Label>
                <FileUpload id="file" onChange={this.handleFileChange} />
                {this.state.fileName && (
                  <p className="text-black mt-2">{this.state.fileName}</p>
                )}
              </div>
              <div className="flex items-center justify-between">
                {!this.validateForm() || this.state.isLoading ? (
                  <Button onClick={e => e.preventDefault()} disabled>
                    {!this.state.isLoading ? 'Create Note' : 'Loading'}
                  </Button>
                ) : (
                  <Button type="submit">Create Note</Button>
                )}
              </div>
            </Form>
          </div>
        </div>
      </div>
    )
  }
}
