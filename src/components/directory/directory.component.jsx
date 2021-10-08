import React from 'react';

import Menu_Item_DB from '../../temp-db/menu-item-db';

import MenuItem from '../menu-item/menu-item.component';

import './directory.styles.scss';

class Directory extends React.Component {
  constructor() {
    super();

    this.state = Menu_Item_DB;
  }

  render() {
    return (
      <div className="directory">
        {this.state.sections.map(({ ...props }) => {
          return <MenuItem key={props.id} {...props} />;
        })}
      </div>
    );
  }
}

export default Directory;
