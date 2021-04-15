import React, { useState } from "react";
import { Container, Row, Col } from 'react-bootstrap'

export default function Footer() {
    setInterval(updateTime, 1000);
    
    const date = new Date().getFullYear()
    const now = new Date().toLocaleTimeString();
  
    const [time, setTime] = useState(now);
  
    function updateTime() {
      const newTime = new Date().toLocaleTimeString();
      setTime(newTime);
    }

return (

<footer> 
<Container fluid>
  <Row>
    <Col lg="3"><p>{time}</p></Col>
    <Col lg="9"><p>Copyright Keyjey {date}</p></Col>
  </Row>
</Container>
</footer>




    
    

)

}