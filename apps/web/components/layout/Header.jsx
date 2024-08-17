import { BriefcaseIcon } from 'lucide-react'; // Assuming you're using lucide-react for icons
import Image from 'next/image'; // Adjust this import based on your setup
import AuthButton from './AuthButton'; // Adjust the path to your AuthButton component

const Header = ({ session }) => {
  return (
    <header className="z-10 top-0 left-0 bg-secondary fixed w-full text-primary-content shadow-lg p-4 flex justify-between items-center">
      <div className="flex items-center space-x-4">
        <BriefcaseIcon className="text-primary" />
        <h1 className="text-2xl font-bold">take home</h1>
      </div>
      <div className="flex items-center space-x-4">
        {session ? (
          <>
            <div className="flex items-center space-x-2">
              {session?.user && (
                <Image
                  src={session?.user?.image}
                  alt={"user"}
                  width={40}
                  height={40}
                  className="rounded-full border border-neutral"
                />
              )}
              <div>
                <p className="text-primary-content">{session?.user?.name}</p>
                <p className="text-secondary-content">{session?.user?.email}</p>
              </div>
            </div>
            <AuthButton type={"logout"} text={"sign out"} />
          </>
        ) : (
          <AuthButton type={"login"} text={"sign in"} />
        )}
      </div>
    </header>
  );
};

export default Header;
