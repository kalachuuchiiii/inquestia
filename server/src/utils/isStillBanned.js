
exports.isStillBanned = (bannedAt = null, banDuration = null) => {

     const bannedFor = Date.now() - new Date(bannedAt).getTime();
    const isBanned =  bannedFor < banDuration;


      const remainingBanDurationInMinutes = Math.floor(
        (banDuration - bannedFor) / (1000 * 60)
      );
      const remainingBanDurationInHour = Math.floor(
        (banDuration - bannedFor) / (1000 * 60 * 60)
      );
      const remainingBanDurationInDays = Math.floor(
        (banDuration - bannedFor) / (1000 * 60 * 60 * 24)
      );
    
    return {
        isBanned, 
        remainingBanDurationInDays,
        remainingBanDurationInHour,
        remainingBanDurationInMinutes
    }
}