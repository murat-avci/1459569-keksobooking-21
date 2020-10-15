'use strict';

(function () {
  const URL_GET = `https://21.javascript.pages.academy/keksobooking/data`;
  const URL_POST = `https://21.javascript.pages.academy/keksobooking`;

  const getXhrData = function (onLoad, onError) {
    const xhr = new XMLHttpRequest();
    xhr.responseType = `json`;

    xhr.addEventListener(`load`, function () {
      switch (xhr.status) {
        case window.constants.SUCCESS_REQ:
          onLoad(xhr.response);
          break;
        case window.constants.FAILED_REQ:
          onError(`Неверный запрос`);
          break;
        case window.constants.BAD_REQ:
          onError(`Ничего не найдено`);
          break;
        default:
          onError(`Неизвестный статус: ${xhr.status} ${xhr.statusText}`);
      }
    });
    xhr.addEventListener(`error`, function () {
      onError(`Что-то пошло не так! Произошла ошибка соединения`);
    });
    xhr.addEventListener(`timeout`, function () {
      onError(`Запрос не успел выполниться за ${xhr.timeout} мс`);
    });

    xhr.timeout = window.constants.TIMEOUT;

    return xhr;
  };

  window.backend = {
    load(onLoad, onError) {
      const xhr = getXhrData(onLoad, onError);

      xhr.open(`GET`, URL_GET);
      xhr.send();

    },
    upload(data, onLoad, onError) {
      const xhr = getXhrData(onLoad, onError);

      xhr.open(`POST`, URL_POST);
      xhr.send(data);
    }
  };

})();
