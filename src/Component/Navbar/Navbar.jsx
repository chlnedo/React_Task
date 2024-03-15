import React from 'react'
import "./Navbar.css"
import { CiSearch } from "react-icons/ci";
import { MdDarkMode } from "react-icons/md";
import { CiLight } from "react-icons/ci";
import logo from "../../assets/newlogo.svg"
import LanguageSelector from '../LanguageSelector/LanguageSelector';
import CurrencySelector from '../CurrencySelector/CurrencySelector';

const Navbar = ({theme,setTheme}) => {

    //<MdDarkMode />
    //<CiLight/>

      function toggle_mode(){
           theme == "light" ? setTheme("dark") : setTheme("light");
          
      }
  return (
    <div className='navbar'>
        <img src={logo} alt='' className='logo'/>

        <ul>
            <li>Home</li>
            <li>Products</li>
            <li>Features</li>
            <li>About</li>
        </ul>

          <div className='search-box'>
              <input type='text' placeholder='Search'/>
              <CiSearch className='search-icon'/>
          </div>

          
           <div onClick={()=>{toggle_mode()}} className='theme-icon'>
         
          {
             theme == "light" ? <MdDarkMode className='theme-icon1' /> : <CiLight className='theme-icon1'/>
          }
          </div>

          <LanguageSelector/>
         <CurrencySelector/>
         
    </div>
  )
}

export default Navbar