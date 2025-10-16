
// GuidePage.jsx
import React, { useState } from "react";
import {
  HiOutlineUser,
  HiOutlineSparkles,
  HiOutlineChartBar,
  HiOutlineChat,
  HiOutlineShieldCheck,
  HiOutlineDocumentText,
  HiOutlineClipboardList,
  HiOutlineBadgeCheck,
} from "react-icons/hi";
import { badges } from "../../data/badges";

const sections = [
  { id: "account", title: "Account", icon: HiOutlineUser },
  { id: "cores", title: "Cores (Points)", icon: HiOutlineSparkles },
  { id: "streaks", title: "Streaks", icon: HiOutlineChartBar },
  { id: "leaderboards", title: "Leaderboards", icon: HiOutlineClipboardList },
  { id: "inko", title: "Conversation (Inko)", icon: HiOutlineChat },
  { id: "algorithm", title: "Survey Algorithm", icon: HiOutlineDocumentText },
  { id: "answers", title: "Answers & Visibility", icon: HiOutlineShieldCheck },
  { id: "reports", title: "Reports & Moderation", icon: HiOutlineShieldCheck },
  { id: 'badges', title: 'Badges', icon: HiOutlineBadgeCheck }
];

const GuidePage = () => {
  const [active, setActive] = useState("account");

  return (
    <div className="min-h-screen  text-gray-900 dark:text-gray-100 p-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Sidebar */}
        <aside className="md:col-span-3 bg-white dark:bg-zinc-900 rounded-2xl shadow p-4 sticky top-6 self-start">
          <h3 className="text-xl font-semibold mb-3">Settings & Guide</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
            Quick reference for account, points, privacy, and how the survey
            system works.
          </p>

          <nav className="space-y-2">
            {sections.map((s) => {
              const Icon = s.icon;
              const isActive = active === s.id;
              return (
                <button
                  key={s.id}
                  onClick={() => setActive(s.id)}
                  className={`w-full flex items-center gap-3 text-left px-3 py-2 rounded-lg transition ${
                    isActive
                      ? "bg-blue-600 text-white"
                      : "hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200"
                  }`}
                >
                  <span className="text-xl">
                    <Icon />
                  </span>
                  <span className="font-medium">{s.title}</span>
                </button>
              );
            })}
          </nav>

          <div className="mt-6 text-xs text-gray-500 dark:text-gray-400">
            Note: This guide explains policies & mechanics. For account issues
            contact support.
          </div>
        </aside>

        {/* Content */}
        <main className="md:col-span-9 space-y-6">
          {/* Account */}
          {active === "account" && (
            <section className="bg-white dark:bg-zinc-900 rounded-2xl p-6 shadow">
              <h2 className="text-2xl font-semibold mb-3">Account</h2>
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
                If you don't receive a verification code, possible causes
                include:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700 dark:text-gray-300">
                <li>
                  Temporary internal server error — try again after a minute.
                </li>
                <li>
                  The mail provider may block automated SMTP traffic. Supported
                  / commonly accepted providers include:{" "}
                  <strong>Gmail, Outlook/Hotmail, Yahoo, iCloud</strong>, and
                  <strong> custom SMTP</strong> (business domains). If your
                  provider blocks SMTP, verification may fail.
                </li>
                <li>
                  Ensure your email is typed correctly. If issues persist,
                  contact support with a screenshot and your email provider
                  name.
                </li>
              </ul>

              <h3 className="mt-4 font-semibold">Privacy & Security</h3>
              <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
                Your email address and password are never exposed on the client
                side. Passwords are stored hashed on the server; we never
                transmit or log plain passwords. Verification emails are only
                sent from our backend (via our configured SMTP provider).
              </p>
            </section>
          )}

          {/* Cores */}
          {active === "cores" && (
            <section className="bg-white dark:bg-zinc-900 rounded-2xl p-6 shadow">
              <h2 className="text-2xl font-semibold mb-3">Cores (Points)</h2>

              <div className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
                <p>
                  <strong>How to earn cores</strong>:
                </p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>
                    <strong>Create a survey:</strong> you receive{" "}
                    <strong>100 cores</strong> when a survey is created.
                  </li>
                  <li>
                    <strong>Answer a survey:</strong> respondents and the survey
                    author gain <strong>50 cores</strong>.
                  </li>
                </ul>

                <p className="mt-2">
                  <strong>What you can redeem</strong>:
                </p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>
                    <strong>Prepaid load:</strong> Redemptions are available
                    only in the Philippines. <em>Rate:</em>{" "}
                    <strong>1 PHP load costs 1500 cores</strong>. Requests
                    require admin identity verification. Successful fulfilled
                    requests will be confirmed by email and include image proof.
                  </li>
                  <li>
                    <strong>Survey boosts:</strong> Boosts increase the chance
                    your survey appears in users’ feeds.{" "}
                    <strong>1 boost = 10,000 cores</strong>.
                  </li>
                </ul>

                <div className="text-xs text-gray-500 mt-3">
                  <strong>Prepaid load verification:</strong> Admin verifies
                  identity and checks for abuse (e.g. hacking or fraudulent
                  activity). This is to prevent abuse and ensure safe
                  distribution.
                </div>
              </div>
            </section>
          )}

          {/* Streaks */}
          {active === "streaks" && (
            <section className="bg-white dark:bg-zinc-900 rounded-2xl p-6 shadow">
              <h2 className="text-2xl font-semibold mb-3">Streaks</h2>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Streaks continue when you either <strong>create</strong> or{" "}
                <strong>answer</strong> a survey at least once during the day.
                If you go a full day without creating or answering a survey,
                your streak is lost.
              </p>
              <p className="text-sm text-gray-700 dark:text-gray-300 mt-3">
                Use streaks to encourage regular participation and reward active
                users (streak bonuses and other incentives may apply as
                announced).
              </p>
            </section>
          )}

          {/* Leaderboards */}
          {active === "leaderboards" && (
            <section className="bg-white dark:bg-zinc-900 rounded-2xl p-6 shadow">
              <h2 className="text-2xl font-semibold mb-3">Leaderboards</h2>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Leaderboards show the top 10 users with the most cores. Rankings
                update periodically based on earned cores (survey creation &
                answers).
              </p>
            </section>
          )}

          {/* Inko / Conversations */}
          {active === "inko" && (
            <section className="bg-white dark:bg-zinc-900 rounded-2xl p-6 shadow">
              <h2 className="text-2xl font-semibold mb-3">
                Conversation with Inko (AI)
              </h2>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Conversation data with Inko is stored in memory using{" "}
                <strong>Redis</strong> and is private to your account — it is
                not shared with anyone else, including system owners.
                Conversations automatically expire if left untouched for{" "}
                <strong>3 days</strong>.
              </p>
              <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
                We do not leak Inko conversation contents to system owners or
                third parties
              </p>
            </section>
          )}

          {/* Survey Algorithm */}
          {active === "algorithm" && (
            <section className="bg-white dark:bg-zinc-900 rounded-2xl p-6 shadow">
              <h2 className="text-2xl font-semibold mb-3">
                Survey Algorithm (How surveys appear)
              </h2>

              <p className="text-sm text-gray-700 dark:text-gray-300">
                Each survey's weight (chance to appear in feeds) is calculated
                using a few factors:
              </p>

              <ul className="list-disc pl-5 mt-3 text-sm text-gray-700 dark:text-gray-300 space-y-2">
                <li>
                  <strong>Tag / Interest intersection:</strong> how many survey
                  tags intersect with a user's interests. Example: survey tags =
                  [people, technology], user interests = [technology] →
                  intersection size = <strong>1</strong>.
                </li>

                <li>
                  <strong>Survey boosts used:</strong> boosts purchased by the
                  survey author increase weight (each boost multiplies the
                  effective weight).
                </li>

                <li>
                  <strong>Random factor:</strong> a random float in [0, 1) is
                  generated and then multiplied by (<em>boost multiplier</em> +{" "}
                  <em>intersection size</em>). This adds randomness while
                  favoring boosted / highly-relevant surveys.
                </li>
              </ul>

              <div className="mt-4 text-sm text-gray-700 dark:text-gray-300">
                <strong>Simple pseudo-formula</strong> (conceptual):
                <pre className="bg-gray-100 dark:bg-gray-700 p-3 rounded text-xs mt-2 overflow-auto">
                  {`weight = randomFloat(0,1) * (1 + intersectionSize + boosts * boostFactor)
-- higher weight => higher chance to show`}
                </pre>
              </div>
            </section>
          )}

          {/* Answers & Visibility */}
          {active === "answers" && (
            <section className="bg-white dark:bg-zinc-900 rounded-2xl p-6 shadow">
              <h2 className="text-2xl font-semibold mb-3">
                Answers & Visibility
              </h2>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Only the survey owner (and any users they explicitly share
                results with) can view individual answers. If the owner chooses
                to share the survey view, those viewers can see aggregated
                results as allowed.
              </p>
            </section>
          )}

          {/* Reports */}
          {active === "reports" && (
            <section className="bg-white dark:bg-zinc-900 rounded-2xl p-6 shadow">
              <h2 className="text-2xl font-semibold mb-3">
                Reports & Moderation
              </h2>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                If you find inappropriate content or abusive behavior (user or
                survey), you can submit a report. Admins will review and may
                apply:
              </p>

              <ul className="list-disc pl-5 mt-3 text-sm text-gray-700 dark:text-gray-300 space-y-2">
                <li>Core point deduction</li>
                <li>Temporary or permanent ban</li>
                <li>Survey takedown</li>
              </ul>

              <p className="text-sm text-gray-700 dark:text-gray-300 mt-3">
                Admins verify reports, check evidence, and act according to
                severity and rules.
              </p>
            </section>
          )}
          {active === "badges" && (
            <section className="bg-white dark:bg-zinc-900 rounded-2xl p-6 shadow">
              <h2 className="text-2xl font-semibold mb-3">Badges</h2>
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
                Your badge represents your current standing and contribution
                level based on your <strong>total core points</strong>. As you
                earn more cores, your badge upgrades automatically to reflect
                your achievements and participation.
              </p>

              <div className="mt-4 overflow-x-auto">
                <table className="w-full text-sm text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
                      <th className="px-4 py-2">Badge</th>
                      <th className="px-4 py-2">Core Points Required</th>
                      <th className="px-4 py-2">Style</th>
                    </tr>
                  </thead>
                  <tbody >
                    {badges.map((badge) => (
                      <tr>
                        <th>{badge.badge}</th>
                        <th>{badge.pointsRequired}</th>
                        <th className={badge.style}>{badge.badge}</th>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <p className="text-xs text-gray-500 dark:text-gray-400 mt-4">
                * Badges are purely visual and serve as a recognition of user
                engagement and activity. They may unlock cosmetic or
                reputation-based perks in future updates.
              </p>
            </section>
          )}
        </main>
      </div>
    </div>
  );
};

export default GuidePage;
