import * as Yup from 'yup';

export const UserSchema = Yup.object().shape({
  firstName: Yup.string().required('Имя обязательно'),
  lastName: Yup.string().required('Фамилия обязательна'),
  username: Yup.string().min(3, 'Минимум 3 символа').required('Логин обязателен'),
  email: Yup.string().email('Неверный формат').required('Email обязателен'),
  age: Yup.number().positive('Больше 0').integer().required('Укажите возраст'),
  password: Yup.string().min(6, 'Минимум 6 символов'),
  birthDate: Yup.string().required('Дата обязательна'),
  phone: Yup.string().required('Телефон обязателен'),

  height: Yup.number().positive().required(),
  weight: Yup.number().positive().required(),
  eyeColor: Yup.string().required(),
  bloodGroup: Yup.string().required(),
  
  hair: Yup.object().shape({
    color: Yup.string().required('Укажите цвет'),
    type: Yup.string().required('Укажите тип'),
  }),

  address: Yup.object().shape({
    address: Yup.string().required('Улица обязательна'),
    city: Yup.string().required('Город обязателен'),
    state: Yup.string().required(),
    postalCode: Yup.string().required(),
  }),

  university: Yup.string().required(),
  company: Yup.object().shape({
    name: Yup.string().required('Название компании обязательно'),
    title: Yup.string().required('Должность обязательна'),
    department: Yup.string().required(),
  }),

  bank: Yup.object().shape({
    cardNumber: Yup.string()
      .matches(/^\d{16}$/, 'Должно быть 16 цифр')
      .required('Номер карты обязателен'),
    cardExpire: Yup.string().required(),
    currency: Yup.string().required(),
    iban: Yup.string().required(),
  }),

  crypto: Yup.object().shape({
    coin: Yup.string().required(),
    wallet: Yup.string().required(),
    network: Yup.string().required(),
  }),

  role: Yup.string()
    .oneOf(['admin', 'user', 'moderator'], 'Неверная роль')
    .required('Выберите роль'),
});
