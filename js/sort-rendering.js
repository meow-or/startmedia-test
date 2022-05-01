const headerRow = document.querySelector('.table__row-list_header');
const sortButtons = document.querySelectorAll('.table__row-button');
const activeSortButtonClass = 'table__row-button_active';

const deleteActiveFilterButtonClass = () => {
  sortButtons.forEach((button) => {
    button.classList.remove(activeSortButtonClass);
  });
}

export const setRenderCallback = (defaultCallback, firstAttemptCallback, secondAttemptCallback, thirdAttemptCallback, fourthAttemptCallback) => {

  const sortClickHandler = (evt) => {
    if (evt.target.classList.contains('total-score')) {
      deleteActiveFilterButtonClass();
      document.querySelector('.total-score').classList.add(activeSortButtonClass);
      setDefaultFilter(defaultCallback);

    } else if (evt.target.classList.contains('first-attempt')) {
      deleteActiveFilterButtonClass();
      document.querySelector('.first-attempt').classList.add(activeSortButtonClass);  
      setFirstAttemptFilter(firstAttemptCallback);

    } else if (evt.target.classList.contains('second-attempt')) {
      deleteActiveFilterButtonClass();
      document.querySelector('.second-attempt').classList.add(activeSortButtonClass);  
      setSecondAttemptFilter(secondAttemptCallback);
      
    } else if (evt.target.classList.contains('third-attempt')) {
      deleteActiveFilterButtonClass();
      document.querySelector('.third-attempt').classList.add(activeSortButtonClass);
      setThirdAttemptFilter(thirdAttemptCallback);
        
    } else if (evt.target.classList.contains('fourth-attempt')) {
      deleteActiveFilterButtonClass();
      document.querySelector('.fourth-attempt').classList.add(activeSortButtonClass);  
      setFourthAttemptFilter(fourthAttemptCallback);
    }
  }

  const setDefaultFilter = (cb) => {
    cb();
  }

  const setFirstAttemptFilter = (cb) => {
    cb();
  }

  const setSecondAttemptFilter = (cb) => {
    cb();
  }

  const setThirdAttemptFilter = (cb) => {
    cb();
  }

  const setFourthAttemptFilter = (cb) => {
    cb();
  }

  headerRow.addEventListener('click', sortClickHandler);
}