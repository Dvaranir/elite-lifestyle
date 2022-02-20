import Menu_Items from '../../data/menu-items';

const reducer = (state = Menu_Items, action) => {
  switch (action.type) {
    case 'setMenuItems':
      return (state = action.payload);

    default:
      return state;
  }
};

export default reducer;
