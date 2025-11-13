import { useQuery } from "@tanstack/react-query"

interface Brand {
  name: string
  domain: string
  icon: string
}

function useBrandSearch(query: string) {
  return useQuery({
    queryKey: ["brands", query],
    queryFn: async () => {
      const url = new URL(`https://api.brandfetch.io/v2/search/${query}`)
      url.searchParams.set("c", "1idIpPfKaZoBskq9FCV")
      const res = await fetch(url.toString())
      if (!res.ok) {
        throw new Error("Failed to fetch brand data")
      }
      return res.json() as Promise<Brand[]>
    },
    enabled: !!query,
    placeholderData: (data) => data,
  })
}

export default useBrandSearch
