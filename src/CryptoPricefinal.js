import React, { useState } from "react";
import axios from "axios";
import "./App.css";

const CryptoPricefinal = () => {
  const [symbol1, setSymbol1] = useState("");
  const [symbol2, setSymbol2] = useState("");
  const [amount, setAmount] = useState("");
  const [result, setResult] = useState("");
  const [error, setError] = useState(null);

  const handleSymbol1Change = (event) => {
    setSymbol1(event.target.value.toUpperCase());
  };

  const handleSymbol2Change = (event) => {
    setSymbol2(event.target.value.toUpperCase());
  };

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
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

      setResult(amountInSymbol2);
      setError(null);
    } catch (error) {
      console.error("API Error:", error);
      setError("Unable to get price data. Please check the symbols and try again.");
      setResult(null);
    }
  };

  const formatPrice = (price) => {
    if (price) {
      return parseFloat(price).toFixed(8);
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
      <select value={symbol1} onChange={handleSymbol1Change}>
    <option value="">Select a token</option>
    <option value="BTC">Bitcoin بیت کوین</option>
    <option value="ETH">Ethereum اتریوم</option>
    <option value="LTC">Litecoin لایت کوین</option>
    <option value="pepe">Pepe پپه</option>
    <option value="shib">Shibainu شیبا</option>
    <option value="ADA">Cardano کاردانو</option>
    <option value="Dot">Polkadot پولکادات</option>
  </select>
  <input
    type="text"
    placeholder="Enter a symbol"
    value={symbol1}
    onChange={handleSymbol1Change}
  />


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
</datalist>


        <div className="crypto-result">{formatPrice(result)}</div>
      </div>





<form onSubmit={handleSubmit}>
  <button type="submit">محاسبه شود</button>
</form>

    </div>
  );
};

export default CryptoPricefinal;