import React, { Component } from 'react';
import Contact from './Contact';
import {Consumer} from'../../Context';
export default class Contacts extends Component {
        
      /*  deletecontactevent=(id)=>
        {
               const contacts_temp=this.state.contacts.filter(contact=>contact.id!==id);
               this.setState(
                   { contacts:contacts_temp}
               )
        } */

        
        render() {

            return(
                <Consumer>
                {
                  value=>{
                    const {contacts}=value;
                        return(
                        <React.Fragment>
                            <h1 className="display-4 mb-2"><span className="text-danger">Contact</span> List</h1>
                        {contacts.map(contact=>
                        <Contact key={contact.id} contact={contact} />
                )}
                        </React.Fragment>
                            )
                        }
                    }
                </Consumer>
            )
        
                }       
}
