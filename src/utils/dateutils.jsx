import moment from 'moment-jalaali';

moment.locale("fa");

export const getTodayJalali = (format = 'jD jMMMM jYYYY') => {
  return moment().format(format);
};

export const convertMiladi2Jalali = (date, format = 'jD jMMMM jYYYY') => {
  if (!date) return '-';
  const newDate = moment(date);
  return newDate.isValid() ? newDate.format(format) : '-';
};
