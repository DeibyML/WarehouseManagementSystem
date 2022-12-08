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
      <body>
        <Container>
          <Row>
            {" "}
            <section className="body">
              <h2>What are Warehouse Management Systems (WMS)?</h2>
              <p>
                Gartner defines a warehouse management system (WMS) as "a
                software application that helps manage the operations of a
                warehouse or distribution center (DC)." WMS applications offer
                capabilities such as receiving, put-away, stock locating,
                inventory management, cycle counting, task interleaving, wave
                planning, order allocation, order picking, replenishment,
                packing, shipping, labor management and automated
                materials-handling equipment interfaces. These systems
                incorporate mobile devices along with bar code and, possibly,
                RFID scanning/sensing to form the transactional foundation of a
                WMS. Gartner includes integrated functionality what we refer to
                as extended WMS capabilities as components of a WMS evaluation.
                These include labor management, slotting, yard management, voice
                picking, parcel manifesting, value-added services, light
                manufacturing/kitting and third-party logistics (3PL) billing.
                We do not, however, consider stand-alone solutions in these
                areas as part of this market
              </p>
              <h4>Our Mission</h4>
              <ul>
                <li className="lista">
                  We believe the Code can only be implemented by working in
                  partnership with our suppliers. This partnership must be based
                  on trust, transparency and co-operation.
                </li>
              </ul>
              <h4>Our Vision</h4>
              <ul>
                <li className="lista">
                  A warehouse is a facility that, along with storage racks,
                  handling equipment and personnel and management resources,
                  allows us to control the differences between the incoming flow
                  of goods (received from suppliers, production centers, etc.)
                  and the outgoing flow of goods (goods being sent to
                  production, sales, etc.). Usually, these flows are not
                  coordinated, and this is one of the reasons why it is
                  important to have storage facilities.
                </li>
              </ul>
            </section>
          </Row>
        </Container>
      </body>

      <footer>
        <div className="linea"></div>
        <h2 className="footer">Our Clients</h2>
        <Container>
          <Row lg={8}>
            <Carousel fade>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src="https://images.pexels.com/photos/413279/pexels-photo-413279.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt="First slide"
                  width="100%"
                  height="500px"
                />
                <Carousel.Caption>
                  <h3>Apple</h3>
                  <p>live the amazing experience</p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src="https://images.pexels.com/photos/988952/pexels-photo-988952.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt="Second slide"
                  width="100%"
                  height="500px"
                />

                <Carousel.Caption>
                  <h3>Pepsi</h3>
                  <p>because we know you can not drink only one </p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src="https://images.pexels.com/photos/1447254/pexels-photo-1447254.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt="Third slide"
                  width="100%"
                  height="500px"
                />

                <Carousel.Caption>
                  <h3>Samsung</h3>
                  <p>live the real meaning of techonology</p>
                </Carousel.Caption>
              </Carousel.Item>
            </Carousel>
          </Row>
        </Container>
      </footer>
      <Container>
        <Row>
          <div className="last">
            <h2>about us</h2>

            <p className="body">
              Warehouse Canada was established right after Covid 19 pandemic,
              but that did not scare or hinder our founders. We have been
              growing steadily since, and we are happy to serve you. We have
              highly trained customer service representatives that know the ins
              and outs of our products. Many of them are knowledgeable in home
              remodeling, and therefore can provide more qualified answers to
              your questions.
            </p>
          </div>
        </Row>
      </Container>
      <Container>
        <div className="linea"></div>
        <div className="title-faq">
          <h2>Frequently Asked Questions</h2>
        </div>
        <div className="linea"></div>
        <div className="">
          <Row>
            <Col lg={6}>
              <h4>
                How many types of vendors are there available in the Warehouse
                Management Systems market?
              </h4>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <b>Application mega-suite vendors : </b>Offering broad
                  portfolios of applications across most application categories.
                </li>
                <li className="list-group-item">
                  <b>Supply chain management (SCM) suite vendors:</b> Providing
                  a holistic warehouse management system as well as two or more
                  applications primarily based on supply chain management.
                </li>
                <li className="list-group-item">
                  <b>Specialist WMS suite vendors:</b> Independent software
                  vendors that focus primarily, but not exclusively, on holistic
                  WMS suites.
                </li>
                <li className="list-group-item">
                  <b>Independent WMS component vendors:</b> Not providing a full
                  WMS, but instead offering stand-alone components to supplement
                  a WMS
                </li>
                <li className="list-group-item">
                  <b>Material handling equipment/automation vendors:</b>{" "}
                  Primarily focusing on supporting the electromechanical aspects
                  of large-scale, automated warehouses.
                </li>
              </ul>
            </Col>
            <Col lg={1}>
              <div className="vl"></div>
            </Col>
            <Col lg={5}>
              <h4>
                What factors should be considered while choosing a warehouse
                management system?
              </h4>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  Determine the people, process, organizational, data, and
                  technology needs of each warehouse operation and focus WMS
                  evaluations on the appropriate use cases
                </li>
                <li className="list-group-item">
                  Target the solutions best suited to their distinctive WMS use
                  cases by developing a right-fit shortlist of vendors and
                  solutions.
                </li>
                <li className="list-group-item">
                  Embrace the importance of soft needs and benefits by
                  reconciling the competing interests of functionality versus
                  intangible characteristics such as usability, adaptability,
                  implementation support, and simplicity.
                </li>
              </ul>
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  );
};
