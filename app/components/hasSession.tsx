import { useSession } from "next-auth/react";
import LoginCard from "./login";
import Software from "./software";
import Spinner from "./spinner";

export default function Application() {
  const { status } = useSession();

  if (status === "loading") {
    return <Spinner />; // Show spinner while loading
  } else if (status === "authenticated") {
    return <Software />; // Show Software when authenticated
  } else {
    return <LoginCard />; // Show LoginCard otherwise
  }
}
