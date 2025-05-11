import React from "react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { HardDriveDownload } from "lucide-react";
import { ConversionChart } from "./bento-grid-items/conversion-chart";

const ServiceDetails = () => {
  return (
    <section className="container">
      <h2 className="text-5xl text-center font-bold">
        We are a class apart from our competitiors.
      </h2>
      <div className="max-w-8xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-4 lg:grid-cols-8 auto-rows-[225px] my-16">
        <div className="h-full bg-slate-100/50 border-2 border-slate-100 rounded-3xl col-span-2 row-[1/3]">
          1
        </div>
        <div className="h-full bg-slate-100/50 border-2 border-slate-100 rounded-3xl col-span-4">
          2
        </div>
        <div className="h-full bg-slate-100/50 border-2 border-slate-100 rounded-3xl row-span-2 col-span-2">
          <ConversionChart />
        </div>
        <div className="h-full bg-slate-100/50 border-2 border-slate-100 rounded-3xl col-span-2">
          4
        </div>
        <div className="h-full grid grid-cols-1 grid-rows-2 gap-4  rounded-3xl col-span-2">
          <div className="bg-black border-2 border-slate-100 rounded-3xl flex items-center justify-center">
            <h4 className="text-2xl font-extrabold text-white">
              Bl<span className="text-blue-500">o</span>cks
            </h4>
          </div>
          <div className="bg-slate-100/50 border-2 border-slate-100 rounded-3xl flex items-center justify-between gap-2 px-4">
            <div>
              <h4 className="font-bold">Download</h4>
              <h5 className="font-bold">
                the <span className="text-blue-500">App/Browser</span>
              </h5>
            </div>
            <Button size={"icon"} className="bg-black rounded-full">
              <HardDriveDownload size={16} className="text-white" />
            </Button>
          </div>
        </div>
        <div className="h-full bg-slate-100/50 border-2 border-slate-100 rounded-3xl col-span-2">
          7
        </div>
        <div className="h-full bg-slate-100/50 border-2 border-slate-100 rounded-3xl col-span-2">
          8{" "}
        </div>
        <div className="h-full bg-slate-100/50 border-2 border-slate-100 rounded-3xl col-span-4">
          9
        </div>
      </div>
    </section>
  );
};

export default ServiceDetails;
