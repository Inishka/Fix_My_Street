import {
  Alert,
  Backdrop,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Slide,
  Snackbar,
  TextField,
} from "@mui/material";
import React, { useState, useEffect, forwardRef } from "react";

const EditForm = (props) => {
  const [form, handleForm] = useState({});
  const [errors, handleErrors] = useState({});
  const [response, handleResponse] = useState({
    loading: false,
    open: false,
  });
  const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
  const handleChange = (e) => {
    handleForm((form) => ({ ...form, [e.target.name]: e.target.value }));
  };

  const handleBlur = (e) => {
    if (e.target.value === "" || e.target.value === " ") {
      handleErrors((errors) => ({
        ...errors,
        [e.target.name]: `${e.target.name} is required.`,
      }));
    } else {
      handleErrors((errors) => {
        let error = { ...errors };
        delete error[e.target.name];
        return error;
      });
    }
  };

  const handleSubmit = () => {
    console.log("hi");
  };

  return (
    <>
      <Dialog
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="form-dialog-title"
        TransitionComponent={Transition}
      >
        <Backdrop open={response.loading}>
          <CircularProgress color="inherit" />
        </Backdrop>
        <Snackbar
          open={response.open}
          autoHideDuration={6000}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <Alert severity={response.severity}>{response.message}</Alert>
        </Snackbar>
        <DialogTitle id="form-dialog-title">Edit Profile</DialogTitle>

        <DialogContent>
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                id="fname"
                name="fname"
                label="First name"
                type="text"
                fullWidth
                value={form?.fname}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.fname !== undefined}
                helperText={errors.fname}
              />
            </Grid>

            <Grid item xs={6}>
              <FormControl variant="outlined" fullWidth>
                <InputLabel id="blood-type">Blood Type</InputLabel>
                <Select
                  labelId="Gender"
                  id="gender"
                  label="Gender"
                  name="gender"
                  value={form?.type}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors?.type}
                >
                  <MenuItem value=" ">
                    <em>None</em>
                  </MenuItem>
                  {["Male", "Female", "Other"].map((type, idx) => (
                    <MenuItem value={type} key={idx}>
                      {type}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            type="submit"
            variant="contained"
            color="secondary"
            onClick={handleSubmit}
          >
            Save
          </Button>
          <Button
            onClick={() => {
              props.handleClose();
              handleResponse({
                loading: false,
                open: false,
              });
            }}
            color="primary"
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default EditForm;
