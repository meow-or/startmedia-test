const urls = [
  '../get_cars_data.php',
  '../get_attempts_data.php'
]

const requests = urls.map(
  url => fetch(url)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }

      throw new Error(`${response.status} ${response.statusText}`);
    })
  );

function getData (onSuccess, onFail) {
  Promise.all(requests)
  .then(onSuccess)
  .catch(onFail)
}

export { getData }
