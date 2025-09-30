import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Main from './layout/main.jsx';
import { Provider } from 'react-redux';
import store from './state/store.js';
import { PostHogProvider } from 'posthog-js/react';

const options = {
  api_host: import.meta.env.VITE_PUBLIC_POSTHOG_HOST,
  defaults: '2025-05-24',
}

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <BrowserRouter basename="/">
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <PostHogProvider
          apiKey={import.meta.env.VITE_PUBLIC_POSTHOG_KEY}
          options={options}
        >
          <Main />
        </PostHogProvider>
      </QueryClientProvider>
    </Provider>
  </BrowserRouter>
);
