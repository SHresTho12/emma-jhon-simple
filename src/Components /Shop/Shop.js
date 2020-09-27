import React, { useState } from 'react';
import fakeData from '../../fakeData';
import './Shop.css'
import Products from '../Products/Products'
import Cart from '../Cart/Cart'
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
const Shop = () => {
    
   const first10 = fakeData.slice(0,10);
    const [products,setProducts] = useState(first10);
    const [cart, setCart] = useState([]);

useEffect(()=>{
const savedCart = getDatabaseCart();
const productKeys = Object.keys(savedCart);
const previousCart = productKeys.map(existingkey => {
    const product = fakeData.find(pd => pd.key === existingkey);
    product.Quantity = savedCart[existingkey];
    return product;
})
setCart(previousCart);
},[])


    const handle = (ll) => {
        const productToBeadded = ll.key;
        let count = 1;
        let newCart;
        const sameProduct = cart.find(pd => pd.key === productToBeadded);
        if(sameProduct){
           
             count = sameProduct.Quantity + 1 ;
            sameProduct.Quantity = count;
            const other = cart.filter(pd => pd.key !== productToBeadded);
            newCart=[...other,sameProduct];
        }
        else{
            ll.Quantity = 1;
            newCart=[...cart,ll];
        }
        
        setCart(newCart);
        
        addToDatabaseCart(ll.key,count)
        
    }
    return (

        <div className = "twin_container">
           
           <div className="product_container">
          
            {
                products.map(pd => {

                    return <Products showAddToCart={true} handleAddProduct = {handle} product={pd} key={pd.key}></Products>
                })
            }
       
           </div>
           <div className="cart_container">
           <Cart cart={cart}>
           <Link to="/review"><button className="main_button">Review</button></Link>
           </Cart>
           </div>
        </div>
        
    );
};

export default Shop;