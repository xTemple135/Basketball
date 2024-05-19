import { RootState } from '@/App/store';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import styles from './RoasterTeam.module.scss';
import { AgeCalculator } from '@/Entities';
import cn from 'classnames';
import { RoasterTeamProps } from './RoasterTeam.props';
import { PREFIX } from '@/Shared';
import defaultIcon from '@/Shared/assets/icons/profile_rounded.svg';
const RoasterTeam: React.FC<RoasterTeamProps> = ({ teamId }) => {
  const players = useSelector((state: RootState) => state.players.data);
  const [selectedSort, setSelectedSort] = useState('number');
  const [reverseSort, setReverseSort] = useState(false);
  const teamPlayers = players.filter((player) => player.team === teamId);
  const sortedPlayers = [...teamPlayers].sort((a, b) => {
    if (a[selectedSort] < b[selectedSort]) {
      return reverseSort ? 1 : -1;
    }
    if (a[selectedSort] > b[selectedSort]) {
      return reverseSort ? -1 : 1;
    }
    return 0;
  });

  const handleSort = (key: string) => {
    if (selectedSort === key) {
      setReverseSort(!reverseSort);
    } else {
      setSelectedSort(key);
      setReverseSort(false);
    }
  };

  return (
    <div className={styles['teamRoster']}>
      <div className={styles['teamRoster_Title']}>Roster</div>
      <div className={cn(styles['teamRoster_Item'], styles['header'])}>
        <div onClick={() => handleSort('number')}>
          <div
            className={cn(styles['teamRoster_Item_Title'], {
              [styles['current']]: selectedSort === 'number'
            })}
          >
            #
          </div>
        </div>
        <div
          onClick={() => handleSort('name')}
          className={styles['teamRoster_Item_Block']}
        >
          <div
            className={cn(styles['teamRoster_Item_Title'], {
              [styles['current']]: selectedSort === 'name'
            })}
          >
            Player
          </div>
        </div>
        <div onClick={() => handleSort('height')}>
          <div
            className={cn(styles['teamRoster_Item_Title'], {
              [styles['current']]: selectedSort === 'height'
            })}
          >
            Height
          </div>
        </div>
        <div onClick={() => handleSort('weight')}>
          <div
            className={cn(styles['teamRoster_Item_Title'], {
              [styles['current']]: selectedSort === 'weight'
            })}
          >
            Weight
          </div>
        </div>
        <div onClick={() => handleSort('birthday')}>
          <div
            className={cn(styles['teamRoster_Item_Title'], {
              [styles['current']]: selectedSort === 'birthday'
            })}
          >
            Age
          </div>
        </div>
      </div>
      <div className={styles['teamRoster_Players']}>
        {sortedPlayers.map((player) => (
          <div key={player.id} className={styles['teamRoster_Item']}>
            <div>{player.number}</div>
            <div className={styles['teamRoster_Item_Block']}>
              <div className={styles['teamRoster_Item_Block_avatar']}>
                <img
                  src={
                    player.avatarUrl
                      ? `${PREFIX}${player.avatarUrl.toString()}`
                      : defaultIcon
                  }
                  alt="Player Avatar"
                />
              </div>

              <div className={styles['teamRoster_Item_Block_Info']}>
                <div>{player.name}</div>
                <div className={styles['teamRoster_Item_Block_Info_Position']}>
                  {player.position}
                </div>
              </div>
            </div>
            <div>{player.height}</div>
            <div>{player.weight}</div>
            <div>
              <AgeCalculator birthday={player.birthday} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoasterTeam;
