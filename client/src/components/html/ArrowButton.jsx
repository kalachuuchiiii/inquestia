import { HiOutlineChevronRight } from "react-icons/hi2";
import { Link } from "react-router-dom"

const ArrowButton = ({ to = '/', className = 'text-xs active:unerline  gap-6 text-xs', children = null }) => {


  return <Link to={to}>
    <div className={`${className} flex items-center`}><p>{children}</p> <HiOutlineChevronRight /></div>
  </Link>
}

export default ArrowButton