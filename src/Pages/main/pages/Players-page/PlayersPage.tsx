// PlayersPage.tsx
import React, { useEffect, useState } from 'react';
import styles from './PlayersPage.module.scss';
import {
  Button,
  CustomSelect,
  EmptyItems,
  Input,
  ItemCard,
  Loading,
  MultiOption,
  MultiTeamSelect,
  Option,
  options
} from '@/Shared/ui';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/App/store';
import { useNavigate } from 'react-router-dom';
import { GetPlayers } from '@/Entities/Players/PlayersSlice';
import { Pagination } from '@/Features/Pagintation';
import { Link } from 'react-router-dom';
import { debounce } from 'lodash';
import { teamsItems } from '@/Entities';
import EmptyPlayers from '@/Shared/assets/images/EmptyPlayer.png';

const PlayersPage: React.FC = () => {
  // Инициализация хуков состояния и диспетчера
  const dispatch: AppDispatch = useDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(true); // Отображение состояния загрузки
  const playersData = useSelector((state: RootState) => state.players.data); // Получение данных об игроках из Redux
  const teamsData = useSelector((state: RootState) => state.teams.data); // Получение данных о командах из Redux
  const [selectedTeams, setSelectedTeams] = useState<MultiOption[]>([]); // Состояние выбранных команд для фильтрации
  const [currentPage, setCurrentPage] = useState<number>(1); // Текущая страница пагинации
  const [cardsPerPage, setCardsPerPage] = useState<{
    value: number;
    label: string;
  } | null>({ value: 6, label: '6' }); // Состояние количества карточек на странице
  const navigate = useNavigate(); // Хук для навигации между страницами

  useEffect(() => {
    setTimeout(() => {
      dispatch(teamsItems({}));
      dispatch(GetPlayers({}))
        .then(() => setIsLoading(false)) // Установка isLoading в false после успешной загрузки данных
        .catch((error) => console.error('Error fetching players:', error)); // Обработка ошибок
    }, 1000);
  }, []);

  const getTeamNameByID = (teamID: number) => {
    // Функция для получения названия команды по её ID
    const team = teamsData.find((team) => team.id === teamID);
    return team ? team.name : 'Unknown team';
  };

  const handleTeamPage = (
    selectedOptions: MultiOption | MultiOption[] | null
  ) => {
    // Обработчик выбора команд и переход на первую страницу при изменении фильтра
    if (selectedOptions === null) {
      setSelectedTeams([]); // Если ничего не выбрано, сбросить фильтр
    } else if (Array.isArray(selectedOptions)) {
      setSelectedTeams(selectedOptions); // Если выбрано несколько команд, применить фильтр
    } else {
      setSelectedTeams([selectedOptions]); // Если выбрана одна команда, применить фильтр
    }
    setCurrentPage(1); // Переход на первую страницу
  };

  const handleButtonClick = () => {
    navigate('/player-edit');
  };

  const handleSearch = debounce((searchQuery: string) => {
    dispatch(GetPlayers({ Name: searchQuery })); // Обработчик поиска с задержкой
  }, 500);

  // Формирование опций для мультиселекта команд
  const teamOptions = teamsData.map((team) => ({
    value: team.id || 0,
    label: team.name
  })) as MultiOption[];

  // Фильтрация данных по выбранным командам
  const filteredPlayers = selectedTeams.length
    ? playersData.filter((player) =>
        selectedTeams.some((team) => team.value === player.team)
      )
    : playersData;

  // Рассчет индексов начала и конца текущей страницы для пагинации
  const startIndex =
    (currentPage - 1) * (cardsPerPage ? cardsPerPage.value : 6);
  const endIndex = startIndex + (cardsPerPage ? cardsPerPage.value : 6);
  // Выборка данных для текущей страницы
  const currentPageItems = filteredPlayers.slice(startIndex, endIndex);

  return (
    <div className={styles['PlayersPage']}>
      <div className={styles['PlayersPage_input']}>
        <div className={styles['PlayersPage_input_search']}>
          {/* Поле ввода для поиска игроков */}
          <Input
            isSearch
            placeholder="Search..."
            onSearch={handleSearch}
            className={styles['PlayersPage_input-wide']}
          />
          {/* Мультиселект для фильтрации по командам */}
          <MultiTeamSelect
            options={teamOptions}
            value={selectedTeams}
            onChange={handleTeamPage}
            menuPlacement="bottom"
            customWidth="360px"
          />
        </div>

        {/* Кнопка добавления нового игрока */}
        <Button width="Small" onClick={handleButtonClick}>
          Add +
        </Button>
      </div>

      {isLoading ? (
        <Loading />
      ) : filteredPlayers.length === 0 ? (
        <div className={styles['PlayersPage_empty']}>
          <EmptyItems image={EmptyPlayers} text="Add new players to continue" />
        </div>
      ) : (
        <div className={styles['PlayersPage_content']}>
          {currentPageItems.map((player) => (
            // Отображение карточки для каждого игрока
            <Link
              key={player.id}
              to={`/players/${player.id}`}
              className={styles['link']}
            >
              <ItemCard
                type="player"
                image={player.avatarUrl}
                title={player.name}
                subtitle={getTeamNameByID(player.team)}
                number={player.number}
              />
            </Link>
          ))}
        </div>
      )}
      {/* Отображение пагинации и выбора количества карточек на странице */}
      {!isLoading && (
        <div className={styles['PlayersPage_footer']}>
          <Pagination
            totalCount={filteredPlayers.length}
            currentPage={currentPage}
            pageSize={cardsPerPage?.value}
            onPageChange={setCurrentPage}
          />
          <CustomSelect
            value={cardsPerPage}
            onChange={setCardsPerPage}
            options={options}
          />
        </div>
      )}
    </div>
  );
};

export default PlayersPage;
