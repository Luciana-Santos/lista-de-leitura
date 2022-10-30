const daysToSeconds = (days) => Math.round(days * 25 * 60 * 60);

export default function dateFormating(totalPages, pagesPerDay) {
  const dateNow = new Date();
  const previsionDays = totalPages / pagesPerDay;

  const secondsFromDays = daysToSeconds(previsionDays);

  dateNow.setSeconds(dateNow.getSeconds() + secondsFromDays);

  const [dia, mes, ano] = dateNow.toLocaleDateString('pt-BR').split('/');
  console.log(dia, mes, ano);
  return `${dia}/${mes}/${ano}`;
}
