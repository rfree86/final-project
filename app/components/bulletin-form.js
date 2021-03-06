import React from 'react';
import store from '../store';
import { Link } from 'react-router';
import { History } from 'react-router';



const NewBulletin = React.createClass({

 mixins: [ History ],
//set the inital state of the new bulletin as an empty object
 getInitialState() {
   return {
     bulletin: {}
   };
 },

//set the attribute values for the new bulletin and reroute the screen to the home page.
 handleSubmit(e) {
   e.preventDefault();
   var bulletin= store.createBulletins({
     title: this.refs.title.value,
     message: this.refs.message.value,
     contact_person: this.refs.contact_person.value,
     contact_phone: this.refs.contact_phone.value,
     contact_email: this.refs.contact_email.value,
   });
   this.history.pushState({}, "/");
 },

 handleCancel(e) {
   e.preventDefault();
   this.history.goBack();
 },

 render() {
   return (
    <div className="row">
      <div className="small-10 columns">
     <form onSubmit={this.handleSubmit}>
       <fieldset>
       <legend className="legend">New Bulletin</legend>
          <input type="text" ref="title" placeholder="title" />
          <textarea cols="30" rows="10" ref="message" placeholder="describe event here" />
          <input type="text" ref="contact_person" placeholder="Best person to contact" />
          <input type="text" ref="contact_phone" placeholder="Best person's phone" />
          <input type="text" ref="contact_email" placeholder="Best person's email" />

       <div className="button-bar">
          <ul className="button-group round">
            <li><button className="button success tiny" type="submit">Submit</button></li>
          </ul>

           <ul className="button-group round">
             <li><button className="button alert tiny" onClick={this.handleCancel}>Cancel</button></li>
           </ul>

         </div>

       </fieldset>
     </form>
     </div>
    </div>
   )
 }

});
export default NewBulletin;
