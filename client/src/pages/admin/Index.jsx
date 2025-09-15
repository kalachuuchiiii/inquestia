
import { NavLink, Outlet } from 'react-router-dom'
import usePath from '../../hooks/usePath'
import RequestAnalyticsTable from './RequestAnalyticsTable'

const AdminPage = () => {
   
    const { isInThisPath } = usePath()


    const getClassName = (route) => {
       return isInThisPath(route)
         ? "backdrop-brightness-150 p-5"
         : "hover:backdrop-brightness-150 p-5";
    }

  const adminRoutes = [
    { route: "/adm", name: "Analytics" },
    { route: "/adm/reports/surveys", name: "Reported Surveys" },
    { route: "/adm/reports/users", name: "Reported Users" },
    { route: "/adm/reports/resolved/surveys", name: "Resolved Survey Reports" },
    { route: "/adm/reports/resolved/users", name: "Resolved User Reports" },
    { route: '/home', name: 'Go to Homepage'}
  ];

  return (
    <div className='min-h-screen flex '>
      <aside className="left-0 h-screen w-80 shrink-0 sticky top-0 bg-neutral-200 dark:bg-zinc-900 outline-r-1 outline-r-zinc-900/40 dark:outline-r-neutral-100">
        <div className="flex flex-col ">
            <p className='text-2xl text-blue-600 font-semibold py-6 pr-6 pl-5 w-full'>Dashboard</p>
          {adminRoutes.map(({ route, name }) => (
            <NavLink to={route} className={getClassName(route)}>
              {name}
            </NavLink>
          ))}
        </div>
      </aside>
    
      <div className='w-full'>
        <Outlet />
      </div>
    </div>
  );
}

export default AdminPage