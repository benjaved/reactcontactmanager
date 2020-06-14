import React, { Component } from 'react';
import {Consumer} from '../../Context';
import TextInputgroup from '../layout/TextInputgroup';
//import {v1 as uuid} from 'uuid';
import axios from 'axios';


export default class AddContact extends Component {
    
    state = {
        name:'',
        email:'',
        phone:'',
        errors:{}
    }
    onSubmit =async (dispatch,e) => {
        e.preventDefault();
        const {name,email,phone}=this.state;
        if(name===''){
            this.setState({errors:{name:'Name is required'}});
            return;
        }
        if(email===''){
            this.setState({errors:{email:'Email is required'}});
            return;
        }
        if(phone===''){
            this.setState({errors:{phone:'Phone is required'}});
            return;
        }
        const newContact ={
         //   id: uuid(),
            name,
            email,
            phone
        };

        const res= await axios.post('https://jsonplaceholder.typicode.com/users',newContact);
        dispatch({type:'ADD_CONTACT',payload: res.data});
        //clear state
        this.setState({
            name:'',
            email:'',
            phone:'',
            errors:{}
        });

        this.props.history.push('/');
    };

    onChange=e=>
    {
        this.setState({
            [e.target.name]:e.target.value
        });
    };
    render() {
       
        return(
            <Consumer>
            { value => {
                const {dispatch}=value;
                const {name,email,phone,errors}=this.state;
                return(
                    <div className="card mb-3">
                <div className="card-header">Add Contact</div>
                <div className="card-body">
                    <form onSubmit={this.onSubmit.bind(this,dispatch)}>
                        <TextInputgroup 
                        label="Name"
                        name="name"
                        placeholder="enter your name..."
                        value={name}
                        onChange={this.onChange}
                        error={errors.name}
                        />
            
                        <TextInputgroup 
                        label="Email"
                        name="email"
                        type="email"
                        placeholder="enter your mail..."
                        value={email}
                        onChange={this.onChange}
                        error={errors.email}
                        />
                            <TextInputgroup 
                        label="Phone"
                        name="phone"
                        placeholder="enter your phone no..."
                        value={phone}
                        onChange={this.onChange}
                        error={errors.phone}
                        />
                        
                        <input type="submit" value="Add Contact" className="btn btn-primary btn-block" />
                    </form>
                </div>
            </div>
                )
            }}
            </Consumer>
        )

    }
}
