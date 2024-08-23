import React, { useReducer } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const initialState = {
  cart: [],
};

function reducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM':
      const existingItem = state.cart.find(item => item.id === action.payload.id);
      if (existingItem) {
        return {
          ...state,
          cart: state.cart.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      } else {
        return {
          ...state,
          cart: [...state.cart, { ...action.payload, quantity: 1 }],
        };
      }

 
    case 'REMOVE_ITEM':
      return {
        ...state,
        cart: state.cart.filter(item => item.id !== action.payload.id),
      };          
    default:
      return state;
  }
}

const ShoppingCart = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const addItem = (item) => {
    dispatch({ type: 'ADD_ITEM', payload: item });
  };

  const updateQuantity = (id, quantity) => {
    if (quantity <= 0) return;
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  };

  const removeItem = (id) => {
    dispatch({ type: 'REMOVE_ITEM', payload: { id } });
  };

  const items = [
    { id: 1, name: 'GT 650', price: 5000 },
    { id: 2, name: 'Classic 350', price: 3125 },
    { id: 3, name: 'Jawa', price: 4300 },
    { id:4 ,name:'Himalayan 450',price:4100},
    {id:5,name:'Bullet 350',price:3000}
  ];

  return (
    <div className="container">
      <h1>Show Room</h1>
      {items.map(item => (
        <div key={item.id} className="shop-item">
          <h2>{item.name} - ${item.price}</h2>
          <button onClick={() => addItem(item)}>Add to Buy</button>
        </div>
      ))}

      <h1>Ordering the Bikes</h1>
      <ul>
        {state.cart.map(item => (
          <li key={item.id}>
            {item.name} - ${item.price} x {item.quantity}
            <button onClick={() => removeItem(item.id)}>Remove</button>
          </li>
        ))}
      </ul>
      <div className="total">
        <h2>Total: ${state.cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}</h2>
      </div>
      
    </div>
  

   
  );
};

ReactDOM.render(<ShoppingCart/>,document.getElementById('root'));
