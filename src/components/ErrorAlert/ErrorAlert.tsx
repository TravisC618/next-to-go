import React from "react";
import Alert from "@material-ui/lab/Alert";
import { AlertTitle } from "@material-ui/lab";

interface ErrorAlertProps {
  error: string;
}

export const ErrorAlert: React.FC<ErrorAlertProps> = ({ error }) => (
  <Alert severity="error">
    <AlertTitle>Error</AlertTitle>
    {error}
  </Alert>
);
