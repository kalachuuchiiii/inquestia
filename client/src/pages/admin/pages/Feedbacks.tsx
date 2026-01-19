
import React, { useEffect, useState } from 'react';
import { fetchApi } from '../../../utils/fetchApi';
import useAsync from '../../../hooks/useAsync';
import { useInView } from 'react-intersection-observer';
import FeedbackCard from '../../../components/card/FeedbackCard';
import useSwal from '../../../hooks/useSwal';

const Feedbacks = () => {
    const [nextPage, setNextPage ] = useState(1);
    const [feedbacks, setFeedbacks ] = useState([]);
    const [feedbackType, setFeedbackType] = useState('all')
    const { ref, inView } = useInView();
    const swal = useSwal();

    const [getFeedbacks, { isLoading, error }] = useAsync(async({ page = 1, overwrite = true} = {}) => {
        const res = await fetchApi('get', `/admin/feedback/list?page=${page}&feedbackType=${feedbackType}`);
        if(res.success){ 
            setFeedbacks(prev => overwrite ? res.feedbacks : [...prev, ...res.feedbacks]);
            setNextPage(res.nextPage);
        }
    })

  


    useEffect(() => {
        getFeedbacks();
    }, [feedbackType])

    useEffect(() => {
        if(!inView || !nextPage || nextPage === 1 || isLoading)return;
        getFeedbacks({ page: nextPage, overwrite: false})
    }, [inView])



    return (
        <div className="mx-auto p-4 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-2">
                <p className='text-gradient text-2xl'>Feedbacks</p>
                <select
                    value={feedbackType}
                    onChange={e => setFeedbackType(e.target.value)}
                    className="ml-auto w-full sm:w-auto rounded-lg border border-blue-200 dark:border-zinc-700 px-3 py-2 bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
                >
                    <option value="all">All Types</option>
                    <option value="suggestion">Suggestion</option>
                    <option value="concern">Concern</option>
                    <option value="help">Help</option>
                    <option value="bug">Bug</option>
                    <option value="account">Account</option>
                    <option value="other">Other</option>
                </select>
            </div>
            {feedbacks.length === 0 && (
                <div className="text-center text-zinc-400 text-sm py-8">No feedbacks found.</div>
            )}
            {feedbacks.map((feedback, idx) => (
                <div key={feedback._id || idx} className="bg-white dark:bg-zinc-900 rounded-xl shadow p-4 border border-blue-50 dark:border-zinc-800 mb-4 flex flex-col gap-2">
                    <FeedbackCard showResponse={false} feedback={feedback}>
                        <FeedbackCard.Response response={feedback.response} />
                        <FeedbackCard.ResponseInput />
                    </FeedbackCard>
                </div>
            ))}
            <div ref={ref} />
        </div>
    );
}

export default Feedbacks