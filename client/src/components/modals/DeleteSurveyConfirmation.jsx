import ModalStyle from './ModalStyle.jsx';
import Notice from '../html/Notice.jsx';
import Button from '../html/Button.jsx';
import useAsync from '../../hooks/useAsync.js';
import { fetchApi } from '../../utils/fetchApi.js';
import useCTX from '../../hooks/useCTX.js';
const DeleteSurveyConfirmation = ({onClose = () => {}, surveyId = null, title = '', Context}) => {
  const { removeFieldById = () => {} } = useCTX(Context)
  
  const [deleteSurvey, { isLoading: isDeleting, error}] = useAsync(async() => {
    const res = await fetchApi("delete", `/survey/${surveyId}`); 
    if(res?.success){
      removeFieldById(surveyId);
      onClose();
    }
  })


return <ModalStyle onClose = {onClose} label = "Confirm Deletion" >
  <div className = "space-y-1 px-2 py-1">
      <h1 className = "text-2xl lato">Delete Survey?</h1>
      <p className = "text-xs">Title {title}</p>
  <Notice >
    This action cannot be undone!
  </Notice> 
    { error && <p className = "text-xs text-red-400">{error}</p>}
  </div>
  <div className = "flex p-2 justify-end gap-4">
    <button onClick = {onClose}>Cancel</button>
    <div className = "w-4/12">
          <Button color = "white" loadingState = {isDeleting} onClick = {deleteSurvey} className = "text-red-400 w-20 h-8">Delete</Button>
    </div>
  </div>
</ModalStyle>
}

export default DeleteSurveyConfirmation