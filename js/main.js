import { getData } from './api.js';
import { showAlert } from './utils.js';
import { renderRows } from './render-table.js';

getData(
  ([carsData, attemptsData]) => renderRows(carsData, attemptsData),
  () => showAlert()
);
