import { SearchOutlined, TagOutlined } from "@ant-design/icons"
import { Button, Col, Divider, Form, Input, Row, } from "antd"
import axios from "axios"
import { useState } from "react"
import { BASE_URL } from "../config/config"

const SearchText = ({ setApidata, FetchData }) => {
  const [ optionData, setoptionData ] = useState([]);
  const [ display, setDisplay ] = useState(false);

 const onChange = (e) => {
  console.log(typeof(e))
  if (e) {
  const search_term = e;
  axios(`${BASE_URL}/usersfilter/${search_term}`, {
    method: 'GET',
   }).then((resp) => {
     setoptionData(resp.data)
     console.log(resp.data)
     setDisplay(true);
     FetchData()
   }).catch((err) => console.log(err));
  }
 }

 const GetById = (id) => {
  setDisplay(false)
  axios(`${BASE_URL}/postusers/${id}`, {
    method: 'GET',
   }).then((resp) => {
     console.log(resp.data)
     setApidata(resp.data)
   }).catch((err) => console.log(err));
  }


 return(
  <>
     <Form.Item label='Search Cribs' placeholder='Search' name='Search_term' style={{width: '90%'}}>
      <Row gutter={10}>
        <Col span={8}>
        <Input 
        placeholder="Please Enter Text"
        suffix={<SearchOutlined />}
        allowClear
          onChange={(e) => {onChange(e.target.value)}}
         />
         {
          display === true ? 
          <div id='s_box' style={{
            position: "absolute",
            zIndex: 100,
            backgroundColor: 'white',
            cursor: 'pointer',
            padding: '15px',
            width: '97%',
             boxShadow:  '0 2.8px 2.2px rgba(0, 0, 0, 0.1)'
          }}>
         {
          optionData !== '' ? optionData.map((item) => {
            return <p onClick={() => {
              GetById(item.id)
            }} ><TagOutlined style={{marginRight: '10px'}}/>{item.name}</p>
           }) : null
         }
         <Divider />
         <Button onClick={() => {setDisplay(false)}} style={{float: 'rigth'}}>Close</Button>
        </div> : false
         }
        </Col>
      </Row>
      </Form.Item>
  </>
 )
}
export default SearchText