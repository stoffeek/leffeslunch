import React, { useState, useEffect } from "react";
import './Sales.css';
import { useNavigate } from "react-router-dom";
import { fetchProducts } from "./Ordering";

const API_URL = 'http://localhost:5001/api'

const Sales = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const loadProducts = async () => {
        try {
            const data = await fetchProducts();
            setProducts(data);
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
            const randomSoldAmount = Math.floor(Math.random() * product.current_stock);
            const newStock = product.current_stock - randomSoldAmount;

            const totalPrice = randomSoldAmount * product.price;
            const profit = totalPrice;

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
        <div>
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