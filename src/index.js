// import modules
import React, { Component } from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Row, Col, ListGroup, ListGroupItem, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

// declare initial state
let initialState = {
    contact1: {
        name: 'joe',
        email: 'joe@gmail.com',
        phone: '1231231234'
    }, 
    contact2: {
        name: 'jane',
        email: 'jane@gmail.com',
        phone: '8908908900',
    },
    contactName: '',
    contactEmail: '',
    contactPhone: '',
    display1: false,
    display2: false
}

// create reducer
const reducer = (state = initialState, action) => {
    switch(action.type) {
        case 'c1':
            return {...state, 
                contactName: state.contact1.name, 
                contactEmail: state.contact1.email, 
                contactPhone: state.contact1.phone, 
                display1: true,
                display2: false
            }
        case 'c2':
            return {...state, 
                contactName: state.contact2.name, 
                contactEmail: state.contact2.email, 
                contactPhone: state.contact2.phone, 
                display2: true,
                display1: false
            }
        case 'setNameValue':
            return {...state, 
                contactName: action.userName
            }
        case 'setEmailValue':
            return {...state, 
                contactEmail: action.userEmail
            }
        case 'setPhoneValue':
            return {...state, 
                contactPhone: action.userPhone
            }
        case 'updateC1':
            return {...state, 
                contact1: {
                    name: state.contactName,
                    email: state.contactEmail,
                    phone: state.contactPhone
                }
            }
        case 'updateC2':
            return {...state, 
                contact2: {
                    name: state.contactName,
                    email: state.contactEmail,
                    phone: state.contactPhone
                }
            }
        default:
            return state;
    }
}

// create store
let store = createStore(reducer);

// contact form
class ContactForm extends Component {
    render() {
        return (
            <Form>
                <FormGroup>
                    <Label for="exampleName">Name</Label>
                    <Input 
                        value={store.getState().contactName}
                        onChange={(e) => store.dispatch({type: 'setNameValue', userName: e.target.value})}
                        type="text" 
                        name="userName" 
                        id="exampleName" 
                        placeholder="name..." />
                </FormGroup>
                <FormGroup>
                    <Label for="exampleEmail">Email</Label>
                    <Input
                        value={store.getState().contactEmail}  
                        onChange={(e) => store.dispatch({type: 'setEmailValue', userEmail: e.target.value})}                       
                        type="email" 
                        name="userEmail" 
                        id="exampleEmail" 
                        placeholder="email..." />
                </FormGroup>
                <FormGroup>
                    <Label for="examplePhone">Phone</Label>
                    <Input 
                        value={store.getState().contactPhone}     
                        onChange={(e) => store.dispatch({type: 'setPhoneValue', userPhone: e.target.value})}                   
                        type="tel"
                        name="userPhone" 
                        id="examplePhone" 
                        placeholder="phone..." />
                </FormGroup>
                {store.getState().display1 && (
                    <Button onClick={() => store.dispatch({type: 'updateC1' })}>Update</Button>
                )}
                {store.getState().display2 && (
                    <Button onClick={() => store.dispatch({type: 'updateC2'})}>Update</Button>
                )}
            </Form>
        )
    }
}

// contact list
class ContactList extends Component {
    render() {
        return(
            <div>
                <Row>
                    <Col lg="4">
                        <h2>Contact List</h2> 
                        <ListGroup>
                            <ListGroupItem>
                                <h4 onClick={() => store.dispatch({type: 'c1'})}>{store.getState().contact1.name}</h4>
                            </ListGroupItem>
                            <ListGroupItem>
                                <h4 onClick={() => store.dispatch({type: 'c2'})}>{store.getState().contact2.name}</h4>
                            </ListGroupItem>
                        </ListGroup>                   
                    </Col>
                    <Col lg="8">
                        <h2>Contact Form</h2>                        
                        <ContactForm />
                    </Col>
                </Row>
            </div>
        )
    }
}

// render
const r = () => {
    render(
        <ContactList />,
        document.getElementById('root')
    )
}

r();

// listen in for changes to the state
store.subscribe(r)






