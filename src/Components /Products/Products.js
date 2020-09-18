import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee , faShoppingCart} from '@fortawesome/free-solid-svg-icons'
import './Products.css'

const Products = (props) => {
    const {img,name,seller,price,stock} = props.product;
    return (
        
        <div className="product">
           <div>
               <img src={img} alt=""/>
           </div>
           <div>
               <h4 className="product_name">{name}</h4>
               <br/>
               <p><small>By: {seller}</small></p>
               <p>Price: ${price}</p>
               <br/>
               <p><small>Available Stock : {stock}</small></p>
               <button onClick={() => {props.handleAddProduct(props.product)}} className="main_button"><FontAwesomeIcon icon ={faShoppingCart}/> Add to cart</button>
           </div>
        </div>
    );
};

export default Products;