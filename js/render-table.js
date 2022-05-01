import { getCarIds, compare } from './utils.js';

const tableRowTemplate = document.querySelector('#table-row').content.querySelector('.table__row');
const tableRowContainer = document.querySelector('.table');
const listOfRowsFragment = document.createDocumentFragment();


const addRowData = (
  {name, city, car, startNumber, firstAttempt, secondAttempt, thirdAttempt, fourthAttempt, totalScore, place}) => {
  
  const rowData = tableRowTemplate.cloneNode(true);

  rowData.querySelector('.table__row-item_number').textContent = startNumber;
  rowData.querySelector('.table__row-item_name').textContent = name;
  rowData.querySelector('.table__row-item_city').textContent = city;
  rowData.querySelector('.table__row-item_car').textContent = car;
  rowData.querySelector('.table__row-item_first-attempt').textContent = firstAttempt;
  rowData.querySelector('.table__row-item_second-attempt').textContent = secondAttempt;
  rowData.querySelector('.table__row-item_third-attempt').textContent = thirdAttempt;
  rowData.querySelector('.table__row-item_fourth-attempt').textContent = fourthAttempt;
  rowData.querySelector('.table__row-item_score').textContent = totalScore;
  const {participantPlace} = place;
  rowData.querySelector('.table__row-item_place').textContent = participantPlace;

  listOfRowsFragment.appendChild(rowData);
}

const createTableDataArray = (idsArray, attemptsData, carsData) => {
  const getParticipantName = (i) => {
    const participantData = carsData.find(([, {id}]) => id === i)
    return participantData[1].name;
  }

  const getParticipantCity = (i) => {
    const participantData = carsData.find(([, {id}]) => id === i);
    return participantData[1].city;
  }

  const getParticipantCar = (i) => {
    const participantData = carsData.find(([, {id}]) => id === i);
    return participantData[1].car;
  }

  const getParticipantStartNumber = (i) => {
    const participantData = carsData.find(([, {id}]) => id === i);
    return participantData[0];
  }

    const getAttemptScore = (i, attemptNumber) => {
    const participantAttempts = attemptsData.filter(([, attemptData]) => attemptData.id === i);
    
    return participantAttempts[attemptNumber][1].result;
  }

  const getTotalScore = (i) => {
    const participantAttempts = attemptsData.filter(([, attemptData]) => attemptData.id === i);
    let score = 0;
    participantAttempts.forEach(([, {result}]) => score += result);

    return score;
  }

  const tableDataArray = [];

  for(let i = 1; i <= idsArray.length; i++) {
    tableDataArray.push({
      'participantId': i,
      'name': getParticipantName(i),
      'city': getParticipantCity(i),
      'car': getParticipantCar(i),
      'startNumber': getParticipantStartNumber(i),
      'firstAttempt': getAttemptScore(i, 0),
      'secondAttempt': getAttemptScore(i, 1),
      'thirdAttempt': getAttemptScore(i, 2),
      'fourthAttempt': getAttemptScore(i, 3),
      'totalScore': getTotalScore(i),
    })
  }
  return tableDataArray;
}

const createPlaceAndScoreArray = (data) => {
  const totalScoreArray = [];

  data.forEach(({totalScore}) => totalScoreArray.push(totalScore));
  const sortedTotalScoreArray = totalScoreArray.sort(compare);
  
  const placeAndScoreArray = [];
  for (let i = 1; i <= sortedTotalScoreArray.length; i++) {
    placeAndScoreArray.push({
      'participantPlace': i,
      'score': sortedTotalScoreArray[i - 1]
    })
  }

  return placeAndScoreArray;
}

const createRankedTableData = (data, placesAndScoresArray) => {
  const rankedTableData = [];

  data.forEach((tableRowData) => rankedTableData.push(
    {
      ...tableRowData,
      'place': placesAndScoresArray.find((placeAndScore) => placeAndScore.score === tableRowData.totalScore)
    }
  ))

  return rankedTableData;
}

const compareTotalScore = (prev, next) => {
  const prevScore = prev.totalScore;
  const nextScore = next.totalScore;
  return nextScore - prevScore;
}

const compareFirstAttemptScore = (prev, next) => {
  const prevScore = prev.firstAttempt;
  const nextScore = next.firstAttempt;
  return nextScore - prevScore;
}

const compareSecondAttemptScore = (prev, next) => {
  const prevScore = prev.secondAttempt;
  const nextScore = next.secondAttempt;
  return nextScore - prevScore;
}

const compareThirdAttemptScore = (prev, next) => {
  const prevScore = prev.thirdAttempt;
  const nextScore = next.thirdAttempt;
  return nextScore - prevScore;
}

const compareFourthAttemptScore = (prev, next) => {
  const prevScore = prev.fourthAttempt;
  const nextScore = next.fourthAttempt;
  return nextScore - prevScore;
}

