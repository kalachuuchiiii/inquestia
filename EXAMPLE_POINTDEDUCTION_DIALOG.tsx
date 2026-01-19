// Example: Converting PointDeductionModal to Dialog
// This shows how to handle form inputs and complex logic within a Dialog

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useMutation } from "@tanstack/react-query";
import { fetchApi } from "../../utils/fetchApi";
import { toast } from "sonner";

// Usage in ReportedCard component or wherever you need it:
const PointDeductionExample = ({
  userId,
  username,
  reportId,
  userPoint,
  onSuccess,
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [pointsToDeduct, setPointsToDeduct] = useState(0);

  const { mutate: deductPoints, isPending } = useMutation({
    mutationFn: async () => {
      if (!pointsToDeduct || pointsToDeduct < 0) {
        throw new Error("Please enter a valid amount");
      }
      const promise = fetchApi("patch", `/admin/deduct/${userId}/`, {
        reportId,
        pointsToDeduct,
      });
      await toast.promise(promise, {
        loading: "Deducting points...",
        success: "Points deducted successfully!",
        error: (err) => err.message || "Failed to deduct points",
      });
      return await promise;
    },
    onSuccess: () => {
      setIsDialogOpen(false);
      setPointsToDeduct(0);
      onSuccess?.();
    },
  });

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <button className="inquestia-button">Deduct the user's core</button>
      </DialogTrigger>

      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Deduct User Points</DialogTitle>
          <DialogDescription>
            Deduct core points from user "{username}"
          </DialogDescription>
        </DialogHeader>

        {/* Form Content */}
        <div className="space-y-4 py-4">
          {/* User Info Display */}
          <div className="space-y-2">
            <label className="text-sm font-medium">User Details</label>
            <div className="p-3 rounded-lg bg-gray-100 dark:bg-zinc-800 space-y-1">
              <p className="text-sm">
                <strong>Username:</strong> {username}
              </p>
              <p className="text-sm">
                <strong>Current Points:</strong> {userPoint}
              </p>
            </div>
          </div>

          {/* Points Input */}
          <div className="space-y-2">
            <label htmlFor="points" className="text-sm font-medium">
              Points to Deduct
            </label>
            <input
              id="points"
              type="number"
              min="0"
              max={userPoint}
              value={pointsToDeduct}
              onChange={(e) => setPointsToDeduct(Number(e.target.value))}
              placeholder="Enter points to deduct"
              className="w-full px-3 py-2 rounded-lg bg-gray-100 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {pointsToDeduct > userPoint && (
              <p className="text-xs text-red-500">
                Cannot deduct more than {userPoint} points
              </p>
            )}
          </div>

          {/* Preview */}
          {pointsToDeduct > 0 && (
            <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
              <p className="text-sm">
                <strong>After deduction:</strong>{" "}
                <span className="text-blue-600 dark:text-blue-400">
                  {userPoint - pointsToDeduct} points
                </span>
              </p>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <DialogFooter className="flex gap-2 justify-end">
          <button
            onClick={() => setIsDialogOpen(false)}
            disabled={isPending}
            className="px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800"
          >
            Cancel
          </button>
          <button
            onClick={() => deductPoints()}
            disabled={
              isPending ||
              pointsToDeduct <= 0 ||
              pointsToDeduct > userPoint
            }
            className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPending ? "Deducting..." : "Deduct Points"}
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PointDeductionExample;

/*
  ORIGINAL MODAL FILE STRUCTURE (to be removed):
  
  Before: src/components/modals/PointDeductionModal.tsx
  - Had state management inside modal
  - Required onClose prop
  - Passed data through props
  - Component was reusable but not co-located
  
  After: Just use the Dialog pattern above inline
  - State lives in the component that needs it
  - No need for onClose callback
  - Data flows naturally
  - Easier to understand and maintain
*/
