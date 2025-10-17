exports.monitorStreak = ({  
  user = null  
} = {}) => {  
  if (!user || !user.streak) return { modified: false };

  const userStreak = user.streak;  
  const lastResponseTime = new Date(userStreak.lastResponseTime).getTime();  
  const now = new Date();
  const dayInMs = 1000 * 60 * 60 * 24;  
  
  if (lastResponseTime > now.getTime()) {
    return { modified: false };  
  } 
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
  const startOfYesterday = startOfToday - dayInMs;

  if (lastResponseTime >= startOfToday) {
    return { modified: false };
  }
  if (lastResponseTime < startOfYesterday) {
    userStreak.current = 1; 
    userStreak.highest = Math.max(userStreak.highest, userStreak.current);
    userStreak.lastResponseTime = now;
    return { modified: true, action: "reset" };
  }


  if (lastResponseTime >= startOfYesterday && lastResponseTime < startOfToday) {
    userStreak.current += 1; 
    userStreak.highest = Math.max(userStreak.highest, userStreak.current);
    userStreak.lastResponseTime = now;
    user.core.current += 500;
    return { modified: true, action: "increment" };
  }

  return { modified: false };  
};