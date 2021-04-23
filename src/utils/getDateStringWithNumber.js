const getDateString = (date) => {
  console.log(date)
  const year = date.getFullYear();
  const month = ("0" + (1 + date.getMonth())).slice(-2);
  const day = ("0" + date.getDate()).slice(-2);
  return String(`${year}${month}${day}`);
}

export default getDateString
