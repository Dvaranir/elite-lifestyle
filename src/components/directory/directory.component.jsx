import React from 'react';

import Menu_Item_DB from '../../temp-db/menu-item-db';
import directorySettings from './directory.settings';

import MenuItem from '../menu-item/menu-item.component';

import './directory.styles.scss';

class Directory extends React.Component {
  constructor() {
    super();

    this.state = Menu_Item_DB;
  }

  render() {
    const { directoryWidth, directoryHeight } = directorySettings;
    return (
      <div
        className="directory"
        style={{
          gridTemplateColumns: `${'1fr '.repeat(this.state.sections.length)}`,
          width: `${directoryWidth}rem`,
          height: `${directoryHeight}rem`,
        }}
      >
        {this.state.sections.map(({ ...props }) => {
          return <MenuItem key={props.id} {...props} />;
        })}
      </div>
    );
  }
}

export default Directory;
