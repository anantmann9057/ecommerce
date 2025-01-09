import { useState, useEffect } from "react";
import axios from "axios";
import { data } from "react-router-dom";
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
      <div class="container rounded bg-white m-5 border border-secondary">
        <h1 className="justify-content-center m-3">My Profile</h1>

        <div class="row">
          <div class="col-md-4 border-right w-100">
            <div class="d-flex flex-column align-items-center text-center p-3 ">
              <img
                class="rounded-circle mt-5"
                src="https://i.imgur.com/0eg0aG0.jpg"
                width="90"
              ></img>
              <span class="font-weight-bold">{user.fName}</span>
              <span class="text-black-50">{user.email}</span>
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
            <div class="col-md-8 w-100">
              <div class="p-3 py-5">
                <div class="d-flex justify-content-between align-items-center mb-3">
                  <div class="d-flex flex-row align-items-center back">
                    <i class="fa fa-long-arrow-left mr-1 mb-1"></i>
                  </div>
                </div>
                <div class="row mt-2">
                  <div class="col-md-6">
                    <input
                      type="text"
                      class="form-control"
                      placeholder="first name"
                      name="fName"
                      onChange={(value) => {
                        setUser({ ...user, fName: value.target.value });
                      }}
                      value={user.fName}
                    />
                  </div>
                  <div class="col-md-6 ">
                    <input
                      type="text"
                      class="form-control"
                      name="lName"
                      value={user.lName}
                      onChange={(value) => {
                        setUser({ ...user, lName: value.target.value });
                      }}
                      placeholder="Last Name"
                    />
                  </div>
                </div>
                <div class="row mt-3">
                  <div class="col-md-6">
                    <input
                      type="text"
                      class="form-control"
                      name="email"
                      placeholder="Email"
                      onChange={(value) => {
                        setUser({ ...user, email: value.target.value });
                      }}
                      value={user.email}
                    />
                  </div>
                  <div class="col-md-6">
                    <input
                      type="text"
                      class="form-control"
                      name="phone"
                      value={user.phone}
                      onChange={(value) => {
                        setUser({ ...user, phone: value.target.value });
                      }}
                      placeholder="Phone number"
                    />
                  </div>
                </div>
                <div class="row mt-3">
                  <div class="col-md-6">
                    <input
                      type="text"
                      class="form-control"
                      placeholder="address"
                      name="address"
                      onChange={(value) => {
                        setUser({ ...user, address: value.target.value });
                      }}
                      value={user.address}
                    />
                  </div>
                </div>

                <div class="mt-5 text-right">
                  <button class="btn btn-primary profile-button" type="submit">
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
