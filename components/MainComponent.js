import React, { Component } from 'react';
import Menu from './MenuComponent';
import { DISHES } from '../shared/dishes';
import DishDetail from './DishDetail.js';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dishes: DISHES,
      selectedDish: null
    };
  }
  onDishSelect=(item)=>{
    this.setState({selectedDish:item});
  }

  render() {
 
    return (
        <>
        <Menu dishes={this.state.dishes} onDishSelect={this.onDishSelect}/>
        <DishDetail selectedDish={this.state.selectedDish} />
        </>
    );
  }
}
  
export default Main;