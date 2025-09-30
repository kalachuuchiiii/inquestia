

export const swalOptions = (theme) => {
    return {
      scrollbarPadding: false,
      background: theme === "Dark" ? "#1e1e1e" : "#f5f5f5 ", 
      color: theme === "Dark" ? "#f1f1f1" : "#000",
    };
}