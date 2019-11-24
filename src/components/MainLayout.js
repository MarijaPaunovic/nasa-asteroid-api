import React from 'react';

const layoutStyle = {
  margin: 20,
  padding: 20,
  border: '1px solid #DDD',
}

// const Layout = (props) => (
//   <div style={layoutStyle}>
//     {props.children}
//   </div>
// )

// export default Layout;



const Layout = (props) => {
  return (
    <div style={layoutStyle}>
    {props.children}
  </div>
  );
};
export default Layout;