import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { swalOptions } from "../data/swalOptions";


const useSwal = ( ) => {
  const { mode } = useSelector(state => state.theme);
    
    return (options = {}, callback = () => {}) => {
        Swal.fire({
          ...options,
          ...swalOptions(mode),
        }).then(async (result) => {
          if (!result.isConfirmed) return;
          try{
            await callback(result);
          }catch(err){
            throw new Error(err);
          }
        });
    }
}

export default useSwal;