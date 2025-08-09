import { PiShareNetworkThin } from "react-icons/pi";

import ExternalLinkCard from '../card/ExternalLinkCard.jsx';

const ExternalLinksList = ({externalLinks = [], hideDeleteButton = false}) => {
  

return <div className = "space-y-3" >
     <label className="text-base items-center flex gap-1">External Links<PiShareNetworkThin /></label>
        <div className="text-xs gap-2 flex flex-col w-full">
          {
            externalLinks?.length > 0 ? externalLinks.map((link) => <ExternalLinkCard hideDeleteButton = {hideDeleteButton} link = {link} />) : <p className = " w-full opacity-50">No links were added tet</p>
          }
        </div>
</div>
}

export default ExternalLinksList