import React from 'react'
import { API, Storage } from 'aws-amplify'
import config from '../config'
import { s3Upload } from '../helpers'
import TextArea from '../components/TextArea'
import Button from '../components/Button'
import Form from '../components/Form'
import Label from '../components/Label'
import FileUpload from '../components/FileUpload'

export default class Notes extends React.Component {
  file = null
  state = {
    isLoading: null,
    isDeleting: null,
    note: null,
    content: '',
    attachmentURL: null
  }

  async componentDidMount() {
    try {
      let attachmentURL
      const note = await this.getNote()
      const { content, attachment } = note
      if (attachment) {
        attachmentURL = await Storage.vault.get(attachment)
      }
      this.setState({
        note,
        content,
        attachmentURL
      })
    } catch (e) {
      alert(e)
    }
  }

  getNote() {
    return API.get('notes', `/notes/${this.props.match.params.id}`)
  }

  validateForm() {
    return this.state.content.length > 0
  }

  formatFilename(str) {
    return str.replace(/^\w+-/, '')
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    })
  }

  handleFileChange = event => {
    event.preventDefault()
    this.file = event.target.files[0]
    this.setState({ fileName: this.file.name })
  }

  handleSubmit = async event => {
    let attachment
    event.preventDefault()
    if (this.file && this.file.size > config.MAX_ATTACHMENT_SIZE) {
      alert(`Please pick a file smaller than
   ${config.MAX_ATTACHMENT_SIZE / 1000000} MB.`)
      return
    }
    this.setState({ isLoading: true })
    try {
      if (this.file) {
        attachment = await s3Upload(this.file)
      }
      await this.saveNote({
        content: this.state.content,
        attachment: attachment || this.state.note.attachment
      })
      this.props.history.push('/')
    } catch (e) {
      alert(e)
      this.setState({ isLoading: false })
    }
  }

  handleDelete = async event => {
    event.preventDefault()
    const confirmed = window.confirm(
      'Are you sure you want to delete this note?'
    )
    if (!confirmed) {
      return
    }
    this.setState({ isDeleting: true })
    try {
      await this.deleteNote()
      this.props.history.push('/')
    } catch (e) {
      alert(e)
      this.setState({ isDeleting: false })
    }
  }

  deleteNote() {
    return API.del('notes', `/notes/${this.props.match.params.id}`)
  }
  
  saveNote(note) {
    return API.put('notes', `/notes/${this.props.match.params.id}`, {
      body: note
    })
  }

  render() {
    return (
      <div className="Notes pt-12">
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
                {this.state.note && this.state.note.attachment && (
                  <div className="text-black mb-4">
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href={this.state.attachmentURL}
                    >
                      {this.formatFilename(this.state.note.attachment)}
                    </a>
                  </div>
                )}
                <FileUpload id="file" onChange={this.handleFileChange} />

                {this.state.fileName && (
                  <p className="text-black mt-2">
                    Uploading: {this.state.fileName}
                  </p>
                )}
              </div>
              <div className="flex items-center justify-start">
                {!this.validateForm() || this.state.isLoading ? (
                  <Button onClick={e => e.preventDefault()} disabled>
                    {!this.state.isLoading ? 'Update Note' : 'Loading'}
                  </Button>
                ) : (
                  <Button type="submit">Update Note</Button>
                )}
                <span className="pl-2" />
                <Button red onClick={this.handleDelete}>
                  {!this.state.isDeleting ? 'Delete Note' : 'Deleting'}
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    )
  }
}
