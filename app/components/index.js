import React from 'react';
import { Link, IndexLink } from 'react-router';
import store from '../store';
import { History } from 'react-router';
import BackboneMixin from '../mixins/backbone';
import Mailto from 'react-mailto';
import _ from 'underscore';
import moment from 'moment';


var Index = React.createClass({

  mixins: [History, BackboneMixin],


//get the collection of bulletins from bulletinCollection
    componentWillMount(){
      store.fetchBulletins();
    },

//listen from any changes to the bulletin collection
    getModels(){
      return {
        bulletin: store.getBulletins()
      }
  },
//bulletins(var) is being sorted from newest to oldest based on the createdAt date in parse.
//session, currentUser, and username(var) are set to add customized infomration from the user's profile
  render() {
      let bulletins = this.state.bulletin;
      bulletins = _.sortBy(bulletins, 'createdAt').reverse();
      let session= store.getSession();
      let currentUser = session.currentUser;
      let username = (currentUser && currentUser.first_name);


    return (
      <div>
      <h6 className="welcome">Welcome {username}</h6>
      <h1 className="bulletinBoard">Bulletin Board</h1>
        <ul className="buttetin-ul">
          {bulletins.map((b)=>{
            return(
            <li className="bulletinLines" key={b.objectId}><span className="bulletin-title">{b.title}</span>
              <span className="bulletin-moment">{moment(b.createdAt).format('MM/DD/YYYY')}</span>
              <hr className="bulletinHR" />
                <p>{b.message}</p>
                  <span className="bulletinSpan"><i>Contact</i>: {b.contact_person}<br />
                  <i>Best number to reach</i>: {b.contact_phone}<br />
                  <Mailto email= {b.contact_email}><i>Email</i>: {b.contact_email}</Mailto></span>
            </li>
          )}
        )}
        </ul>
      </div>
    );
  }

});

export default Index;
