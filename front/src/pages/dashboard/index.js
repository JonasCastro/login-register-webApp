// import React, { useState, useEffect } from "react";
// import Navbar from "../../components/navbar";
// import FormEdit from "./components/formEdit";
// import api from "../../services/api";
// import { logout } from "../../services/auth";
// import { withRouter } from "react-router-dom";
// import "./styles.css";

// function Dashboard(props) {
//   const [users, setUsers] = useState([]);
//   const [id, setId] = useState(-1);
//   const [edit, setEdit] = useState(false);

//   useEffect(() => {
//     async function load() {
//       const response = await api.get("/users");
//       setUsers(response.data);
//     }
//     load();
//   }, []);

//   async function deleteUser(id) {
//     try {
//       await api.delete(`/users/${id}`);
//       alert("Delete Ok");
//       const response = await api.get("/users");
//       setUsers(response.data);
//     } catch (error) {
//       alert("erro" + error.response.data);
//       console.log(error.response.data);
//     }
//   }
//   async function editUser(id) {
//     try {
//       setId(id);
//     } catch (error) {
//       alert("erro" + error.response.data);
//       console.log(error.response.data);
//     }
//   }

//   return (
//     <>
//       <Navbar />
//       <h2>HTML Table Users</h2>
//       <button
//         onClick={() => {
//           logout();
//           props.history.push("/");
//         }}
//       >
//         logout
//       </button>
//       {id !== -1 && (
//         <FormEdit
//           id={id}
//           updated={async () => {
//             setId(-1);
//             const response = await api.get("/users");
//             setUsers(response.data);
//           }}
//         />
//       )}
//       <table>
//         <tbody>
//           <tr>
//             <th>ID</th>
//             <th>Name</th>
//             <th>Email</th>
//             <th>Actions</th>
//           </tr>

//           {users.map((item) => (
//             <tr key={item.id}>
//               <td>{item.id}</td>
//               <td>{item.name}</td>
//               <td>{item.email}</td>
//               <td>
//                 <button
//                   onClick={() => {
//                     editUser(item.id);
//                   }}
//                 >
//                   edit
//                 </button>
//                 <button
//                   onClick={() => {
//                     deleteUser(item.id);
//                   }}
//                 >
//                   delete
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </>
//   );
// }
// export default withRouter(Dashboard);

import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Navbar from "../../components/navbar";
import api from "../../services/api";
import AlertDelete from "./components/AlertDelete";
import { withRouter } from "react-router-dom";

import FormEdit from "./components/FormEdit";

const useStyles = makeStyles({
  title: {
    marginTop: 20,
    marginLeft: 20,
  },
  table: {
    // marginLeft: 10,
    marginTop: 20,
    minWidth: 650,
  },
  container: {
    paddingLeft: 5,
    paddingRight: 5,
  },
});

export default function Dashboard(props) {
  const classes = useStyles();

  const [users, setUsers] = useState([]);

  async function load() {
    const response = await api.get("/users");
    setUsers(response.data);
  }
  useEffect(() => {
    load();
  }, []);
  return (
    <>
      <Navbar />
      <div className={classes.container}>
        <TableContainer component={Paper}>
          <h1 className={classes.title}>Table Users</h1>
          <Table
            className={classes.table}
            size="small"
            aria-label="a dense table"
          >
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="right">Email</TableCell>
                <TableCell align="right">Edit</TableCell>
                <TableCell align="right">Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((row) => (
                <TableRow key={row.id}>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="right">{row.email}</TableCell>
                  <TableCell align="right">
                    <FormEdit id={row.id} name={row.name} load={load} />
                  </TableCell>
                  <TableCell align="right">
                    <AlertDelete id={row.id} load={load} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
}
