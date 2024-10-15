import React, { useState, useEffect } from "react";
import './Sales.css';
import { fetchProducts } from "./Ordering";
import salesImg from './img/sales.png';

const API_URL = 'http://localhost:5001/api'

const Sales = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchIngredients = async (productId) => {
        try {
            const response = await fetch(`${API_URL}/products/${productId}/ingredients`);
            if (!response.ok) throw new Error('Error fetching ingredients');
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching ingredients: ', error)
            throw error;
        }
    }

    const loadProducts = async () => {
        try {
            const data = await fetchProducts();
            const productsWithIngredients = await Promise.all(data.map(async (product) => {
                const ingredients = await fetchIngredients(product.id);
                const totalIngredientCost = ingredients.reduce((sum, ingredient) => sum + ingredient.price, 0);
                return { ...product, totalIngredientCost };
            }));
            setProducts(productsWithIngredients);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadProducts();
    }, []);

    const handleSellProducts = async () => {
        const updatedProducts = products.map(product => {
            const randomSoldAmount = Math.floor(Math.random() * product.current_stock + 1);
            const newStock = Math.max(0, product.current_stock - randomSoldAmount);

            const totalPrice = randomSoldAmount * product.price;

            const ingredientCost = randomSoldAmount * product.totalIngredientCost;
            const profit = totalPrice - ingredientCost;

            return { ...product, current_stock: newStock, randomSoldAmount, totalPrice, profit };
        });

        try {
            const response = await fetch(`${API_URL}/products/update`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ products: updatedProducts }),
            });

            if (!response.ok) throw new Error('Error updating product stock');
            const result = await response.json();
            console.log(result.message);

            for (const product of updatedProducts) {
                if (product.randomSoldAmount > 0) {
                    const saleResponse = await fetch(`${API_URL}/sales`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            total_price: product.totalPrice,
                            profit: product.profit,
                            date: new Date().toISOString()
                        }),
                    });

                    if(!saleResponse.ok) {
                        const errorDetails = await saleResponse.json();
                        console.error('Error recording sale: ', errorDetails);
                    } else {
                        const saleResult = await saleResponse.json();
                        console.log('Sale recorded successfully: ', saleResult);
                    }
                }
            }
            setProducts(updatedProducts);
        } catch (error){
            console.error('Error: ', error)
        }
    };

    if (loading) return <div>Loading products...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="table-container">
            <img src={salesImg} alt="Sales" className="SalesImg" />
            <h1>Product List</h1>
            <table>
                <thead>
                    <tr>
                        <th>Product name</th>
                        <th>Current stock</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product => (
                        <tr key={product.id}>
                            <td>{product.name}</td>
                            <td>{product.current_stock}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button onClick={handleSellProducts}>Click to make one week pass</button>
        </div>
    )
}

export default Sales;