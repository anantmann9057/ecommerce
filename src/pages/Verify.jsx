import { useEffect, useState } from "react";
import axios from "axios";
import { Container } from "react-bootstrap";
export default function Verify() {

const [verify, setVerify]= useState(false);


  return (<Container className="align-items-center h-100">
    <p>A verification link has been sent to your email address please use that to verify your account</p>
  </Container>);
}
