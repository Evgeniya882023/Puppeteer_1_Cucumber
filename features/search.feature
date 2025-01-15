Feature: Booking cinema tickets tests
    
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
        When Пользователь выбирает ряд 2 и место 4
        When Пользователь выбирает ряд 5 и место 5
        When пользователь нажимает кнопку забронировать
        Then пользователь на странице с текстом "Вы выбрали билеты:"

    Scenario: booking unavailable ticket
        Given пользователь находится на странице "http://qamid.tmweb.ru/client/index.php"
        When пользователь выбирает дату
        When пользователь выбирает время фильма
        When пользователь выбирает уже забронированное место
        Then нажать на кнопку забронировать невозможно

