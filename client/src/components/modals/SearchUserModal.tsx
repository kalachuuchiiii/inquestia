import React, { useEffect, useState } from 'react'
import ModalStyle from './ModalStyle'
import { CiSearch, CiSquarePlus } from "react-icons/ci";
import { fetchApi } from '../../utils/fetchApi';
import useAsync from '../../hooks/useAsync';
import UserIcon from '../UserIcon';
import useSwal from '../../hooks/useSwal';
import { Button } from '../ui/button';

const SearchUserModal = ({ onClose = () => {}, surveyId = null}) => {
    const [username, setUsername] = useState('');
    const [result, setResult] = useState(null);
    const [ authorizedViewers, setAuthorizedViewers ] = useState([]);
    const swal = useSwal();

    const [addUser, { isLoading: isAdding }] = useAsync(async() => {
        if(!surveyId || !result?._id)return;
        const res = await fetchApi('patch', `/survey/add-viewer/${surveyId}/${result?._id}/`);
        if(res?.success){
            swal({ 
                title: 'Shared successfully!',
                icon: 'success', 
                confirmButtonText: 'Yay!', 
            }, () => {
                onClose();
            })
        }
    })
        const [searchUser, { isLoading, error }] = useAsync(async () => {
            if(!surveyId)throw new Error('Survey ID not found');
      const res = await fetchApi(
        "get",
        `/user/search-one/${surveyId}/?username=${username}`
      );
      if(res?.success){
        setResult(res.result);
      }
    });

    const [getAuthorizedViewers] = useAsync(async() => {
      const res = await fetchApi('get', `/survey/authorized-viewers/${surveyId}`);
      if(!res.success) return;
      setAuthorizedViewers(res.authorizedViewers)
     
    }, [surveyId]);

    const [revokeViewerAuthorization] = useAsync(async (userId) => {
      if (!userId) return;

      const res = await fetchApi(
        "delete",
        `/survey/authorized-viewers/${surveyId}/${userId}`
      );
      if (res?.success) {
        swal(
          {
            title: "Removed successfully!",
            icon: "success",
            confirmButtonText: "Okai!",
          },
          () => {
            onClose();
          }
        );
      }
    }, []); 

    useEffect(() => {
      getAuthorizedViewers();
    }, [])


  return (
    <ModalStyle
      onClose={onClose}
      label="Who would you like to share this survey with?"
    >
      <div>
        <div className="grid grid-cols-12 gap-2  mt-2">
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="flex-1 col-span-10 min-w-0 px-4 py-2 rounded-lg border border-blue-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-blue-400 text-base shadow-sm transition"
            placeholder="Type username..."
          />
          <Button
            onClick={searchUser}
            disabled={isLoading}
            className="inquestia-button col-span-2"
          >
            <CiSearch className="text-xl" />
          </Button>
        </div>
        <div>
          <div className="p-3 place-content-center gap-2 grid grid-cols-12">
            <Button
              disabled={isAdding}
              onClick={addUser}
              className="inquestia-button col-span-2"
            >
              Add
            </Button>
            <div className="col-span-10 place-content-center">
              {
                <UserIcon user={result}>
                  <UserIcon.Card />
                </UserIcon>
              }
            </div>
          </div>
          <div className="pl-2 py-5  border-t-1 border-t-black/10 ">
            <p className="text-xs my-2">Shared with ({ authorizedViewers?.length || 0})</p>
            <div>
              {authorizedViewers?.length > 0 &&
                authorizedViewers.map((viewer) => (
                  <div className="grid w-full grid-cols-12">
                    <div className="col-start-1 place-content-center col-span-8 ">
                      <UserIcon user={viewer}>
                        <UserIcon.Card />
                      </UserIcon>
                    </div>
                    <div className="place-content-center col-start-9 col-span-4">
                      <Button
                        onClick={() => revokeViewerAuthorization(viewer?._id)}
                        className=" inquestia-button"
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </ModalStyle>
  );
}

export default SearchUserModal