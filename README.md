# Xsolla API user
Комментарии:


### [demo](http://blog.0xfc.cn/2015/09/12/paging/) ###


**install**<br/>
1)Клонируем с репозитория проект.<br/>
2)Указываем web серверу загрузочную папку "public"<br/>

**разработка**<br/>
Для разработки нужно запустить
> `npm install`

**Сборка проекта**<br/>
> Для сборки запустить `gulp`<br/>
> Для сборки на бою минифицированных файлов `gulp --production`<br/>

**комментарии к приложению**
>Оценка приложения по 10 бальной шкале : 7 балов
>- не все компоненты оформлены качественно по css стилям
>- не во всех формах стоят проверки на вводимое значение
>- не все ответы сервера обрабатываются
>- нет потдержки старых браузеров
>- есть излишний и не "красивый" код (можно и нужно отрефакторить)
>
>Основные моменты в приложении реализованы:
>- пагинация
>- поиск по списку
>- модальные окна
>- формы отправки
>- запросы к API сделаны все
>- обработка ответов сервера (не во всех местах)

**Тестирование**
>Тестировалось на ie11; chrome 50+; firefox 47+
>
>Для автоматизации тестирования применялся PHPUnit selenium