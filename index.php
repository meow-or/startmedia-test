<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="css/normalize.css">
  <link rel="stylesheet" href="css/style.css">
  <title>tournament table</title>
</head>
<body class="page">

  <div class="page__container">

    <header class="header">
      <h1 class="header__title">турнирная таблица</h1>
    </header>

    <main>
      <ul class="table">

        <li class="table__row">
          <ul class="table__row-list table__row-list_header">
            <li class="table__row-item">cтартовый номер</li>
            <li class="table__row-item">фио</li>
            <li class="table__row-item">город</li>
            <li class="table__row-item">машина</li>
            <li class="table__row-item"><button class="table__row-button first-attempt">попытка 1</button></li>
            <li class="table__row-item"><button class="table__row-button second-attempt">попытка 2</button></li>
            <li class="table__row-item"><button class="table__row-button third-attempt">попытка 3</button></li>
            <li class="table__row-item"><button class="table__row-button fourth-attempt">попытка 4</button></li>
            <li class="table__row-item"><button class="table__row-button total-score">сумма баллов</button></li>
            <li class="table__row-item">место</li>
          </ul>
        </li>

      </ul>
    </main>

  <?php
    require('./components/table-row-template.php');
  ?>

  </div>

  <script type="module" src="./js/main.js"></script>
  
</body>
</html>