const clearRowsContainer = () => {
  const renderedRows = tableRowContainer.querySelectorAll('.table__row-rendered-list');
  renderedRows.forEach(row => row.remove());
}

export const renderTable = (cars, attempts) => {
  const attemptsDataArray = Object.entries(attempts);
  const carsDataArray = Object.entries(cars);
  const carIds = getCarIds(carsDataArray);
  const tableData = createTableDataArray(carIds, attemptsDataArray, carsDataArray);
  const placesAndScores = createPlaceAndScoreArray(tableData);
  const rankedTableData = createRankedTableData(tableData, placesAndScores);
  document.querySelector('.total-score').classList.add('table__row-button_active');  
  rankedTableData
  .slice()
  .sort(compareTotalScore)
  .forEach(
    ({name, city, car, startNumber, firstAttempt, secondAttempt, thirdAttempt, fourthAttempt, totalScore, place}) => {

    addRowData(
      {name, city, car, startNumber, firstAttempt, secondAttempt, thirdAttempt, fourthAttempt, totalScore, place})
  })

  clearRowsContainer();
  tableRowContainer.appendChild(listOfRowsFragment);
}

export const renderTableSortedByFirstAttempt = (cars, attempts) => {
  const attemptsDataArray = Object.entries(attempts);
  const carsDataArray = Object.entries(cars);
  const carIds = getCarIds(carsDataArray);
  const tableData = createTableDataArray(carIds, attemptsDataArray, carsDataArray);
  const placesAndScores = createPlaceAndScoreArray(tableData);
  const rankedTableData = createRankedTableData(tableData, placesAndScores);
    
  rankedTableData
  .slice()
  .sort(compareFirstAttemptScore)
  .forEach(
    ({name, city, car, startNumber, firstAttempt, secondAttempt, thirdAttempt, fourthAttempt, totalScore, place}) => {

    addRowData(
      {name, city, car, startNumber, firstAttempt, secondAttempt, thirdAttempt, fourthAttempt, totalScore, place})
  })

  clearRowsContainer();
  tableRowContainer.appendChild(listOfRowsFragment);
}

export const renderTableSortedBySecondAttempt = (cars, attempts) => {
  const attemptsDataArray = Object.entries(attempts);
  const carsDataArray = Object.entries(cars);
  const carIds = getCarIds(carsDataArray);
  const tableData = createTableDataArray(carIds, attemptsDataArray, carsDataArray);
  const placesAndScores = createPlaceAndScoreArray(tableData);
  const rankedTableData = createRankedTableData(tableData, placesAndScores);
    
  rankedTableData
  .slice()
  .sort(compareSecondAttemptScore)
  .forEach(
    ({name, city, car, startNumber, firstAttempt, secondAttempt, thirdAttempt, fourthAttempt, totalScore, place}) => {

    addRowData(
      {name, city, car, startNumber, firstAttempt, secondAttempt, thirdAttempt, fourthAttempt, totalScore, place})
  })

  clearRowsContainer();
  tableRowContainer.appendChild(listOfRowsFragment);
}

export const renderTableSortedByThirdAttempt = (cars, attempts) => {
  const attemptsDataArray = Object.entries(attempts);
  const carsDataArray = Object.entries(cars);
  const carIds = getCarIds(carsDataArray);
  const tableData = createTableDataArray(carIds, attemptsDataArray, carsDataArray);
  const placesAndScores = createPlaceAndScoreArray(tableData);
  const rankedTableData = createRankedTableData(tableData, placesAndScores);
    
  rankedTableData
  .slice()
  .sort(compareThirdAttemptScore)
  .forEach(
    ({name, city, car, startNumber, firstAttempt, secondAttempt, thirdAttempt, fourthAttempt, totalScore, place}) => {

    addRowData(
      {name, city, car, startNumber, firstAttempt, secondAttempt, thirdAttempt, fourthAttempt, totalScore, place})
  })

  clearRowsContainer();
  tableRowContainer.appendChild(listOfRowsFragment);
}

export const renderTableSortedByFourthAttempt = (cars, attempts) => {
  const attemptsDataArray = Object.entries(attempts);
  const carsDataArray = Object.entries(cars);
  const carIds = getCarIds(carsDataArray);
  const tableData = createTableDataArray(carIds, attemptsDataArray, carsDataArray);
  const placesAndScores = createPlaceAndScoreArray(tableData);
  const rankedTableData = createRankedTableData(tableData, placesAndScores);
    
  rankedTableData
  .slice()
  .sort(compareFourthAttemptScore)
  .forEach(
    ({name, city, car, startNumber, firstAttempt, secondAttempt, thirdAttempt, fourthAttempt, totalScore, place}) => {

    addRowData(
      {name, city, car, startNumber, firstAttempt, secondAttempt, thirdAttempt, fourthAttempt, totalScore, place})
  })

  clearRowsContainer();
  tableRowContainer.appendChild(listOfRowsFragment);
}