
import React, { useState, useRef, useEffect } from 'react';
import Textarea from '../../components/html/Textarea';
import useAsync from '../../hooks/useAsync';
import { fetchApi } from '../../utils/fetchApi';
import FeedbackCard from '../../components/card/FeedbackCard';
import { useInView } from 'react-intersection-observer';
import useSwal from '../../hooks/useSwal';

const FEEDBACK_TYPES = [
  { value: 'suggestion', label: 'Suggestion' },
  { value: 'concern', label: 'Concern' },
  { value: 'help', label: 'Help' },
  { value: 'bug', label: 'Bug Report' },
  { value: 'account', label: 'Account Issue' },
  { value: 'other', label: 'Other' },
];


const CustomerService = () => {
  const [message, setMessage] = useState('');
  const [feedbackType, setFeedbackType] = useState(FEEDBACK_TYPES[0].value);
  const [feedbacks, setFeedbacks] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [nextPage, setNextPage] = useState(1);
  const [attachments, setAttachments] = useState([]); // Array of File
  const swal = useSwal();
  const bottomRef = useRef(null);
  const { ref, inView } = useInView();


  const [handleSubmit, { isLoading: isSubmitting}] = useAsync(async(e) => {
    e.preventDefault();
    swal({ 
      title: 'Are you sure?', 
      icon: 'question', 
      text: 'Submit feedback'
    }, async() => {
      const formData = new FormData();
      formData.append('feedbackType', feedbackType);
      formData.append('message', message);
      attachments.forEach((file, idx) => {
        formData.append('attachments', file);
      });
      const res = await fetchApi('post', '/feedback', formData);
      setFeedbacks(prev => [...prev, res.feedback]);
      setMessage('');
      setAttachments([]);
       bottomRef.current ? bottomRef.current.scrollIntoView({ behavior: 'smooth' }) : null
      
    })
    
  })

  const [getFeedbacks, { isLoading, error }] = useAsync(async({ page = 1, overwrite = true} = {}) => {
    if(isLoading || isSubmitting || nextPage === null){
        return;
    }
   const res = await fetchApi('get', `/feedback-list?page=${page}`);
   setNextPage(res.nextPage)
   if(overwrite && bottomRef.current){
 bottomRef.current.scrollIntoView({ behavior: "smooth" });
   }
   setFeedbacks(prev => overwrite ? res.feedbacks : [...res.feedbacks, ...prev] )
  })

  useEffect(() => {
    getFeedbacks();
  }, [])

  useEffect(() => {
   if(!inView || nextPage === null || nextPage === 1 || isLoading || isSubmitting){ 
    return;
   }

   getFeedbacks({ page: nextPage, overwrite: false})
  }, [inView, nextPage])

  return (
    <div className="flex flex-col h-[80vh]  w-11/12 mx-auto md:w-full bg-white dark:bg-zinc-900 rounded-xl shadow-lg border border-blue-100 dark:border-zinc-800 md:overflow-hidden">
      <div className="flex-shrink-0 px-6 py-4 ">
        <h2 className="text-xl font-bold text-blue-700 dark:text-blue-300">Submit Feedback</h2>
        <p className="text-xs text-zinc-400 mt-1">Let us know your thoughts, issues, or suggestions. This is not a live chat.</p>
      </div>
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4 bg-gradient-to-b from-blue-50/40 to-white dark:from-zinc-900 dark:to-zinc-950">
        {feedbacks.length === 0 && (
          <div className="text-center text-zinc-400 text-sm">No feedback submitted yet.</div>
        )}
      
        <div >
              {feedbacks.map((feedback, idx) => <FeedbackCard key = {idx} feedback={feedback} >
                <FeedbackCard.Response />
              </FeedbackCard>)}
        </div>
          {nextPage !== null ? (
          <button
            onClick={() => getFeedbacks({ page: nextPage, overwrite: false })}
            className="block mx-auto my-2 px-4 py-1.5 rounded bg-blue-100 dark:bg-zinc-800 text-blue-700 dark:text-blue-300 font-medium text-sm disabled:opacity-60"
            disabled={isLoading}
          >
            {isLoading ? 'Loading...' : 'Load more...'}
          </button>
        ) : (
          <div className="text-center text-xs text-zinc-400 my-2">You've reached the end.</div>
        )}
        <div ref={bottomRef} />
        
      </div>
      <form onSubmit={handleSubmit} className="flex-shrink-0 flex-col md:flex-row  border-t border-blue-50 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-4 py-3 flex gap-2 md:items-end">
       <div className='flex items-center gap-2'>
         <select
          className="min-w-[120px] border border-blue-200 dark:border-zinc-700 rounded-lg px-2 py-2 bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
          value={feedbackType}
          onChange={e => setFeedbackType(e.target.value)}
        >
          {FEEDBACK_TYPES.map(type => (
            <option key={type.value} value={type.value}>{type.label}</option>
          ))}
        </select>
                <div className="flex  items-center gap-2">
            
          <label className="cursor-pointer w-9 h-9 flex items-center justify-center bg-blue-50 dark:bg-zinc-800 border border-blue-200 dark:border-zinc-700 rounded-lg hover:bg-blue-100 dark:hover:bg-zinc-700 transition">
            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
            <input
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={e => {
                const files = Array.from(e.target.files).slice(0, 3 - attachments.length);
                setAttachments(prev => [...prev, ...files].slice(0, 3));
              }}
              disabled={attachments.length >= 3}
            />
          </label>
           <span className="text-[10px] text-zinc-400">{attachments.length}/3</span>
         
        </div>
       </div>
        <div className='flex w-full items-end gap-1'>
          <Textarea
          className="flex grow-1 rounded-lg dark:bg-zinc-950 bg-white text-zinc-700 dark:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none min-h-[40px] max-h-[120px]"
          value={message}
          onChange={e => setMessage(e.target.value)}
          placeholder="Type your message here..."
          rows={1}
          displayLimit={false}
          min={10}
          limit={1000}
          required
        />

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg transition disabled:opacity-50"
          disabled={message.length < 10 || isSubmitting}
        >
          {isSubmitting ? 'Sending...' : 'Send'}
        </button>
        </div>
      </form>
      {/* Preview attachments */}
      {attachments.length > 0 && (
        <div className="flex gap-2 px-4 pb-2 pt-1 bg-white dark:bg-zinc-900 border-t border-blue-50 dark:border-zinc-800">
          {attachments.map((file, idx) => (
            <div key={idx} className="relative w-14 h-14 rounded-lg overflow-hidden border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800">
              <img
                src={URL.createObjectURL(file)}
                alt={`attachment-preview-${idx}`}
                className="object-cover w-full h-full"
              />
              <button
                type="button"
                className="absolute top-0 right-0 bg-white/80 dark:bg-zinc-900/80 text-red-500 rounded-bl-lg px-1 py-0.5 text-xs"
                onClick={() => setAttachments(prev => prev.filter((_, i) => i !== idx))}
                aria-label="Remove attachment"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomerService;