import React from 'react'
import { API } from 'aws-amplify'
import ListGroup from '../components/ListGroup'
import ListItem from '../components/ListItem'
import Button from '../components/Button'

export default class Home extends React.Component {
  state = {
    isLoading: null,
    content: ''
  }

  async componentDidMount() {
    if (!this.props.isAuthenticated) {
      return
    }
    try {
      const notes = await this.notes()
      this.setState({ notes })
    } catch (e) {
      alert(e)
    }
    this.setState({ isLoading: false })
  }

  notes() {
    return API.get('notes', '/notes')
  }

  renderNotesList = notes =>
    notes
      ? notes.map(note => (
          <ListItem
            key={note.noteId}
            to={`/notes/${note.noteId}`}
            header={note.content.trim().split('\n')[0]}
            text={'Created: ' + new Date(note.createdAt).toLocaleString()}
          />
        ))
      : null

  renderLander = () => (
    <div className="Home">
      <div className="text-center mt-20">
        <h1 className="text-black text-5xl mb-1 font-normal">Note App</h1>
        <p className="text-grey-darker mb-4">A simple note taking app</p>
        <Button onClick={() => this.props.history.push('/login')}>
          Log In
        </Button>
        <span className='ml-2' />
        <Button green onClick={() => this.props.history.push('/signup')}>
          Sign Up
        </Button>
      </div>
    </div>
  )

  renderNotes() {
    return (
      <div className="NewNote pt-12">
        <div className="flex justify-center">
          <div className="w-full max-w-md bg-white rounded px-8 pt-6 pb-8">
            <h1 className="text-black">Your Notes</h1>
            <ListGroup>
              {!this.state.isLoading && this.renderNotesList(this.state.notes)}
              <ListItem
                to="/newNote"
                header="+ Create New Note"
                text="Enter a note and upload filed to the cloud"
              />
            </ListGroup>
          </div>
        </div>
      </div>
    )
  }
  render() {
    return (
      <div className="Home">
        {this.props.isAuthenticated ? this.renderNotes() : this.renderLander()}
      </div>
    )
  }
}
