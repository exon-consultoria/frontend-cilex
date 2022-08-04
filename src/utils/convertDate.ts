export const convertDate = (date:string) => {
  const splitDate =  date.split('');
  const year = Number(`${splitDate[0]}${splitDate[1]}${splitDate[2]}${splitDate[3]}`);
  const month = Number(`${splitDate[5]}${splitDate[6]}`) - 1;
  const day = Number(`${splitDate[8]}${splitDate[9]}`);

  return  new Date(year, month, day)
}