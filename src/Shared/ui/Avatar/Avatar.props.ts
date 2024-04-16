export type AvatarSize = 'Small' | 'Medium' | 'Large';

export interface IAvatarProps {
  /**
   * Ссылка на изображение
   */
  image?: string;
  /**
   * Размер изображения
   */
  size?: AvatarSize;
}
