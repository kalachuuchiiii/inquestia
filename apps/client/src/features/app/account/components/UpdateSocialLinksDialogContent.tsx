import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  InputGroup,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import { useAppSelector } from "@/hooks/useAppSelector";
import { SocialLinkSchema } from "@inquestia/schemas";
import { Plus, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import _ from "lodash";
import { useAccountActions } from "../hooks/useAccountActions";

export const UpdateSocialLinksDialogContent = () => {
  const { user, accessToken } = useAppSelector((state) => state.user);
  const [socialLinksList, setSocialLinksList] = useState<string[]>(
    user.socialLinks
  );
  const [socialLink, setSocialLink] = useState<string>("");
  const { updateSocialLinks, isUpdatingSocialLinks } = useAccountActions();

  useEffect(() => {
    if (socialLinksList.length > 0) return;
    setSocialLinksList(user.socialLinks);
  }, [accessToken]);

  const handleAddSocialLink = () => {
    const parsed = SocialLinkSchema.safeParse(socialLink);
    if (parsed.error) {
      return;
    }
    setSocialLinksList((prev) => [...prev, socialLink]);
    setSocialLink("");
  };
  const handleRemoveSocialLink = (link: string) => {
    setSocialLinksList((prev) =>
      prev.filter((l) => l.trim().toLowerCase() !== link.trim().toLowerCase())
    );
  };

  const isOldAndNewEqual = _.isEqual(user.socialLinks, socialLinksList);

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Your social links</DialogTitle>
        <DialogDescription>Share your socials to other users</DialogDescription>
      </DialogHeader>
      <InputGroup>
        <InputGroupInput
          value={socialLink}
          onChange={(e) => setSocialLink(e.target.value)}
          placeholder="Type your social link here..."
        />
        <InputGroupButton onClick={handleAddSocialLink}>
          <Plus />
        </InputGroupButton>
      </InputGroup>
      <main className=" p-2 rounded">
        {socialLinksList.map((s) => (
          <div className="flex items-center justify-between ">
            <p>{s}</p>
            <Button
              onClick={() => handleRemoveSocialLink(s)}
              variant={"secondary"}
            >
              <X />
            </Button>
          </div>
        ))}
      </main>
      <DialogFooter>
        <Button
          onClick={() => updateSocialLinks(socialLinksList)}
          disabled={isOldAndNewEqual || isUpdatingSocialLinks}
          className="inquestia-button"
        >
          Save
        </Button>
      </DialogFooter>
    </DialogContent>
  );
};
