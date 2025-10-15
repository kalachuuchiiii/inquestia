import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useAsync from '../../hooks/useAsync';
import { fetchApi } from '../../utils/fetchApi';
import FeedbackCard from '../../components/card/FeedbackCard';

const FeedbackPage = () => {
  const { feedbackId } = useParams();
  const [feedback, setFeedback] = useState({
    _id: null,
    feedbackType: 'suggestion',
    message: null,
    from: {
      username: null,
    },
    attachments: [],
  });

  const [getFeedback, { isLoading }] = useAsync(async () => {
    const res = await fetchApi('get', `/feedback/${feedbackId}`);
    if (res?.success) {
      setFeedback(res.feedback);
    }
  }, [feedbackId]);

  useEffect(() => {
    getFeedback();
  }, [feedbackId]);

  return (
    <div className="space-y-20">
      <div>
        <h1 className="text-gradient text-2xl font-semibold  my-8">
          Your Feedback
        </h1>
           <p >
        Your feedback helps us continually improve and create a better
        experience for all users. Every suggestion, issue, or thought you share
        guides us toward making this platform more intuitive, enjoyable, and
        tailored to your needs. Thank you for taking the time to share your
        perspective — it truly makes a difference.
      </p>
      </div>

      <div>
        <FeedbackCard feedback={feedback}>
          <FeedbackCard.Response />
        </FeedbackCard>
      </div>
   
    </div>
  );
};

export default FeedbackPage;
