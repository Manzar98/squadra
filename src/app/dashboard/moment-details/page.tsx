"use client"

import { useEffect, useState } from "react"
import { Sidebar } from "../../components/sidebar"
import { Button } from "../../components/ui/button"
import Link from "next/link"

interface MomentData {
  squadmate: string
  flowZone: string
  reaction: string
  note: string
}

export default function MomentDetailsPage() {
  const [momentData, setMomentData] = useState<MomentData | null>(null)

  useEffect(() => {
    const storedData = localStorage.getItem("submittedMoment")
    if (storedData) {
      setMomentData(JSON.parse(storedData))
    }
  }, [])

  if (!momentData) {
    return (
      <div className="min-h-screen bg-gray-100">
        <div className="flex">
          <Sidebar />
          <div className="flex-1 p-8 flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-900 mb-4">No moment data found</h1>
              <Link href="/give-moment">
                <Button className="bg-green-500 hover:bg-green-600 text-white">Give a Moment</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex">
        <Sidebar />

        <div className="flex-1 p-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-[32px] font-[600] text-gray-900 mb-8">Moment Details</h1>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
              <div className="space-y-6">
                <div>
                  <h3 className="text-[18px] font-[600] text-gray-900 mb-2">Squadmate</h3>
                  <p className="text-[16px] text-gray-700">{momentData.squadmate || "Not specified"}</p>
                </div>

                <div>
                  <h3 className="text-[18px] font-[600] text-gray-900 mb-2">Flow Zone</h3>
                  <p className="text-[16px] text-gray-700">{momentData.flowZone || "Not specified"}</p>
                </div>

                <div>
                  <h3 className="text-[18px] font-[600] text-gray-900 mb-2">Reaction</h3>
                  <div className="inline-block px-4 py-2 bg-green-100 text-green-800 rounded-full text-[14px] font-[500]">
                    {momentData.reaction || "No reaction selected"}
                  </div>
                </div>

                <div>
                  <h3 className="text-[18px] font-[600] text-gray-900 mb-2">Personal Note</h3>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-[16px] text-gray-700 leading-relaxed">{momentData.note || "No note provided"}</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex gap-4">
                <Link href="/give-moment">
                  <Button className="bg-green-500 hover:bg-green-600 text-white">Give Another Moment</Button>
                </Link>
                <Link href="/dashboard">
                  <Button variant="outline">Back to Dashboard</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
