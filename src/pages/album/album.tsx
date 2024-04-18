import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Album from "../../types/AlbumType";
import { userService } from "../../services/user.service";

const AlbumPage = () => {
  const { id: userId } = useParams();
  
  const [albums, setAlbums] = useState<Album[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getPosts();
  }, []);

  const getPosts = async () => {
    try {
      setIsLoading(true);
      const res = await userService.getUserAlbums(userId!);

      if (res) {
        setAlbums(res);
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
      <h1 className="font-semibold text-xl">Albums</h1>
      <div className="mt-4" />
      {albums.map((album) => (
        <div key={album.id} className="border-b-2 py-2">
          <Link to={`/albums/${album.id}/photos`} className="hover:text-blue-500">{album.title}</Link>
        </div>
      ))}
    </div>
  );
};

export default AlbumPage;
