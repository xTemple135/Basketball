export interface ImageLoaderProps {
  value: File | string | null; // пропс для изображения
  onChange: (file: File) => void;
}
