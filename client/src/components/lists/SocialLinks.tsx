import SocialLinkCard from "../card/SocialLinkCard.js";
import { ArrowUpRightIcon, Waypoints } from "lucide-react";

const SocialLinksList = ({ socialLinks = [] }: { socialLinks: string[] }) => {
  return (
    <section className="space-y-3 w-full">
      <div className="flex items-center w-full gap-2 text-base font-medium">
        <Waypoints />
        <span>Social Links</span>
      </div>
      <div className="text-sm opacity-70 flex flex-col w-full">
        {socialLinks?.length > 0 ? (
          socialLinks.map((link) => (
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:underline"
            >
              <p>{link}</p> <ArrowUpRightIcon className="size-4" />
            </a>
          ))
        ) : (
          <p className="w-full text-left opacity-50">
            No social links were added yet.
          </p>
        )}
      </div>
    </section>
  );
};

export default SocialLinksList;
