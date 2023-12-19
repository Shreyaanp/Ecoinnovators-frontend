// HomePage.js
import React from 'react';
import './Home.css'; // Make sure to create a HomePage.css file for styling
import { MdArrowDropDown } from "react-icons/md";

const HomePage = () => {
  return (
    <div className="HomePage">
        <div className='homepage-left'>
            <div className='left'>
      <header className="HomePage-header">
        <h1>ChemD</h1><span className="dot"><MdArrowDropDown/></span>
      </header>
      <section className="HomePage-content">
        <div>
        <p>Welcome to <span className="dot">ChemD Analytics</span>, where data converges with strategy to redefine decision-making in the Chemical 
            and Petrochemical Industries. Our mission is to compile and curate an optimum level of variable datasets 
            from the heart of these industries, creating a dynamic reservoir of insights. 
            Through advanced analytics and strategic initiatives, we empower organizations to navigate challenges seamlessly, 
            fostering a future where decisions are driven by intelligence.</p>
        </div>
       
        <p>Explore the possibilities, harness the power of Petrolnsight, and embark on a journey towards unparalleled strategic excellence.</p>
        </section>
        {/* Truncated for brevity */}
        </div> 
        </div>
        <div className="homepage-right">
        <div className='right'>
        <div className="right-container">
                <h1>GET STARTED</h1>
                <div style={{display:'flex', justifyContent:"center"}}>
                <div className='button-container'>
                    <button className='authBtn'>Signup</button>
                    <button className='authBtn'>Login</button>
                </div>
                </div>
                <p><u>continue as a guest</u></p>
        </div>
        </div>
        </div>
        </div>
        
     
  );
}

export default HomePage;
