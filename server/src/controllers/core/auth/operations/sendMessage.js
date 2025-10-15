const { default: z } = require("zod");
const redis = require("../../../../config/redis");
const { verifySession } = require("../../../../middlewares/verification/verifySession");
const { catchError } = require("../../../../utils/errorHandlers/catchError");
const { sysData } = require("../../../../data/systemData");


const messageSchema = z.string().max(1000);
const sendMessage = async(req, res) => {
    const {verifiedUser} = req;
    const message = messageSchema.parse(req?.body?.message);
    const key = `conversation:${String(verifiedUser._id)}`;

     const messageObject = { 
        content: message,
        role: 'user'
    }
    const conversation = JSON.parse((await redis.get(key) )) || [];
    const updatedConversation = [...conversation, { ...messageObject }];

     let response = await fetch(
       "https://api.groq.com/openai/v1/chat/completions",
       {
         method: "POST",
         headers: {
           Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
           "Content-Type": "application/json",
         },
         body: JSON.stringify({
           model: "openai/gpt-oss-120b",
           messages: [
            { role: 'system', content: sysData},
            ...updatedConversation
           ],
         }),
       }
     );


response = await response.json();
if(response?.error){
    return res.status(400).json({
        success: false,
        message: response?.error?.message || 'Internal Server Error'
    })
}
const responseContent = response?.choices?.[0]?.message?.content;

await redis.set(key, JSON.stringify([...updatedConversation, { role: 'system', content:  responseContent} ]));

return res.status(200).json({
    success: true,
    response: responseContent
})


}

module.exports = build => build({
    name: 'send message',
    path: '/user/conversation',
    method: 'post',
    middlewares: [verifySession],
    fn: catchError(sendMessage)
})