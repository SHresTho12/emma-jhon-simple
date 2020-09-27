import React from 'react';
import { useParams } from 'react-router-dom';
import fakeData from '../../fakeData';
import Products from '../Products/Products';

const Productdetail = () => {
     let {productkey} = useParams();
     const product = fakeData.find(pd => pd.key === productkey);
     console.log(product);
    return (
       
        <div>
            <h1>{productkey} detail coming sooon</h1>
            <Products showAddToCart={false} product={product}></Products>
        </div>
    );
};

export default Productdetail;