import React, { Component } from 'react';

import Aux from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';


const INGREDIENT_PRICES = {
         salad: 0.60,
         bacon: 0.70,
         cheese: 0.50,
         meat: 1.00
};
class BurgerBuilder extends Component{
 state = {
     ingredients:{
         salad: 0.00,
         bacon: 0.00,
         cheese: 0.00,
         meat: 0.00
     },
     price: 0.00,
     purchasable: false,
     isOrdered: false
 };
 updatePurchasableState = (ingredients) => {
     const sum = Object.keys(ingredients)
     .map(igKey => {
         return ingredients[igKey];
     })
     .reduce((sum, el) =>{
         return sum + el;
     }, 0);
    this.setState( {purchasable: sum > 0});
    
 };

 addIngredientHandler = (type) =>{
   const oldCount = this.state.ingredients[type];
   const updatedCount = oldCount + 1;
   const oldPrice = this.state.price;
   const newPrice = (INGREDIENT_PRICES[type] + oldPrice);
   const immutableIngredients = {
       ...this.state.ingredients
   };
   immutableIngredients[type] = updatedCount;
   this.setState({ingredients: immutableIngredients, price: newPrice});
   this.updatePurchasableState(immutableIngredients);
   //console.log('Burger price is: ', newPrice);
 };

 removeIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount - 1;
    const oldPrice = this.state.price;
        if(oldCount <= 0){
            return;
        }
        const newPrice = (oldPrice - INGREDIENT_PRICES[type])
        const immutableIngredients = {
            ...this.state.ingredients
        };
        immutableIngredients[type] = updatedCount;
        this.setState({ingredients: immutableIngredients, price: newPrice});
        //console.log('Burger price is : ', newPrice);
        this.updatePurchasableState(immutableIngredients);
   
    
 };

 showOrderSummaryHandler = () => {
  this.setState({isOrdered: true});
 };
 hideOrderSummaryHandler = () => {
    this.setState({isOrdered: false});
 };
 purchaseContinueHandler = () =>{
  alert('Your burger is ordered!');
 };
   render(){
       const disabledInfo = {
           ...this.state.ingredients
       };
       for(let key in disabledInfo){
           disabledInfo[key] = disabledInfo[key] <=0;
       }
       return(
           <Aux>
               <Modal ordered={this.state.isOrdered}
               modalClosed={this.hideOrderSummaryHandler}>
                   <OrderSummary 
                   ingredients={this.state.ingredients}
                   purchaseCanceled={this.hideOrderSummaryHandler}
                   purchaseContinued={this.purchaseContinueHandler}
                   price={this.state.price}
                   />
               </Modal>
               <Burger ingredients={this.state.ingredients} />
               <BuildControls 
               order= {this.showOrderSummaryHandler}
               addIngredient={this.addIngredientHandler} 
               removeIngedient={this.removeIngredientHandler}
               disabledInfo={disabledInfo}
               price={this.state.price}
               purchasable={this.state.purchasable}
               />
           </Aux>
       );
   }
}

export default BurgerBuilder;