import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import QueryClientProviderWrapper from "./lib/query-client-provider";
export default function App() {
  return (
    <QueryClientProviderWrapper>
      <RouterProvider router={router} />
    </QueryClientProviderWrapper>
  );
}
