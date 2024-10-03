import React, { useState, useEffect } from 'react';
import './Ordering.css';
import { useNavigate } from 'react-router-dom';
import leffeslogo from './img/leffelogo.png';

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

function Calculator() {
  const [totalIngredients, setTotalIngredients] = useState({});
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isFading, setIsFading] = useState(false);
  const [intervalId, setIntervalId] = useState(null); 

  useEffect(() => {
    let timeout;
    if (isVisible && progress < 100) {
      const id = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(id);
            return 100; 
          }
          return prev + 1.9;
        });
      }, 50);
      setIntervalId(id);

   
    
      return () => clearInterval(id); 
    } else if (progress >= 100) {
      setIsFading(true);
      timeout = setTimeout(() => {
        setIsVisible(false);
        setIsFading(false);
        setProgress(0);
      }, 2000); 
    }

    return () => clearTimeout(timeout); 
  }, [isVisible, progress]);

  const handleStartProgress = () => {
    setIsVisible(true); 
    setProgress(0); 
    setIsFading(false); 
  };
  const navigate = useNavigate();

  const handleHistory = () => {
    navigate('/leffes/history');
  };

  const handleSubmit = (e) => {
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

    const calculatedIngredients = {}; 
    const addIngredients = (dishes) => {
      for (const [dish, quantity] of Object.entries(dishes)) {
        if (quantity > 0) {
          const ingredients = ingredientsMap[dish];
          for (const [ingredient, amount] of Object.entries(ingredients)) {
            calculatedIngredients[ingredient] = (calculatedIngredients[ingredient] || 0) + amount * quantity;
          }
        }
      }
    };

    addIngredients(newMeatDishes);
    addIngredients(newVegetarianDishes);
    setTotalIngredients(calculatedIngredients);
  };

  return ( 
    <div className="MainContent">
  <div className="Header">
    <img src={leffeslogo} alt="Leffes Logo" />
  </div>
  
  <button className='HistoryButton' onClick={handleHistory}>Order History</button>

  <form onSubmit={handleSubmit}>
    <div className="DishContainer">
      <div className='Meat' id="meat">
        <h2>Meat Dishes</h2>
        <div className='Input1'>
          <h3>Kyckling Tikka Masala</h3>
          <input type="number" name="kycklingTikka" />
        </div>
        <div className='Input2'>
          <h3>Fläskfilé med gräddsås och potatisgratäng</h3>
          <input type="number" name="fläskfile" />
        </div>
        <div className='Input3'>
          <h3>Kyckling med couscous och fetaost</h3>
          <input type="number" name="kycklingCouscous" />
        </div>
        <div className='Input4'>
          <h3>Lax i ugn med citron och dill</h3>
          <input type="number" name="lax" />
        </div>
        <div className='Input5'>
          <h3>Spaghetti Carbonara</h3>
          <input type="number" name="carbonara" />
        </div>
        <div className='Input6'>
          <h3>Biff med rödvinssås och rostad potatis</h3>
          <input type="number" name="biff" />
        </div>
        <div className='Input7'>
          <h3>Köttbullar med potatis</h3>
          <input type="number" name="köttbullar" />
        </div>
      </div>

      <div className='Vegetarian' id="vegetarian">
        <h2>Vegetarian Dishes</h2>
        <div className='Input1'>
          <h3>Vegetarisk lasagne</h3>
          <input type="number" name="lasagne" />
        </div>
        <div className='Input2'>
          <h3>Rödbetsbiffar med potatismos</h3>
          <input type="number" name="rödbetsbiffar" />
        </div>
        <div className='Input3'>
          <h3>Vegetarisk Pad Thai</h3>
          <input type="number" name="padThai" />
        </div>
        <div className='Input4'>
          <h3>Svamprisotto</h3>
          <input type="number" name="svamprisotto" />
        </div>
        <div className='Input5'>
          <h3>Grönsakscurry med kokosmjölk</h3>
          <input type="number" name="curry" />
        </div>
        <div className='Input6'>
          <h3>Falafel med bulgur och tahinisås</h3>
          <input type="number" name="falafel" />
        </div>
        <div className='Input7'>
          <h3>Quinoasallad med grillad halloumi</h3>
          <input type="number" name="quinoasallad" />
        </div>
      </div>

      <div className='Results'>
        <h2>Total Ingredients Required:</h2>
        <ul>
          {Object.entries(totalIngredients).map(([ingredient, amount]) => {
            let displayAmount;

            if (amount >= 1000000) {
              displayAmount = (amount / 1000000).toFixed(1) + " tonne"; 
            } else if (amount >= 1000) {
              displayAmount = (amount / 1000).toFixed(1) + " kilo";
            } else {
              displayAmount = amount + " gram";
            }

            return <li key={ingredient}>{ingredient}: {displayAmount}</li>;
          })}
        </ul>
      </div>
    </div>
    <div className="ButtonContainer">
  <button className='SubmitButton'>Submit</button>
  <button className='BuyButton'>Buy</button>
</div>
  </form>
</div>


  );
  
  
}

export default Calculator;