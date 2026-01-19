
import React from "react";

const Welcome = () => {
	return (
		<div className="flex flex-col items-center justify-center h-[60vh] w-full bg-white dark:bg-zinc-900 rounded-2xl shadow-lg p-8 mx-auto">
			<h1 className="text-4xl font-bold text-blue-700 dark:text-blue-300 mb-4">Welcome to the Admin Dashboard</h1>
			<p className="text-lg text-gray-700 dark:text-gray-200 mb-2 text-center max-w-xl">
				Here you can manage reports, view analytics, resolve user and survey issues, and oversee platform activity. Use the sidebar to navigate between different admin tools and sections.
			</p>
			<a
				href="https://us.posthog.com/project/226500"
				target="_blank"
				rel="noopener noreferrer"
				className="mt-4 inline-block px-5 py-2 rounded-lg bg-blue-600 text-white font-semibold shadow hover:bg-blue-700 transition"
			>
				Monitor Platform Analytics
			</a>
			<div className="mt-8 text-base text-blue-600 dark:text-blue-400 font-semibold">
				Have a productive session!
			</div>
		</div>
	);
};

export default Welcome;
