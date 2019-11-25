import React from 'react';

const Layout = (props) => {
  return (
    <div style={layoutStyle}>
    {props.children}
  </div>
  );
};

const layoutStyle = {
  margin: 20,
  padding: 20,
  border: '1px solid #DDD',
}

export default Layout;