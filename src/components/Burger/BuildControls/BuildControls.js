import React from 'react';

import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';
const controls = [
    {label: 'Salad', type: 'salad'},
    {label: 'Meat', type: 'meat'},
    {label: 'Cheese', type: 'cheese'},
    {label: 'Bacon', type: 'bacon'},
]

const buildControls = (props) => (
    <div className={classes.BuildControls}>
         <p>Current price:<strong> {props.price.toFixed(2)} $</strong></p>
     {controls.map(ctrl => (
         <BuildControl
          key={ctrl.label} 
          label={ctrl.label}
          added={() => props.addIngredient(ctrl.type)}
          removed={()=>props.removeIngedient(ctrl.type)}
          disabled={props.disabledInfo[ctrl.type]}
          />
     ) )}
     <button 
     className={classes.OrderButton}
     disabled={!props.purchasable}
     onClick={props.order}
     >ORDER NOW</button>
    </div>
);

export default buildControls;