import { HiOutlineChevronRight } from "react-icons/hi2";

const ArrowButton = ({to = '/', className = 'text-xs active:unerline gap-6 text-xs', children = null}) => {


return <a href = {to} className = {`${className} flex items-center`}><p>{children}</p> <HiOutlineChevronRight /></a>
}

export default ArrowButton