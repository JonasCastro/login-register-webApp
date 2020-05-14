import React from "react";
import "./styles.css";
import { Formik, Field, Form, ErrorMessage } from "formik";
import api from "../../services/api";
import * as Yup from "yup";
import { Link, withRouter } from "react-router-dom";
import { FiLogIn } from "react-icons/fi";
class Register extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    };
  }

  render() {
    return (
      <>
        <div className="register-container">
          <div className="content">
            <section>
              <h1>Register</h1>
              <p>Make your registration, enter the platform;</p>

              <Link className="back-link" to="/">
                <FiLogIn size={16} color="#E02041" />
                Login in
              </Link>
            </section>
            <Formik
              initialValues={{
                name: "",
                email: "",
                password: "",
                confirmPassword: "",
              }}
              validationSchema={Yup.object().shape({
                name: Yup.string().required("Name is required"),
                email: Yup.string()
                  .required("Email is required")
                  .email("Email is invalid"),
                password: Yup.string().required("Password is required"),
                confirmPassword: Yup.string()
                  .oneOf([Yup.ref("password"), null], "Passwords must match")
                  .required("Confirm Password is required"),
              })}
              onSubmit={async (fields) => {
                try {
                  await api.post("/users", fields);
                  alert("Registered");
                  this.props.history.push("/");
                } catch (error) {
                  alert("erro" + error.response.data);
                  console.log(error.response.data);
                }
              }}
            >
              {({ errors, status, touched }) => (
                <Form>
                  <Field
                    placeholder="Name"
                    name="name"
                    type="text"
                    className={
                      "form-control" +
                      (errors.name && touched.name ? " is-invalid" : "")
                    }
                  />
                  <ErrorMessage
                    name="name"
                    component="p"
                    className="invalid-feedback"
                  />
                  <br />
                  <Field
                    placeholder="Email"
                    name="email"
                    type="text"
                    className={
                      "form-control" +
                      (errors.email && touched.email ? " is-invalid" : "")
                    }
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="invalid-feedback"
                  />
                  <br />
                  <Field
                    placeholder="Password"
                    name="password"
                    type="password"
                    className={
                      "form-control" +
                      (errors.password && touched.password ? " is-invalid" : "")
                    }
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="invalid-feedback"
                  />
                  <br />
                  <Field
                    placeholder="Confirm Password"
                    name="confirmPassword"
                    type="password"
                    className={
                      "form-control" +
                      (errors.confirmPassword && touched.confirmPassword
                        ? " is-invalid"
                        : "")
                    }
                  />
                  <ErrorMessage
                    name="confirmPassword"
                    component="div"
                    className="invalid-feedback"
                  />
                  <br />
                  <button type="submit" className="button">
                    Register
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </>
    );
  }
}

export default withRouter(Register);
