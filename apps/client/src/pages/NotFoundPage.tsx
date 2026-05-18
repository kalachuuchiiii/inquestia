// src/pages/NotFoundPage.jsx
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { AlertTriangle } from "lucide-react";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/components/ui/empty";

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen  text-center p-6">
      <div className="max-w-md">
        <Empty>
          <EmptyHeader>
            <EmptyTitle>404 Not Found</EmptyTitle>
            <EmptyDescription>
              Page not found. The page you're looking for might have been moved
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <Link to="/">Go to landing page</Link>
          </EmptyContent>
        </Empty>
      </div>
    </div>
  );
}
