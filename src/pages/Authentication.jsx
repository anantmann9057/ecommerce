import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
//http://localhost:3000/
export default function Authentication() {
  const [getEmail, setEmail] = useState("");
  const [mailSent, setMailSent] = useState(false);

  const sendMail = (email) => {
    debugger;
    axios
      .post("http://localhost:3000/auth/generate-link", {
        email: email,
      })
      .then(function (response) {
        toast(`${response.data}`);
        setMailSent(true)
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
      className="container w-100 d-flex justify-content-center h-100 d-inline-block"
      onSubmit={(event) => {
        event.preventDefault();
      }}
    >
      <div>
        {mailSent === false ? (
          <Form className="container m-5">
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
                debugger;
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
      </div>
    </div>
  );
}
