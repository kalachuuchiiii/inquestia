import React, { useState } from 'react'
import useAsync from '../../hooks/useAsync';
import ModalStyle from './ModalStyle';
import Button from '../html/Button';
import { fetchApi } from '../../utils/fetchApi';

const TakeDownSurveyModal = ({onClose = () => {}, surveyId, surveyTitle}) => {

  const [takedownSurvey, { isLoading, error, isSuccess }] = useAsync(
    async () => {
      const res = await fetchApi("delete", `/admin/takedown-survey/${surveyId}`);
      console.log(res);
    }
  );

  return (
    <ModalStyle
      label={`Take Down Survey titled "${surveyTitle}"`}
      onClose={onClose}
    >
      <main className="space-y-6">
        <p className="text-2xl">
          Are you sure you want to take this survey down?
        </p>
        <div>
          {isSuccess ? (
            <p className="text-xs text-blue-600">Taken down successfully</p>
          ) : (
            error && <p className="text-xs text-red-400">{error}</p>
          )}
          <Button
            onClick={takedownSurvey}
            disabled={isLoading}
            loadingState={isLoading}
          >
            Deduct
          </Button>
        </div>
      </main>
    </ModalStyle>
  );
}

export default TakeDownSurveyModal