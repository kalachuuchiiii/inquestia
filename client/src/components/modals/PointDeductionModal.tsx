import React, { useState } from "react";
import ModalStyle from "./ModalStyle";
import { Button } from "../ui/button";
import { useMutation } from "@tanstack/react-query";
import { API } from "@/lib/axios.instance";
import { toast } from "sonner";

const PointDeductionModal = ({
  onClose = () => {},
  userPoint = null,
  userId = null,
  reportId = null,
  username = null,
}) => {
  const [pointsToDeduct, setPointsToDeduct] = useState<number>(0);

  const { mutate: deductUsersPoints, isPending: isLoading } = useMutation({
    mutationFn: async() => {
       const p = API.patch('/api/admin/deduct-points', {
        reportId,
        pointsToDeduct,
      });

      await toast.promise(p, {
        loading: "Deducting User's points...",
        success: (res) => res.data.message,
        error: (err) => err.response.data.message
      })
      return await p;
    }
  })
  return (
    <ModalStyle label={`Deduct ${username}'s points`} onClose={onClose}>
      <main className="space-y-6">
        <div>
          <label className="text-xs" htmlFor="userpoints">
            {username}'s points:{" "}
          </label>
          <p id="userpoints"> {userPoint}</p>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-xs">Deduct by</p>

          <input
            value={pointsToDeduct}
            className="p-2 rounded-lg outline-none dark:bg-zinc-800"
            onChange={(e) => setPointsToDeduct(e.target.value)}
            type="number"
          />
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-xs">To be</p>
          <p>{userPoint - pointsToDeduct}</p>
        </div>
        <Button
          className="inquestia-button mx-auto"
          onClick={() => deductUsersPoints()}
          disabled={isLoading}
        >
          Deduct
        </Button>
      </main>
    </ModalStyle>
  );
};

export default PointDeductionModal;
