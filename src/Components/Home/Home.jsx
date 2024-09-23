import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { additem, allproduct } from '../../Redux/cartSlice'
import {Box, Button, Card, CardActionArea, CardContent, CardMedia, Container, Grid, InputLabel, MenuItem, Select, TextField, Typography} from '@mui/material'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useNavigate } from 'react-router-dom'
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Home = () => {
const{allitem}=useSelector((s)=>s.cartstore)
const[prodcat,setProdcat]=useState([])
const[catfilter,setCatFilter]=useState("all")
const[search,setSearch]=useState("")
const dispatch=useDispatch()
const navigate=useNavigate()
const handleCategory=(e)=>{
setCatFilter(e.target.value)
}
const handlesearch=(e)=>{
  setSearch(e.target.value)
 }
useEffect(()=>{
dispatch(allproduct()).then((res)=>{
getCategory(res?.payload)
})
},[])
const getCategory=(data)=>{
const catArray=[]
data.map((prod)=>{
catArray.push(prod?.category)
})
const uniquecat=[...new Set(catArray)]
setProdcat(uniquecat)
}
const addproduct=(item)=>{
dispatch(additem(item))
toast.success("Product is added to the cart")
navigate("/cart")
}
  return (
   <>
   <Container maxWidth="lg" className='container'>
<Grid container spacing={4} style={{marginTop:"20px"}}>
<Grid item lg={12} md={12} sm={12} xs={12}>
<Box>
<TextField id="outlined-basic" label="search by name" variant="outlined" onChange={handlesearch} />
</Box>
</Grid>
<Grid item lg={12} md={12} sm={12} xs={12}>

<InputLabel id="demo-simple-select-label">Filter Category wise</InputLabel>
<Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    label="Category"
    value={catfilter}
    onChange={handleCategory}
  >
    <MenuItem selected value="all">All</MenuItem>
    {
      prodcat.map((cat)=>{
        return (
          <MenuItem value={cat}>{cat}</MenuItem>
        )
      })
    }
  </Select>
</Grid>

        {allitem?.filter((item)=>{
        if(catfilter==="all"){
        return item
        }else{
          return item.category===catfilter
        }
        }).filter((item)=>{
        if(search.length===0){
        return item
        }else{
        return item.title.toLowerCase().includes(search.toLowerCase())
        }
        }).map((item)=>{
        return(
            <Grid item lg={4} md={6} xs={12} sm={6} >
            <Card sx={{ maxWidth: 345 }} style={{boxShadow:"rgba(0, 0, 0, 0.24) 0px 3px 8px"}}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="140"
                  src={item?.image}
                  alt="products"
                  sx={{objectFit:"contain"}}
                />
                <CardContent>
                  <Typography gutterBottom variant="h6" component="div">
                 {item?.title}
                  </Typography>
                  <Typography sx={{fontSize:"17px",fontStyle:"italic",marginBottom:"10px"}}>
               Price:{item?.price}
                  </Typography>
                  <Button variant='contained' onClick={()=>addproduct(item)} sx={{marginBottom:"15px"}}><AddShoppingCartIcon/>Add to cart</Button>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        )
        })}
      </Grid>
      </Container>
   </>
  )
}

export default Home