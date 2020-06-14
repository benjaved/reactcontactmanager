import React, { Component } from 'react'
import propType from 'prop-types'
import {Consumer} from '../../Context'
import {Link} from 'react-router-dom'
export default class Contact extends Component {
    state={
        showContactInfo: false
    };

    onShowClick=()=>
    {
        this.setState({showContactInfo:!this.state.showContactInfo})
    }
    deletecontactinfo=(id,dispatch)=>
    {
        dispatch({type:'DELETE_CONTACT',payload:id})
    }

    render() {
        const{id,name,email,phone}=this.props.contact;
        const {showContactInfo}=this.state;
        
        return (
            <Consumer>
                {
                    value =>{
                        const {dispatch}=value;
                        return(
                        <div className="card card-body mb-3">
                <h4>{name} <i className="fas fa-sort-down" style={{cursor:'pointer'}} onClick={this.onShowClick}></i>
                <i className="fas fa-times" style={{float:'right',color:'red',cursor:'pointer'}} onClick={this.deletecontactinfo.bind(this,id,dispatch)}></i>
                <Link to={`contact/edit/${id}`}>
                    <i className="fas fa-pencil-alt" 
                    style={{float:'right',color:'black',cursor:'pointer',marginRight:'1rem'}}></i>
                </Link>
                </h4>
                {showContactInfo?(<ul className="list-group">
                    <li className="list-group-item">Email: {email}</li>
                    <li className="list-group-item">Phone: {phone}</li>
                </ul>):null}
                
            </div> )
                    }
                }
            </Consumer>
            
        )
    }
}

Contact.propType={
    contact:propType.object.isRequired,
    deleteconatct:propType.func.isRequired
}