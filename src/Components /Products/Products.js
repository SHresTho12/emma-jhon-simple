import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faShoppingCart} from '@fortawesome/free-solid-svg-icons'
import './Products.css'
import { Link } from 'react-router-dom';

const Products = (props) => {
    const {img,name,seller,price,stock,key} = props.product;
    return (
        
        <div className="product">
           <div>
               <img src={img} alt=""/>
           </div>
           <div>
               <h4 className="product_name"><Link to={"/product/"+key}>{name}</Link></h4>
               <br/>
               <p><small>By: {seller}</small></p>
               <p>Price: ${price}</p>
               <br/>
               <p><small>Available Stock : {stock}</small></p>
               {props.showAddToCart && <button onClick={() => {props.handleAddProduct(props.product)}} className="main_button"><FontAwesomeIcon icon ={faShoppingCart}/> Add to cart</button>}
           </div>
        </div>
    );
};

export default Products;