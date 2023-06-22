import { useState, useEffect } from "react";
import ErrorMessage from "../components/ErrorMessage";
import Welcome from "./Login/Welcome";

export default function FormDialog() {
  const [open, setOpen] = useState(true);
  const [error, setError] = useState("");

  return (
    <div>
      <Welcome />
      {error ? <ErrorMessage message={error} setMessage={setError} /> : null}
    </div>
  );
}
