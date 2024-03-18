import React, { useEffect, useState } from 'react'
import DefaultLayout from '../components/Defaultlayout'
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { Table } from 'antd';
export default function CustomerPage() {
  const [billsdata,setbillsdata]=useState([]);
const dispatch=useDispatch();

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


    const columns = [
      { title: "ID", dataIndex: "_id" },
      {
        title: "Customer Name ",
        dataIndex: "customerName",
       
      },
      { title: "Contact No", dataIndex: "customerNumber" },
  
     
      
    ];
  






  return (
    <div>
      <DefaultLayout>
      <h1>Customer Page </h1>
      <Table columns={columns} dataSource={billsdata} bordered pagination={false} />
      </DefaultLayout>
    </div>
  )
}
