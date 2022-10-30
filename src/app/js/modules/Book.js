export default class Book {
  constructor(id, cover, title, author, pagesTotal, pagesPerDay, prevision) {
    this.id = id;
    this.cover = cover;
    this.title = title;
    this.author = author;
    this.pagesTotal = pagesTotal;
    this.pagesPerDay = pagesPerDay;
    this.prevision = prevision;
  }
}
