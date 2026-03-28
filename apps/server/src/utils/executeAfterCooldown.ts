export const executeAfterCooldown = <T extends (...args: any[]) => any>(
  cooldown: number, // cooldown in milliseconds
  lastExecuted: number | Date,
  callback: T
): ReturnType<T> | null => {
  const now = Date.now();
  const lastTime = lastExecuted instanceof Date ? lastExecuted.getTime() : lastExecuted;

  if (now - lastTime >= cooldown) {
    return callback(); 
  }

  return null;
};