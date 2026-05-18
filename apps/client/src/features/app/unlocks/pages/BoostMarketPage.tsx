import { useState } from "react";
import { CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Plus, Minus, Zap } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import api from "@/lib/axios.instance";
import { BOOST_COST } from "@inquestia/constants";
import millify from "millify";
import { useAccount } from "../../account/hooks/useAccount";

const BoostMarketPage = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [boosterCount, setBoosterCount] = useState(1);

  const { data: user, refetch } = useAccount();

  const { mutate: purchaseBoost, isPending: isLoadingPurchase } = useMutation({
    mutationFn: async (quantity: number) => {
      const p = api.post("/api/survey/boost", { quantity });
      toast.promise(p, {
        loading: `Purchasing ${quantity} booster${quantity !== 1 ? "s" : ""}...`,
        success: (res) => res.data.message,
        error: (err) =>
          err.response?.data?.message || "Failed to purchase booster",
      });
      return await p;
    },
    onSuccess: () => {
      refetch();
      setIsDialogOpen(false);
      setBoosterCount(1);
    },
  });

  const handleIncrement = () => {
    if (boosterCount < 5) {
      setBoosterCount(boosterCount + 1);
    }
  };

  const handleDecrement = () => {
    if (boosterCount > 1) {
      setBoosterCount(boosterCount - 1);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value >= 1 && value <= 5) {
      setBoosterCount(value);
    }
  };

  const handlePurchase = () => {
    purchaseBoost(boosterCount);
  };

  return (
    <div className="w-full flex flex-col items-center mt-6 justify-center ">
      {/* Survey Boosts Card */}
      <main className="">
        <div>
          <div className="flex items-start gap-3">
            <img src="/boost.gif" className="size-12 text-blue-500 mt-1" />
            <div>
              <CardTitle className="text-3xl font-bold tracking-tighter">
                Survey Boosts
              </CardTitle>
              <CardDescription className="mt-2 text-base">
                Help your survey reach more respondents and increase engagement
              </CardDescription>
            </div>
          </div>
        </div>
        <p className="space-y-4">
          <div className="space-y-3">
            <p className="text-sm text-zinc-700 dark:text-zinc-300">
              You can apply{" "}
              <span className="font-semibold text-blue-600">
                up to 5 boosters
              </span>{" "}
              to your survey to massively influence its algorithmic weight.
            </p>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              <span className="font-semibold text-zinc-800 dark:text-zinc-200">
                How it works:
              </span>{" "}
              The greater your survey's algorithmic weight, the higher its
              chance of appearing on someone's feed. Boosters significantly
              increase your survey's visibility and reach potential respondents.
            </p>
          </div>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <Button
              onClick={() => setIsDialogOpen(true)}
              disabled={isLoadingPurchase}
              className="inquestia-button"
            >
              <Zap className="w-4 h-4" />
              Purchase Booster
            </Button>

            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Purchase Survey Booster</DialogTitle>
                <DialogDescription>
                  Select the number of boosters you want to apply to your survey
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4">
                <div className="flex items-center justify-center gap-3">
                  <Button
                    onClick={handleDecrement}
                    disabled={boosterCount <= 1 || isLoadingPurchase}
                    variant="outline"
                    size="icon"
                    className="h-10 w-10"
                  >
                    <Minus className="w-4 h-4" />
                  </Button>

                  <Input
                    type="number"
                    min="1"
                    max="5"
                    value={boosterCount}
                    onChange={handleInputChange}
                    disabled={isLoadingPurchase}
                    className="w-20 text-center text-lg font-semibold"
                  />

                  <Button
                    onClick={handleIncrement}
                    disabled={boosterCount >= 5 || isLoadingPurchase}
                    variant="outline"
                    size="icon"
                    className="h-10 w-10"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>

                <div className="p-3">
                  <p className="text-sm font-semibold  text-blue-900 dark:text-blue-100">
                    You are about to spend{" "}
                    {millify(boosterCount * BOOST_COST, { precision: 3 })}{" "}
                    points
                  </p>
                </div>

                <div className="flex gap-2">
                  <Button
                    onClick={() => setIsDialogOpen(false)}
                    disabled={isLoadingPurchase}
                    variant="outline"
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handlePurchase}
                    disabled={isLoadingPurchase}
                    className="inquestia-button"
                  >
                    {isLoadingPurchase ? (
                      <>
                        <Zap className="w-4 h-4 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      "Confirm Purchase"
                    )}
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </p>
      </main>
    </div>
  );
};

export default BoostMarketPage;
