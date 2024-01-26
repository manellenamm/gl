import React from 'react';
import yellowStar from "./images/YellowStar.png"
import whiteStar from "./images/whiteStar.png"

const StarRating = ({ notation }) => {
    const roundedNotation = Math.round(notation);

    const renderStars = () => {
        const yellowStars = Array(roundedNotation).fill(
            <img src={yellowStar} alt="yellow-star" style={{ width: '20px', height: '20px' }} />
        );

        const whiteStars = Array(5 - roundedNotation).fill(
            <img src={whiteStar} alt="white-star" style={{ width: '20px', height: '20px' }} />
        );

        return [...yellowStars, ...whiteStars];
    };

    return (
        <div style={{display:'inline-block'}}>
            <span>
                {renderStars().map((star, index) => (
                    <span key={index} style={{display:'inline-block'}}>{star}</span>
                ))}
            </span>
        </div>
    );
};

export default StarRating;
