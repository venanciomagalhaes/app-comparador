function transformToFloat(value){
  if(isNaN(value)) return 0;
  return (parseFloat(value) / 100);
}

export {
  transformToFloat
}