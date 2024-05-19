import React, { useCallback, useEffect, useState } from 'react';
import styles from './TeamsPage.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/App/store';
import { teamsItems } from '@/Entities';
import {
  Button,
  CustomSelect,
  EmptyItems,
  Input,
  ItemCard,
  Loading,
  options
} from '@/Shared/ui';
import { Pagination } from '@/Features/Pagintation';
import { useNavigate } from 'react-router-dom';
import { debounce } from 'lodash';
import { Link } from 'react-router-dom';
import EmptyTeam from '@/Shared/assets/images/EmptyTeam.png';


const TeamsPage: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const teamsData = useSelector((state: RootState) => state.teams.data);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [cardsPerPage, setCardsPerPage] = useState<{
    value: number;
    label: string;
  } | null>({ value: 6, label: '6' });
  const navigate = useNavigate();
  // Имитация задержки загрузки данных
  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      dispatch(teamsItems({}))
        .then(() => {
          setIsLoading(false);
        })
        .catch((error) => {
          console.error(error);
          setIsLoading(false);
        });
    }, 1000);
  }, []);

  const handleButtonClick = () => {
    navigate('/team-edit');
  };
  // функция для поиска команд
  const handleSearch = useCallback(
    debounce((searchQuery: string) => {
      dispatch(teamsItems({ Name: searchQuery }));
    }, 500),
    [] // зависимости
  );

  const startIndex =
    (currentPage - 1) * (cardsPerPage ? cardsPerPage.value : 6); // Индекс первого элемента на текущей странице
  const endIndex = startIndex + (cardsPerPage ? cardsPerPage.value : 6); // Индекс последнего элемента на текущей странице
  const currentPageItems = teamsData.slice(startIndex, endIndex); // Элементы текущей страницы пагинации
  return (
    <div className={styles['TeamsPage']}>
      <div className={styles['TeamsPage_input']}>
        <Input
          isSearch
          placeholder="Search..."
          onSearch={handleSearch}
          className={styles['TeamsPage_input-wide']}
        />
        <Button width={'Small'} onClick={handleButtonClick}>
          Add +
        </Button>
      </div>
      {isLoading ? (
        <Loading />
      ) : teamsData.length === 0 ? (
        <div className={styles['TeamsPage_empty']}>
          <EmptyItems image={EmptyTeam} text="Add new teams to continue" />
        </div>
      ) : (
        <div className={styles['TeamsPage_content']}>
          {currentPageItems.map((team) => (
            <Link
              key={team.id}
              to={`/teams/${team.id}`}
              className={styles['link']}
            >
              <ItemCard
                type="team"
                key={team.id}
                image={team.imageUrl}
                title={team.name}
                subtitle={`Year of foundation:${team.foundationYear}`}
              />
            </Link>
          ))}
        </div>
      )}
      {!isLoading && (
        <div className={styles['TeamsPage_footer']}>
          <Pagination
            totalCount={teamsData.length}
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

export default TeamsPage;
