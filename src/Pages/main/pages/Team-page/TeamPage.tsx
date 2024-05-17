import React, { Suspense, useEffect } from 'react';
import { TeamsInterface } from '@/Entities/Teams/model';
import { Await, useLoaderData, useNavigate } from 'react-router-dom';
import styles from './TeamPage.module.scss';
import { HeadersPage, Loading, PREFIX } from '@/Shared/ui';
import axios from 'axios';
import { RoasterTeam, getToken } from '@/Features';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/App/store';
import { GetPlayers } from '@/Entities/Players/PlayersSlice';

const TeamPage = () => {
  const navigate = useNavigate();
  const dispatch:AppDispatch = useDispatch()
  const data = useLoaderData() as { data: TeamsInterface | undefined };

useEffect(() => {
  dispatch(GetPlayers({}))
}, [dispatch])

  const handleEdit = (id: number | undefined) => {
    if (id !== undefined) {
      navigate(`/team-edit/${id}`);
    }
  };

  const handleDelete = async (id: number | undefined) => {
    if (id === undefined) {
      return;
    }
    try {
      const token = getToken();
      await axios.delete(`${PREFIX}/api/Team/Delete`, {
        params: {
          id: id
        },
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      navigate('/teams');
    } catch {
      throw new Error('ID не найден');
    }
  };

  return (
    <Suspense fallback={<Loading />}>
      <Await resolve={data}>
        {(data: TeamsInterface) => (
          <div className={styles['teamPage']}>
            <div className={styles['teamPage-wrapper']}>
              <HeadersPage
                onEdit={() => handleEdit(data.id)}
                onDelete={() => handleDelete(data.id)}
                controlsVisible
                paths={['Teams', data.name || '']}
              />
              <div className={styles['teamPage-info-content']}>
                <div className={styles['teamPage-info-content_image']}>
                  {data.imageUrl && (
                    <img
                      src={`${PREFIX}${data.imageUrl.toString()}`}
                      alt="imageTeam"
                    />
                  )}
                </div>
                <div className={styles['teamPage-info-content_info']}>
                  <div className={styles['teamPage-info-content_info_title']}>
                    {data.name}
                  </div>
                  <div
                    className={styles['teamPage-info-content_info_description']}
                  >
                    <div
                      className={
                        styles['teamPage-info-content_info_description_item']
                      }
                    >
                      <div
                        className={
                          styles[
                            'teamPage-info-content_info_description_item_title'
                          ]
                        }
                      >
                        Year of foundation
                      </div>
                      <div
                        className={
                          styles[
                            'teamPage-info-content_info_description_item_text'
                          ]
                        }
                      >
                        {data.foundationYear}
                      </div>
                    </div>
                    <div
                      className={
                        styles['teamPage-info-content_info_description_item']
                      }
                    >
                      <div
                        className={
                          styles[
                            'teamPage-info-content_info_description_item_title'
                          ]
                        }
                      >
                        Division
                      </div>
                      <div
                        className={
                          styles[
                            'teamPage-info-content_info_description_item_text'
                          ]
                        }
                      >
                        {data.division}
                      </div>
                    </div>
                    <div
                      className={
                        styles['teamPage-info-content_info_description_item']
                      }
                    >
                      <div
                        className={
                          styles[
                            'teamPage-info-content_info_description_item_title'
                          ]
                        }
                      >
                        Conference
                      </div>
                      <div
                        className={
                          styles[
                            'teamPage-info-content_info_description_item_text'
                          ]
                        }
                      >
                        {data.conference}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {data.id !== undefined && <RoasterTeam teamId={data.id} />}
            </div>
          </div>
        )}
      </Await>
    </Suspense>
  );
};

export default TeamPage;
