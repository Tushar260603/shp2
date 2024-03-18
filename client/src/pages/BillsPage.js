import React, { useEffect, useState } from 'react'
import DefaultLayout from '../components/Defaultlayout'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import {
EyeOutlined

} from "@ant-design/icons";
import { Button, Table,Modal, Form, Input, Select, message } from 'antd';


export default function BillsPage() {
    const dispatch=useDispatch()
const [billsdata,setbillsdata]=useState([]);
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


const getallBills=async ()=>{
  try {
    dispatch({
      type:'SHOW_LOADING'
    })
    const {data}=await axios.get('/api/bills/get-bills')
    setbillsdata(data)
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
 
    getallBills();
  },[])


  
  //table data

  //handle delete




  const columns = [
    { title: "ID", dataIndex: "_id" },
    {
      title: "Customer Name ",
      dataIndex: "customerName",
     
    },
    { title: "Contact No", dataIndex: "customerNumber" },
    { title: "Tax", dataIndex: "tax" },
    { title: "Sub-Total", dataIndex:"subtotal"},
   
    { title: "Total Amount", dataIndex: "totalAmount" },
   
    {
      title: "Actions",
      dataIndex: "_id",
      render: (id, record) => (
        
       <div>
    <EyeOutlined
    onClick={()=>{
      setpopmodal(true)
    }}
    
    
    />
        </div> 
      ),
    },
  ];




  return (
    <DefaultLayout>
            
      <div className='d-flex justify-content-between'>
      <h1>Invoice List  </h1>

      </div>
      <Table columns={columns} dataSource={billsdata} bordered />

{
popmodal && (

  <Modal title="invoice details"      open={popmodal} onCancel={()=>{
  
    setpopmodal(false)
  }} footer={false}>

</Modal>



)
  

}
      
    </DefaultLayout>
  )
}
