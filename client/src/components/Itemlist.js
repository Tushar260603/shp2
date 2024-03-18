import React from 'react'
import {Button, Card} from 'antd'
import { useDispatch } from 'react-redux'

export default function Itemlist({item}) {

  const dispatch=useDispatch()
  const handleaddtocart=()=>{
dispatch({
  type:'ADD_TO_CART',
  payload:{...item,quantity:1},
})
  }
    const {Meta}=Card
  return (
    <div>
      <Card
    
      style={{width:240,marginBottom:20}}
cover={
    <img alt={item.name} src={item.image} style={{height:200}} />
}




      >

<Meta title={item.name}   />
<div className='item-button'>
<Button onClick={()=>handleaddtocart()}>Add to Cart</Button>

</div>
      </Card>
    </div>
  )
}
