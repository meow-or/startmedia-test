<?php
  require('./data_cars.json');

  $cars_data = './data_cars.json';
  $cars_json = file_get_contents($cars_data);
  $carsObject = json_decode($cars_json,true);
?>

