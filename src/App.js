import React from 'react';
import { Modal, 
  Button, Card, 
  Container, Row, Col,
  Form
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTimes } from '@fortawesome/free-solid-svg-icons'

import './App.css';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      notes: props.notes ,
      show: false,
      title: '',
      content: ''
    }
    this.submitNote = this.submitNote.bind(this);
    this.updateNote = this.updateNote.bind(this);

  }


  handleClose = () => {
    this.setState( {show: false});
  }
  handleShow = (type) => {
    if (type === 'new'){
      this.setState({id: 0, title: '', content: '', modalTitle: 'Create a New'});
    }
    this.setState({show: true});
  };

  changeTitle = (event) => {
    this.setState({
      title: event.target.value
    });
  }

  changeContent = (event) => {
    this.setState({
      content: event.target.value
    });
  }

  updateNote = (note, index, event) => {
    event.preventDefault();
    this.setState({
      id: note.id,
      title: note.title,
      content: note.content, 
      show: true,
      modalTitle: 'Update'
    });
  }

  removeCard = (event, note) => {
    event.preventDefault();
    this.allNotes = [...this.state.notes];
    const noteIndex = this.allNotes.indexOf(note);
    this.allNotes.splice(noteIndex, 1);
    this.setState({
      notes:  this.allNotes
    });
  }
  
  submitNote = (event) => {
    event.preventDefault();
    this.filteredNotes = this.state.notes.filter((note) => note.id === this.state.id);
    if (this.filteredNotes.length > 0) {
      this.updatedNotes = this.state.notes.map((note) => {
        if (note.id === this.state.id) {
          note.title = this.state.title;
          note.content = this.state.content;
        }
        return note;
      })
    } else {
      this.updatedNotes =  [...this.state.notes, {
        id: this.state.notes[this.state.notes.length - 1] ? this.state.notes[this.state.notes.length - 1].id + 1 : 1,
        title: this.state.title || 'Untitled Title', 
        content: this.state.content || 'Untitled Content'
      }];
    }
    this.setState({
      notes: this.updatedNotes,
      title: '',
      content: '',
      show: false
    });
    
  }

  
  render(){
    return (
      <>
      <Container>
        <h4> Welcome to Notes App</h4>
        <Row>
          {this.state.notes.map((note, i )=> {
            return <Col xs={6} md={3} key={i}>
              <Card className="text-center" key={i} >
                <div className="close-icon text-danger" onClick={ (e) => this.removeCard(e, note)}>
                  <FontAwesomeIcon icon={faTimes} />      
                </div >
                <Card.Body onClick={(e) => this.updateNote(note, i, e)}>
                  <Card.Title>{note.title}
                  </Card.Title>
                  <Card.Text>
                    {note.content}
                  </Card.Text>
                </Card.Body>
                <Card.Footer className="text-muted">2 days ago</Card.Footer>
              </Card>
            </Col>
          })}
        </Row>
        <Col xs={6} md={3}>
          <Button onClick={ () => this.handleShow('new')}>
          <FontAwesomeIcon icon={faPlus} />  New Note</Button>
        </Col>
      </Container>


      <Modal show={this.state.show} onHide={this.handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>{this.state.modalTitle} Note</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form  onSubmit={this.submitNote}>
            <Form.Group>
              <Form.Label>Title :-</Form.Label>
              <Form.Control as="textarea" rows="1" name="title" value={this.state.title} onChange={this.changeTitle}>
              </Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Content :-</Form.Label>
              <Form.Control as="textarea" rows="3" name="content" value={this.state.content} onChange={this.changeContent}>
              </Form.Control>
            </Form.Group>
            <Button variant="secondary" onClick={this.handleClose}>
              Close
            </Button>
            <Button variant="primary" type="submit">
              Save Changes
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
      </>
    )
  }
}
// function App(props){
//   const notes = props.notes;
//   this.state = {
//     notes: [{title: '', content: ''}],
//     show: false
//   }

//   const handleClose = () => {
//     this.setState({show: false});
//   }
//   const handleShow = () => {
//     this.setState({show: true});
//   };

//   return (
//     <>
//       {notes.map((note)=> {
//         return <Card className="text-center">
//           <Card.Body>
//             <Card.Title>{note.title}</Card.Title>
//             <Card.Text>
//               {note.content}
//             </Card.Text>
//           </Card.Body>
//         </Card>
//       })}

//       <Button onClick={handleShow}>Add</Button>
//       <Modal show={this.state.show} onHide={handleClose} centered>
//         <Modal.Header closeButton>
//           <Modal.Title>Creat a New Nots</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <form>
//             <input type="text" name="title"></input>
//             <textarea name="content"></textarea>
//           </form>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={handleClose}>
//             Close
//           </Button>
//           <Button variant="primary" onClick={handleClose}>
//             Save Changes
//           </Button>
//         </Modal.Footer>
//       </Modal>

//     </>
//   )
// }


// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

export default App;
