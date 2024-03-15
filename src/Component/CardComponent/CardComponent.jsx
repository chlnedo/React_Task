import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import "./CardComponent.css"
import LineChart from './LineChart';

const CardComponent = ({ pairSymbol,symbol,color }) => {
  const [price, setPrice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [change, setChange] = useState(null);
  const [keywords, setKeywords] = useState([]);
  const [currency1, setCurrency1] = useState(null);
  const [pricing, setPricing] = useState([]);
   
  useEffect(() => {
    const fetchCoinPrice = async () => {
      try {
        const response = await fetch(`https://api-staging.bitdelta.com/api/v1/market/pairs?symbol=${pairSymbol}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'X-API-Key': 'BitdeltaExchange', 
          },
        });

        if (response.ok) {
          const data = await response.json();
          
          setPrice(data.data.spot[0].last); 
          setCurrency1(data.data.spot[0].currency1);
          setKeywords(data.data.spot[0].keywords);
          setChange(data.data.spot[0].change);
          setPricing(data.data.spot[0].pricing);
        } else {
          setError('Failed to fetch coin price from the API');
        }
      } catch (error) {
        setError('Error fetching coin price');
      } finally {
        setLoading(false);
      }
    };

    fetchCoinPrice();

    const intervalId = setInterval(fetchCoinPrice, 1000); 

    
    return () => clearInterval(intervalId);
  }, [pairSymbol,change,price]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

 
  const changeContent = change < 1 ? '↓' : '↑';

  return (
    
      <div className="coin-price-card" style={{ backgroundColor: "color" }}>
       <div className='card-header'>
       <p className='symbol'> {symbol}</p>
         
        <h3>{keywords.join(', ')}</h3>
        <p> {currency1}</p>
        </div>

        
        <h2>${price}</h2>
        <div className='change-container'>
        
        <p className={change < 1 ? 'red' : 'green'}>
  {changeContent} {change.toFixed(2)}%
  
</p>

<LineChart pricing={pricing} change = {change} />
  
        </div>
      
      </div>
   
  );
};

export default CardComponent;
