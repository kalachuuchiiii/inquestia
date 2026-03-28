
import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Plus, Minus, Zap } from "lucide-react";
import { useMutation } from "@tanstack/react-query";

import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { useAppSelector } from "@/hooks/useAppSelector";
import { updateUser } from "@/state/slice/user";
import { Link, NavLink } from "react-router-dom";
import api from "@/lib/axios.instance";

const LOAD_OPTIONS = [10, 20, 50, 100];

const BoostMarketPage = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [boosterCount, setBoosterCount] = useState(1);

  const dispatch = useDispatch();
  const { user } = useAppSelector(state => state.user);

  const { mutate: purchaseBoost, isPending: isLoadingPurchase } = useMutation({
    mutationFn: async (quantity: number) => {
      const p = api.post("/api/survey/boost", { quantity });
      await toast.promise(p, {
        loading: `Purchasing ${quantity} booster${quantity !== 1 ? 's' : ''}...`,
        success: (res) => res.data.message,
        error: (err) => err.response?.data?.message || "Failed to purchase booster",
      });
      return await p;
    },
    onSuccess: (res) => {
      dispatch(updateUser({
        user: {
          ...user,
          boosterPoint: res.data.boosterPoint,
          core: {
            ...user.core,
            current: res.data.currentPoints
          }
        }
      }));
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
    <div className="w-full mx-auto py-8 px-2 md:px-6 space-y-6">
      {/* Survey Boosts Card */}
      <Card className="border border-blue-100 dark:border-zinc-800 shadow-md">
        <CardHeader>
          <div className="flex items-start gap-3">
            <Zap className="w-6 h-6 text-blue-500 mt-1" />
            <div>
              <CardTitle className="text-2xl">Survey Boosts</CardTitle>
              <CardDescription className="mt-2 text-base">
                Help your survey reach more respondents and increase engagement
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <p className="text-sm text-zinc-700 dark:text-zinc-300">
              You can apply <span className="font-semibold text-blue-600">up to 5 boosters</span> to your survey to massively influence its algorithmic weight.
            </p>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              <span className="font-semibold text-zinc-800 dark:text-zinc-200">How it works:</span> The greater your survey's algorithmic weight, the higher its chance of appearing on someone's feed. Boosters significantly increase your survey's visibility and reach potential respondents.
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

                <div className="bg-blue-50 dark:bg-blue-950 rounded-lg p-3">
                  <p className="text-sm font-semibold text-blue-900 dark:text-blue-100">
                    You are about to purchase <span className="text-lg text-blue-600 dark:text-blue-400">{boosterCount}</span> booster{boosterCount !== 1 ? 's' : ''}
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
        </CardContent>
      </Card>

      {/* Announcement Card */}
      <Card className="border-l-4 border-l-indigo-100 border border-indigo-100 dark:border-indigo-900 dark:border-l-indigo-900  dark:from-blue-950 dark:via-indigo-950 dark:to-purple-950 shadow-md">
        <CardHeader>
          <div className="flex items-start gap-3">
            <div className="text-2xl">📢</div>
            <div>
              <CardTitle className="text-xl text-indigo-900 dark:text-indigo-100">Convert Points to Prepaid Load</CardTitle>
              <CardDescription>
                Once you've accumulated enough core points, our admin team will reach out to you via message to directly convert your points into prepaid load. This is our way of rewarding active members of the Inquestia community!
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="bg-white dark:bg-zinc-800 rounded-lg p-3 border border-indigo-200 dark:border-indigo-800">
            <p className="text-xs font-semibold text-indigo-800 dark:text-indigo-200">How it works:</p>
            <ul className="text-xs text-indigo-700 dark:text-indigo-300 mt-2 space-y-1 list-disc list-inside">
              <li>Earn core points by answering surveys and creating valuable content</li>
              <li>When you reach the  conversion threshold, the admin will contact you</li>
              <li>You can choose to convert your points directly into prepaid load or keep your core points</li>
              
            </ul>
        
          </div>
              <CardDescription className="text-sm mt-2">You can visit out <NavLink className={'text-blue-700'} to={'/documentation'}>Guide page</NavLink> for more details</CardDescription>
          
        </CardContent>
      </Card>
    </div>
  );
};

export default BoostMarketPage;


