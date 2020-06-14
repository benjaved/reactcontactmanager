import React, { Component } from 'react';
import axios from 'axios';
const Context = React.createContext();

const reducer = (state,action)=>
        {
            switch(action.type)
            {
                case 'DELETE_CONTACT':
                    return{
                        ...state,   
                        contacts: state.contacts.filter(contact =>contact.id!==action.payload)
                    }

                 case 'ADD_CONTACT':
                        return{
                            ...state,   
                            contacts:[action.payload,...state.contacts]
                        };
                case 'UPDATE_CONTACT':
                        return{
                            ...state,   
                            contacts: state.contacts.map(
                                contact => contact.id===action.payload.id?
                                (contact=action.payload):contact
                            )
                        };

                default:
                    return state;
            }
        }

export class Provider extends Component {
    
    state =
        {
           contacts: [
              /* {id:1,
                name:'Hayley Doe',
                email:'hayl@gmail.com',
                phone:'558-812-4561'
                },
                {   id:2,
                    name:'Henrey Williams',
                    email:'henry@gmail.com',
                    phone:'558-322-8596'
                    },
                 {      id:3,
                        name:'John Ray',
                        email:'john34@gmail.com',
                        phone:'553-859-6548'
                        } */
           ],
           dispatch: action => this.setState(state=> reducer(state,action))
        };

        async componentDidMount(){
            const res= await axios.get('https://jsonplaceholder.typicode.com/users');
            this.setState({contacts:res.data});
        }

    render() {
        return (
            <Context.Provider value={this.state}>
                {this.props.children}
            </Context.Provider>
        )
    }
}

export const Consumer=Context.Consumer;