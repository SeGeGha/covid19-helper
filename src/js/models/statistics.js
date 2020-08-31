import requestSender from '../utils/requestSender';
import covidApiUrl from '../constants/urls';

const statistics = {
  wrapper: document.querySelector('#statistics'),
  leaderboard: {
    container: document.querySelector('#statistics .statistics-table--leaderboard'),
    info: null,
  },
  countryStatistics: {
    container: document.querySelector('#statistics .statistics-table--country-info'),
    info: null,
  },

  init() {
    requestSender(covidApiUrl).then(({ Global, Countries }) => {
      this.leaderboard.info = Countries.sort((a, b) => b.TotalConfirmed - a.TotalConfirmed);
      this.countryStatistics.info = Countries;

      this.render.leaderboard.call(this);
      this.render.country.call(this, Global);
    });
  },

  render: {
    leaderboard() {
      const { container, info } = this.leaderboard;

      const content = info.map(({ Country, TotalConfirmed }, id) => `
          <tr class="statistics-table__row">
            <td class="statistics-table__row__cell cell--id">${id + 1}. </td>
            <td class="statistics-table__row__cell cell--country-name">${Country} </td>
            <td class="statistics-table__row__cell cell--value">${TotalConfirmed}</td>
          </tr>
        `)
        .reduce((acc, countryELement) => acc + countryELement);

      container.insertAdjacentHTML('beforeend', `<tbody>${content}</tbody>`);
    },
    country(info) {
      this.countryStatistics.container.innerHTML = `
      <thead>
        <tr class="statistics-table__row">
          <th class="statistics-table__row__cell cell--th" colspan="2">${info.name || 'Global'}</th>
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
