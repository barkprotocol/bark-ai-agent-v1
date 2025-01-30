"use client"

import { useState } from "react"
import { Loader2 } from "lucide-react"
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { checkEAPTransaction } from "@/server/actions/eap"
import { usePrivy } from "@privy-io/react-auth"

export function EAPTransactionChecker() {
  const [txHash, setTxHash] = useState("")
  const [isChecking, setIsChecking] = useState(false)
  const [result, setResult] = useState<{
    success: boolean
    message: string
  } | null>(null)
  const { user } = usePrivy()

  async function handleCheck() {
    if (!user) {
      setResult({
        success: false,
        message: "Please log in to check your EAP transaction.",
      })
      return
    }

    setIsChecking(true)
    try {
      const response = await checkEAPTransaction({ txHash })
      if (response?.success) {
        setResult({
          success: true,
          message: response.data.message || "Transaction verified successfully. EAP should be granted to your account.",
        })
      } else {
        setResult({
          success: false,
          message: response?.data?.message || "Failed to verify transaction. Please try again.",
        })
      }
    } catch (error) {
      console.error("Error checking transaction:", error)
      setResult({
        success: false,
        message: "An error occurred while verifying the transaction. Please try again later.",
      })
    } finally {
      setIsChecking(false)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-2 px-6">
        <Input placeholder="Paste transaction hash" value={txHash} onChange={(e) => setTxHash(e.target.value)} />
        <Button onClick={handleCheck} disabled={isChecking || !txHash || !user}>
          {isChecking ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Checking
            </>
          ) : (
            "Submit"
          )}
        </Button>
      </div>

      <AlertDialog open={!!result} onOpenChange={() => setResult(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{result?.success ? "Transaction Verified" : "Verification Failed"}</AlertDialogTitle>
            <AlertDialogDescription>{result?.message}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Close</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

