import { IoMdClose } from "react-icons/io";
import Button from '../html/Button.jsx';
import { useDispatch } from 'react-redux';
import { updateUser } from '../../state/slice/user.js';
import useAsync from '../../hooks/useAsync.js'
import { fetchApi } from '../../utils/fetchApi.js';

const ExternalLinkCard = ({link = '', hideDeleteButton = false}) => {
  const dispatch = useDispatch();
  
  const [deleteExternalLink, {
    isLoading
  } ] = useAsync(async(externalLink) => {
    externalLink = externalLink.toLowerCase().trim();
    const res = await fetchApi("delete", "/user/link", { externalLink })

    if(res?.success && res?.user){
      dispatch(updateUser({user: res.user}))
    }
  })


return <div className=" w-full flex justify-between items-center truncate opacity-50" >
     <a className = "active:underline" href={link}>{link}</a>
     {
       !hideDeleteButton && <Button color = "white" loadingState = {isLoading} size = {8}  className = "flex justify-center items-center" disabled = {isLoading} onClick = {() => deleteExternalLink(link)} ><IoMdClose /></Button>
     }
            </div>
}

export default ExternalLinkCard