import requestSender from '../utils/requestSender';
import covidApiUrl from '../constants/urls';

const statistics = {
  info: null,
  wrappers: null,

  init(statSection, leaderboardTable, countryInfoTable) {
    this.wrappers = {
      main: statSection,
      leaderboard: leaderboardTable,
      countryInfo: countryInfoTable,
    };

    requestSender(covidApiUrl).then(({ Global, Countries }) => {
      this.info = Countries.sort((currentCountry, nextCountry) => nextCountry.TotalConfirmed - currentCountry.TotalConfirmed);

      this.render.leaderboard.call(this);
      this.render.country.call(this, Global);

      this.wrappers.main.classList.remove('content-loading');

      this.wrappers.leaderboard.querySelector('tbody').addEventListener('click', ({ target }) => {
        const countryId = target.closest('.statistics-table__row').dataset.index;

        this.render.country.call(this, this.info[countryId]);
      });
    });
  },

  render: {
    leaderboard() {
      const { leaderboard } = this.wrappers;

      const content = this.info.map(({ Country, TotalConfirmed }, id) => `
          <tr class="statistics-table__row" data-index=${id}>
            <td class="statistics-table__row__cell cell--id">${id + 1}. </td>
            <td class="statistics-table__row__cell cell--country-name">${Country} </td>
            <td class="statistics-table__row__cell cell--value">${TotalConfirmed}</td>
          </tr>
        `)
        .reduce((acc, countryELement) => acc + countryELement);

      leaderboard.insertAdjacentHTML('beforeend', `<tbody>${content}</tbody>`);
    },
    country(info) {
      this.wrappers.countryInfo.innerHTML = `
      <thead>
        <tr class="statistics-table__row">
          <th class="statistics-table__row__cell cell--th" colspan="2">${info.Country || 'Global'}</th>
        </tr>    
      </thead>
      <tbody>
        <tr class="statistics-table__row">
          <td class="statistics-table__row__cell cell--caption">Total confirmed: </td>
          <td class="statistics-table__row__cell cell--value">${info.TotalConfirmed}<br/>(+${info.NewConfirmed})</td>
        </tr>
        <tr class="statistics-table__row">
          <td class="statistics-table__row__cell cell--caption">Total deaths: </td>
          <td class="statistics-table__row__cell cell--value">${info.TotalDeaths}<br/>(+${info.NewDeaths})</td>
        </tr>
        <tr class="statistics-table__row">
          <td class="statistics-table__row__cell cell--caption">Total recovered: </td>
          <td class="statistics-table__row__cell cell--value">${info.TotalRecovered}<br/>(+${info.NewRecovered})</td>
        </tr>      
      </tbody>

      `;
    },
  },
};

export default statistics;
