import { useState, useEffect } from "react";

interface Data {
  id: number;
  name: string;
}

interface FetchState<T> {
  isLoading: boolean;
  isError: boolean;
  data: T | null;
  errorMessage: string | null;
}

const useFetchData = (url: string): FetchState<Data[]> => {
  const [fetchState, setFetchState] = useState<FetchState<Data[]>>({
    isLoading: true,
    isError: false,
    data: null,
    errorMessage: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const json = await response.json();
        setFetchState({
          isLoading: false,
          isError: false,
          data: json,
          errorMessage: null,
        });
      } catch (error: any) {
        setFetchState({
          isLoading: false,
          isError: true,
          data: null,
          errorMessage: "Error fetching data: " + error.message,
        });
      }
    };

    fetchData();
  }, [url]);

  return fetchState;
};

export default useFetchData;
