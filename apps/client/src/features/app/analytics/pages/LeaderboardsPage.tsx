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

const rankColorsStyle = [
  `
  from-blue-300 via-cyan-200 to-blue-500 
  text-blue-600 
  shadow-[0_0_15px_rgba(100,180,255,0.5)]
  bg-gradient-to-tr
  dark:from-black dark:via-zinc-900 dark:to-black
  dark:text-violet-300
  dark:shadow-[0_0_20px_rgba(130,80,255,0.6)]
`,
  `
    from-gray-200 via-slate-100 to-gray-400 
    text-gray-800 
    shadow-[0_0_12px_rgba(180,180,180,0.4)]
    bg-gradient-to-tr
    dark:from-blue-900 dark:via-indigo-950 dark:to-blue-950
    dark:text-blue-300
    dark:shadow-[0_0_20px_rgba(100,180,255,0.6)]
  `,
  `
    from-amber-300 via-orange-200 to-amber-500 
    text-amber-900 
    shadow-[0_0_12px_rgba(255,200,100,0.4)]
    bg-gradient-to-tr
    dark:from-pink-900 dark:via-fuchsia-950 dark:to-rose-950
    dark:text-pink-300
    dark:shadow-[0_0_20px_rgba(255,100,180,0.5)]
  `,
];

const LeaderboardsPage = () => {
  const { leaderboard, isFetchingLeaderboard } = useLeaderboard();

  return (
    <Card className="my-20">
      <div>
        <CardHeader>
          <CardTitle>Leaderboards</CardTitle>
          <CardDescription>Top 10 users with the most cores</CardDescription>
        </CardHeader>
      </div>
      <CardContent className="space-y-2">
        {leaderboard &&
          leaderboard.map((u, idx) => (
            <Item
              className={` ${rankColorsStyle[idx]} rounded-none flex items-center justify-between`}
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
              <ItemActions className="text-xl italic  lato">
                <GiAtomicSlashes className="size-8" />
                {u.core.current}
              </ItemActions>
            </Item>
          ))}
      </CardContent>
    </Card>
  );
};

export default LeaderboardsPage;
