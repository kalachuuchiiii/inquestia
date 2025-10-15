

exports.getPathAndMessage = (notif) => {
    let path = '/'
    let message = "Something unexpected has occurred.";

    if(!notif?.action || !notif?.resourceId || !notif?.sender?.username){
        throw new Error('Invalid notification!');
    }
     switch (notif.action) {
       case "answer":
         path = `/answer/${notif.resourceId}`;
         message = "Answered your survey";
         break;
       case "survey-completed":
         path = `/survey/${notif.resourceId}`;
         message = "Survey Completed";
         break;
       case "transaction-fulfilled":
         path = `/transaction/${notif.resourceId}`;
         message = "Your request has been fulfilled";
         break;
       case "transaction-rejected":
         path = `/transaction/${notif.resourceId}`;
         message = "Your request has been fulfilled";
         break;
       case "feedback-response":
         path = `/feedback/${notif.resourceId}`;
         message = "Your feedback reached the administrator!";
         break;
       case "added-as-viewer":
         path = `/survey/${notif.resourceId}`;
         message = `${notif.sender.username} gave you a permission to view their survey's answers!`;
         break;
      case 'removed-as-viewer': 
        path = `/survey/${notif.resourceId}`;
         message = `${notif.sender.username} removed you as viewer!`;
         break;
         case 'survey-takendown': 
         path = `/survey/${notif.resourceId}`;
         message = 'Your survey was taken down.';
         break;
         case 'point-deduction': 
         path = '/profile';
         message = `Your point was deducted`
     }

     return { 
        path, 
        message
     }

}