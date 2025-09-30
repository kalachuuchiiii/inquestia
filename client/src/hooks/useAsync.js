import { useState, useCallback } from "react";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { swalOptions } from "../data/swalOptions";

const useAsync = (fn = () => {}, deps = null) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const { mode } = useSelector(state => state.theme);

  const call = useCallback(
    async (arg) => {
      setIsLoading(true);
      try {
        await fn(arg);
        setError("");
        setIsSuccess(true);
      } catch (e) {
        console.error(e);
        const msg =
          e?.response?.data?.message ||
          e?.message ||
          "Something went wrong. Please try again.";
        setError(msg);
        setIsSuccess(false);
        Swal.fire({
          icon: "error",
           
          title: "Oops...",
          text: msg,
          ...swalOptions(mode),
          confirmButtonColor: "#06b6d4",
        });
      } finally {
        setIsLoading(false);
      }
    }, deps ? deps : undefined);

  const resetState = () => {
    setIsLoading(false);
    setIsSuccess(false);
    setError("");
  };

  return [
    call,
    {
      isLoading,
      isSuccess,
      error,
      resetState,
    },
  ];
};

export default useAsync;
