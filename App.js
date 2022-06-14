/* eslint-disable jsx-a11y/anchor-is-valid */
import './App.css';
import 'antd/dist/antd.css';
import { Table, Card, message, Spin, Form, Row, Col, Button,} from 'antd';
import { useEffect, useState } from 'react';
import  FormComp  from './form/form';
import axios from 'axios';

//antd icons
import { PlusOutlined, SyncOutlined } from '@ant-design/icons';

import SearchText from './search';
import { BASE_URL } from './config/config';

function App() {
  const [isOpen, setOpen] = useState(false);
  const [ apidata, setApidata ] = useState([]);
  const [ formType, setformType ] = useState();
  const [ currentRecords, setCurrentRecords ] = useState();
  const [ spin, setspin ] = useState(false);

  //open the model
  const handleOpen = (type) => {
    setformType(type)
    setOpen(true);
  }
  //close modal
  const handleClose = () => {
    setOpen(false);
  }

  //fetch data from backend
  const FetchData = () => {
    console.log('api called')
    axios(`${BASE_URL}/users`, {
      method: 'GET',
    }).then((res) => {
      setApidata(res.data)
      console.log(apidata)
    })
  }

  // pass the id to delete the respective data
  const DeleteUser = (id) => {
    axios(`${BASE_URL}/postusers/${id}`, {
      method: 'DELETE',
    }).then((res) => {
      message.success(res.data)
      FetchData()
    }).then((err) => {
    })
  }

  const columns = [
    {
      title: 'Cribs',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Location',
      dataIndex: 'location',
      key: 'age',
    },
    {
      title: 'Action',
      key: 'operation',
      fixed: 'right',
      width: 100,
      render: (_, records) => (
        <a
        onClick={() => {
          setCurrentRecords(records)
          handleOpen('edit')
        }}
        >Edit</a>
      ),
    },
    {
      title: 'Action',
      key: 'operation',
      fixed: 'right',
      width: 100,
      render: (_, records) => (
        <a
        onClick={() => {
          DeleteUser(records.id)
        }}
        >Delete</a>
      ),
    },
  ];

  useEffect(() => {
    FetchData()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  return (
    <div>
    <Form style={{marginTop: '5%', marginLeft: '5%'}}>
        <Row>
          <Col span={19}>
             <SearchText setApidata={setApidata} FetchData={FetchData} />
          </Col>
          <Col span={1}>
            <Button icon={<SyncOutlined/> } onClick={() => {FetchData()}} />
          </Col>
          <Col span={4}>
             <Button type='primary' onClick={() => {handleOpen('create')}}><PlusOutlined />Add Records</Button>
          </Col>
        </Row>
       </Form>
    <Card style={{padding: '5px'}}>
     <Spin spinning={spin}>
     <Table
     pagination={true}
     size='middle'
     style={{
      padding: '30px'
     }}
     columns={columns}
      dataSource={apidata}
       />
    </Spin>
    </Card>
      <FormComp
        setspin={setspin}
        formType={formType}
        currentRecords={currentRecords}
        FetchData={FetchData}
        handleClose={handleClose}
        isOpen={isOpen}
       />
    </div>
  );
}

export default App;
