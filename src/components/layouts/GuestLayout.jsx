import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useStateContext } from "../../contexts/NavigationContext";
import logo from "../../assets/images/logo.png";

export const GuestLayout = () => {
  const { token } = useStateContext();
  const location = useLocation();

  if (token) {
    return <Navigate to="/" />;
  }

  return (
    <div className="flex flex-col md:flex-row h-screen w-full">
      {/* Left side (Logo Section) */}
      <div className="flex-1 flex items-center justify-center border-b-2 md:border-b-0 md:border-r-2 bg-white p-6">
        <img className="w-1/2 md:w-full" src={logo} alt="Logo" />
      </div>

      {/* Right side (Form / Outlet Section) */}
      <div className="flex-1 flex items-center justify-center bg-[#54993a] p-6">
        <div className="w-full max-w-md">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
