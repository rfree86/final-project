import React from 'react';
import store from '../store';
import { Link } from 'react-router';
import { History } from 'react-router';



const NewBulletin = React.createClass({

 mixins: [ History ],

 getInitialState() {
   return {
     bulletin: {}
   };
 },

 handleSubmit(e) {
   e.preventDefault();
   var bulletin= store.createBulletins({
     title: this.refs.title.value,
     message: this.refs.message.value,
     contact_person: this.refs.contact_person.value,
     contact_phone: this.refs.contact_phone.value,
     contact_email: this.refs.contact_email.value,

   });
 },

 render() {
   return (
     <form onSubmit={this.handleSubmit}>
       <h1>New Bulletin</h1>
       <input type="text" ref="title" placeholder="title" />
       <textarea cols="30" rows="10" ref="message" placeholder="describe event here" />
       <input type="text" ref="contact_person" placeholder="Best person to contact" />
       <input type="text" ref="contact_phone" placeholder="Best person's phone" />
       <input type="text" ref="contact_email" placeholder="Best person's email" />
       <button type="submit">Submit</button>
     </form>
   )
 }

});
export default NewBulletin;
