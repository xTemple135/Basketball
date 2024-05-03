import React, { useEffect, useState } from 'react';
import styles from './TeamsPage.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/App/store';
import { teamsItems } from '@/Entities';
import { Button, CardSelect, Input, ItemCard, Loading } from '@/Shared/ui';
import { Pagination } from '@/Features/Pagintation';
import { useNavigate } from 'react-router-dom';
import { debounce } from 'lodash';

const TeamsPage: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const teamsData = useSelector((state: RootState) => state.teams.data);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [cardsPerPage, setCardsPerPage] = useState<{
    value: number;
    label: string;
  } | null>({ value: 6, label: '6' });
  const [searchQuery, setSearchQery] = useState('');
  const navigate = useNavigate();
  // Имитация задержки загрузки данных
  useEffect(() => {
    setTimeout(() => {
      dispatch(teamsItems({})); // Загрузка данных о командах
      setIsLoading(false);
    }, 1000);
  }, []);

  const handleButtonClick = () => {
    navigate('/team-edit');
  };
  // функция для поиска команд
  const handleSearch = debounce((searchQuery:string) => {
    dispatch(teamsItems({Name: searchQuery}))
  }, 500) // интервал debounce 

  const startIndex =
    (currentPage - 1) * (cardsPerPage ? cardsPerPage.value : 6); // Индекс первого элемента на текущей странице
  const endIndex = startIndex + (cardsPerPage ? cardsPerPage.value : 6); // Индекс последнего элемента на текущей странице
  const currentPageItems = teamsData.slice(startIndex, endIndex); // Элементы текущей страницы пагинации
  return (
    <div className={styles['TeamsPage']}>
      <div className={styles['TeamsPage_input']}>
        <Input isSearch placeholder="Search..." onSearch={handleSearch} />
        <Button width={'Small'} onClick={handleButtonClick}>
          Add +
        </Button>
      </div>
      <div className={styles['TeamsPage_content']}>
        {isLoading ? (
          <Loading message="Загрузка..." />
        ) : (
          currentPageItems.map((team) => (
            <ItemCard
              key={team.id}
              image={team.imageUrl}
              title={team.name}
              subtitle={`Year of foundation:${team.foundationYear}`}
            />
          ))
        )}
      </div>
      {!isLoading && (
        <div className={styles['TeamsPage_footer']}>
          <Pagination
            totalCount={teamsData.length}
            currentPage={currentPage}
            pageSize={cardsPerPage?.value}
            onPageChange={setCurrentPage}
          />

          <CardSelect value={cardsPerPage} onChange={setCardsPerPage} />
        </div>
      )}
    </div>
  );
};

export default TeamsPage;
