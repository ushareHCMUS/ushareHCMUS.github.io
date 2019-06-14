import React from 'react';
import { Route } from 'react-router-dom';

import GroupList from './components/GroupList';
import GroupDetail from './components/GroupDetail';

const Group = ({ match }) => (
  <div>
    <Route exact path={`${match.url}`} component={GroupList} />
    <Route path={`${match.url}/:id`} component={GroupDetail} />
  </div>
);

export default Group;