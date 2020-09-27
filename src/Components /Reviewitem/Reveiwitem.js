import React from 'react';

const Reveiwitem = (props) => {
    const{name,Quantity,key,price,img} = props.product;
    const reviewItemStyle = {
        display:'flex',
        borderBottom : '1px solid gray',
        marginBottom: '5px',
        paddingBottom: '5px',
        marginLeft: '200px',
        textAlign : 'left'
      
    };
    return (
        <div style={reviewItemStyle} className="review-item">
            
            <div >
                <img src={img} alt=""/>
            </div>
            <div >
            <h4  className="product_name">Item name :{name}</h4>
            <h5>price : {price}</h5>
            <h4>Quantity:{Quantity}</h4>
            <button className="main_button" onClick={()=>props.removeProduct(key)}>Remove</button>
            </div>
        </div>
    );
};

export default Reveiwitem;