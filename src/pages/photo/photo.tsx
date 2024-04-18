import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom';
import Photo from '../../types/PhotoType';
import { albumService } from '../../services/album.service';

const PhotoPage = () => {
    const { id: albumId } = useParams();

    const [photos, setPhotos] = useState<Photo[]>([]);
    const [isLoading, setIsLoading] = useState(false);
  
    useEffect(() => {
      getPhotos();
    }, []);
  
    const getPhotos = async () => {
      try {
        setIsLoading(true);
        const res = await albumService.getAlbumPhotos(albumId!);
  
        if (res) {
          setPhotos(res);
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
        <h1 className="font-semibold text-xl">Photos</h1>
        <div className="mt-4" />
        {photos.map((photo) => (
          <div key={photo.id} className="border-b-2 py-2">
            <img src={photo.thumbnailUrl} />
            <Link to={`/photos/${photo.id}`} className="hover:text-blue-500 text-lg">
              {photo.title}
            </Link>
          </div>
        ))}
      </div>
    );
}

export default PhotoPage