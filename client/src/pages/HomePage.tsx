import "../components/homepage.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Carousel from "react-bootstrap/Carousel";

export const HomePage = () => {
  return (
    <div>
      <div className="title-header">
        <header>
          <h2>Warehouse Management System</h2>
        </header>
      </div>
      <div className="linea"></div>
      <body className="body">
        <Container>
          <Row>
            <Col md={8}>
              {" "}
              <section>
                <h2>about us</h2>
                <p>
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Labore eligendi aliquid ipsa voluptatibus consectetur officia
                  eos dolorum non alias amet odio eius dignissimos similique,
                  enim quo cum aspernatur dicta omnis?
                </p>
                <h4>Our Mission</h4>
                <ul>
                  <li>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Incidunt esse amet ipsum, nulla, consectetur exercitationem
                    odit in earum similique laudantium excepturi sit animi
                    repellendus, cum nostrum maiores magni illo officiis. Lorem
                    ipsum dolor sit, amet consectetur adipisicing elit.
                    Perspiciatis vero facere atque quasi consequatur eum totam
                    aspernatur excepturi illum! Laboriosam facere quisquam a
                    temporibus, porro distinctio vero voluptas possimus
                    voluptates?
                  </li>
                </ul>
                <h4>Our Vision</h4>
                <ul>
                  <li>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Incidunt esse amet ipsum, nulla, consectetur exercitationem
                    odit in earum similique laudantium excepturi sit animi
                    repellendus, cum nostrum maiores magni illo officiis. Lorem
                    ipsum dolor sit amet, consectetur adipisicing elit. Nobis
                    voluptas aliquam quia consectetur asperiores, voluptatum,
                    modi, perferendis doloremque quisquam numquam maiores soluta
                    nam eligendi labore quis veniam assumenda praesentium in.
                  </li>
                </ul>
              </section>
            </Col>

            <Col md={4}>
              <Carousel fade>
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src="https://images.pexels.com/photos/413279/pexels-photo-413279.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                    alt="First slide"
                    width="100%"
                    height="300px"
                  />
                  <Carousel.Caption>
                    <h3>Apple</h3>
                    <p>
                      Nulla vitae elit libero, a pharetra augue mollis interdum.
                    </p>
                  </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src="https://images.pexels.com/photos/988952/pexels-photo-988952.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                    alt="Second slide"
                    width="100%"
                    height="300px"
                  />

                  <Carousel.Caption>
                    <h3>Pepsi</h3>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </p>
                  </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src="https://images.pexels.com/photos/1447254/pexels-photo-1447254.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                    alt="Third slide"
                    width="100%"
                    height="300px"
                  />

                  <Carousel.Caption>
                    <h3>Samsung</h3>
                    <p>
                      Praesent commodo cursus magna, vel scelerisque nisl
                      consectetur.
                    </p>
                  </Carousel.Caption>
                </Carousel.Item>
              </Carousel>
            </Col>
          </Row>
        </Container>
      </body>

      <footer>
        <Container>
          <Row>
            <div className="linea"></div>
            <h2 className="footer">lorem</h2>
            <p className="footer">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente
              corporis iusto fugiat ex tempore explicabo dignissimos, amet quas
              obcaecati animi ea libero rerum, assumenda perspiciatis iste
              aperiam voluptatum, magnam est! Lorem ipsum dolor sit amet
              consectetur, adipisicing elit. Error natus distinctio minima
              beatae ullam velit! Debitis amet eum harum, laborum ad commodi
              nulla saepe quod, sint quibusdam dolore qui at! Lorem ipsum dolor
              sit amet consectetur adipisicing elit. Ad ipsa doloremque in,
              dolore harum iusto tenetur, adipisci illum placeat saepe
              consectetur mollitia quidem provident unde sed! Expedita mollitia
              ex quas.
            </p>
          </Row>
        </Container>
      </footer>
    </div>
  );
};
