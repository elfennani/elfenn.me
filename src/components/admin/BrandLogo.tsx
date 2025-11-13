"use client"

import { TextFieldClientComponent } from "payload"
import { useField } from "@payloadcms/ui"
import useBrandSearch from "@/hooks/admin/useBrandSeach"

const BrandLogo: TextFieldClientComponent = ({ path }) => {
  const field = useField<string>({ path })
  const { data: brands, isSuccess } = useBrandSearch(field.value)

  if (!!brands && brands.some((b) => b.domain === field.value) && isSuccess) {
    const brand = brands.find((b) => b.domain === field.value)
    return (
      <div className="grid grid-cols-2 gap-4 pt-4">
        {["symbol", "logo"].map((type) => (
          <div className="flex flex-col items-center gap-4 p-4 border border-neutral-800 rounded-lg">
            <h2 className="capitalize text-lg">{type}</h2>
            <img
              className="aspect-square object-contain size-40"
              src={`https://cdn.brandfetch.io/${brand?.domain}/${type}?c=1idIpPfKaZoBskq9FCV&type=${type}`}
              alt={`${type} of ${brand?.name}`}
            />
          </div>
        ))}
      </div>
    )
  }

  return null
}

export default BrandLogo
