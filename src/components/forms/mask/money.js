import { getOnlyNumbers } from '@/helpers/format/getOnlyNumbers.js'
import { transformToFloat } from '@/helpers/format/transformToFloat.js'
import { formatToMoney } from '@/helpers/format/formatToMoney.js'

function money(event){
    let inputValue = getOnlyNumbers(event.target.value);
    let numericValue = transformToFloat(inputValue);
    const formattedValue = formatToMoney(numericValue)
    numericValue = numericValue.toFixed(2)
    return [
      numericValue,
      formattedValue
    ]
}

export {
  money
}