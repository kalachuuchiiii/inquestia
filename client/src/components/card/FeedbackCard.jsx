import React, { useContext, useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { formatIsoString } from '../../utils/formatIsoString';
import { FeedbackCardContext } from '../../context/feedbackCardContext';
import useAsync from '../../hooks/useAsync';
import useSwal from '../../hooks/useSwal';
import useCTX from '../../hooks/useCTX';
import { fetchApi } from '../../utils/fetchApi';

const FEEDBACK_TYPE_COLORS = {
  suggestion: 'bg-blue-100 text-blue-700',
  concern: 'bg-yellow-100 text-yellow-700',
  help: 'bg-green-100 text-green-700',
  bug: 'bg-red-100 text-red-700',
  account: 'bg-purple-100 text-purple-700',
  other: 'bg-zinc-100 text-zinc-700',
};



const FeedbackCard = ({ children = null, feedback = {
  _id: null, 
  feedbackType: 'suggestion',
  message: null,
  from: {
    username: null
  },
  attachments: []
} }) => {
  const { feedbackType, message, from, attachments = [] } = feedback || {};
  const typeLabel = feedbackType?.charAt(0).toUpperCase() + feedbackType?.slice(1);
  const colorClass = FEEDBACK_TYPE_COLORS[feedbackType] || FEEDBACK_TYPE_COLORS.other;
  const { user } = useSelector(state => state.user);
  const redirectUrl = user?._id === from?._id ? '/profile' : `/users/${from?.username}`;

  return (
    <FeedbackCardContext.Provider value = {{ feedback }}> 
      <div className="bg-white dark:bg-zinc-900 rounded-xl shadow p-5 border border-blue-50 dark:border-zinc-800 mb-4 w-full">
      <div className="flex items-center gap-2 mb-2">
        
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${colorClass}`}
        >
          {typeLabel}
        </span>
           <p className="text-xs opacity-50 my-2">
        {formatIsoString(feedback?.createdAt)}
      </p>
        <span className="text-xs text-zinc-400 ml-auto">
          From:{' '}
          <NavLink to={redirectUrl} className="font-mono text-zinc-500">
            {from.username}
          </NavLink>
        </span>
      </div>
      <div className="text-zinc-700 dark:text-zinc-200 text-sm mb-3 whitespace-pre-line">
        {message}
      </div>
      {attachments && attachments.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {attachments.map((url, idx) => (
            <a
              key={idx}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-20 h-20 rounded-lg overflow-hidden border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 hover:shadow-lg transition"
            >
              <img
                src={url}
                alt={`attachment-${idx}`}
                className="object-cover w-full h-full"
                loading="lazy"
              />
            </a>
          ))}
        </div>
      )}
   
      {children}
    </div>
    </FeedbackCardContext.Provider>
  );
};


FeedbackCard.Response = function FeedbackCardResponse() {
  const { feedback: { response } } = useCTX(FeedbackCardContext);
  return (
    <div className="text-sm rounded-xl border border-blue-100 bg-blue-50 dark:bg-zinc-800/50 p-3 mt-2">
      <p className='text-xs opacity-50'>Response</p>
      {response ? <p className='text-blue-800 dark:text-white'> {response} </p> : <p className="opacity-50">No response yet</p>}
    </div>
  );
};

FeedbackCard.ResponseInput = function FeedbackCardResponseInput() {
  const swal = useSwal()
   const { feedback = {
    message: '', 
    _id: null
   } } = useCTX(FeedbackCardContext);
  

  const [response, setResponse ] = useState('');
    const [respond, { isLoading: isResponding}] = useAsync(async() => {
          swal({ 
              title: 'Proceed?', 
              icon: 'question', 
              confirmButtonText: 'Send response', 
              text: `Responding to feedback: ${feedback.message}`
          }, async(res) => {
              if(res.isConfirmed){ 
                  try{
                    const reqres = await fetchApi(
                      "patch",
                      `/admin/feedback/${feedback._id}`,
                      {
                        response,
                      }
                    );
                  if(reqres?.success){
                    swal({
                      title: 'Sent successfully!', 
                      icon: 'success', 
                     
                    })
                  }
                  }catch(e){
                     swal({
                      title: e?.response?.data?.message , 
                      icon: 'error', 
                      
                    })

                  }
              }
          })
      })
  return (
    <div className="flex flex-col sm:flex-row gap-2 items-end mt-3">
      <input
        type="text"
        placeholder="Type your response..."
        className="flex-1 rounded-lg border border-blue-200 dark:border-zinc-700 px-3 py-2 bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
        value={response}
        onChange={(e) => setResponse(e.target.value)}
        disabled={isResponding}
      />
      <button
        onClick={respond}
        type="button"
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg transition disabled:opacity-50 text-sm"
        disabled={isResponding || !response.trim()}
      >
        {isResponding ? "Sending..." : "Respond"}
      </button>
    </div>
  );
};

export default FeedbackCard;