import React from "react";
import CafeCard from "./CafeCard";

const CafeList = ( {cafes} ) => {
    if(!cafes || cafes.length === 0) {
        return (  
            <div className="container my-4">
                <p className="text-center">No cafes yet. Click "Find Cafes" to search near you.</p>
            </div>
        );
    }   
    
    return (
        <div className="grid">
            {cafes.map((c, i) => (
                <CafeCard key={`${c.place_id}-${i}`} cafe={c} />
            ))}
        </div>
    );
        
}
 
export default CafeList;