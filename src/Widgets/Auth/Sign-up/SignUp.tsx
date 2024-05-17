// SignUp.tsx
import React, { useState } from 'react';
import styles from './SignUp.module.scss';
import { Button, Checkbox, CustomLink, Headers, Input } from '@/Shared/ui';
import SignUpImg from '@/Shared/assets/images/Sign.png';
import { AuthForm, inputFields } from '@/Features';
import { useSelector } from 'react-redux';
import { RootState } from '@/App/store';

const SignUp: React.FC = () => {
  /* Использование хука авторизации */
  const { register, handleSubmit, errors, submit, clearErrors } = AuthForm();
  /* Состояние чекбокса */
  const [agreementAccepted, setAgreementAccepted] = useState<boolean>(false);
  /* Чтение ошибки авторизации */
  const authError = useSelector((state: RootState) => state.auth.signUpError);

  return (
    <main className={styles['SignUp']}>
      <div className={styles['content']}>
        <form onSubmit={handleSubmit(submit)}>
          <Headers text="Sign Up" />
          {inputFields.map((field) => (
            <Input
              key={field.name}
              name={field.name}
              label={field.label}
              type={field.type}
              register={register}
              error={errors[field.name as keyof typeof errors]?.message}
              clearErrors={clearErrors}
              required={field.required}
            />
          ))}
          <Checkbox
            isChecked={agreementAccepted}
            onChange={(isChecked) => setAgreementAccepted(isChecked)}
          >
            I accept the agreement
          </Checkbox>
          <Button type="submit"  disabled={!agreementAccepted}>
            Sign Up
          </Button>
          <p className={styles['signInLink']}>
            Already a member?{' '}
            <CustomLink href="/auth/login" underLine>
              Sign in
            </CustomLink>
          </p>
        </form>
      </div>
      <div className={styles['imageContainer']}>
        <img src={SignUpImg} alt="Лого регистрации" />
      </div>
    </main>
  );
};

export default SignUp;
