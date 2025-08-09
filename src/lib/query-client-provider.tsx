import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

const queryClient = new QueryClient({
  mutationCache: new MutationCache({
    onError: (error) => {
      console.error("error", error);
    },
  }),
  queryCache: new QueryCache({
    onError: (error) => {
      console.error("error", error);
    },
  }),
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      // attempt to retry 3 times if the error is not a 404
      retry: (failureCount, error) => {
        if (error instanceof Error && error.message.includes("404")) {
          return false;
        }
        return failureCount < 3;
      },
      staleTime: 1000 * 60 * 5,
    },
  },
});
const QueryClientProviderWrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default QueryClientProviderWrapper;
