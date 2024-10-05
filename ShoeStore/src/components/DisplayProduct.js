import React, { useState,useContext } from 'react';
import './DisplayProduct.css';
import Context from '../store/context-provider';

export default function DisplayProduct({ setProduct, product }) {
    const ctx =useContext(Context);
    const [cartQuantities, setCartQuantities] = useState({});


  const handleBuy = (item, size) => {
   
    setCartQuantities((prevQuantities) => ({
        ...prevQuantities,
        [size]: (prevQuantities[size] || 0) + 1,
      }));

    ctx.addCart({ ...item, quantity: cartQuantities[size] || 0 + 1,total:+item.price,count:1 });
    setProduct((prevProducts) => {
      const updatedProducts = [...prevProducts];
      const productIndex = updatedProducts.findIndex((p) => p.id === item.id);

      if (productIndex !== -1 && updatedProducts[productIndex][`${size}Quantity`] > 0) {
        updatedProducts[productIndex][`${size}Quantity`] -= 1;
        return updatedProducts;
      } else {
        return prevProducts;
      }
    });
  
  };

  return (
    <ul>
      {product && product.map((item) => (
        <li key={item.id}>
          <div className='product_container'>
            <div className='description'>
              <div className='product_data'>{item.shoeName}</div>
              <div className='product_data'>{item.description}</div>
              <div className='product_data'>{item.price}</div>
            </div>
            <div className='product_quantity'>
              <button
                onClick={() => handleBuy(item, "large")}
                disabled={item.largeQuantity === 0}
              >
                Buy Large ({item.largeQuantity})
              </button>
              <button
                onClick={() => handleBuy(item, "medium")}
                disabled={item.mediumQuantity === 0}
              >
                Buy Medium ({item.mediumQuantity})
              </button>
              <button
                onClick={() => handleBuy(item, "small")}
                disabled={item.smallQuantity === 0}
              >
                Buy Small ({item.smallQuantity})
              </button>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}