export interface PlayerInputInterface {
  name: string;
  label: string;
  type?: string;
  required: boolean;
  options?: { value: string; label: string }[];
}

export const playerInput: PlayerInputInterface[] = [
  {
    name: 'position',
    label: 'Position',
    required: true,
    options: [
      { value: 'center_forward', label: 'CenterForward' },
      { value: 'guard_forward', label: 'GuardForward' },
      { value: 'forward', label: 'Forward' },
      { value: 'center', label: 'Center' },
      { value: 'Guard', label: 'Guard' }
    ]
  },
];
