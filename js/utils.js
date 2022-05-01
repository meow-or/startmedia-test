export const showAlert = () => console.log('Не удалось получить данные. Попробуйте перезагрузить страницу');

export const getCarIds = (arr) => {
  const carIdsArray = [];
  arr.forEach(([,{id}]) => carIdsArray.push(id));
  return carIdsArray;
};

export const compare = (a, b) => b - a;