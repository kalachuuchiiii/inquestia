import UserProfile from '../../components/UserIcon.jsx';
import SettingCard from '../../components/card/SettingCard.jsx';
import { useSelector } from 'react-redux';
import Textarea from '../../components/html/Textarea.jsx';
import ExternalLinksList from '../../components/lists/ExternalLinksList.jsx';
import { useEffect, useState } from 'react';
import ArrowButton from '../../components/html/ArrowButton.jsx';
import useAsync from '../../hooks/useAsync.js';
import { fetchApi } from '../../utils/fetchApi.js';
import SurveyCard from '../../components/card/SurveyCard.jsx';


const Profile = () => {
  const { user = {
    nickname: '', 
    username: '', 
    bio: '', 
    avatar: '', 
    _id: '',
    externalLinks: []
  } } = useSelector(state => state.user);
  const [surveys, setSurveys] = useState([]);
  const [nextPage, setNextPage] = useState(1);
  const [totalSurveys, setTotalSurveys] = useState(0);
  const [sortingProcess, setSortingProcess] = useState(1);
  const [getUserSurvey, { isLoading, error }] = useAsync(async(page = 1) => {
    const res = await fetchApi("get", `/survey-list/user`, {
      page, 
      sort: sortingProcess
    });
    setSurveys(prev => [...prev, ...res?.surveys]);
    setNextPage(res?.nextPage || null);
    setTotalSurveys(res?.totalSurveys || 0)
    console.log(res);
  })
  
  useEffect(() => {
    if(surveys.length > 0)return;
    getUserSurvey();
  }, []);
  
  useEffect(() => {
    if(surveys.length === 0 || nextPage === null || isLoading)return;
    getUserSurvey(nextPage);
  }, [nextPage]);


  return <div className="p-3">
    <div className="backdrop-brightness-50 p-6 space-y-3 rounded-lg">
      <UserProfile user={user} className="flex gap-2">
        <div className="flex flex-col justify-center items-start gap-3">
          <UserProfile.Avatar className="" size="30" />
        </div>
                  <div className="text-left backdrop-brightness-150 text-sm w-full pl-3">
            <UserProfile.Nickname className="text-lg" />
            <UserProfile.Username showAt className="text-xs opacity-70" />
                          <div className="flex flex-col w-full justify-between">
          <div className = "w-full">
                <Textarea placeholder = "No bio yet" readOnly displayLimit = {false} className = "w-full border-l-1 border-l-white text-xs mt-2" value = {user.bio} maxLength = {60} />
          </div>
        </div>
          </div>
      </UserProfile>
      <ExternalLinksList hideDeleteButton externalLinks = {user.externalLinks} />
      <ArrowButton to = "/profile/edit" >
        View Account
      </ArrowButton>
    </div>
    <button className="w-full text-left bg-zinc-900 my-2 p-2 rounded  text-sm">Your Surveys ({totalSurveys})</button>
    <div className="flex p-2 text-xs mb-8 gap-2 ">
      <p className="shrink-0">Sort by: </p>
      <select className="outline-none truncate w-full rounded" >
        <option value="Newest">Newest</option>
        <option value="Oldest">Oldest</option>
        <option value="lowest_response">From lowest # of responses to high</option>
        <option value="highest_response">From highest # of responses to low</option>
      </select>
    </div>
           {
         
       surveys?.length > 0 && surveys.map(survey => <SurveyCard survey={survey} key={survey._id} />)
       }
   
  </div>
}

export default Profile