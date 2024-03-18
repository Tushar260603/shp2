import React, { useEffect, useState } from 'react'
import DefaultLayout from '../components/Defaultlayout'
import axios from 'axios';
import Itemlist from '../components/Itemlist';
import { Col, Row } from 'antd';
import { useDispatch } from 'react-redux';
export default function Homepage() {
  const [itemdata,setitemdata]=useState([]);

  const[selectedcategory,setseletedcategory]=useState('drinks')








const [data,setdata]=useState("");

const categories=[
  {
name:'drinks',
imageUrl:'https://p1.hiclipart.com/preview/394/797/173/fizzy-drinks-drinkware-cola-food-cartoon-cup-lid-png-clipart.jpg '

},
{
name:'rice',
imageUrl:'https://tse1.mm.bing.net/th?id=OIP.0Z-GEboygXWSnnPjUiXhywHaHE&pid=Api&P=0&h=180'

},
{
  name:'noodles',
  imageUrl:'https://image.freepik.com/free-vector/cartoon-noodle_60352-3020.jpg'
  
  },

]

const dispatch=useDispatch()




useEffect(()=>{
  const getallitems=async ()=>{
try {
  dispatch({
    type:'SHOW_LOADING'
  })
  const {data}=await axios.get('/api/items/get-item')
  setitemdata(data)
  dispatch({
    type:'HIDE_LOADING'
  })
  console.log(data)
} catch (error) {
  console.log(error)
}
  }
  getallitems();
},[dispatch])







  return (
    <div>
     <DefaultLayout >
<div className='d-flex {data}'>
{



categories.map(category=>(

  <div key={category.name} className={selectedcategory===category.name?"d-flex category category-active":"d-flex category"} onClick={()=>setseletedcategory(category.name)}>
<h4>{category.name}</h4>
<img src={category.imageUrl} alt={category.name} height='68' width='80' />
  </div>
))

}
</div>

<Row>
{
itemdata.filter(i=>i.category===selectedcategory).map(item=>(
  <Col xs={24} lg={6} md={12} sm={6} >
  <Itemlist key={item.id} item={item} />
  </Col>
))

}
</Row>

     </DefaultLayout>
    </div>
  )
}
