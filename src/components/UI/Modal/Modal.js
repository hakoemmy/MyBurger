import React, { Component } from 'react';

import classes from './Modal.css';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import Backdrop from '../Backdrop/Backdrop';
class Modal extends Component{
  shouldComponentUpdate(nextProps, nextState){
    return this.props.ordered !== nextProps.ordered; 
  }

  componentDidUpdate(){
    console.log('[Modal.js] DidUpdate');
  }
  render(){
     return(
  <Aux>
      <Backdrop show={this.props.ordered}
      clicked = {this.props.modalClosed}
      />
     <div  
     className={classes.Modal} 
     style={{
       transform: this.props.ordered? 'translateY(0)': 'translateY(100vh)',
       opacity: this.props.ordered? 1: 0
     }}>
         {this.props.children}
     </div>
</Aux>
     );
  }
}

export default Modal;