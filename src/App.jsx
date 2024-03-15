

import { useEffect, useState } from 'react'
import Navbar from './Component/Navbar/Navbar'
import Banner from './Component/Banner/Banner';
import CardComponent from './Component/CardComponent/CardComponent';
import "./App.css"
import { FaBitcoin } from "react-icons/fa6";
import { FaEthereum } from "react-icons/fa";
import { SiRipple } from "react-icons/si";
import { SiBinance } from "react-icons/si";
import TableComponent from './Component/TableComponent/TableComponent';
import NewsLetter from './Component/NewsLetter/NewsLetter';
import Footer from './Component/Footer/Footer';

function App() {
      const current_theme = localStorage.getItem("current_theme")
      const [theme,setTheme] = useState(current_theme? current_theme: "light");
      console.log(theme);

        useEffect(()=>{
            localStorage.setItem("current_theme", theme)
        },[theme])
  return (
     <div className={`container ${theme}`}>
     <Navbar theme = {theme} setTheme = {setTheme}/>

       <br/>
       <br/>
      <Banner/>
      <div className="card-container">
       <CardComponent className="card" pairSymbol="BTCUSDT" symbol={<FaBitcoin />} color = "#778899"/>
       <CardComponent className="card" pairSymbol="ETHUSDT" symbol={<FaEthereum />} color="#C0C0C0"/>
       <CardComponent className="card" pairSymbol="XRPUSDT" symbol={<SiRipple />} color="#CEE6FD"/>
       <CardComponent className="card" pairSymbol="BNBUSDT" symbol={<SiBinance />} color="#D1CEFD"/>
       

       </div>

       <TableComponent theme = {theme}/>
       <br/>
       <br/>
       <br/>
      { <NewsLetter theme = {theme}/> }
      <br/>
      <br/>

      <Footer/>
      </div>
    
  )
}

export default App
