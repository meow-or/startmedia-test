import { getData } from './api.js';
import { showAlert } from './utils.js';
import {renderTable,
        renderTableSortedByFirstAttempt,
        renderTableSortedBySecondAttempt,
        renderTableSortedByThirdAttempt,
        renderTableSortedByFourthAttempt
      } from './render-table.js';
import { setRenderCallback } from './sort-rendering.js';

getData(([carsData, attemptsData]) => {
    renderTable(carsData, attemptsData);
    setRenderCallback(
      () => renderTable(carsData, attemptsData), 
      () => renderTableSortedByFirstAttempt(carsData, attemptsData),
      () => renderTableSortedBySecondAttempt(carsData, attemptsData),
      () => renderTableSortedByThirdAttempt(carsData, attemptsData),
      () => renderTableSortedByFourthAttempt(carsData, attemptsData)
    )
  },
  () => showAlert()
);

