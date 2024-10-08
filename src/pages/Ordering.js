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
        console.log(`Matchad ingrediens för produkt ${product.name}: ${ingredient.name} (Mängd: ${recipe.quantity_needed})`);
        ingredientsMap[product.name][ingredient.name] = recipe.quantity_needed;
      } else {
        console.error(`Ingen ingrediens hittades för produkt ${product.name} med ingrediens-ID ${recipe.ingredient_id}`);
      }
    });
  });

  return ingredientsMap;
};

function Calculator() {
  const [totalIngredients, setTotalIngredients] = useState({});
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

  const handleSubmit = (e) => {
    e.preventDefault();

    const newDishes = {};

    products.forEach((product) => {
      newDishes[product.name] = parseInt(e.target[product.name].value, 10) || 0;
    });

    const calculatedIngredients = {};
    const addIngredients = (dishes) => {
      for (const [dish, quantity] of Object.entries(dishes)) {
        if (quantity > 0) {
          const ingredients = ingredientsMap[dish]; 
          if (ingredients) {
            for (const [ingredient, amount] of Object.entries(ingredients)) {
              const ingredientQuantity = amount || 0; 
              calculatedIngredients[ingredient] = (calculatedIngredients[ingredient] || 0) + ingredientQuantity * quantity;
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
  };

  // Lägg till handleBuy för att hantera köp och skicka order till API
  const handleBuy = async () => {
    console.log('Köper... skickar data:', totalIngredients); // För debugging
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
          </div>
        </div>
        <div className="ButtonContainer">
          <button className='SubmitButton'>Submit</button>
          <button type="button" className='BuyButton' onClick={handleBuy}>Buy</button>
        </div>
      </form>
    </div>
  );
}

export default Calculator;







