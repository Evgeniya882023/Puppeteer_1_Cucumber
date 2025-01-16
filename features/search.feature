Feature: Booking cinema tickets tests
    
     Scenario: booking available ticket
        Given пользователь находится на странице "http://qamid.tmweb.ru/client/index.php"
        When пользователь выбирает дату
        When пользователь выбирает время фильма
        When пользователь выбирает место и ряд
        When пользователь нажимает кнопку забронировать
        Then пользователь на странице с текстом "Вы выбрали билеты:"

      Scenario: Choosing vip seats
        Given пользователь находится на странице "http://qamid.tmweb.ru/client/index.php"
        When пользователь выбирает дату
        When пользователь выбирает время и зал в вип зал
        When пользователь выбирает место в вип зале
        When пользователь нажимает кнопку забронировать
        Then пользователь видит страницу с указанной суммой "Стоимость: 1000 руб."

    Scenario: booking unavailable ticket
        Given пользователь находится на странице "http://qamid.tmweb.ru/client/index.php"
        When пользователь выбирает дату
        When пользователь выбирает время фильма
        When пользователь выбирает уже забронированное место
        Then нажать на кнопку забронировать невозможно

