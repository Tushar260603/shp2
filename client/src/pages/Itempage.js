import React, { useEffect, useState } from 'react'
import DefaultLayout from '../components/Defaultlayout'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import {
  DeleteOutlined,EditOutlined

} from "@ant-design/icons";
import { Button, Table,Modal, Form, Input, Select, message } from 'antd';


export default function Itempage() {
const dispatch=useDispatch()
const [itemdata,setitemdata]=useState([]);
const[popmodal,setpopmodal]=useState(false)
const [edititem,setedititem]=useState(null)
const[title,settitle]=useState();
useEffect(()=>{
if(edititem!==null){
settitle('EDIT ITEM')
}
else{
settitle('ADD NEW ITEM')
}
},[edititem])


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
    dispatch({
      type:'HIDE_LOADING'
    })
    console.log(error)
  }
    }


  useEffect(()=>{
 
    getallitems();
  },[])
  //table data

  //handle delete

  const handledelete=async (record)=>{
    try {
      dispatch({
        type:'SHOW_LOADING'
      })
      await axios.post('/api/items/delete-item',{itemId:record._id})
message.success('Item Deleted Successfully')
getallitems();
setpopmodal(false)
      dispatch({
        type:'HIDE_LOADING'
      })
      
    } catch (error) {
      dispatch({
        type:'HIDE_LOADING'
      })
      message.error("Something went wrong")
      console.log(error)
    }
  }


  const columns = [
    { title: "Name", dataIndex: "name" },
    {
      title: "Image",
      dataIndex: "image",
      render: (image, record) => (
        <img src={image} alt={record.name} height="60" width="60" />
      ),
    },
    { title: "Price", dataIndex: "price" },
 
    {
      title: "Actions",
      dataIndex: "_id",
      render: (id, record) => (
        
       <div>
           <EditOutlined 
        
        style={{ cursor: "pointer" }}
        onClick={()=>{
          setedititem(record)
          setpopmodal(true)
        }}
        />

        <DeleteOutlined
          style={{ cursor: "pointer" }}
          onClick={()=>{
            handledelete(record)
          }}
        
        />
     
        </div> 
      ),
    },
  ];


const handleSubmit=async (value)=>{
  if(edititem===null){
    try {
      dispatch({
        type:'SHOW_LOADING'
      })
      const res=await axios.post('/api/items/add-item',value)
message.success('Item added Successfully')
getallitems();
setpopmodal(false)
      dispatch({
        type:'HIDE_LOADING'
      })
      
    } catch (error) {
      dispatch({
        type:'HIDE_LOADING'
      })
      message.error("Something went wrong")
      console.log(error)
    }
  }
  else{
    try {
      dispatch({
        type:'SHOW_LOADING'
      });
      await axios.put('/api/items/edit-item',{...value,itemId:edititem._id});
message.success('Item updated  Successfully')
getallitems();
setpopmodal(false)
      dispatch({
        type:'HIDE_LOADING'
      })
      
    } catch (error) {
      message.error("Something went wrong")
      console.log(error)
    }
  }

      
}

  
  return (
    <DefaultLayout>


      
      <div className='d-flex justify-content-between'>
      <h1>Item List </h1>
      <Button type='primary' onClick={()=>setpopmodal(true)}>Add Item</Button>
      </div>
      <Table columns={columns} dataSource={itemdata} bordered />

{
popmodal && (

  <Modal title={title}      open={popmodal} onCancel={()=>{
    setedititem(null)
    setpopmodal(false)
  }} footer={false}>
  <Form layout='vertical' initialValues={edititem} onFinish={handleSubmit}>

<Form.Item name='name' label="Name">
<Input />
</Form.Item>

<Form.Item name='price' label="Price">
<Input />
</Form.Item>

<Form.Item name='image' label="Image URL">
<Input />
</Form.Item>

<Form.Item name='category' label='Category'>
<Select>
<Select.Option value="drinks">Drinks</Select.Option>
<Select.Option value="rice">Rice</Select.Option>
<Select.Option value="noodles">Noodles</Select.Option>
</Select>
</Form.Item>

<div className='d-flex justify-content-end'><Button type='primary' htmlType='submit'>SAVE</Button></div>
  </Form>
</Modal>



)
  

}

    </DefaultLayout>
  )
}
