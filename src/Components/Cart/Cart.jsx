import React from 'react'
import { Avatar, Button, Paper, styled, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import RemoveIcon from '@mui/icons-material/Remove';
import { useDispatch, useSelector } from 'react-redux'
import { decrementQty, deleteitem, incrementQty } from '../../Redux/cartSlice'
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import "./CartStyle.css"
import { Link } from 'react-router-dom';
const Cart = () => {
const{cart,Totalprice}=useSelector((s)=>s.cartstore)
const dispatch=useDispatch()
const increment=(id)=>{
dispatch(incrementQty(id))
}
const decrement=(id)=>{
dispatch(decrementQty(id))
}
const remove=(id)=>{
dispatch(deleteitem(id))
toast.error("Product is removed from the cart")
}
/*      MUI styles     */
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}))
/*      MUI styles     */
  return (
<>
<h3>Total:{Totalprice}</h3>

<TableContainer component={Paper} className='table'>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <StyledTableRow>
          
            <StyledTableCell >Image</StyledTableCell>
            <StyledTableCell align='center'>Title</StyledTableCell>
            <StyledTableCell align="right">Price</StyledTableCell>
            <StyledTableCell align="right">Increment quantity</StyledTableCell>
            <StyledTableCell align="right">Decrement quantity</StyledTableCell>
            <StyledTableCell align="right">Total item</StyledTableCell>
            <StyledTableCell align="right">Delete</StyledTableCell>
          </StyledTableRow>
        </TableHead>
        <TableBody>
       
          {
      cart.length===0?(
   <div className='pic'>
        <img src="https://img.freepik.com/free-vector/empty-shopping-basket-concept-illustration_114360-22411.jpg?t=st=1727096732~exp=1727100332~hmac=8e94ccda2b690bba058bb29365681f586d7c4d7d3dbacca04b5d23d536a278fe&w=740" alt="" height="230px"/>
        <h2>Hey,it feels so light!</h2>
        <p>There is nothing in your basket,Let's add some items.</p>
        <Link to="/">
        <Button variant='contained'>
       Shop Now
        </Button>
        </Link>
   </div>
      ):
          cart?.map((item) => (
            <StyledTableRow
              key={item.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
           
              <StyledTableCell align="right"><Avatar src={item?.image}/></StyledTableCell>
              <StyledTableCell align="center">{item?.title}</StyledTableCell>
              <StyledTableCell align="right">{item?.price}</StyledTableCell>
              <StyledTableCell align="center"><Button variant='contained'  style={{marginLeft:"35%"}} onClick={()=>increment(item?.id)}>+</Button></StyledTableCell>
              <StyledTableCell align="center"><Button variant='contained'  style={{marginLeft:"35%"}} 
              onClick={item.quantity===1?()=>remove(item.id):()=>decrement(item.id)}><RemoveIcon/></Button></StyledTableCell>
              <StyledTableCell align="center"  ><Typography style={{marginLeft:"35%"}}>{item.quantity}</Typography></StyledTableCell>
              <StyledTableCell align="right"><Button onClick={()=>remove(item?.id)}><DeleteIcon/></Button></StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
</>
  )
}

export default Cart