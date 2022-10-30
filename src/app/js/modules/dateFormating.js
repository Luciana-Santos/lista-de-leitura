function daysToSeconds(days) {
  return Math.round(days * 24 * 60 * 60);
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

  console.log(datePreview);
  return datePreview;
}

function dateFormatingModal(actPage, totalPages) {
  previsionDays = totalPages / actPage;

  const secondsFromDays = daysToSeconds(previsionDays);
  console.log(secondsFromDays);
  dateNow.setSeconds(dateNow.getSeconds() + secondsFromDays);

  datePreview = dateNow.toLocaleDateString('pt-BR');

  return datePreview;
}

export { dateFormating, dateFormatingModal };
