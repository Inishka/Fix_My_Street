import { deleteUser } from "../../Service/AdminService";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import React, { useState, useEffect } from "react";
import EditIcon from "@mui/icons-material/Edit";
import Snackbar from "../Common/SnackBar";
import { UpdateDisabledSharp } from "@mui/icons-material";
import EditForm from "./EditForm";

export default function UserDetails({ user, setUserDeatils }) {
  const [open, setOpen] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const { fname, lname, email, dob, uid, gender, role, status } = user;

  return (
    <>
      <tr>
        <td>{fname}</td>
        <td>{lname}</td>
        <td>{email}</td>
        <td>{dob}</td>
        <td>
          {/* <Button
            variant="outlined"
            color="primary"
            startIcon={<EditIcon />}
            onClick={() => {
              console.log(user);
              setUserDeatils({
                fname,
                lname,
                email,
                dob,
                uid,
                gender,
                role,
                status,
              });
            }}
          >
            Edit
          </Button> */}
          <Button
            variant="outlined"
            color="primary"
            startIcon={<EditIcon />}
            onClick={() => {
              setFormOpen(true);
            }}
          >
            Edit
          </Button>
          <EditForm
            open={formOpen}
            handleClose={() => {
              setFormOpen(false);
            }}
          />
        </td>
        <td></td>
        <td>
          <Snackbar
            message={"User is Deleted Successfully"}
            uid={uid}
            name="Delete"
            startIcon={<DeleteIcon />}
            open={open}
            setOpen={setOpen}
            onClick={() => {
              setOpen(true);
              deleteUser(uid);
              console.log(uid);
            }}
            severity="success"
          />
        </td>
      </tr>
    </>
  );
}
