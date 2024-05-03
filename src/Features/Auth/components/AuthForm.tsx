import { SubmitHandler, useForm } from 'react-hook-form';
import { AuthInterface } from '@/Entities';
import { AppDispatch } from '@/App/store';
import { regUser } from '@/Entities/Auth/AuthSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export const AuthForm = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  /* Хук из библиотеки react-hook-form
   */
  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
    setError
  } = useForm<AuthInterface>({});

  /* Обработчик формы  */
  const submit: SubmitHandler<AuthInterface> = async (data) => {
    /* Проверка паролей */
    if (data.password !== data.passwordRepeat) {
      setError('passwordRepeat', {
        message: 'Пароли не совпадают'
      });
      return;
    }
    const { passwordRepeat, ...dataWithoutPasswordRepeat } = data;

    const action = await dispatch(regUser(dataWithoutPasswordRepeat));
    /* Если регистрация успешна, то идет перенаправление на главную страницу */
      if (regUser.fulfilled.match(action)) {
      navigate('/');
    } else if (regUser.rejected.match(action)) {
      setError('login', {
        message: action.payload as string
      });
    }
  };

  return { register, handleSubmit, errors, submit, clearErrors };
};
