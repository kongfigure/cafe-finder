import React from "react";

const CafeCard = ( {cafe} ) => {
    const { name, rating, photoUrl, vicinity } = cafe;

    return ( 
        <div className="card">
            <img src={photoUrl || "https://via.placeholder.com/400x160?text=Cafe" } alt={name} />
            <div className="p-3">
                <h5 className="mb-1">{name}</h5>
                <p className="mb-1">⭐ {rating ?? "N/A"}</p>
                <small className="text-muted">{vicinity || "No address available"}</small>
            </div>
        </div>
     );
}
 
export default CafeCard;