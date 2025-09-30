
import { NavLink, Outlet } from 'react-router-dom'
import usePath from '../../hooks/usePath'
import RequestAnalyticsTable from './RequestAnalyticsTable'
import { useSelector } from 'react-redux';
import { FaChartBar, FaUserShield, FaExclamationTriangle, FaCheckCircle, FaHome } from 'react-icons/fa';

const AdminPage = () => {
   
    const { isInThisPath } = usePath();
    const { user, isProcessOK, isAuthenticated } = useSelector(state => state.user);


    const getClassName = (route) => {
       return isInThisPath(route)
         ? "backdrop-brightness-150 p-5"
         : "hover:backdrop-brightness-150 p-5";
    }

  const adminRoutes = [
    { route: "/adm", name: "Analytics", icon: <FaChartBar className="mr-2" /> },
    { route: "/adm/reports/surveys", name: "Reported Surveys", icon: <FaExclamationTriangle className="mr-2 text-yellow-500" /> },
    { route: "/adm/reports/users", name: "Reported Users", icon: <FaUserShield className="mr-2 text-blue-500" /> },
    { route: "/adm/reports/resolved/surveys", name: "Resolved Survey Reports", icon: <FaCheckCircle className="mr-2 text-green-500" /> },
    { route: "/adm/reports/resolved/users", name: "Resolved User Reports", icon: <FaCheckCircle className="mr-2 text-green-500" /> },
    { route: '/home', name: 'Go to Homepage', icon: <FaHome className="mr-2 text-blue-600" /> }
  ];

  if (isProcessOK && user?.role !== 'admin') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-100 dark:bg-zinc-900">
        <div className="flex flex-col items-center gap-4 p-8 rounded-xl shadow bg-white dark:bg-zinc-800">
          <FaUserShield size={48} className="text-red-500 mb-2" />
          <h2 className="text-2xl font-bold text-red-600 dark:text-red-400">Not Permitted</h2>
          <p className="text-base text-gray-700 dark:text-gray-300 text-center">You do not have permission to access the admin dashboard. Please contact your administrator if you believe this is an error.</p>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-full gap-4 items-start flex '>
      <aside className="left-0 h-screen w-80 z-20 shrink-0 sticky top-0  outline-r-1 outline-r-zinc-900/40 dark:outline-r-neutral-100">
        <div className="flex flex-col ">
            <p className='text-2xl text-blue-600 font-semibold py-6 pr-6 pl-5 w-full'>Dashboard</p>
          {adminRoutes.map(({ route, name, icon }) => (
            <NavLink to={route} className={getClassName(route)} key={route}>
              <span className="flex items-center">{icon}{name}</span>
            </NavLink>
          ))}
        </div>
      </aside>
    
      <div className='p-4 w-full '>
        <div className='w-10/12 mx-auto rounded-2xl  bg-neutral-50 dark:bg-zinc-900'>
        <Outlet />
      </div>
      </div>
    </div>
  );
}

export default AdminPage