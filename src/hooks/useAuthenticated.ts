import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";

const useAuthenticated = () => {
  const [searchParams] = useSearchParams();
   const accessCode = searchParams.get("code");
   const navigate = useNavigate();
   useEffect(() => {
     if (accessCode != import.meta.env.VITE_BARCODE_PASSWORD) {
       navigate("/");
     }
   }, []);
}

export default useAuthenticated
