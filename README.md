# paymentWidget

Клонируем проект и открываем index.html.

Успешно было запущено и проверенно на:
* OS `Ubuntu 16.04.2 LTS`
* Chrome `58.0.3029.110 (64-bit)`

Неуспешно было запущено и проверенно на Firefox, есть баги:
* проблема с ререндером, мигает валидация
* проблема с выставлением курсора в конец инпута после ререндера

Не успел реализовать:
* конкатинацию всех файлов в один
* оптимизации под мобильные экраны
* проверку кроссбраузерности и кроссплатформенности
* рекурсивные Proxy стора, чтоб можно было удобнее сетить новые данные
* сделать красивую обертку над стором
* немного порефакторить
* кажется что-то ещё

Достиг целей:
* сделать рантаймовый около-React в немного строк с около-Flux-архитектурой
* написать приложение без сторонних библиотек
* написать проект с табамами вместо пробелов
