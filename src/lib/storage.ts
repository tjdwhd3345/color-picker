export const getItemFromStorage = () => {
  const colors = localStorage.getItem('colors') || JSON.stringify(['#373eff']);
  return JSON.parse(colors);
};

export const setItemToStorage = (colors: string[]) => {
  localStorage.setItem('colors', JSON.stringify([...colors]));
};
