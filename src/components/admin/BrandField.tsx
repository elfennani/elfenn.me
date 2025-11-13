"use client"
import * as React from "react"
import { TextFieldClientComponent } from "payload"
import { useAllFormFields, useField, useFormFields } from "@payloadcms/ui"
import { useQuery } from "@tanstack/react-query"
import useBrandSearch from "@/hooks/admin/useBrandSeach"

const BrandField: TextFieldClientComponent = (props) => {
  const field = useField<string>({ path: props.path })
  const { data: brands, isPending, isError } = useBrandSearch(field.value)

  if (!field.value) {
    return <div>Please enter a brand identifier to load brand data.</div>
  }

  if (isPending) {
    return <div>Loading brand data...</div>
  }

  if (isError) {
    return <div>Error loading brand data.</div>
  }

  if (brands && brands.length > 0) {
    return (
      <div className="flex gap-2 flex-wrap py-1">
        {brands.map((brand) => (
          <button
            key={brand.domain}
            className="flex items-center px-2 py-1 border border-neutral-700 rounded gap-2"
            type="button"
            onClick={() => {
              field.setValue(brand.domain)
            }}
          >
            <img src={brand.icon} alt={brand.name} className="size-4" />
            <div className="font-bold">{brand.name}</div>
          </button>
        ))}
      </div>
    )
  }

  return <div>No brand data found.</div>
}

export default BrandField
