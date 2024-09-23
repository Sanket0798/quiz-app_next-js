import { useUser, withAuth } from "@clerk/nextjs";
import Home from "../components/Home";
const ProtectedHome = () => {
  const { user } = useUser();

  return <div>{user ? <Home /> : <p>Loading...</p>}</div>;
};

export default withAuth(ProtectedHome);
