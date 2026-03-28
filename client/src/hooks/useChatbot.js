import { useState } from "react";
import useSwal from "./useSwal";
import useAsync from "./useAsync";
import { fetchApi } from "../utils/fetchApi";



const useChatbot = (onPage = false) => {
     const swal = useSwal();
  
  const [message, setMessage] = useState("");
  const [conversation, setConversation] = useState([]);

  const [getConversation] = useAsync(async() => {
    if(conversation.length > 0)return;
    const res = await fetchApi('get', '/user/conversation');
    if(res?.success){
      setConversation(res?.conversation);
    }
   
  }, [])

  const [refreshConversation] = useAsync(async() => {

     swal(
       {
         title: "New conversation?",
         icon: "question",
         text: "This would overwrite the ongoing conversation.",
       },
       async (result) => {
         if (result.isConfirmed) {
           const res = await fetchApi("delete", "/user/conversation");
           setConversation([])
         }
       }
     );
  }) 
  
  const [sendMessage, { isLoading }] = useAsync(async () => {
    if(!message)return;
    setConversation((prev) => [...prev, { role: "user", content: message }]);
    setMessage('')
    const res = await fetchApi("post", "/user/conversation", {
      message,
    });
    if (res?.success) {
      setConversation((prev) => [
        ...prev,
        {
          role: "system",
          content: res?.response,
        },
      ]);
    }
  });

  return {
    conversation,
    message, 
    setConversation,
    sendMessage,
    refreshConversation,
    getConversation,
    setMessage,
    isLoading
  }
}

export default useChatbot;