import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import api from "../../../../../../services/api";
import * as Yup from "yup";
import { Link, withRouter } from "react-router-dom";
import { FiLogIn } from "react-icons/fi";

class FormE extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
    };
  }

  render() {
    return (
      <>
        <div>
          <Formik
            initialValues={{
              id: this.props.id,
              name: this.props.name,
            }}
            validationSchema={Yup.object().shape({
              name: Yup.string().required("Name is required"),
            })}
            onSubmit={async (fields) => {
              try {
                console.log(fields);

                await api.put(`/users/${fields.id}`, fields);
                this.props.edited();
              } catch (error) {
                alert("Erro");
                console.log(error);
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
                <button type="submit" className="button">
                  Send
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </>
    );
  }
}

export default withRouter(FormE);
