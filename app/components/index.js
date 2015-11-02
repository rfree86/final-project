import React from 'react';
import { Link, IndexLink } from 'react-router';
import store from '../store';
import { History } from 'react-router';
import BackboneMixin from '../mixins/backbone';


var Index = React.createClass({

  mixins: [History, BackboneMixin],

  getModels(){
    return {
      bulletin: store.getBulletins()
    }
},

    componentWillMount(){
      store.fetchBulletins();
    },



  render() {
      let bulletins = this.state.bulletin
      let session= store.getSession();
      let currentUser = session.currentUser;
      let username = (currentUser && currentUser.first_name)
    return (
      <div>
      <h6 className="welcome">Welcome {username}</h6>
      <h1 className="bulletinBoard">Bulletin Board</h1>
        <ul>
          {bulletins.map((b)=>{
            return(
            <li className="bulletinLines" key={b.objectId}>{b.title}<hr className="bulletinHR" />
            <p>{b.message}</p>
            <span className="bulletinSpan"><i>Contact</i>: {b.contact_person}<br />
            <i>Best number to reach</i>: {b.contact_phone}<br />
            <i>Best email</i>: {b.contact_email}</span>
            </li>
          )}
        )}
        </ul>
      </div>
    );
  }

});

export default Index;
