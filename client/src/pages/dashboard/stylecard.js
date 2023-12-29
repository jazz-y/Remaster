import React from 'react';
import { Link } from 'react-router-dom'; 

function CardDisplay({content, onClick}) { 
    const cardDisplayStyle = {
        width: '800px',
        height: '400px',
        margin: '20px auto',
        padding: '20px',
        border: '1px solid #ccc',
        borderRadius: '10px',
        textAlign: 'center',
        boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.1)',
        cursor: 'pointer',
    };

    const contentStyle = {
        fontSize: '50px', 
        height: '45vh',
        display: 'flex',
        justifyContent: 'center', 
        alignItems: 'center',

    }
    return (
        <div style={cardDisplayStyle} onClick={onClick}>
            <div style ={contentStyle}>
                {content}
            </div>
        </div>
      );
    } 
export default CardDisplay;