import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Main from './layout/main';
import { Provider } from 'react-redux';
import store from './state/store';
import { PostHogProvider } from 'posthog-js/react';


const options: Record<string, string> = {
  api_host: import.meta.env.VITE_PUBLIC_POSTHOG_HOST as string,
}
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 10, // 10 minutes (formerly cacheTime)
    },
  },
});

/** Get the root DOM element and ensure it exists */
const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Root element not found");
}


createRoot(rootElement).render(
  <BrowserRouter basename="/">
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <PostHogProvider
          apiKey={import.meta.env.VITE_PUBLIC_POSTHOG_KEY as string}
          options={options}
        >
          <Main />
        </PostHogProvider>
      </QueryClientProvider>
    </Provider>
  </BrowserRouter>
);

