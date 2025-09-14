import React from "react";

const Hero = ( {onFind} ) => {
    return ( 
        <header className="hero">
            <h1>Find Cafes Near You</h1>
            <button onClick={onFind}>Find Cafes</button>
        </header>
     );
}
 
export default Hero;