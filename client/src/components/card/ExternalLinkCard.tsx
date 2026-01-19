import { IoMdClose } from "react-icons/io";
import { useDispatch } from "react-redux";
import { updateUser } from "../../state/slice/user";
import { fetchApi } from "../../utils/fetchApi";
import type { AppDispatch } from "@/state/store";
import { useMutation } from "@tanstack/react-query";
import { Button } from "../ui/button";

const ExternalLinkCard = ({ link = "", hideDeleteButton = false }) => {
  const dispatch = useDispatch<AppDispatch>();

  const { mutate: deleteExternalLink, isPending: isLoading } = useMutation({
    mutationFn: async (externalLink: string) => {
      externalLink = externalLink.toLowerCase().trim();
      const res = await fetchApi("delete", "/user/link", { externalLink });

      if (res?.success && res?.user) {
        dispatch(updateUser({ user: res.user }));
      }
    },
  });

  return (
    <div
      className={`w-full flex justify-between items-center truncate ${
        isLoading ? "opacity-50" : "opacity-80"
      }`}
    >
      <a
        className="hover:underline truncate w-full"
        href={link}
        target="_blank"
        rel="noopener noreferrer"
      >
        {link}
      </a>
      {!hideDeleteButton && (
        <Button 
          className="flex justify-center items-center"
          disabled={isLoading}
          onClick={() => deleteExternalLink(link)}
        >
          <IoMdClose />
        </Button>
      )}
    </div>
  );
};

export default ExternalLinkCard;
