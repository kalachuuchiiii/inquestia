import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Button from '../../components/html/Button.jsx';
import useAsync from '../../hooks/useAsync.js';
import { fetchApi } from '../../utils/fetchApi.js';
import { useDispatch } from 'react-redux';
import { updateUser } from '../../state/slice/user.js';
import InterestTagList from '../../components/lists/InterestTagList.jsx';
const Onboarding = () => {
  const { user = {
    interests: []
  }} = useSelector(state => state.user);
  const [selectedInterests, setSelectedInterests] = useState(user?.interests || []);
  const dispatch = useDispatch();
  
  const [saveInterests, { isLoading, error }] = useAsync(async() => {
    const res = await fetchApi("patch", "/user/interests", {
      selectedInterests
    })
    if(res?.success && res?.user){
      dispatch(updateUser({ user: res.user }))
    }
  })
  
  useEffect(() => {
    setSelectedInterests(user?.interests);
  }, [user])
  
  const deselectInterest = (value) => {
    const remainingInterests = selectedInterests.filter(val => val !== value);
    setSelectedInterests(remainingInterests);
  }
  
  const selectInterest = (value) => {
    if(selectedInterests.includes(value)){
      deselectInterest(value);
      return;
    }
    setSelectedInterests(prev => ([...prev, value]));
  }
  
  
return <div className = "rounded-lg w-full sm:w-11/12 mx-auto min-h-screen space-y-3 ">
  <div className = "p-2">
      <h1 className = "text-4xl lato">Your interests</h1>
  <p className = "text-sm">Choosing your interests helps us pick the right questions for you, making your experience more relevant and engaging.
</p>
  </div>

    <InterestTagList select = {selectInterest} selected = {selectedInterests} />

  <div className = "w-full flex justify-end my-10 p-2 ">
    <div className = "space-y-1 flex flex-col items-end">
          { error && <p className = "text-xs text-red-400">{error}</p>}
    <Button  disabled = {isLoading} onClick = {saveInterests} loadingState = {isLoading}>Save</Button>
    </div>
  </div>
</div>
}

export default Onboarding