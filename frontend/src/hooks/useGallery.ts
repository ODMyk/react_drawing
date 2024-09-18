import {useEffect, useState} from "react";
import {Image} from "../components/Gallery";

export const useGallery = (updater: boolean) => {
  const [images, setImages] = useState<Image[]>([
    {id: 1, link: "", title: "First"},
    {id: 2, link: "", title: "Second"},
    {id: 2, link: "", title: "Second"},
    {id: 2, link: "", title: "Second"},
    {id: 2, link: "", title: "Second"},
  ]);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch("http://localhost:3001/images");
        setImages((await response.json()) as Image[]);
      } catch (error) {
        console.error(JSON.stringify(error, null, 2));
      }
    })();
  }, [updater]);

  return {images};
};
