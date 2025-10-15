import SurveyCard from '../card/SurveyCard.jsx';
import useAsync from '../../hooks/useAsync.js';
import { fetchApi } from '../../utils/fetchApi.js';
import useFieldArray from '../../hooks/useFieldArray.js'
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer'
import { NavLink } from "react-router-dom"
import { UserSurveyContext } from '../../context/userSurveyContext.js';
import Placeholder from '../card/placeholders/surveyCardPlaceholder.jsx';
import { UserDraftContext } from '../../context/userDraftContext.js';

const UserDraftLists = () => {
  
  const { fieldArray: drafts, setFieldArray: setDrafts, modifyFieldById, removeFieldById, totalDocuments: totalDrafts, setTotalDocuments: setTotalDrafts } = useFieldArray([]);
  const [nextPage, setNextPage] = useState(1);

  const [getUserDrafts, { isLoading, error }] = useAsync(async ({ page = 1, overwrite = true} = {}) => {
    const res = await fetchApi("get", `/survey-list/user`, {
      page, 
      isDraft: true
    });
    if(!res?.success)return;
    
    setDrafts(prev => overwrite ? [...res.surveys] : [...prev, ...res.surveys]);
    setNextPage(res?.nextPage || null);
    setTotalDrafts(res?.totalSurveys || 0)
  })

  const { ref, inView } = useInView();

  useEffect(() => {
    if (drafts.length > 0) return;
    getUserDrafts();
  }, []);

  useEffect(() => {
    if (!inView || drafts.length === 0 || nextPage === null|| isLoading) return;
    getUserDrafts({ page: nextPage, overwrite: false});
  }, [nextPage, inView, isLoading, drafts]);



return <UserDraftContext.Provider value = {{
  modifyFieldById, 
  removeFieldById
}}>
      <p className="w-full text-left my-2 p-2 rounded  text-sm">Your Drafts {totalDrafts > 0 ? `(${totalDrafts})` : null}</p>
      {
        drafts?.length > 0 ? drafts.map(draft => <SurveyCard Context = {UserDraftContext} survey={draft} key={draft._id} >
          <div className="flex items-start ">
            <SurveyCard.Preview />
            <SurveyCard.OptionButton />
          </div>
          <SurveyCard.Author />
          <SurveyCard.Redirect.Draft />
          <SurveyCard.Bar />
        </SurveyCard >
        ) : !isLoading ? <div className="h-60 w-full flex flex-col justify-center gap-3 items-center text-center">
          <p className = "text-xs opacity-70">You don’t have any drafts yet. Start by creating one.
          </p>
          <NavLink to = "/create" className="inquestia-button">Create survey</NavLink>
        </div> : isLoading && <Placeholder />
      }
      <div className = "w-full h-2" ref = {ref} />
</UserDraftContext.Provider>
}

export default UserDraftLists