import { Router } from '@solidjs/router';
import { FileRoutes } from '@solidjs/start/router';
import { Suspense } from 'solid-js';
import './app.css';

const normalizeRouterBase = (value: string): string => {
  if (value === '/') {
    return value;
  }

  return value.replace(/\/+$/u, '');
};

export default function App() {
  return (
    <Router
      base={normalizeRouterBase(import.meta.env.SERVER_BASE_URL)}
      root={(props) => <Suspense>{props.children}</Suspense>}
    >
      <FileRoutes />
    </Router>
  );
}
