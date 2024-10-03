import React, { useState } from 'react';
import './Recipe.css';

const Recipe = ({ title, ingredients }) => {
  const [showIngredients, setShowIngredients] = useState(false);

  const toggleIngredients = () => {
    setShowIngredients(!showIngredients);
  };

  return (
    <div className="recipe-container">
      <h2 onClick={toggleIngredients}>{title}</h2>
      {showIngredients && (
        <ul>
          {ingredients.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

const RecipeBook = () => {
  const recipes = [
    {
      title: 'Spaghetti Carbonara',
      ingredients: ['Spaghetti', 'Ägg', 'Parmesanost', 'Bacon', 'Svartpeppar']
    },
    {
      title: 'Kyckling Curry',
      ingredients: ['Kyckling', 'Curry', 'Kokosmjölk', 'Lök', 'Vitlök', 'Ingefära']
    },
    // Lägg till fler recept här
  ];

  return (
    <div className="recipe-book">
      <h1>Min Receptbok</h1>
      {recipes.map((recipe, index) => (
        <Recipe key={index} title={recipe.title} ingredients={recipe.ingredients} />
      ))}
    </div>
  );
};

export default RecipeBook;
