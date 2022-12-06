import { useEffect, useState } from 'react';
import './Orders.css';
import { Button, Card } from 'react-bootstrap';
import { Order } from '../../models/order';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShop, faPerson, faDollarSign, faListNumeric, faPen, faTrash, faCalendar } from "@fortawesome/free-solid-svg-icons";
import { Col, Row } from 'react-bootstrap';
import axios from 'axios';
import toast from 'react-hot-toast';
import { NewOrder } from './NewOrder';
import { Constants } from '../../constants';

export const Orders = () => {

  const [orderItems, setItems] = useState([]);
  const [showCreate, setShowCreate] = useState(false);

  let newOrder = () => {
    alert("come")
  }

  useEffect(() => {
    const getOrders = async () => await axios.get(Constants.SERVER_URL + Constants.CONTROLLER_ORDER);

    getOrders().then(resp => {
      if (resp.data) {
        setItems(resp.data);
      }
    });
  }, [])

  let removeOrder = (id: number) => {
    return toast(id.toString());
  };
  return (
    <div>
      <div className="title">
        <h2><FontAwesomeIcon icon={faShop} size="xs" /> Orders</h2>
      </div>

      <div className="new">
        <Button onClick={() => setShowCreate(true)} variant="outline-primary">New Order</Button>{' '}
        <NewOrder show={showCreate} close={() => setShowCreate(false)}></NewOrder>
      </div>

      <Row>
        {
          orderItems?.map((order: Order) => {
            return (
              <Col key={order._id} style={{ margin: '1rem' }}>
                <Card style={{ width: '17rem', minHeight: '12rem', textAlign: 'center' }}>
                  <Card.Body>
                    <Card.Title>Order #{order.id}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                      Status: {order.status}
                    </Card.Subtitle>
                    <Card.Body>
                      <Row>
                        <Col xs={6}><FontAwesomeIcon icon={faPerson} size="xs" /><strong> Customer name:</strong></Col>
                        <Col xs={6}>{order.clientName}</Col>
                      </Row>
                      <hr />
                      {/* <Row>
                        <Col xs={6}><FontAwesomeIcon icon={faHouse} size="xs" /><strong> Address:</strong></Col>
                        <Col xs={6}>{order.Address}</Col>
                      </Row> 
                      <hr />*/}
                      <Row>
                        <Col xs={6}><FontAwesomeIcon icon={faDollarSign} size="xs" /><strong> Order total:</strong></Col>
                        <Col xs={6}>${order.total}</Col>
                      </Row>
                      <hr />
                      <Row>
                        <Col xs={6}><FontAwesomeIcon icon={faCalendar} size="xs" /><strong> Date:</strong></Col>
                        <Col xs={6}>{new Date(order.date).toDateString()}</Col>
                      </Row>
                      <hr />
                      <Row>
                        <Col xs={6}><FontAwesomeIcon icon={faListNumeric} size="xs" /><strong> Products:</strong></Col>
                        <Col xs={6}>{ order.products?.map((prod, idx, array) => {
                          return (
                            <p>{prod.name}{idx == array.length - 1 ? '.' : ','} </p>
                          )})}
                        </Col>
                      </Row>
                    </Card.Body>
                    <Card.Footer>
                      <Card.Link style={{ cursor: 'pointer' }}><FontAwesomeIcon icon={faPen} size="xs" /> Update</Card.Link>
                      <Card.Link onClick={() => removeOrder(order.id)} style={{ cursor: 'pointer' }}><FontAwesomeIcon icon={faTrash} size="xs" /> Remove </Card.Link>
                    </Card.Footer>
                  </Card.Body>
                </Card>
              </Col>
            )
          })
        }
      </Row>
    </div>
  )
}

