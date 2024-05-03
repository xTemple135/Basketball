import PersonIcon from '@/Shared/assets/icons/person_rounded.svg';
import TeamsIcon from '@/Shared/assets/icons/group_person_rounded.svg';

interface sideBarItemTypes {
  path: string;
  label: string;
}

export const SideBarItem: sideBarItemTypes[] = [
  { path: '/players', label: 'Players' },
  { path: '/teams', label: 'Teams' }
];
