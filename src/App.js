import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import foods from './foods.json';
import FoodBox from './foodbox/FoodBox';
import Search from './search/Search';
import './App.css';

const App = () => {
  const [foodsState, updateFoodsState] = useState({
    foods,
    totalCalories: 0,
  });
  const [showingState, updateShowingState] = useState({
    showing: false,
  });

  const refreshCals = (array) => {
    let calSum = 0;
    array.foods.forEach((food) => {
      calSum += food.calories * food.quantity;
    });
    array.totalCalories = calSum;
  };

  const searchFoods = (e) => {
    let input = e.target.value;
    let newFoods = foods.filter((f) => {
      return f.name.toLowerCase().includes(input.toLowerCase());
    });

    updateFoodsState({
      foods: newFoods,
    });
  };

  const incFood = (foodIndex) => {
    let newFoodsState = JSON.parse(JSON.stringify(foodsState));
    newFoodsState.foods[foodIndex].quantity++;
    refreshCals(newFoodsState);
    updateFoodsState(newFoodsState);
  };

  const addFood = (e) => {
    e.preventDefault();
    let newFood = {
      name: e.target.name.value,
      calories: e.target.calories.value,
      image: e.target.image.value,
      quantity: 0,
    };
    let newFoods = [...foods];
    newFoods.unshift(newFood);
    updateFoodsState({
      foods: newFoods,
    });
    console.log(newFood);
    updateShowingState({
      showing: false,
    });
  };
  const showAdd = () => {
    updateShowingState({
      showing: true,
    });
  };
  const deleteFood = (index) => {
    let newFoodsState = JSON.parse(JSON.stringify(foodsState));
    newFoodsState.foods[index].quantity = 0;
    refreshCals(newFoodsState);
    updateFoodsState(newFoodsState);
  };
  return (
    <div className="App">
      <h1>IronNutrition</h1>
      <Search onSearch={searchFoods} />
      {showingState.showing ? (
        <form id="add-food" onSubmit={addFood}>
          <h2>Add a new food</h2>
          <div id="inputs">
            <label>Name</label>
            <input className="input" type="text" name="name"></input>
            <label>Calories</label>
            <input className="input" type="number" name="calories"></input>
            <label>Image</label>
            <input className="input" type="file" name="image"></input>
          </div>
          <input type="submit" value="Add Food" />
        </form>
      ) : (
        <button onClick={showAdd}>Add Food</button>
      )}
      <main>
        <div className="foods">
          {foodsState.foods.map((f, i) => {
            return <FoodBox food={f} onInc={incFood} key={f.name} index={i} />;
          })}
        </div>
        <div id="right-sec">
          <h3>Today's Foods</h3>
          <div>
            {foodsState.foods.reduce((acc, elem, index) => {
              if (elem.quantity !== 0) {
                acc.push(
                  <p>
                    {elem.quantity} {elem.name} ={' '}
                    {elem.calories * elem.quantity} cal{' '}
                    <button onClick={() => deleteFood(index)}>x</button>
                  </p>
                );
              }
              return acc;
            }, [])}
          </div>
          <div>
            <p>Total Calories: {foodsState.totalCalories}</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
