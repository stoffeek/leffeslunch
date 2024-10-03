import React, { useState, useEffect } from 'react';
import './Ordering.css';
import { useNavigate } from 'react-router-dom';
import leffeslogo from './img/leffelogo.png';

const API_URL = 'http://localhost:5001/api';

export const fetchProducts = async () => {
  try {
    const response = await fetch(`${API_URL}/products`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (!response.ok) {
      throw new Error('Failed to fetch products: ' + response.statusText);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching products: ', error);
    throw error;
  }
}
export const fetchIngredients = async () => {
  try {
    const response = await fetch(`${API_URL}/ingredients`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (!response.ok) {
      throw new Error('Failed to fetch products: ' + response.statusText);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching products: ', error);
    throw error;
  }
}
export const fetchRecipe = async () => {
  try {
    const response = await fetch(`${API_URL}/recipe`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (!response.ok) {
      throw new Error('Failed to fetch products: ' + response.statusText);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching products: ', error);
    throw error;
  }
}
export const createIngredientsMap = async () => {
  try {
    const products = await fetchProducts();
    const ingredientsMap = await fetchIngredients;
    products.forEach((product) => {
      const { name, ingredients } = product;
      ingredientsMap[name] = {};
      ingredients.forEach((ingredient) => {
        ingredientsMap[name][ingredient.name] = ingredient.quantity;
      });
    });
    return ingredientsMap;
  } catch (error) {
    console.error('Error creating ingredients map', error);
    throw error;
  }
}

function Calculator() {
  const [totalIngredients, setTotalIngredients] = useState({});
  const [ingredientsMap, setIngredientsMap] = useState({});
  const [products, setProducts] = useState([]); // State for all products
  const navigate = useNavigate();

  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        const map = await createIngredientsMap();
        setIngredientsMap(map);
      } catch (error) {
        console.error('Error fetching ingredients map: ', error);
      }
    };

    const fetchDishes = async () => {
      try {
        const products = await fetchProducts();
        setProducts(products);
      } catch (error) {
        console.error('Error fetching dishes: ', error);
      }
    };

    fetchIngredients();
    fetchDishes();
  }, []);

  const handleHistory = () => {
    navigate('/leffes/history');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newDishes = {};
    
    products.forEach((product) => {
      newDishes[product.name] = parseInt(e.target[product.name].value) || 0;
    });

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

    addIngredients(newDishes);
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
          <div className='Dishes' id="dishes">
            <h2>Available Dishes</h2>
            {products.map((product) => (
              <div key={product.name}>
                <label htmlFor={product.name}>{product.name}</label>
                <input type="number" id={product.name} name={product.name} min="0" />
              </div>
            ))}
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
          <button type="button" className='BuyButton'>Buy</button>
        </div>
      </form>
    </div>
  );
}

export default Calculator;
