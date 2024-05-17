import React from 'react';
import styles from './SignIn.module.scss';
import {
  Button,
  CustomLink,
  ErrorNotification,
  Headers,
  Input
} from '@/Shared/ui';
import SignInImg from '@/Shared/assets/images/SignIn.png';
import { SignInForm } from '@/Features';

const SignIn: React.FC = () => {
  const {
    register,
    handleSubmit,
    errors,
    submit,
    clearErrors,
    displayError,
    error
  } = SignInForm();

  return (
    <main className={styles['SignIn']}>
      <div className={styles['content']}>
        <form onSubmit={handleSubmit(submit)}>
          <Headers text="Sign In" />
          <Input
            name="login"
            label="login"
            register={register}
            error={errors.login?.message}
            clearErrors={clearErrors}
          />
          <Input
            name="password"
            label="password"
            type="Password"
            register={register}
            error={errors.password?.message}
            clearErrors={clearErrors}
          />
          {error && <span className={styles['error']}>{error}</span>}
          <Button type="submit" width="Large">
            Sign In
          </Button>
          <p className={styles['signInLink']}>
            Not a member yet?
            <CustomLink href="/auth/register" underLine>
              Sign in
            </CustomLink>
          </p>
        </form>
      </div>
      <div className={styles['imageContainer']}>
        {displayError && (
          <div className={styles['errorContainer']}>
            <ErrorNotification
              message={
                'User with the specified username / password was not found.'
              }
            />
          </div>
        )}
        <img src={SignInImg} alt="Лого регистрации" />
      </div>
    </main>
  );
};

export default SignIn;
