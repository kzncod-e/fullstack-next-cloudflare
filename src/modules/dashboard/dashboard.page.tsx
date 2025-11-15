"use client";

import { useEffect, useState } from "react";
import { dummyData, selectData } from "./data";
import axios from "axios";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import AgentActivity from "./components/agent-activity";
import { Label } from "@/components/ui/label";
import DashboardLoader from "../todos/components/loader";
export default function DashboardPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [platform, setPlatform] = useState("instagram");
  const [instance, setInstance] = useState("instance 1");

  const [error, setError] = useState<string | null>(null);
  const [selectedStep, setselectedStep] = useState<{
    [key: number]: string;
  }>({});
  const handleSelect = (index, value) => {
    setselectedStep((prev) => ({
      ...prev,
      [index]: value,
    }));
  };

  const getAi = async () => {
    try {
      console.log("🚀 Starting Ollama API call...");
      setLoading(true);
      setError(null);

      console.log("📡 Sending POST request to /api/ollama");
      const res = await axios.post("/api/agent", {
        selectedStep,
        instance,
        platform,
      });

      console.log("✅ Response received:", res);
      console.log("Response data:", res.data);

      if (res.data.success) {
        setData(res.data.data);
        console.log("✨ Ollama result stored in state:", res.data.data);
      } else {
        setError(res.data.error || "Failed to fetch ollama data");
        console.warn("⚠️ API returned error:", res.data.error);
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error occurred";
      setError(errorMessage);

      console.error("Error message:", errorMessage);
    } finally {
      setLoading(false);
      console.log("✅ Loading complete");
    }
  };

  const handlegetAiActivity = async () => {
    getAi();
  };
  useEffect(() => {
    console.log(loading, "loadingg.....");
  }, [loading]);
  // console.log(data.data[1]);
  // useEffect(() => {
  //   console.log(selectedStep);
  // }, [selectedStep]);

  return (
    <div className="min-h-screen bg-white text-gray-900 p-8">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Debug Info - Remove in production */}

        {/* Header */}
        <div className="flex flex-col items-center justify-between">
          <h1 className="text-2xl  my-6 font-bold">Ai Prompt</h1>
          <div className="w-full bg-slate-100 p-10 rounded-2xl">
            <form action="" className="w-fit p-6 bg-white">
              <Select onValueChange={(value) => setPlatform(value)}>
                <Label className="mt-2  mb-2 font-sans text-black/40">
                  Select your Platform
                </Label>
                <SelectTrigger className="w-[40rem]">
                  <SelectValue placeholder={platform} />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Platform</SelectLabel>

                    <SelectItem value="youtube.com">Youtube</SelectItem>
                    <SelectItem value="instagram.com">Instagram</SelectItem>
                    <SelectItem value="x.com">Twitter</SelectItem>
                    <SelectItem value="tiktok.com">Tiktok</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <Select onValueChange={(value) => setInstance(value)}>
                <Label className="mt-2  mb-2 font-sans text-black/40">
                  Select The instance
                </Label>
                <SelectTrigger className="w-[40rem]">
                  <SelectValue placeholder={instance} />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>instances</SelectLabel>

                    <SelectItem value="http://103.215.228.166:7809">
                      Instance 1
                    </SelectItem>
                    <SelectItem value="http://103.215.228.166:7810">
                      Instance 2
                    </SelectItem>
                    <SelectItem value="http://103.215.228.166:7811">
                      Instance 3
                    </SelectItem>
                    <SelectItem value="http://103.215.228.166:7812">
                      Instance 4
                    </SelectItem>
                    <SelectItem value="http://103.215.228.166:7813">
                      Instance 5
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              {selectData.map((el, index) => (
                <Select
                  key={index}
                  onValueChange={(value) => handleSelect(index, value)}
                >
                  <div className="flex  flex-col gap-4">
                    <Label className="mt-2 font-sans text-black/40">
                      {el.label}
                    </Label>

                    <div className="flex justify-center items-center">
                      <SelectTrigger className="w-[40rem]">
                        <SelectValue
                          placeholder={selectedStep[index] || el.title}
                        />
                      </SelectTrigger>

                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Prompt</SelectLabel>

                          {el.data.map((ele, idx) => {
                            const isUsed =
                              Object.values(selectedStep).includes(ele) &&
                              selectedStep[index] !== ele;

                            return (
                              <SelectItem
                                key={idx}
                                value={ele}
                                disabled={isUsed}
                              >
                                {ele}
                              </SelectItem>
                            );
                          })}
                        </SelectGroup>
                      </SelectContent>
                    </div>
                  </div>
                </Select>
              ))}
            </form>
          </div>
          {/* <h1 className="text-2xl font-semibold tracking-tight">
            AI Agent Overview
          </h1> */}
          <div className="flex w-full mt-7 justify-end">
            <button
              disabled={loading ? true : false}
              onClick={handlegetAiActivity}
              className="rounded-md border border-gray-300 bg-gray-50 hover:bg-gray-100 px-4 py-2 text-sm font-medium"
            >
              Run the agent
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <div className="rounded-lg border border-gray-200 bg-white p-4">
            <p className="text-sm text-gray-500">Agent Session</p>
            <p className="text-base font-medium">{dummyData.sessionId}</p>
          </div>
          <div className="rounded-lg border border-gray-200 bg-white p-4">
            <p className="text-sm text-gray-500">Platform</p>
            <p className="text-base font-medium">{dummyData.platform}</p>
          </div>
          <div className="rounded-lg border border-gray-200 bg-white p-4">
            <p className="text-sm text-gray-500">Status</p>
            <p className="text-base font-medium text-green-600 capitalize">
              {dummyData.status}
            </p>
          </div>
        </div>
        {loading ? (
          <DashboardLoader />
        ) : (
          <AgentActivity dummyData={dummyData} />
        )}
      </div>
    </div>
  );
}
