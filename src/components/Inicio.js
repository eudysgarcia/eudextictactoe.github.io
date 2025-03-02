import React from 'react';

import "./Inicio.css"

export const StartScreen = ({ onStart }) => {
    return (
        <div className='start-screen'>
            <img src='img/tictactoe.png'></img>
            <button className='inicio' onClick={onStart}>Comenzar</button>
            <footer className='footer'>
                &copy; 2024 Sora Solution
            </footer>
        </div>
    );
  }