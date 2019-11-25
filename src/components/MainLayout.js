import React from 'react';

const Layout = (props) => {
  return (
    <div style={layoutStyle}>
    {props.children}
  </div>
  );
};

const layoutStyle = {
  margin: '0 auto',
  marginTop: '20px',
  padding: '20px',
  border: '1px solid #DDD',
}

export default Layout;