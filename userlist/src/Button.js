import React from 'react';

function handleClick() {
  alert('You clicked me!');
}

const Button = () => (
  <button onClick={handleClick}>MFE1 Button</button>
);

export default Button; 