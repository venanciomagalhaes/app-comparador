function getOnlyNumbers(number){
  const onlyNumber = number.replace(/\D/g, '')
  if(onlyNumber.length < 1){
    return 0;
  }
  return number.replace(/\D/g, '');
}


export {
  getOnlyNumbers
}