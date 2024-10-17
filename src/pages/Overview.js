import React, { useEffect, useState } from 'react';
import './Overview.css';
import overviewImg from './img/overview.png';
import {
  mockWeeklyPurchases,
  mockWeeklySales,
  mockWeeklyCosts,
} from './Mockdata';

const Overview = () => {
  const [weeklyPurchases, setWeeklyPurchases] = useState([]);
  const [weeklySales, setWeeklySales] = useState([]);
  const [weeklyCosts, setWeeklyCosts] = useState([]);
  const useMockData = true;
  
  useEffect(() => {
    const fetchWeeklyPurchases = async () => {
      try {
        let purchasesData = useMockData ? mockWeeklyPurchases : [];
        const response = await fetch('http://localhost:5001/api/purchases/weekly');
        if (response.ok) {
          const liveData = await response.json();
          purchasesData = [...purchasesData, ...liveData];
        }
        setWeeklyPurchases(purchasesData);
      } catch (error) {
        console.error('Error fetching weekly purchases:', error);
      }
    };

    fetchWeeklyPurchases();
  }, []);

  useEffect(() => {
    const fetchWeeklySales = async () => {
      try {
        let salesData = useMockData ? mockWeeklySales : [];
        const response = await fetch('http://localhost:5001/api/sales/weekly');
        if (response.ok) {
          const liveData = await response.json();
          salesData = [...salesData, ...liveData];
        }
        setWeeklySales(salesData);
      } catch (error) {
        console.error('Error fetching weekly sales:', error);
      }
    };

    fetchWeeklySales();
  }, []);

  useEffect(() => {
    const fetchWeeklyCosts = async () => {
      try {
        let costsData = useMockData ? mockWeeklyCosts : [];
        const response = await fetch('http://localhost:5001/api/purchases/order_totals');
        if (response.ok) {
          const liveData = await response.json();
          costsData = [...costsData, ...liveData];
        }
        setWeeklyCosts(costsData);
      } catch (error) {
        console.error('Error fetching weekly costs:', error);
      }
    };

    fetchWeeklyCosts();
  }, []);

  const getTotalQuantitySold = (week) => {
    const saleEntry = weeklySales.find(sale => parseInt(sale.week) === parseInt(week));
    return saleEntry ? saleEntry.total_quantity_sold || 0 : 0;
  };

  return (
    <div className='overview'>
      <img src={overviewImg} alt="Overview" className="OverviewImg" />
      <h1>Weekly Purchases and Sales</h1>
      <h2>Purchases per Week</h2>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Total Purchased (Quantity)</th>
            <th>Total spent for ingredients (SEK)</th>
            <th>Total Quantity Sold</th>
          </tr>
        </thead>
        <tbody>
          {weeklyPurchases.map((purchase, index) => {
            const costEntry = weeklyCosts.find(cost => parseInt(cost.week) === parseInt(purchase.week));
            const totalOrderPrice = costEntry ? costEntry.total_order_price : 0;
            const totalQuantitySold = getTotalQuantitySold(purchase.week);

            return (
              <tr key={index}>
                <td>{"w." + purchase.week}</td>
                <td>{purchase.total_purchased}</td>
                <td>{totalOrderPrice}</td>
                <td>{totalQuantitySold}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <h2>Sales and Profit per Week</h2>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Total Sales (SEK)</th>
            <th>Total Profit (SEK)</th>
            <th>Total Quantity Sold</th>
          </tr>
        </thead>
        <tbody>
          {weeklySales.map((sale, index) => (
            <tr key={index}>
              <td>{"w." + sale.week}</td>
              <td>{sale.total_sales}</td>
              <td>{sale.total_profit}</td>
              <td>{sale.total_quantity_sold || 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
  );
};

export default Overview;
