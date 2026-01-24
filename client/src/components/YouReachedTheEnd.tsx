import { PackageOpen } from "lucide-react";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "./ui/empty";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

export const YouReachedTheEnd = () => {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <PackageOpen />
        </EmptyMedia>
        <EmptyTitle>No more contents to show.</EmptyTitle>
        <EmptyDescription>
          Help the community by creating surveys
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Link to="/create">
          <Button className="inquestia-button">Create Surveys</Button>
        </Link>
      </EmptyContent>
    </Empty>
  );
};
