// DocumentationPage.jsx
import { USER_BADGES } from "@inquestia/constants";
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

const DocumentationPage = () => {
  return (
    <div className="  text-zinc-950 dark:text-neutral-100">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-6">
        <main className="md:col-span-9 space-y-6">
          <section id="account" className=" rounded-2xl p-6 shadow">
            <h1 className="text-3xl mb-6 font-bold tracking-tighter">
              System & Account
            </h1>
            <h2 className="text-2xl font-bold tracking-tighter mb-3">
              Account
            </h2>
            <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
              If you don't receive a verification code, possible causes include:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700 dark:text-gray-300">
              <li>
                Temporary internal server error — try again after a minute.
              </li>
              <li>
                The mail provider may block automated SMTP traffic. Supported /
                commonly accepted providers include:{" "}
                <strong>Gmail, Outlook/Hotmail, Yahoo, iCloud</strong>, and
                <strong> custom SMTP</strong> (business domains). If your
                provider blocks SMTP, verification may fail.
              </li>
              <li>
                Ensure your email is typed correctly. If issues persist, contact
                support with a screenshot and your email provider name.
              </li>
            </ul>

            <h3 className="mt-4 font-semibold">Privacy & Security</h3>
            <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
              Your email address and password are never exposed on the client
              side. Passwords are stored hashed on the server; we never transmit
              or log plain passwords. Verification emails are only sent from our
              backend (via our configured SMTP provider).
            </p>
          </section>
          <section id="answers" className=" rounded-2xl p-6 shadow">
            <h2 className="text-2xl font-bold tracking-tighter mb-3">
              Answers & Visibility
            </h2>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              Only the survey owner (and any users they explicitly share results
              with) can view individual answers. If the owner chooses to share
              the survey view, those viewers can see aggregated results as
              allowed.
            </p>
          </section>
          <section id="algorithm" className=" rounded-2xl p-6 shadow">
            <h2 className="text-2xl font-bold tracking-tighter mb-3">
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
                <em>intersection size</em>). This adds randomness while favoring
                boosted / highly-relevant surveys.
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

          <section id="cores" className=" rounded-2xl p-6 shadow">
            <h1 className="text-3xl mb-6 font-bold tracking-tighter">
              Progress & Rewards
            </h1>
            <h2 className="text-2xl font-bold tracking-tighter mb-3">
              Cores (Points)
            </h2>

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
                  <strong>Survey boosts:</strong> Boosts increase the chance
                  your survey appears in users’ feeds.{" "}
                  <strong>1 boost = 10,000 cores</strong>.
                </li>
              </ul>
            </div>
          </section>

          <section id="streaks" className=" rounded-2xl p-6 shadow">
            <h2 className="text-2xl font-bold tracking-tighter mb-3">
              Streaks
            </h2>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              Streaks continue when you either <strong>create</strong> or{" "}
              <strong>answer</strong> a survey at least once during the day. If
              you go a full day without creating or answering a survey, your
              streak is lost.
            </p>
            <p className="text-sm text-gray-700 dark:text-gray-300 mt-3">
              Continuing your streak also gives you additional 500 core points!
            </p>
          </section>

          <section id="leaderboards" className=" rounded-2xl p-6 shadow">
            <h2 className="text-2xl font-bold tracking-tighter mb-3">
              Leaderboards
            </h2>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              Leaderboards show the top 10 users with the most cores. Rankings
              update periodically based on earned cores (survey creation &
              answers).
            </p>
          </section>

          <section id="inka" className=" rounded-2xl p-6 shadow">
            <h2 className="text-2xl font-bold tracking-tighter mb-3">
              Conversation with Inka (AI)
            </h2>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              Conversation data with Inka is stored in memory using{" "}
              <strong>Redis</strong> and is private to your account — it is not
              shared with anyone else, including system owners. Conversations
              automatically expire if left untouched for <strong>3 days</strong>
              .
            </p>
            <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
              We do not leak Inka conversation contents to system owners or
              third parties
            </p>
          </section>

          <section id="badges" className=" rounded-2xl p-6 shadow">
            <h2 className="text-2xl font-bold tracking-tighter mb-3">Badges</h2>
            <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
              Your badge represents your current standing and contribution level
              based on your <strong>total core points</strong>. As you earn more
              cores, your badge upgrades automatically to reflect your
              achievements and participation.
            </p>

            <div className="mt-4 overflow-x-auto">
              <table className="w-full  text-sm text-left border-collapse">
                <thead>
                  <tr className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
                    <th className="px-4 py-2">Badge</th>
                    <th className="px-4 py-2">Core Points Required</th>
                    <th className="px-4 py-2">Style</th>
                  </tr>
                </thead>
                <tbody>
                  {USER_BADGES.map((badge) => (
                    <tr>
                      <th>{badge.badge}</th>
                      <th>{badge.pointsRequired}</th>
                      <th>
                        <p className={badge.style}>{badge.badge}</p>
                      </th>
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
        </main>
      </div>
    </div>
  );
};

export default DocumentationPage;
