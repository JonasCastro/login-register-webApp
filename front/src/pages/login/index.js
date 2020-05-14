import React from "react";
import "./styles.css";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { Link, useHistory } from "react-router-dom";
import api from "../../services/api";
import * as Yup from "yup";
import { login } from "../../services/auth";
import { withRouter } from "react-router-dom";
import { FiLogIn } from "react-icons/fi";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
  }

  render() {
    return (
      <>
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={Yup.object().shape({
            email: Yup.string()
              .required("Email is required")
              .email("Email is invalid"),
            password: Yup.string().required("Password is required"),
          })}
          onSubmit={async (fields) => {
            try {
              console.log(fields);
              const response = await api.post("/session", fields);
              login(response.data.token);
              this.props.history.push("/dashboard");
            } catch (error) {
              alert("erro" + error.response.data.error);
              console.log(error.response.data);
            }
          }}
        >
          {({ errors, status, touched }) => (
            <div className="logon-container">
              <section className="form">
                <Form>
                  <h2>User Login in</h2>
                  <Field
                    placeholder="Email"
                    name="email"
                    type="text"
                    className={
                      errors.email && touched.email ? " is-invalid" : ""
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
                      errors.password && touched.password ? " is-invalid" : ""
                    }
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="invalid-feedback"
                  />
                  <br />
                  <button type="submit" className="button">
                    Login
                  </button>
                  <Link className="back-link" to="/register">
                    <FiLogIn size={16} color="#E02041" />
                    Create a new account
                  </Link>
                </Form>
              </section>
            </div>
          )}
        </Formik>
      </>
    );
  }
}

export default withRouter(Login);
