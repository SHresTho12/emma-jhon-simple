import React from 'react';


const cart = (props) => {
    const cart = props.cart;
    //const total = cart.reduce((total,prd) => total + prd.price,0);
    let total =0 ; 
    for (let i =0 ; i < cart.length;i++)
    {
        const product = cart[i];
        total =total + product.price * product.Quantity;
        
    }
    let shipping = 0;
    if(total>35)
    {
        shipping = 0;
    }
    else if(total>0){
        shipping = 12.99 ;
    }
    else if(total>15) shipping = 5.99;
    const tax1 = (total /10);
   
    const formatNumber = num=>{
        const precision = num.toFixed(2);
        return Number(precision);
    }
    const tax = formatNumber(tax1);
    const grandTotal = (total + shipping + Number(tax)).toFixed(2);
    return (
        <div>
            <h4>Order Summery</h4>
            <p>Items Ordered: {props.cart.length}</p>
            <p>Product price : {tax}</p>
            <p>Shipping cost : {shipping}</p>
            <p>Tax: {tax}</p>
            <p>Total price: {grandTotal}</p>    
            <br/>
           {
               props.children
           }

           
            
        </div>
    );
};

export default cart;