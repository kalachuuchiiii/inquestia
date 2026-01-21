import { PiShareNetworkThin } from "react-icons/pi";
import ExternalLinkCard from "../card/ExternalLinkCard.jsx";

const ExternalLinksList = ({ externalLinks = [], hideDeleteButton = false }: {externalLinks: string[], hideDeleteButton: boolean;}) => {
  return (
    <section className="space-y-3 w-full">
      <div className="flex items-center w-full gap-1 text-base font-medium">
        <span>External Links</span>
        <PiShareNetworkThin />
      </div>

      <div className="text-xs flex flex-col w-full">
        {externalLinks?.length > 0 ? (
          externalLinks.map((link) => (
            <ExternalLinkCard
              key={link.id || link.url}
              hideDeleteButton={hideDeleteButton}
              link={link}
            />
          ))
        ) : (
          <p className="w-full text-left opacity-50">
            No external links added yet.
          </p>
        )}
      </div>
    </section>
  );
};

export default ExternalLinksList;
