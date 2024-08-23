const { fetcher } = require("@/utils/fetcher");
const { default: useSWR } = require("swr");

export const useGetAllHostels = ()=>{
    const {data, isLoading, isError} = useSWR("/hostels/", fetcher);

    return {allHostels: data, isLoading, isError}
}

export const useGetHostelsByUser = (id)=>{
    const {data, isLoading, isError} = useSWR(`/hostels/by-user/${id}`, fetcher);

    return {allHostels: data, isLoading, isError}
}


