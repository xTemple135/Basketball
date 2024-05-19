import React, { Suspense, useEffect, useState } from 'react';
import styles from './PlayerPage.module.scss';
import { HeadersPage, Loading, PREFIX } from '@/Shared';
import { Await, useLoaderData, useNavigate } from 'react-router-dom';
import { AgeCalculator, PlayerInterface } from '@/Entities';
import axios from 'axios';
import { getToken } from '@/Features';

const PlayerPage = () => {
  const navigate = useNavigate();
  const data = useLoaderData() as PlayerInterface | undefined;
  const [teamName, setTeamName] = useState<string>('');
  // Обработчик редактирования игрока
  const handleEdit = (id: number | undefined) => {
    if (id !== undefined) {
      navigate(`/player-edit/${id}`);
    }
  };

  // Получение названия команды игрока
  useEffect(() => {
    if (data?.team) {
      const token = getToken();
      axios
        .get(`${PREFIX}/api/Team/Get?id=${data.team}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then((response) => {
          setTeamName(response.data.name);
        });
    }
  }, [data]);

  // Обработчик удаления игрока
  const handleDelete = async (id: number | undefined) => {
    if (id == undefined) {
      return;
    }
    try {
      const token = getToken();
      await axios.delete(`${PREFIX}/api/Player/Delete`, {
        params: {
          id: id
        },
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      navigate('/players');
    } catch {
      throw new Error('ID не найден');
    }
  };

  return (
    <Suspense fallback={<Loading />}>
      <Await resolve={data}>
        {(data: PlayerInterface) => (
          <div className={styles['playerPage']}>
            <div className={styles['playerPage-wrapper']}>
              <HeadersPage
                onEdit={() => handleEdit(data.id)}
                onDelete={() => handleDelete(data.id)}
                paths={['Players', data.name]}
                controlsVisible
              />
              <div className={styles['playerPage-info-content']}>
                <div className={styles['playerPage-info-content_image']}>
                  {data.avatarUrl && (
                    <img
                      src={`${PREFIX}${data.avatarUrl.toString()}`}
                      alt="image-player"
                    />
                  )}
                </div>
                <div className={styles['playerPage-info-content_info']}>
                  <div className={styles['playerPage-info-content_info_title']}>
                    {data.name}
                    <span
                      className={
                        styles['playerPage-info-content_info_title_span']
                      }
                    >
                      #{data.number}
                    </span>
                  </div>
                  <div
                    className={
                      styles['playerPage-info-content_info_description']
                    }
                  >
                    <div
                      className={
                        styles['playerPage-info-content_info_description_item']
                      }
                    >
                      <div
                        className={
                          styles[
                            'playerPage-info-content_info_description_item_title'
                          ]
                        }
                      >
                        Position
                      </div>
                      <div
                        className={
                          styles[
                            'playerPage-info-content_info_description_item_text'
                          ]
                        }
                      >
                        {data.position}
                      </div>
                    </div>
                    <div
                      className={
                        styles['playerPage-info-content_info_description_item']
                      }
                    >
                      <div
                        className={
                          styles[
                            'playerPage-info-content_info_description_item_title'
                          ]
                        }
                      >
                        Team
                      </div>
                      <div
                        className={
                          styles[
                            'playerPage-info-content_info_description_item_text'
                          ]
                        }
                      >
                        {teamName}
                      </div>
                    </div>
                    <div
                      className={
                        styles['playerPage-info-content_info_description_item']
                      }
                    >
                      <div
                        className={
                          styles[
                            'playerPage-info-content_info_description_item_title'
                          ]
                        }
                      >
                        Height
                      </div>
                      <div
                        className={
                          styles[
                            'playerPage-info-content_info_description_item_text'
                          ]
                        }
                      >
                        {data.height}
                      </div>
                    </div>
                    <div
                      className={
                        styles['playerPage-info-content_info_description_item']
                      }
                    >
                      <div
                        className={
                          styles[
                            'playerPage-info-content_info_description_item_title'
                          ]
                        }
                      >
                        Weight
                      </div>
                      <div
                        className={
                          styles[
                            'playerPage-info-content_info_description_item_text'
                          ]
                        }
                      >
                        {data.weight}
                      </div>
                    </div>
                    <div
                      className={
                        styles['playerPage-info-content_info_description_item']
                      }
                    >
                      <div
                        className={
                          styles[
                            'playerPage-info-content_info_description_item_title'
                          ]
                        }
                      >
                        Age
                      </div>
                      <div
                        className={
                          styles[
                            'playerPage-info-content_info_description_item_text'
                          ]
                        }
                      >
                        <AgeCalculator birthday={data.birthday} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </Await>
    </Suspense>
  );
};

export default PlayerPage;
