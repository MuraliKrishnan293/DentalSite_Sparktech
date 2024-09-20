import React from 'react';
import { Container, Row, Col, Card, Image } from 'react-bootstrap';
import "../Styles/abt.css";

const AboutUs = () => {
  return (
    <Container fluid style={{ maxWidth: '1000px', margin: 'auto' }}>
      <Row className="my-4">
        <Col>
          <h1 className="text-center mb-4">About Us</h1>
          <p>
            Welcome to our dental clinic! We are dedicated to providing high-quality dental care to our patients. Our team of skilled professionals is committed to helping you achieve optimal oral health and a beautiful smile.
          </p>
          <Image src="path_to_your_image.jpg" fluid className="my-4" />
          <h2>Our Mission</h2>
          <p>
            Our mission is to deliver exceptional dental care with a focus on patient comfort and satisfaction. We strive to make every visit a positive experience and are committed to ongoing education and advanced techniques in dentistry.
          </p>
          <h2>Our Team</h2>
          <Row>
            <Col md={4}>
              <Card>
                <Card.Img variant="top" src="team_member_1.jpg" />
                <Card.Body>
                  <Card.Title>Dr. Jane Doe</Card.Title>
                  <Card.Text>
                    Dr. Jane Doe is a seasoned dentist with over 15 years of experience in the field. She specializes in preventive care and is passionate about educating patients on maintaining excellent oral health.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card>
                <Card.Img variant="top" src="team_member_2.jpg" />
                <Card.Body>
                  <Card.Title>Dr. John Smith</Card.Title>
                  <Card.Text>
                    Dr. John Smith is an expert in cosmetic dentistry and restorative treatments. His attention to detail and artistic approach ensures that every smile he works on is both functional and beautiful.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card>
                <Card.Img variant="top" src="team_member_3.jpg" />
                <Card.Body>
                  <Card.Title>Dr. Emily Brown</Card.Title>
                  <Card.Text>
                    Dr. Emily Brown focuses on pediatric dentistry and loves working with children to create positive dental experiences. Her gentle approach helps children feel comfortable and confident about their dental visits.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <h2>Our Services</h2>
          <p>
            We offer a wide range of dental services, including:
          </p>
          <ul>
            <li>Preventive care</li>
            <li>Restorative dentistry</li>
            <li>Cosmetic procedures</li>
            <li>Pediatric dentistry</li>
          </ul>
          <p>
            Our state-of-the-art facility is equipped with the latest technology to ensure that you receive the best possible care. We look forward to welcoming you to our clinic!
          </p>
        </Col>
      </Row>
    </Container>
  );
}

export default AboutUs;