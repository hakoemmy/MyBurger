import React, { Component } from 'react';

import Aux from '../Auxiliary/Auxiliary';
import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
class Layout extends Component{
  state ={
    showSideDrawer: false
  }

  sideDrawerClosedHandler = () =>{
    this.setState({showSideDrawer: false});
  }
  sideDrawerToggleHandler = () =>{
    this.setState((prevSate) => {
      return {showSideDrawer: !prevSate.showSideDrawer};
    });
  };

  render(){
    return (
      <Aux>
      <div>
        <Toolbar 
        drawerToggleClicked={this.sideDrawerToggleHandler}
        open={this.state.showSideDrawer}
        />
        <SideDrawer 
        open={this.state.showSideDrawer}
        closed={this.sideDrawerClosedHandler}/>
      </div>
      <main className={classes.Content}>
          {this.props.children}
      </main>
      </Aux>
    );
  }

};
 

export default Layout;