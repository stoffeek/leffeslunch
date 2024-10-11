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
        'Content-Type': 'application/json',
      },
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
};

export const fetchIngredients = async () => {
  try {
    const response = await fetch(`${API_URL}/ingredients`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error('Failed to fetch ingredients: ' + response.statusText);
    }
    const data = await response.json();
    return data; 
  } catch (error) {
    console.error('Error fetching ingredients: ', error);
    throw error;
  }
};

export const fetchRecipe = async () => {
  try {
    const response = await fetch(`${API_URL}/recipe`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error('Failed to fetch recipes: ' + response.statusText);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching recipes: ', error);
    throw error;
  }
};

export const createIngredientsMap = async (products, ingredients, recipes) => {
  const ingredientsMap = {};

  products.forEach((product) => {
    const productRecipes = recipes.filter(recipe => recipe.product_id === product.id);
    ingredientsMap[product.name] = {};

    productRecipes.forEach((recipe) => {
      const ingredient = ingredients.find(ingredient => ingredient.id === recipe.ingredient_id);
      if (ingredient) {
        console.log(`Matched ingredient for product ${product.name}: ${ingredient.name} (Amount: ${recipe.quantity_needed})`);
        ingredientsMap[product.name][ingredient.name] = recipe.quantity_needed;
      } else {
        console.error(`No ingredient found for product ${product.name} with ingredient ID ${recipe.ingredient_id}`);
      }
    });
  });

  return ingredientsMap;
};

function Calculator() {
  const [totalIngredients, setTotalIngredients] = useState({});
  const [totalPrice, setTotalPrice] = useState(0); 
  const [ingredientsMap, setIngredientsMap] = useState({});
  const [products, setProducts] = useState([]); 
  const [ingredients, setIngredients] = useState([]); 
  const [recipes, setRecipes] = useState([]); 
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [fetchedProducts, fetchedIngredients, fetchedRecipes] = await Promise.all([
          fetchProducts(),
          fetchIngredients(),
          fetchRecipe(),
        ]);

        setProducts(fetchedProducts);
        setIngredients(fetchedIngredients);
        setRecipes(fetchedRecipes);

        const map = await createIngredientsMap(fetchedProducts, fetchedIngredients, fetchedRecipes);
        setIngredientsMap(map);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    fetchData();
  }, []);

  const handleHistory = () => {
    navigate('/leffes/history');
  };

  const handleSales = () => {
    navigate('/leffes/sales');
  }

  const handleSubmit = (e) => {
    e.preventDefault();
  
    const newDishes = {};
  
    products.forEach((product) => {
      newDishes[product.name] = parseInt(e.target[product.name].value, 10) || 0;
    });
  
    const calculatedIngredients = {}; 
    let totalPrice = 0; 
  
    const addIngredients = (dishes) => {
      for (const [dish, quantity] of Object.entries(dishes)) {
        if (quantity > 0) {
          const ingredientsForDish = ingredientsMap[dish]; 
          if (ingredientsForDish) {
            for (const [ingredientName, amountPerDish] of Object.entries(ingredientsForDish)) {
              const ingredientData = ingredients.find(i => i.name === ingredientName);
              const totalAmountForDish = amountPerDish * quantity;
  
              calculatedIngredients[ingredientName] = (calculatedIngredients[ingredientName] || 0) + totalAmountForDish;
  
              if (ingredientData && ingredientData.price && ingredientData.quantity) {
                const pricePerUnit = ingredientData.price / ingredientData.quantity; 
                totalPrice += pricePerUnit * totalAmountForDish; 
              }
            }
          } else {
            console.error(`No ingredients found for dish: ${dish}`);
          }
        }
      }
    };
  
    addIngredients(newDishes);
    console.log('Calculated Ingredients:', calculatedIngredients);
    setTotalIngredients(calculatedIngredients);
    setTotalPrice(totalPrice); 
  };
  

  const handleBuy = async (e) => {
    e.preventDefault();
  
    console.log('Köper... skickar data:', totalIngredients);
    try {
      const response = await fetch(`${API_URL}/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ totalIngredients })
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log('Order placed successfully:', data);
        alert('Order placed successfully!');
  
        const form = e.target.closest('form');
        form.reset();
  
        setTotalIngredients({});
        setTotalPrice(0);
      } else {
        console.error('Failed to place order:', response.statusText);
      }
    } catch (error) {
      console.error('Error placing order:', error);
    }
  };

  return (
    <div className="MainContent">
      <div className="Header">
        <img src={leffeslogo} alt="Leffes Logo" />
      </div>

      <button className='HistoryButton' onClick={handleHistory}>Order History</button>
      <button className='HistoryButton' onClick={handleSales}>Sales</button>

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
            <h2>Total Ingredients Required</h2>
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
            <div className='Price'>
            <h3>Total Price: {totalPrice.toFixed(2)} SEK</h3>
            </div>
          </div>
        </div>
        <div className="ButtonContainer">
          <button className='SubmitButton'>Add to Cart</button>
          <button type="button" className='BuyButton' onClick={handleBuy}>Buy</button>
        </div>
      </form>
    </div>
  );
}

export default Calculator;
