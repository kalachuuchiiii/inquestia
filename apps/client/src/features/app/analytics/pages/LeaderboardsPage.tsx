import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useLeaderboard } from "../hooks/useLeaderboards";
import { UserBadge } from "@/components/ui/UserBadge";
import { Item, ItemActions } from "@/components/ui/item";
import { GiAtomicSlashes } from "react-icons/gi";
import millify from "millify";

const rankColorsStyle = [
  `
  from-blue-300  to-blue-500 
  text-blue-600 
  shadow-[0_0_15px_rgba(100,180,255,0.5)]
  bg-gradient-to-tr
  dark:from-black dark:to-black
  dark:text-violet-300 
  scale-109
  dark:shadow-[0_0_20px_rgba(130,80,255,0.6)]
`,
  `
    from-amber-300  to-amber-500 
    text-amber-900 
    shadow-[0_0_12px_rgba(255,200,100,0.4)]
    bg-gradient-to-tr
    scale-106
    dark:from-purple-950  dark:to-purple-950
    dark:text-purple-300
    dark:shadow-[0_0_20px_rgba(255,100,180,0.5)]
  `,
  `
    from-gray-200 to-gray-400 
    text-gray-800 
    shadow-[0_0_12px_rgba(180,180,180,0.4)]
    bg-gradient-to-tr
    scale-103
    dark:from-blue-950  dark:to-blue-950
    dark:text-blue-300
    dark:shadow-[0_0_20px_rgba(100,180,255,0.6)]
  `,
];

const LeaderboardsPage = () => {
  const { leaderboard, isFetchingLeaderboard } = useLeaderboard();

  return (
    <div className="mb-10 bg">
      <div>
        <div className="text-center flex flex-col items-center justify-center mb-10">
          <img src="/leaderboard.gif" className="size-20" />
          <h1 className="text-3xl tracking-tighter font-bold">Leaderboards</h1>
          <p className="text-lg opacity-75">Top 10 users with the most cores</p>
        </div>
      </div>
      <CardContent className="space-y-2">
        {leaderboard &&
          leaderboard.map((u, idx) => (
            <Item
              className={` ${rankColorsStyle[idx]} rounded-lg flex items-center justify-between`}
            >
              <UserBadge user={u} className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <UserBadge.Avatar className="size-10" />
                  <div className="flex flex-col ">
                    <UserBadge.Nickname className="font-semibold lg:text-lg" />
                    <UserBadge.Username className="lg:text-base" />
                  </div>
                  <UserBadge.Badge />
                </div>
              </UserBadge>
              <ItemActions className="text-xl font-bold  inter tracking-tighter">
                {millify(u?.core?.current ?? 0, { precision: 2 })}
                <img src="/point.gif" className="size-8" />
              </ItemActions>
            </Item>
          ))}
      </CardContent>
    </div>
  );
};

export default LeaderboardsPage;
