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
      <h1>Welcome {username}</h1>
      <h4 className="bullitenBoard">Bulletin Board</h4>
        <ul>
          {bulletins.map((b)=>{
            return(
            <li key={b.objectId}>{b.message}{b.creator.email}</li>
          )}
        )}
        </ul>
      </div>
    );
  }

});

export default Index;
