import React, { useState } from 'react';
import './App.css';
import MeatDishes from './components/MeatDishes';
import VegetarianDishes from './components/VegetarianDishes';
import { calculateIngredients } from './utils/calculateIngredients';

const ingredientsMap = {
  kycklingTikka: { chicken: 200, currySauce: 100, rice: 150 },
  fläskfile: { pork: 200, cream: 100, potatoes: 150 },
  kycklingCouscous: { chicken: 200, couscous: 100, feta: 50 },
  lax: { salmon: 200, lemon: 50, dill: 20 },
  carbonara: { pasta: 100, bacon: 150, cream: 100 },
  biff: { beef: 200, redWine: 50, potatoes: 150 },
  köttbullar: { beef: 150, breadcrumbs: 50, potatoes: 150 },
  lasagne: { pasta: 200, cheese: 100, tomatoSauce: 100 },
  rödbetsbiffar: { beets: 150, potatoes: 150, cream: 100 },
  padThai: { riceNoodles: 150, tofu: 100, peanuts: 50 },
  svamprisotto: { rice: 200, mushrooms: 150, broth: 100 },
  curry: { vegetables: 200, coconutMilk: 100, spices: 20 },
  falafel: { chickpeas: 150, tahini: 50, salad: 100 },
  quinoasallad: { quinoa: 200, halloumi: 100, vegetables: 100 },
};

function App() {
  const [totalIngredients, setTotalIngredients] = useState({});

  const HandleSubmit = (e) => {
    e.preventDefault();

    const newMeatDishes = {
      kycklingTikka: parseInt(e.target.kycklingTikka.value) || 0,
      fläskfile: parseInt(e.target.fläskfile.value) || 0,
      kycklingCouscous: parseInt(e.target.kycklingCouscous.value) || 0,
      lax: parseInt(e.target.lax.value) || 0,
      carbonara: parseInt(e.target.carbonara.value) || 0,
      biff: parseInt(e.target.biff.value) || 0,
      köttbullar: parseInt(e.target.köttbullar.value) || 0,
    };

    const newVegetarianDishes = {
      lasagne: parseInt(e.target.lasagne.value) || 0,
      rödbetsbiffar: parseInt(e.target.rödbetsbiffar.value) || 0,
      padThai: parseInt(e.target.padThai.value) || 0,
      svamprisotto: parseInt(e.target.svamprisotto.value) || 0,
      curry: parseInt(e.target.curry.value) || 0,
      falafel: parseInt(e.target.falafel.value) || 0,
      quinoasallad: parseInt(e.target.quinoasallad.value) || 0,
    };

    // Calculate total ingredients for both meat and vegetarian dishes
    const totalIngredients = calculateIngredients(
      { ...newMeatDishes, ...newVegetarianDishes },
      ingredientsMap
    );

    setTotalIngredients(totalIngredients);
  };

  return (
    <div className="MainContent">
      <form onSubmit={HandleSubmit}>
        <div className="Header">
          <h1>Leffes Matlådor</h1>
        </div>

        <MeatDishes />
        <VegetarianDishes />

        <button className="SubmitButton">Submit</button>
      </form>

      <div className="Results">
        <h2>Total Ingredients Required:</h2>
        <ul>
          {Object.entries(totalIngredients).map(([ingredient, amount]) => (
            <li key={ingredient}>
              {ingredient}: {amount} gram
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
