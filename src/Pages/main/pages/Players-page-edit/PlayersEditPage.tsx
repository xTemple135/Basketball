import React, { useCallback, useEffect, useMemo, useState } from 'react';
import styles from './PlayersEditPage.module.scss';
import {
  Button,
  CustomSelect,
  HeadersPage,
  Input,
  Option,
  PREFIX
} from '@/Shared/ui';
import { ImageLoader, getToken, playerInput } from '@/Features';
import { PlayerInterface, errorClear, teamsItems } from '@/Entities';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/App/store';
import axios from 'axios';
import {
  AddPlayer,
  GetPositions,
  PlayerUpdate
} from '@/Entities/Players/PlayersSlice';
import { Link } from 'react-router-dom';
import { GetPlayers } from '@/Entities/Players/PlayersSlice';

const PlayersEditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const teams = useSelector((state: RootState) => state.teams.data);
  const positions = useSelector((state: RootState) => state.players.positions);
  const player = useSelector((state: RootState) =>
    state.players.data.find((player) => player.id == Number(id))
  );
  const [selectedTeam, setSelectedTeam] = useState<Option | any>(null);
  const [selectedPosition, setSelectedPosition] = useState<Option | any>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
    control,
    setValue
  } = useForm<PlayerInterface>();
  const isEditMode = !!id;

  useEffect(() => {
    dispatch(teamsItems({}));
    dispatch(GetPlayers({}));
    dispatch(GetPositions());
    return () => {
      dispatch(errorClear());
    };
  }, [dispatch]);

  // Преобразование данных команд и позиций для селектов
  const teamOptions = useMemo(
    () =>
      teams.map((team) => ({
        value: team.id || 0,
        label: team.name
      })),
    [teams]
  );

  const positionOptions = useMemo(
    () =>
      positions.map((position, index) => ({
        value: index,
        label: position
      })),
    [positions]
  );

  // Обработчик отправки формы
  const onSubmit = useCallback(
    async (data: PlayerInterface) => {
      try {
        let newPlayer;
        const formatterData = {
          ...data,
          id: Number(id),
          team: selectedTeam?.value || 0,
          position: selectedPosition?.label || '',
          avatarUrl: player?.avatarUrl || ''
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
          formatterData.avatarUrl = response.data;
        }

        if (isEditMode) {
          newPlayer = await dispatch(PlayerUpdate(formatterData)).unwrap();
        } else {
          newPlayer = await dispatch(AddPlayer(formatterData)).unwrap();
        }
        navigate(`/players/${newPlayer.id}`);
      } catch (err) {
        console.error(err);
        // Здесь можно добавить обработку ошибок
      }
    },
    [
      dispatch,
      id,
      isEditMode,
      selectedImage,
      selectedPosition,
      selectedTeam,
      navigate
    ]
  );

  // Установка значений полей формы при редактировании игрока
  useEffect(() => {
    if (player && isEditMode && teams.length > 0 && positions.length > 0) {
      const selectedTeamData = teams.find((team) => team.id === player.team);
      setSelectedTeam(
        selectedTeamData
          ? { value: selectedTeamData.id || 0, label: selectedTeamData.name }
          : null
      );

      const selectedPositionData = positions.find(
        (position) => position === player.position
      );
      setSelectedPosition(
        selectedPositionData
          ? {
              value: positions.indexOf(selectedPositionData),
              label: selectedPositionData
            }
          : null
      );
      const dateOnly = player.birthday.slice(0, 10);
      setValue('name', player.name);
      setValue('height', player.height);
      setValue('weight', player.weight);
      setValue('birthday', dateOnly);
      setValue('team', selectedTeam ? selectedTeam : { value: 0, label: '' });
      setValue(
        'position',
        selectedPosition ? selectedPosition : { value: 0, label: '' }
      );
      setValue('number', player.number);
    }
  }, [player, isEditMode, teams, positions, setValue]);

  console.log('render');

  return (
    <main className={styles['playerEdit-wrapper']}>
      <HeadersPage
        paths={['Players', isEditMode ? 'Edit' : 'Add new Player']}
        controlsVisible={false}
      />
      <div className={styles['playerEdit-page']}>
        <ImageLoader
          value={null}
          onChange={(file) => {
            setSelectedImage(file);
          }}
          className={styles['playerEdit-img']}
        />
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={styles['playerEdit-page_form']}
        >
          <Input
            register={register}
            name="name"
            label="Name"
            error={errors.name?.message}
            clearErrors={clearErrors}
            className={styles['playerEdit-page_input']}
          />
          <Controller
            name="position"
            control={control}
            rules={{ required: 'Выбор позиции обязателен' }}
            render={({ field, fieldState }) => (
              <>
                <CustomSelect
                  label="Positions"
                  value={field.value}
                  options={positionOptions}
                  customWidth="366px"
                  onChange={(value) => {
                    field.onChange(value);
                    setSelectedPosition(value);
                  }}
                  menuPlacement="bottom"
                  bordered={true}
                  className={styles['playerEdit-page_input']}
                />
                {fieldState.error && (
                  <span className={styles['error-message']}>
                    {fieldState.error.message}
                  </span>
                )}
              </>
            )}
          />
          <Controller
            name="team"
            control={control}
            rules={{ required: 'Выбор команды обязателен' }}
            render={({ field, fieldState }) => (
              <>
                <CustomSelect
                  label="Teams"
                  value={field.value}
                  options={teamOptions}
                  customWidth="366px"
                  onChange={(value) => {
                    field.onChange(value);
                    setSelectedTeam(value);
                  }}
                  menuPlacement="bottom"
                  bordered={true}
                  className={styles['playerEdit-page_input']}
                />
                {fieldState.error && (
                  <span className={styles['error-message']}>
                    {fieldState.error.message}
                  </span>
                )}
              </>
            )}
          />

          <div className={styles['playerEdit-page_form_row']}>
            <Input
              register={register}
              name="height"
              label="Height (cm)"
              error={errors.height?.message}
              type="number"
              clearErrors={clearErrors}
            />
            <Input
              register={register}
              name="weight"
              label="Weight (kg)"
              error={errors.weight?.message}
              type="number"
              clearErrors={clearErrors}
            />
          </div>
          <div className={styles['playerEdit-page_form_row']}>
            <Input
              type="date"
              register={register}
              name="birthday"
              label="Birthday"
              error={errors.birthday?.message}
              clearErrors={clearErrors}
            />
            <Input
              register={register}
              name="number"
              label="Number"
              error={errors.number?.message}
              type="number"
              clearErrors={clearErrors}
            />
          </div>
          <div className={styles['playerEdit-page_form_row']}>
            <Link to={'/players'} className={styles['link']}>
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
    </main>
  );
};

export default PlayersEditPage;
