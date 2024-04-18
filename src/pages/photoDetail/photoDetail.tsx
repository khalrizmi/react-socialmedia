import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom';
import Photo from '../../types/PhotoType';
import { photoService } from '../../services/photo.service';

const PhotoDetailPage = () => {
    const { id: photoId } = useParams();

    const [photo, setPhoto] = useState<Photo>();
    const [isLoading, setIsLoading] = useState(false);
  
    useEffect(() => {
      getPhoto();
    }, []);
  
    const getPhoto = async () => {
      try {
        setIsLoading(true);
        const res = await photoService.getPhoto(photoId!);
  
        if (res) {
          setPhoto(res);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
  
    if (isLoading) return "Loading...";
  
    return (
      <div>
        <h1 className="font-semibold text-xl">{photo?.title}</h1>
        <div className="mt-4" />
        <img src={photo?.url} />
      </div>
    );
}

export default PhotoDetailPage