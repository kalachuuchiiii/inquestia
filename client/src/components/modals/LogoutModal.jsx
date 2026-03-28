import ModalStyle from './ModalStyle.jsx';
import Notice from '../html/Notice.jsx';
import Button from '../html/Button.jsx';
import useAsync from '../../hooks/useAsync.js';
import { fetchApi } from '../../utils/fetchApi.js';
import { useDispatch } from 'react-redux';
import { resetState } from '../../state/slice/user.js';
import { useNavigate } from 'react-router-dom';


const LogoutModal = ({onClose = () => {}}) => {
  
  const dispatch = useDispatch();
  const nav = useNavigate();

  const [logout, {isLoading, error}] = useAsync(async() => {
    const res = await fetchApi("post", "/user/logout");
    if(res?.success){
      dispatch(resetState());
      nav("/login");
    }
  })


return <ModalStyle label = "Logging Out" onClose = {onClose}>
  <div className = "flex  flex-col items-center gap-6">

          <Notice className = "text-sm ">Are you sure you want to log out?</Notice>
          
          <div>
         
                <div className = "flex items-center justify-end gap-2">
      <button onClick = {onClose} className = "px-5 py-2">Cancel</button>
      <Button  onClick = {logout} loadingState = {isLoading} disabled = {isLoading}  ><p className = "text-red-500">Yes, Log me out</p></Button>
    </div>
          </div>
  </div>
</ModalStyle>
}

export default LogoutModal