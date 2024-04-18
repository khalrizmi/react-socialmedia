import { useEffect, useState } from "react";
import User from "../../types/UserType";
import { Link } from "react-router-dom";
import { userService } from "../../services/user.service";

const UserPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    try {
      setIsLoading(true);
      const res = await userService.getUsers();

      if (res) {
        setUsers(res);
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
      <h1 className="font-semibold text-xl">Users</h1>
      <div className="mt-4" />
      {users.map((user) => (
        <div
          key={user.id}
          className="border-b-2 py-2 flex justify-between w-full"
        >
          <p>{user.name}</p>
          <div className="flex flex-row gap-4">
            <Link
              to={`/users/${user.id}/posts`}
              className="text-blue-500 hover:text-red-400"
            >
              Posts
            </Link>
            <Link
              to={`/users/${user.id}/albums`}
              className="text-blue-500 hover:text-red-400"
            >
              Albums
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserPage;
