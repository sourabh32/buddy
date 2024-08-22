import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import Navbar from "../../components/Navbar";

export default async function Layout({ children }:{children:React.ReactNode}) {
  const session = await getServerSession(authOptions);

  return (
    <main className="overflow-x-hidden">
      {/* Navbar is fixed to the top */}
      <Navbar session={session} />
      
      {/* Content below the navbar */}
      <div className="pt-16"> {/* Add padding to avoid content being hidden behind the Navbar */}
        {children}
      </div>
    </main>
  );
}
