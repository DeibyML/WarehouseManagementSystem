import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import { OrdersService } from '../api/orders-service';
import { Order } from '../models/order';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShop, faPerson, faDollarSign, faHouse, faPen, faTrash, faCalendar } from "@fortawesome/free-solid-svg-icons";
import { Col, Container, Row } from 'react-bootstrap';

let orderInitial: Order[] = [
  {
    Id: 1,
    Date: new Date(),
    Status: 'Processing',
    Price: 25.8,
    CustomerName: 'Bill Gates',
    Address: '3126 McArthu St'
  },
  {
    Id: 2,
    Date: new Date(),
    Status: 'Delivered',
    Price: 48.3,
    CustomerName: 'Deiby Montoya',
    Address: '35 Lincoln 23'
  }, {
    Id: 3,
    Date: new Date(),
    Status: 'Pending',
    Price: 25.8,
    CustomerName: 'Bill Gates',
    Address: '3126 McArthu St'
  }];

export const Orders = () => {

  const [orderItems, setItems] = useState(orderInitial);

  let removeOrder = (id: number) => {
    setItems((ord:Order[]) => {
      return ord.filter((ord:Order) => ord.Id != id)
    })
  };
  return (
    <div>

      <Row>
        <h2 style={{ margin: '1rem' }}><FontAwesomeIcon icon={faShop} size="xs" /> Orders</h2>
        {
          orderItems?.map((order: Order, idx: number) => {
            return (
              <Col key={order.Id.toString()} style={{ margin: '1rem' }}>
                <Card style={{ width: '16rem', minHeight: '12rem', textAlign: 'center' }}>
                  <Card.Body>
                    <Card.Title>Order #{order.Id}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                      Status: {order.Status}
                    </Card.Subtitle>
                    <Card.Body>
                      <Row>
                        <Col xs={6}><FontAwesomeIcon icon={faPerson} size="xs" /><strong> Customer name:</strong></Col>
                        <Col xs={6}>{order.CustomerName}</Col>
                      </Row>
                      <hr />
                      <Row>
                        <Col xs={6}><FontAwesomeIcon icon={faHouse} size="xs" /><strong> Address:</strong></Col>
                        <Col xs={6}>{order.Address}</Col>
                      </Row>
                      <hr />
                      <Row>
                        <Col xs={6}><FontAwesomeIcon icon={faDollarSign} size="xs" /><strong> Order total:</strong></Col>
                        <Col xs={6}>${order.Price}</Col>
                      </Row>
                      <hr />
                      <Row>
                        <Col xs={6}><FontAwesomeIcon icon={faCalendar} size="xs" /><strong> Date:</strong></Col>
                        <Col xs={6}>{order.Date.toLocaleDateString()}</Col>
                      </Row>
                    </Card.Body>
                    <Card.Footer>
                      <Card.Link style={{ cursor: 'pointer' }}><FontAwesomeIcon icon={faPen} size="xs" /> Update</Card.Link>
                      <Card.Link onClick={() => removeOrder(order.Id)} style={{ cursor: 'pointer' }}><FontAwesomeIcon icon={faTrash} size="xs" /> Remove </Card.Link>
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

