Feature: Booking cinema tickets tests
    @only
     Scenario: booking available ticket
        Given пользователь находится на странице "http://qamid.tmweb.ru/client/index.php"
        When пользователь выбирает дату
        When пользователь выбирает время фильма
        When пользователь выбирает место
        When пользователь нажимает кнопку забронировать
        Then пользователь на странице с текстом "Вы выбрали билеты:"

     Scenario: booking some available tickets
        Given пользователь находится на странице "http://qamid.tmweb.ru/client/index.php"
        When пользователь выбирает дату
        When пользователь выбирает время фильма
        When пользователь выбирает место
        When пользователь выбирает еще одно место
        When пользователь выбирает третье место
        When пользователь нажимает кнопку забронировать
        Then пользователь на странице с текстом "Вы выбрали билеты:"

    Scenario: booking unavailable ticket
        Given пользователь находится на странице "http://qamid.tmweb.ru/client/index.php"
        When пользователь выбирает дату
        When пользователь выбирает время фильма
        When пользователь выбирает уже забронированное место
        Then нажать на кнопку забронировать невозможно

//сценарий для материала из лекции
Feature: Search a course
    Scenario: Should search by text
        Given user is on "/navigation" page
        When user search by "тестировщик"
        Then user sees the course suggested "Тестировщик ПО"