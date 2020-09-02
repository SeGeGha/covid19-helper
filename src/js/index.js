import statistics from './models/statistics';

const statSection = document.querySelector('#statistics');
const [leaderboardTable, countryInfoTable] = statSection.querySelectorAll('#statistics .statistics-table');
const menuBtn = document.querySelector('#header .navigation .navigation__btn');

menuBtn.addEventListener('click', ({ currentTarget }) => {
  const nav = currentTarget.closest('.navigation');

  currentTarget.classList.toggle('navigation__btn--actived');
  nav.classList.toggle('navigation--opened');
});

document.querySelector('#header .navigation .navigation__group').addEventListener('click', ({ target }) => {
  const isNavLink = target.classList.contains('navigation__group__item');
  const nav = target.closest('.navigation');

  if (isNavLink) {
    menuBtn.classList.remove('navigation__btn--actived');
    nav.classList.remove('navigation--opened');
  }
});

statistics.init(statSection, leaderboardTable, countryInfoTable);
