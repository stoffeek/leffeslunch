import React, { useEffect, useState } from 'react';
import './Overview.css';
const Overview = () => {
  const [weeklyPurchases, setWeeklyPurchases] = useState([]);
  const [weeklySales, setWeeklySales] = useState([]);
  const [weeklyCosts, setWeeklyCosts] = useState([]);

  // Hämta veckovisa inköp
  useEffect(() => {
    const fetchWeeklyPurchases = async () => {
      try {
        const response = await fetch('http://localhost:5001/api/purchases/weekly');
        const data = await response.json();
        setWeeklyPurchases(data);
      } catch (error) {
        console.error('Error fetching weekly purchases:', error);
      }
    };

    fetchWeeklyPurchases();
  }, []);

  // Hämta veckovisa försäljningar
  useEffect(() => {
    const fetchWeeklySales = async () => {
      try {
        const response = await fetch('http://localhost:5001/api/sales/weekly');
        const data = await response.json();
        setWeeklySales(data);
      } catch (error) {
        console.error('Error fetching weekly sales:', error);
      }
    };

    fetchWeeklySales();
  }, []);

  // Hämta veckovisa utgifter
  useEffect(() => {
    const fetchWeeklyCosts = async () => {
      try {
        const response = await fetch('http://localhost:5001/api/purchases/order_totals');
        const data = await response.json();
        setWeeklyCosts(data);
      } catch (error) {
        console.error('Error fetching weekly sales:', error)
      }
    };

    fetchWeeklyCosts();
  }, []);

  
  console.log(weeklyCosts)
 

  return (
    <div className='overview'>
      <h1>Weekly Purchases and Sales</h1>
      
      <h2>Purchases per Week</h2>
      <table>
        <thead>
          <tr>
            <th>Week</th>
            <th>Total Purchased (Quantity)</th>
            <th>Total spent for ingredients</th>
          </tr>
        </thead>
        <tbody>
          {weeklyPurchases.map((purchase, index) => {
            const costEntry = weeklyCosts.find(cost => parseInt(cost.week) === parseInt(purchase.week));
            const totalOrderPrice = costEntry ? costEntry.total_order_price : 0;

            return (
              <tr key={index}>
                <td>{"w." + purchase.week}</td>
                <td>{purchase.total_purchased}</td>
                <td>{totalOrderPrice}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <h2>Sales and Profit per Week</h2>
      <table>
        <thead>
          <tr>
            <th>Week</th>
            <th>Total Sales (SEK)</th>
            <th>Total Profit (SEK)</th>
          </tr>
        </thead>
        <tbody>
          {weeklySales.map((sale, index) => (
            <tr key={index}>
              <td>{sale.week}</td>
              <td>{sale.total_sales}</td>
              <td>{sale.total_profit}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Overview;
