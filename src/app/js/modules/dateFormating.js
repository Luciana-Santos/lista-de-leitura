function daysToSeconds(days) {
  return Math.floor(days * 24 * 60 * 60);
}
const dateNow = new Date();
let previsionDays;
let datePreview;

function dateFormating(totalPages, pagesPerDay) {
  // const dateNow = new Date();
  // const previsionDays = totalPages / pagesPerDay;
  previsionDays = totalPages / pagesPerDay;

  const secondsFromDays = daysToSeconds(previsionDays);

  dateNow.setSeconds(dateNow.getSeconds() + secondsFromDays);

  // const datePreview = dateNow.toLocaleDateString('pt-BR');
  datePreview = dateNow.toLocaleDateString('pt-BR');
  return datePreview;
}

function dateFormatingModal(currPage, totalPages) {
  previsionDays = totalPages / currPage;

  const secondsFromDays = daysToSeconds(previsionDays);

  dateNow.setSeconds(dateNow.getSeconds() + secondsFromDays);

  datePreview = dateNow.toLocaleDateString();
  console.log(datePreview);

  return datePreview;
}

export { dateFormating, dateFormatingModal };
