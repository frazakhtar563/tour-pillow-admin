import { FieldArrayRenderProps, getIn } from "formik";
import React, { useEffect } from "react";
import {
  DialogContentText,
  Grid,
  IconButton,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
export const IncludedItems = ({
  formik,
  job,
  index,
  arrayHelper,
  ordersList,
}) => {
  const status = `includedItems.${index}.status`;
  const touchedStatus = getIn(formik.touched, status);
  const errorStatus = getIn(formik.errors, status);

  const order = `includedItems.${index}.order`;
  const touchedOrder = getIn(formik.touched, order);
  const errorOrder = getIn(formik.errors, order);

  const title = `includedItems.${index}.title`;
  const touchedTitle = getIn(formik.touched, title);
  const errorTitle = getIn(formik.errors, title);

  console.log("formik", formik.errors);

  const availableOrders = ordersList.filter(
    (lineItem) =>
      !formik.values.includedItems.some((item) => item.order === lineItem)
  );

  return (
    <Grid
      container
      mt={2}
      style={{
        background: "#f3f6f4",
        padding: "1rem 2rem",
        borderRadius: "1rem",
      }}
    >
      <Grid container justifyContent={"flex-end"}>
        <IconButton onClick={() => arrayHelper.remove(index)}>
          <CloseIcon />
        </IconButton>
      </Grid>
      <Grid container>
        <TextField
          value={job.title}
          onChange={(e) => {
            let numberValue = e.target.value;
            let verifiedValue = numberValue
              ? numberValue.toString().slice(0, 200)
              : null;
            formik.setFieldValue(title, verifiedValue ? verifiedValue : "");
          }}
          style={{ marginTop: "1rem" }}
          error={touchedTitle && Boolean(errorTitle)}
          helperText={touchedTitle && errorTitle}
          label="Title"
          variant="outlined"
          fullWidth={true}
        />
      </Grid>
      <Grid item xs={6} style={{ paddingRight: "1rem" }}>
        <DialogContentText style={{ marginTop: "1rem", textAlign: "left" }}>
          Status
        </DialogContentText>
        <Select
          name={status}
          value={job.status.toString()}
          variant="outlined"
          fullWidth={true}
          style={{
            border: "none !important",
            textAlign: "left",
          }}
          onChange={(e) => {
            let verifiedValue = e.target.value === "true" ? true : false;
            formik.setFieldValue(status, verifiedValue);
          }}
          error={Boolean(touchedStatus && errorStatus)}
        >
          {["true", "false"].map((lineItem) => (
            <MenuItem key={lineItem} value={lineItem}>
              {lineItem}
            </MenuItem>
          ))}
        </Select>
      </Grid>

      <Grid item xs={6} style={{ paddingLeft: "1rem" }}>
        <DialogContentText style={{ marginTop: "1rem", textAlign: "left" }}>
          Order
        </DialogContentText>
        <Select
          name={order}
          value={job.order}
          defaultValue={job.order}
          variant="outlined"
          fullWidth={true}
          style={{
            textAlign: "left",
            border: "none !important",
          }}
          onChange={(e) => {
            let verifiedValue = e.target.value;
            formik.setFieldValue(order, verifiedValue ? verifiedValue : "");
          }}
          error={Boolean(touchedOrder && errorOrder)}
        >
          {job.order && <MenuItem value={job.order}>{job.order}</MenuItem>}
          {availableOrders &&
            availableOrders.map((lineItem) => (
              <MenuItem key={lineItem} value={lineItem}>
                {lineItem}
              </MenuItem>
            ))}
        </Select>
      </Grid>
    </Grid>
  );
};
