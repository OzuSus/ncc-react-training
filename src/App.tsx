import { RouterProvider } from '@tanstack/react-router';
import { router } from '@/config/router.tsx';

function App(): JSX.Element {
  return <RouterProvider router={router} />;
}

export default App;
