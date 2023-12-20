import React from 'react'
import "./LPheader1.css";
import { CgProfile } from "react-icons/cg";
import "../App.css"
import { Link } from 'react-router-dom';


function LPheader1() {
    return (
        <div className="header">
          <div className="div">
            <hr className="line"/>
            <div className="login_button">
            <img alt="" className='sihlogo' src="/SIH_logo.png" />
            <p>EcoInnovators</p>
           <Link to="home" className='link'><CgProfile /></Link> 
            </div>
    
            <div className="container">
            <div className="content_card_container">
            <div className="content">
              <b className="transformingChaosInto">
                Transforming Chaos into Clarity with AI Powered Insights
              </b>
              <div className="ourCommitmentTo">
                Our commitment to developing AI that is both safe and advantageous
                demands a thorough comprehension of its possible risks and benefits.
                This involves a meticulous evaluation of the impact of our work.
                Discover more about our approach to ensuring safety.
              </div>
              <div className="primaryButton">
                <div className="contactUs">Get started</div>
              </div>
            </div>
            
            <div className="cards">
              <div className="frameParent">
                <div className="millionsParent">
                  <b className="millions">4.5 millions</b>
                  <div className="indiasAnnualCoal">
                    As of 2020, the country's annual petroleum consumption was
                    approximately 4.5 million barrels per day
                  </div>
                </div>
                <div className="parent">
                  <b className="millions">729</b>
                  <div className="indiasAnnualCoal">
                    India's annual coal production was around in million metric
                    tons.
                  </div>
                </div>
              </div>
              <div className="frameGroup">
                <div className="learnMoreParent">
                  <b className="millions">Learn more</b>
                  <div className="ourApproachTo">
                    Our approach to creating a safe and secure environment for our
                    users involves several key aspects:
                  </div>
                </div>
                <img
                  className="unsplashmr1cidduglcIcon"
                  alt=""
                  src="/unsplashmr1cidduglc@2x.png"
                />
              </div>
            </div>
            </div>
    
            <div className="image_container">
            <img className="heroImageIcon" alt="" src="/hero-image@2x.png" />
            </div>
            </div>
          </div>
        </div>
      );
}

export default LPheader1
