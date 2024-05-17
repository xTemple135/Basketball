  import { AppDispatch, RootState } from '@/App/store';
  import { TeamsInterface } from '@/Entities/Teams/model';
  import React, { useEffect, useState, useCallback } from 'react';
  import { useForm } from 'react-hook-form';
  import { useDispatch, useSelector } from 'react-redux';
  import styles from './TeamEditPage.module.scss';
  import {
    Button,
    ErrorNotification,
    HeadersPage,
    Input,
    PREFIX
  } from '@/Shared/ui';
  import { ImageLoader, getToken, teamsInput } from '@/Features';
  import { Link, useNavigate, useParams } from 'react-router-dom';
  import { TeamsAdd, TeamsUpdate, errorClear } from '@/Entities';
  import axios from 'axios';

  const TeamEditPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch: AppDispatch = useDispatch();
    const error = useSelector((state: RootState) => state.teams.error);
    const team = useSelector((state: RootState) =>
      state.teams.data.find((team) => team.id === Number(id))
    );

    const {
      register,
      handleSubmit,
      formState: { errors },
      clearErrors,
      reset
    } = useForm<TeamsInterface>();
    const isEditMode = !!id;
    const [selectedImage, setSelectedImage] = useState<File | null>(null);

    useEffect(() => {
      if (team && isEditMode) {
        reset(team);
      }
    }, [team, isEditMode, reset]);

    const onSubmit = useCallback(async (data: TeamsInterface) => {
      try {
        let newTeam;
        const formatterData = {
          ...data,
          id: Number(id),
          foundationYear: Number(data.foundationYear),
          imageUrl: ''
        };

        if (selectedImage) {
          const formData = new FormData();
          const token = getToken();
          formData.append('file', selectedImage);
          const response = await axios.post(
            `${PREFIX}/api/Image/SaveImage`,
            formData,
            {
              headers: {
                Authorization: `Bearer ${token}`
              }
            }
          );
          formatterData.imageUrl = response.data;
        }

        if (isEditMode) {
          newTeam = await dispatch(TeamsUpdate(formatterData)).unwrap();
        } else {
          newTeam = await dispatch(TeamsAdd(formatterData)).unwrap();
        }
        navigate(`/teams/${newTeam.id}`);
      } catch (err) {
        console.error(err);
      }
    }, [dispatch, id, isEditMode, navigate, selectedImage]);

    
    useEffect(() => {
      return () => {
        dispatch(errorClear());
      };
    }, [dispatch]);

    return (
      <main className={styles['teamEdit-wrapper']}>
        <HeadersPage
          paths={['Teams', isEditMode ? `Edit ${team?.name}` : 'Add new team']}
          controlsVisible={false}
        />
        <div className={styles['teamEdit-page']}>
          <ImageLoader className={styles['teamEdit-img']}  value={null} onChange={(file) => setSelectedImage(file)} />
          <div className={styles['teamEdit-page_form']}>
            <form className={styles['TeamAdd']} onSubmit={handleSubmit(onSubmit)}>
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
                    className={styles['form-input']}
                  />
                </div>
              ))}
              {error && <ErrorNotification message={error} />}
              <div className={styles['teamEdit-page_footer']}>
                <Link to={'/teams'} className={styles['link']}>
                  <Button width="Medium" secondary>
                    Cancel
                  </Button>
                </Link>
                <Button className={styles['teamEdit-submit']} width="Medium" type="submit">
                  Save
                </Button>
              </div>
            </form>
          </div>
        </div>
      </main>
    );
  };

  export default React.memo(TeamEditPage);
