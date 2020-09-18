import React, { useState } from 'react';
import fakeData from '../../fakeData';
import './Shop.css'
import Products from '../Products/Products'
import Cart from '../Cart/Cart'
const Shop = () => {
    
   const first10 = fakeData.slice(0,10);
    const [products,setProducts] = useState(first10);
    const [cart, setCart] = useState([]);
    const handle = (product) => {
       
        const newcart=[...cart,product];
        setCart(newcart);
    }
    return (

        <div className = "shop_container">
           
           <div className="product_container">
          
            {
                products.map(pd => {

                    return <Products handleAddProduct = {handle} product={pd}></Products>
                })
            }
       
           </div>
           <div className="cart_container">
           <Cart cart={cart}></Cart>
           </div>
        </div>
        
    );
};

export default Shop;