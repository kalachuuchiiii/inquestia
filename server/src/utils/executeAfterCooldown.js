

exports.executeAfterCooldown = (fn = () => {}, { lastChange = null, cooldownInMs = null } = {}) => {
    if (!lastChange || !cooldownInMs) console.warn('Missing parameters for executeAfterCooldown');
    if (typeof fn !== 'function') console.warn('First parameter should be a function');
    if (typeof lastChange !== 'string' && !(lastChange instanceof Date)) console.warn('lastChange should be a date string or Date object');
    if (typeof cooldownInMs !== 'number') console.warn('cooldownInMs should be a number');

       const lastChangeInMs = new Date(lastChange).getTime();
        const nowInMs = Date.now();
        const timeThatPassed = nowInMs - lastChangeInMs;
        const isCooldownOver = timeThatPassed >= cooldownInMs;


    try {
        if (isCooldownOver) {
             fn();
           return { 
             executed: true
           }
           
        }

        return {
            executed: false, 
            remainingTime: cooldownInMs - timeThatPassed
        }
    } catch (error) {
       return { 
        executed: false, 
        remainingTime: cooldownInMs - timeThatPassed
       }
    }
};
