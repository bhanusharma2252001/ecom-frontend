import axios from "axios";
import { useState, useEffect } from "react";
import styled from "styled-components";
// import { popularProducts } from "../data";
import Product from "./Product";

const Container = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`;

const Products = ({ cat, filters, sort }) => {

  const  [ products, setProducts] = useState([]);
  const [ filteredProducts, setFilterProducts ] = useState([]);

  console.log('cat, filters, sort',cat, filters, sort);
  useEffect(() => {
    const getProducts = async ()=>
    {
      try {
        const fetchedProduct = await axios.get( cat ? `http://localhost:5000/api/products?category=${cat}`: `http://localhost:5000/api/products`)
        setProducts(fetchedProduct.data)

        console.log("alag sort kiya h",fetchedProduct.data.sort((a,b)=>a.price-b.price));
      } catch (error) {
        console.log(error);
      }
    }
    getProducts();
  }, [cat])

  useEffect(() => {
    try {
     if(cat) {  let filteredproduct2 = products.filter((item)=> {
  return Object.entries(filters).every(([key,value]) => item[key].includes(value))
})
      setFilterProducts(filteredproduct2)
    }}  catch (error) {
      console.log("errormsg",error);
    }
    
  }, [ products, cat, filters  ])
  
  useEffect(() => {
    console.log("sorted",sort);
    if(sort === 'newest') setFilterProducts((prev)=>[...prev].sort((a,b)=> b.createdAt - a.createdAt))
    else if( sort === 'asc') setFilterProducts((prev)=>[...prev].sort((a,b)=>a.price - b.price))
    else  { console.log("desc block") 
    setFilterProducts((prev)=>{
      console.log('prev for desc',prev)
      console.log('sorted prev for desc',[...prev].sort((a,b)=>b.price - a.price))
      return [...prev].sort((a,b)=>b.price - a.price)
    }
      )
  }
    console.log("bhai sab sorted hona h",filteredProducts);
  }, [sort]) 
  
  
  return (
    <Container>
     {  cat ? filteredProducts.map((item) => <Product item={item} key={item._id} />) : products.map((item)=><Product item={item} key={item._id} />).slice(0,8)}
    </Container>
  );
};

export default Products;
