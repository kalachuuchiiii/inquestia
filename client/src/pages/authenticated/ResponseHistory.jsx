
import { useEffect, useState } from 'react';
import useAsync from '../../hooks/useAsync.js';
import { fetchApi } from '../../utils/fetchApi.js';
import AnswerCard from '../../components/card/AnswerCard.jsx';
import { useInView } from 'react-intersection-observer';
import LoadingDisplay from '../../components/html/LoadingDisplay.jsx';

const ResponseHistory = () => {
  const [answerList, setAnswerList] = useState([]); 
  const [nextPage, setNextPage] = useState(1);
  const [getAnswerList, { isLoading, error }] = useAsync(async({page = 1, rewrite = true} = {}) => {
    const res = await fetchApi("get", "/answer/list", {
      page
    });
    if(!res?.success)return;
    setNextPage(res.nextPage);
    setAnswerList(prev => rewrite ? res.answers : [...prev, ...res.answers])
  })
  
  const { ref, inView } = useInView();
  
  useEffect(() => {
    getAnswerList();
  }, []);
  
  useEffect(() => {
    if(!inView || nextPage === null || isLoading)return;
    getAnswerList({ page: nextPage, rewrite: false})
  }, [ref, inView, nextPage])
  
  if(isLoading){
    return <LoadingDisplay>
      Getting your response records...
    </LoadingDisplay>
  }
  
return <div className = "p-1">
  {
    answerList?.length > 0 && <div>
      <div className = "p-1 flex justify-center">
        <p className = "">Your response records: </p>
      </div>
      {answerList.map((ans) => <AnswerCard showRedirect key = {ans._id} answer = {ans} />)}
      <div ref = {ref} />
    </div>
  }
</div>
}

export default ResponseHistory