import React, { useEffect, useState } from "react";
import DefaultLayout from "../components/Defaultlayout";
import { useDispatch, useSelector } from "react-redux";
import {
  DeleteOutlined,
  PlusCircleOutlined,
  MinusCircleOutlined,
} from "@ant-design/icons";
import { Button, Table,Modal,message,Form,Input,Select } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function CartPage() {

const[subtotal,setsubtotal]=useState(0)

const[billpopup,setbillpopup]=useState(false)

const navigate=useNavigate();



  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.rootReducer);
  const handleincrement = (record) => {
    dispatch({
      type: "UPDATE_CART",
      payload: { ...record, quantity: record.quantity + 1 },
    });
  };

  const handledecrement = (record) => {
    if (record.quantity !== 1) {
      dispatch({
        type: "UPDATE_CART",
        payload: { ...record, quantity: record.quantity - 1 },
      });
    }
  };

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
      title: "Quantity",
      dataIndex: "_id",
      render: (id, record) => (
        <div>
          <MinusCircleOutlined
            className="mx-3"
            style={{ cursor: "pointer" }}
            onClick={() => handledecrement(record)}
          />{" "}
          <b>{record.quantity}</b>{" "}
          <PlusCircleOutlined
            className="mx-3"
            style={{ cursor: "pointer" }}
            onClick={() => handleincrement(record)}
          />{" "}
        </div>
      ),
    },
    {
      title: "Actions",
      dataIndex: "_id",
      render: (id, record) => (
        <DeleteOutlined
          style={{ cursor: "pointer" }}
          onClick={() => dispatch({
            type:'DELETE_FROM_CART',
            payload:record
          })}
        />
      ),
    },
  ];


  useEffect(()=>{
let temp=0;
cartItems.forEach(item => temp = temp+(item.price*item.quantity));
setsubtotal(temp);
  },[cartItems])
//handle submit

const handleSubmit=async (value)=>{
try {

  const newObject={
    ...value,
    cartItems,
    subtotal,
    tax:Number(((subtotal/100)*10).toFixed(2)),
    totalAmount:Number(Number(subtotal) +Number(((subtotal/100)*10).toFixed(2))),
    userId:JSON.parse(localStorage.getItem('auth'))._id
  }
await axios.post('/api/bills/add-bills',newObject)
message.success('Bill Generated')
navigate('/bills')

} catch (error) {
  message.error('Something went wrong')
  message.error('Something went wrong')
  console.log(error)
}

}



  return (
    <DefaultLayout>
      <h1>Cart Page</h1>
      <Table columns={columns} dataSource={cartItems} bordered />
      <div className="d-flex flex-column align-items-end">
<hr/>
<h3>SUB-TOTAL : <b> $ {subtotal}</b>/- {" "} </h3>
<Button onClick={()=>setbillpopup(true)} style={{background:"green",color:"white"}}>Create Invoice</Button>
      </div>
      <Modal open={billpopup } title="Create Invoice"  onCancel={()=>setbillpopup(false)} footer={false}>
      <Form layout='vertical'  onFinish={handleSubmit}>

<Form.Item name='customerName' label=" Customer Name">
<Input />
</Form.Item>

<Form.Item name='customerNumber' label=" Customer Number">
<Input />
</Form.Item>



<Form.Item name='paymentMode' label='Payment Method' style={{marginBottom:"40px"}}>
<Select>
<Select.Option value="cash">Cash</Select.Option>
<Select.Option value="card">Card</Select.Option>

</Select>
</Form.Item>
<div className="bill-it">
<h4>

  SUB TOTAL : <b>{subtotal}</b>
</h4>
<h4>
TAX : <b>{((subtotal/100)*10).toFixed(2)}</b>
</h4>
<h4>
  GRAND TOTAL : <b>
{Number(subtotal) +Number(((subtotal/100)*10).toFixed(2))}

  </b>
</h4>

</div>
<div className='d-flex justify-content-end'><Button type='primary' htmlType='submit'>Generate Bill</Button></div>
  </Form>
      </Modal>
    </DefaultLayout>
  );
}
