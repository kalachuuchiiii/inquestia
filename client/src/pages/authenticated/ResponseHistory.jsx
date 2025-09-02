
import { useEffect, useState } from 'react';
import useAsync from '../../hooks/useAsync.js';
import { fetchApi } from '../../utils/fetchApi.js';
import AnswerCard from '../../components/card/AnswerCard.jsx';
import { useInView } from 'react-intersection-observer';
import LoadingDisplay from '../../components/html/LoadingDisplay.jsx';

const ResponseHistory = () => {
  const [answerList, setAnswerList] = useState([]); 
  const [nextPage, setNextPage] = useState(1);
  const [getAnswerList, { isLoading, error }] = useAsync(async({page = 1, overwrite = true} = {}) => {
    const res = await fetchApi("get", "/answer/list", {
      page
    });
    if(!res?.success)return;
    setNextPage(res.nextPage);
    setAnswerList(prev => overwrite ? res.answers : [...prev, ...res.answers])
  })
  
  const { ref, inView } = useInView();
  
  useEffect(() => {
    getAnswerList();
  }, []);
  
  useEffect(() => {
    if(!inView || nextPage === null || isLoading)return;
    getAnswerList({ page: nextPage, overwrite: false})
  }, [ref, inView, nextPage])
  
  
return (
  <div className="p-1 w-full">
    {answerList?.length > 0 && (
      <div>
        <div className="p-1 flex w-full justify-center">
          <p className="">Your response records: </p>
        </div>
        {answerList.map((ans) => (
          <AnswerCard showRedirect key={ans._id} answer={ans} />
        ))}
        <div ref={ref} />
      </div>
    )}
    {isLoading ? (
      <LoadingDisplay>Loading more responses...</LoadingDisplay>
    ) : (
      answerList?.length === 0 && (
        <LoadingDisplay>You have not answered any surveys yet.</LoadingDisplay>
      )
    )}
  </div>
);
}

export default ResponseHistory