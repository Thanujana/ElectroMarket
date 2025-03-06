import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { FaUserShield, FaUsers, FaBox, FaClipboardList, FaChartLine } from "react-icons/fa";

const AdminDashboard = () => {
  return (
    <Container className="mt-4 text-center">
      {/* Admin Header */}
      <FaUserShield size={50} color="blue" />
      <h2 className="mt-3">Admin Panel</h2>
      <p>Navigate using the sidebar to manage the system.</p>

      {/* Quick Stats */}
      <Row className="mt-4">
        <Col md={3}>
          <Card className="shadow-sm p-3">
            <FaUsers size={40} color="green" />
            <h5 className="mt-2">Total Users</h5>
            <p>150</p>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="shadow-sm p-3">
            <FaBox size={40} color="orange" />
            <h5 className="mt-2">Products</h5>
            <p>320</p>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="shadow-sm p-3">
            <FaClipboardList size={40} color="red" />
            <h5 className="mt-2">Orders</h5>
            <p>125</p>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="shadow-sm p-3">
            <FaChartLine size={40} color="blue" />
            <h5 className="mt-2">Sales</h5>
            <p>$10,500</p>
          </Card>
        </Col>
      </Row>

      {/* Recent Activity */}
      <Row className="mt-5">
        <Col>
          <Card className="p-3 shadow-sm">
            <h4>Recent Activity</h4>
            <ul className="list-unstyled">
              <li>✅ New user registered: JohnDoe</li>
              <li>📦 5 new products added</li>
              <li>📊 Sales report generated</li>
              <li>🛒 Order #1023 approved</li>
            </ul>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminDashboard;
