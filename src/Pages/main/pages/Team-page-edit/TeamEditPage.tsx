import { AppDispatch, RootState } from '@/App/store';
import { TeamsInterface } from '@/Entities/Teams/model';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import styles from './TeamEditPage.module.scss';
import { Button, ErrorNotification, HeadersPage, Input } from '@/Shared/ui';
import { ImageLoader, teamsInput } from '@/Features';
import { Link } from 'react-router-dom';
import { TeamsAdd, errorClear } from '@/Entities';

const TeamEditPage = () => {
  const dispatch: AppDispatch = useDispatch();
  const error = useSelector((state: RootState) => state.teams.error);
  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors
  } = useForm<TeamsInterface>();
  // отправка формы на сервер
  const onSubmit = (data: TeamsInterface) => {
    dispatch(TeamsAdd(data));
  };

  // Очистка ошибки при размонтировании
  useEffect(() => {
    return () => {
      dispatch(errorClear());
    };
  }, [dispatch]);
  return (
    <main className={styles['teamEdit-wrapper']}>
      <HeadersPage paths={['Teams', 'Add new team']} controlsVisible={false} /> 
      <div className={styles['teamEdit-page']}>
        <ImageLoader value={null} onChange={(file) => console.log(file)} />
        <div className={styles['teamEdit-page_form']}>
          <form className={styles['TeamAdd']} onSubmit={handleSubmit(onSubmit)}>
            {/*Поля ввода */}
            {teamsInput.map((field) => ( 
              <div key={field.name} className={styles['form-field']}>
                <Input
                  label={field.label}
                  type={field.type || 'text'}
                  register={register}
                  name={field.name}
                  error={errors[field.name as keyof typeof errors]?.message}
                  required={field.required}
                  clearErrors={clearErrors}
                />
              </div>
            ))}
            {/*Вывод ошибки */}
            {error && <ErrorNotification message={error} />}    
            <div className={styles['teamEdit-page_footer']}>
              <Link to={'/teams'} className={styles['link']}>
                <Button width="Medium" secondary>
                  Cancel
                </Button>
              </Link>
              <Button width="Medium" type="submit">
                Save
              </Button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default TeamEditPage;
