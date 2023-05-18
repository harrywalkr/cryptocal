import React, { useState } from "react";
import axios from "axios";
import "./App.css";

const CryptoPricefinal = () => {
  const [symbol1, setSymbol1] = useState("");
  const [symbol2, setSymbol2] = useState("");
  const [amount, setAmount] = useState("");
  const [result, setResult] = useState("");
  const [error, setError] = useState(null);
  const [resultInToman, setResultInToman] = useState("");
  const [resultInDollar, setResultInDollar] = useState("");
  

  const handleSymbol1Change = (event) => {
    setSymbol1(event.target.value.toUpperCase());
  };

  const handleSymbol2Change = (event) => {
    setSymbol2(event.target.value.toUpperCase());
  };

  const handleAmountChange = (event) => {
    const inputValue = event.target.value;
    const formattedAmount = inputValue.replace(/,/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    setAmount(formattedAmount);
  };
  

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response1 = await axios.get(
        `https://cors-anywhere.herokuapp.com/https://coincodex.com/api/coincodex/get_coin/${symbol1}`
      );
      console.log("API Response 1:", response1.data);
      const symbol1PriceUsd = response1.data.last_price_usd;
  
      const response2 = await axios.get(
        `https://cors-anywhere.herokuapp.com/https://coincodex.com/api/coincodex/get_coin/${symbol2}`
      );
      console.log("API Response 2:", response2.data);
      const symbol2PriceUsd = response2.data.last_price_usd;
  
      const amountInSymbol1 = parseFloat(amount);
      const symbol1ToUsdRate = parseFloat(symbol1PriceUsd);
      const symbol2ToUsdRate = parseFloat(symbol2PriceUsd);
  
      const amountInUsd = amountInSymbol1 * symbol1ToUsdRate;
      const amountInSymbol2 = amountInUsd / symbol2ToUsdRate;
  
      const tomanRateResponse = await axios.get(
        "https://cors-anywhere.herokuapp.com/https://coincodex.com/api/coincodex/get_coin/Toman"
      );
      console.log("Toman Conversion Rate:", tomanRateResponse.data);
      const tomanRate = parseFloat(tomanRateResponse.data.last_price_usd);
  
      const equivalentInUsd = amountInUsd;
      const equivalentInToman = equivalentInUsd * tomanRate;
  
      setResult(amountInSymbol2);
      setResultInToman(equivalentInToman);
      setResultInDollar(equivalentInUsd);
  
      setError(null);
    } catch (error) {
      console.error("API Error:", error);
      setError("Unable to get price data. Please check the symbols and try again.");
      setResult(null);
      setResultInToman("");
      setResultInDollar("");
    }
  };
  
  
  
  





  

  const formatPrice = (price) => {
    if (price) {
      const formattedPrice = parseFloat(price).toLocaleString(undefined, { maximumFractionDigits: 8 });
      return formattedPrice;
    } else {
      return "-";
    }
  };
  
  

 
  const handleSwapClick = () => {
    setSymbol1(symbol2);
    setSymbol2(symbol1);
    setAmount(result);
    setResult("");
  };






  return (
    <div className="crypto-container">


      <div className="crypto-box">
      <input
  type="text"
  placeholder="Enter a symbol"
  value={symbol1}
  onChange={handleSymbol1Change}
  list="tokens"
/>
<datalist id="tokens">
  <option value="BTC">Bitcoin بیت کوین</option>
  <option value="Toman">Toman تومان</option>
  <option value="USDT">Tether تتر</option>
  <option value="ETH">Ethereum اتریوم</option>
  <option value="LTC">Litecoin لایت کوین</option>
  <option value="pepe">Pepe پپه</option>
  <option value="shib">Shibainu شیبا</option>
  <option value="ADA">Cardano کاردانو</option>
  <option value="Dot">Polkadot پولکادات</option>
  <option value="Toman">Toman تومان</option>
  <option value="TRY">لیر ترکیه</option>


</datalist>





        <label htmlFor="amount" className="crypto-label">Amount</label>
        <input type="text" id="amount" className="crypto-input" value={amount} onChange={handleAmountChange} />
      </div>


      <div className="crypto-icon" onClick={handleSwapClick}>&#8644;</div>



      <div className="crypto-box">
    

      <input
  type="text"
  placeholder="Enter a symbol"
  value={symbol2}
  onChange={handleSymbol2Change}
  list="tokens"
/>
<datalist id="tokens">
  <option value="BTC">Bitcoin بیت کوین</option>
  <option value="ETH">Ethereum اتریوم</option>
  <option value="LTC">Litecoin لایت کوین</option>
  <option value="pepe">Pepe پپه</option>
  <option value="shib">Shibainu شیبا</option>
  <option value="ADA">Cardano کاردانو</option>
  <option value="Dot">Polkadot پولکادات</option>
  <option value="TRY">لیر ترکیه</option>

</datalist>


        <div className="crypto-result">{formatPrice(result)}</div>
      </div>

      <table className="crypto-table">
  <thead>
    <tr>
      <th>Result (Symbol 2)</th>
      <th>Equivalent in Toman</th>
      <th>Equivalent in Dollar</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>{formatPrice(result)}</td>
      <td>{formatPrice(resultInToman)}</td>
      <td>{formatPrice(resultInDollar)}</td>
    </tr>
  </tbody>
</table>




<form onSubmit={handleSubmit}>
  <button type="submit">محاسبه شود</button>
</form>

    </div>



  );
};

export default CryptoPricefinal;