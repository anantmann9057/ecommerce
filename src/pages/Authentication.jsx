import { useState,useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { toast } from "react-toastify";
import { GoogleLogin } from "@react-oauth/google";

export default function Authentication() {
  const [getEmail, setEmail] = useState("");
  const [mailSent, setMailSent] = useState(false);
  const [ user, setUser ] = useState([]);
  const [ profile, setProfile ] = useState([]);
  const sendMail = (email) => {
    axios
      .post("http://localhost:3000/auth/generate-link", {
        email: email,
      })
      .then(function (response) {
        toast(`${response.data.message}`);
        setMailSent(true);
        console.log(response.data);
      })
      .catch(function (error) {
        // handle error
        toast(`${error}`);
      })
      .finally(function () {
        // always executed
      });
  };
 

  return (
    <div
      className="container w-100 d-flex justify-content-center"
      style={{
        height: "100vh",
      }}
      onSubmit={(event) => {
        event.preventDefault();
      }}
    >
      <div className="align-self-center">
        <div className="container w-100 d-flex justify-content-center">
          <h1>Login</h1>
        </div>
        {mailSent === false ? (
          <Form className="container">
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                onChange={(value) => {
                  setEmail(value.target.value);
                  console.log(value.target.value);
                }}
              />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Button
              variant="primary"
              className="w-100"
              type="submit"
              onClick={() => {
                sendMail(getEmail);
              }}
            >
              Submit
            </Button>
          </Form>
        ) : (
          <h1>
            A mail has been sent to your profile please check to authenticate
          </h1>
        )}
          <h6 className="d-flex justify-content-center mt-5">Or</h6>
        <div className="d-flex justify-content-center mt-5">
        
          <GoogleLogin onSuccess={(success)=>{
            console.log(success);
            axios
            .post("http://localhost:3000/auth/googleAuth", {
              credential: success.credential,
            })
            .then(function (response) {
              toast(`${response.data.message}`);
              setMailSent(true);
              console.log(response.data);
            })
            .catch(function (error) {
              // handle error
              toast(`${error}`);
            })
            .finally(function () {
              // always executed
            });
          }} onError={(error)=>{

          }} />
          <p>{user.credentials}</p>
        </div>
      </div>
    </div>
  );
}
