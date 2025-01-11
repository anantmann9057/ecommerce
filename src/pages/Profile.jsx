import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function Profile() {
  const [user, setUser] = useState({});

  useEffect(() => {
    axios
      .get("http://localhost:3000/auth/profile", { withCredentials: true })
      .then(function (response) {
        setUser(response.data.profile);
        console.log(response);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(function () {
        // always executed
      });
  }, []);

  return (
    <div className="container">
      <div className="container rounded bg-white m-5 border border-secondary">
        <h1 className="justify-content-center m-3">My Profile</h1>

        <div className="row">
          <div className="col-md-4 border-right w-100">
            <div className="d-flex flex-column align-items-center text-center p-3 ">
              <img
                className="rounded-circle mt-5"
                src={user.picture

                }
                width="90"
              ></img>
              <span className="font-weight-bold">{user.given_name}</span>
              <span className="text-black-50">{user.family_name}</span>
              <span>{user.address}</span>
            </div>
          </div>
          <form
            onSubmit={(event) => {
              event.preventDefault();

              axios
                .post(
                  "http://localhost:3000/auth/updateProfile",

                  user,
                  { withCredentials: true }
                )
                .then(function (response) {
                  toast(`${response.data.message}`);
                  console.log(response);
                })
                .catch(function (error) {
                  // handle error
                  console.log(error);
                })
                .finally(function () {
                  // always executed
                });
            }}
          >
            <div className="col-md-8 w-100">
              <div className="p-3 py-5">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <div className="d-flex flex-row align-items-center back">
                    <i className="fa fa-long-arrow-left mr-1 mb-1"></i>
                  </div>
                </div>
                <div className="row mt-2">
                  <div className="col-md-6">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="first name"
                      name="fName"
                      onChange={(value) => {
                        setUser({ ...user, given_name: value.target.value });
                      }}
                      value={user.given_name}
                    />
                  </div>
                  <div className="col-md-6 ">
                    <input
                      type="text"
                      className="form-control"
                      name="lName"
                      value={user.family_name}
                      onChange={(value) => {
                        setUser({ ...user, family_name: value.target.value });
                      }}
                      placeholder="Last Name"
                    />
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-md-6">
                    <input
                      type="text"
                      className="form-control"
                      name="email"
                      placeholder="Email"
                      onChange={(value) => {
                        setUser({ ...user, email: value.target.value });
                      }}
                      value={user.email}
                    />
                  </div>
                  <div className="col-md-6">
                    <input
                      type="text"
                      className="form-control"
                      name="phone"
                      value={user.phone}
                      onChange={(value) => {
                        setUser({ ...user, phone: value.target.value });
                      }}
                      placeholder="Phone number"
                    />
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-md-6">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="address"
                      name="address"
                      onChange={(value) => {
                        setUser({ ...user, address: value.target.value });
                      }}
                      value={user.address}
                    />
                  </div>
                </div>

                <div className="mt-5 text-right">
                  <button
                    className="btn btn-primary profile-button"
                    type="submit"
                  >
                    Save Profile
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
