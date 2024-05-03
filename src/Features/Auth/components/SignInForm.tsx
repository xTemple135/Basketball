import { AppDispatch, RootState } from '@/App/store';
import { AuthInterface } from '@/Entities';
import { login } from '@/Entities/Auth/AuthSlice';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export const SignInForm = () => {
  const [displayError, setDisplayError] = useState(false);
  const error = useSelector((state: RootState) => state.auth.signInError);
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors
  } = useForm<AuthInterface>({
    mode: 'onBlur'
  });

  const submit: SubmitHandler<AuthInterface> = async (data) => {
    if (Object.keys(errors).length === 0) {
      const action = await dispatch(login(data));
      if (login.fulfilled.match(action)) {
        navigate('/');
      } else {
        setDisplayError(true);
        setTimeout(() => {
          setDisplayError(false);
        }, 3000);
      }
    }
  };
  return {
    register,
    handleSubmit,
    errors,
    submit,
    clearErrors,
    displayError,
    error
  };
};
