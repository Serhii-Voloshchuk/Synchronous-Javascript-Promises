import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const datetimePicker = document.querySelector('#datetime-picker')
const buttonStart = document.querySelector('[data-start]')
const daysSpan = document.querySelector('[data-days]')
const hoursSpan = document.querySelector('[data-hours]')
const minutesSpan = document.querySelector('[data-minutes]')
const secondsSpan = document.querySelector('[data-seconds]')


let timerId
let userSelectedDate

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) { //Втроенный метод flatpickr, который принимает массив (в данном случае выбирается одна дата и берется первый элемент масссива)
        const selectedDate = selectedDates[0];
        if(selectedDate <= new Date()){
            iziToast.error({
                title: 'error',
                message: 'Please choose a date in the future'
            });
            buttonStart.disabled = true;
        } else {
            userSelectedDate = selectedDate;
            buttonStart.disabled = false;
        }
    },
  };

  flatpickr(datetimePicker, options)

  buttonStart.addEventListener('click', handleStartingBtn)

function handleStartingBtn(){
    buttonStart.disabled = true;
    datetimePicker.disabled = true;

    timerId = setInterval(() => {
        const currentTime = new Date()
        const timeDifference = userSelectedDate - currentTime

        if(timeDifference <= 0){
            clearInterval(timerId);
            datetimePicker.disabled = false;
            return;
        }

        const time = convertMs(timeDifference)
        updateTimerDisplay(time)
    },1000)
}


  function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  
    return { days, hours, minutes, seconds };
  }

  function updateTimerDisplay({days, hours, minutes, seconds}){
    daysSpan.textContent = addLeadingZero(days)
    hoursSpan.textContent = addLeadingZero(hours)
    minutesSpan.textContent = addLeadingZero(minutes)
    secondsSpan.textContent = addLeadingZero(seconds)
  }

  function addLeadingZero(value){
    return String(value).padStart(2,0)
  }
  
  console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
  console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
  console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}



  /**
   * Алгоритм построения таймера обратного отсчета
Импорт библиотек:

Импортируйте необходимые библиотеки для выбора даты (Flatpickr) и для отображения уведомлений (IziToast).
Импортируйте соответствующие CSS-файлы для стилизации.
Определение переменных:

Получите ссылки на элементы DOM, которые будете использовать (например, поле выбора даты, кнопку запуска, и элементы для отображения оставшихся дней, часов, минут и секунд).
Создайте переменные для хранения идентификатора таймера и выбранной пользователем даты.
Настройка Flatpickr:

Создайте объект настроек для Flatpickr, включая:
Включение выбора времени.
Установку текущей даты как значения по умолчанию.
Обработчик события onClose, который проверяет, выбрана ли дата в будущем. Если нет, выводите уведомление и отключайте кнопку.
Инициализация Flatpickr:

Примените настройки к полю выбора даты, используя функцию flatpickr.
Добавление обработчика события на кнопку:

Привяжите обработчик события click к кнопке запуска. Этот обработчик будет запускать таймер.
Функция запуска таймера:

В обработчике события отключите кнопку и поле выбора даты.
Используйте setInterval для запуска таймера каждую секунду.
Внутри таймера:
Получите текущее время и вычислите разницу между выбранной датой и текущим временем.
Если разница меньше или равна нулю, очистите интервал и включите поле выбора даты.
В противном случае, преобразуйте разницу времени в дни, часы, минуты и секунды, и обновите отображение.
Функция преобразования миллисекунд:

Создайте функцию convertMs, которая принимает миллисекунды и преобразует их в дни, часы, минуты и секунды.
Функция обновления отображения таймера:

Создайте функцию updateTimerDisplay, которая обновляет текстовое содержимое элементов, отображающих оставшееся время.
Функция добавления ведущего нуля:

Создайте функцию addLeadingZero, которая добавляет ноль перед числом, если оно меньше 10.
Тестирование функций:

Протестируйте функцию convertMs, выводя результаты в консоль, чтобы убедиться, что преобразование выполняется корректно.
Примерный код
Код можно разделить на функции, чтобы сделать его более структурированным и читаемым. Каждая функция выполняет отдельную задачу, что упрощает отладку и понимание.
   */