import React, { useEffect, useState } from 'react';
import fakeData from '../../fakeData';
import { getDatabaseCart, processOrder, removeFromDatabaseCart } from '../../utilities/databaseManager';
import Reveiwitem from '../Reviewitem/Reveiwitem';
import Cart from '../Cart/Cart'
import { useHistory } from 'react-router-dom';
const Review = () => 
{ 
    
    const [cart,setCart] = useState([]);
    const [orderPlaced,setorderPlaced]= useState(false);
    const history = useHistory()
const proccedHandle =()=>{
    history.push('/shipment');
}
let image;
if(orderPlaced){
   image = <img src={require('../../images/pranto.jpg')} alt=""/>
  
} 
    const removeProduct = (productkey) =>{
    
        const newCart = cart.filter(pd => pd.key !== productkey);
        setCart(newCart);
       removeFromDatabaseCart(productkey);
    }
    
    
    useEffect(()=>{
            const saveCart = getDatabaseCart();
           
           const productkey = Object.keys(saveCart);
           
           const cartProducts = productkey.map(key =>{ 
const products = fakeData.find(pd => pd.key === key);
products.Quantity = saveCart[key];
return products;
               });
             
          setCart(cartProducts);
        },[])


    return (
       
        <div className="twin_container">
           
         <div className="product_container">
         {
                cart.map(pd=> <Reveiwitem product={pd} key={pd.key} removeProduct={removeProduct}></Reveiwitem>)
            }
            {
                image
            }
         </div>
         <div className="cart_contaoiner">
            <h1>New cart</h1>
            <Cart cart={cart}>
                <button className="main_button" onClick={proccedHandle}>Procced Checkout</button>
            </Cart>
         </div>
        </div>
    );
};

export default Review;