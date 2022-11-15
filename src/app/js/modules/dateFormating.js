function daysToSeconds(days) {
  return Math.floor(days * 24 * 60 * 60);
}

export default function dateFormating(totalPages, pagesPerDay) {
  const dateNow = new Date();
  const previsionDays = totalPages / pagesPerDay;
  const secondsFromDays = daysToSeconds(previsionDays);

  dateNow.setSeconds(dateNow.getSeconds() + secondsFromDays);

  const datePreview = dateNow.toLocaleDateString('pt-BR');
  return datePreview;
}
