<?php
  require('./data_attempts.json');

  $attempts_data = './data_attempts.json';
  $attempts_json = file_get_contents($attempts_data);
  $attemptsObject = json_decode($attempts_json,true);
?>

