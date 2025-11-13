import { revalidateTag } from "next/cache"
import { RevalidateButtonClient } from "@/components/RevalidateButton.client"

const RevalidateButton = async () => {
  const handleRevalidate = async () => {
    "use server"
    revalidateTag("home-page")
  }

  return <RevalidateButtonClient onRevalidateAction={handleRevalidate} />
}

export default RevalidateButton
