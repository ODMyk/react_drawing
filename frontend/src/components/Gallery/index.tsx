import {useGallery} from "../../hooks/useGallery";
import {ImageCard} from "../ImageCard";

export type Image = {
  link: string;
  title: string;
  id: number;
};

export type GalleryProps = {
  updater: boolean;
  refresh: () => void;
};

export const Gallery = ({updater, refresh}: GalleryProps) => {
  const {images} = useGallery(updater);

  return (
    <div className="screen">
      <div className="gallery-wrapper">
        {images.map((image, index) => (
          <ImageCard image={image} key={index} refresh={refresh} />
        ))}
      </div>
    </div>
  );
};
