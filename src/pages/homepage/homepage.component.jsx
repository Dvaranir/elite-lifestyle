import React from 'react';

import Directory from '../../components/directory/directory.component';

import './homepage.styles.scss';

const HomePage = props => (
  <div className="homepage">
    <Directory {...props} />
  </div>
);

export default HomePage;
