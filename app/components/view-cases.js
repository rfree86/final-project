import React from 'react';
import store from '../store';
import Case from '../models/case';


const ViewCases = React.createClass({
  propTypes: {
    case: React.PropTypes.object
  },

  getDefaultProps() {
    return {
      case: store.getCaseCollection()
    }
  },

  componentWillMount() {
    this.props.case.fetch();
    this.props.case.on('sync add remove', null, this);
  },

  componentWiilUnMount() {
    this.props.case.off('sync add remove', null, this);
  },

  render() {
    var cases = this.props.case.toJSON();

    return (
      <div>
        <ul>
          {cases.map((c) =>
          <li key={c.objectId}>
            {c.last_name}
          </li>
        )}
        </ul>
      </div>
    )
  }

});
export default ViewCases;
