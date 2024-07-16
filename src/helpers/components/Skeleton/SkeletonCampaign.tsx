"use client"
import React from "react";
import {Card, Skeleton} from "@nextui-org/react";

export default function SkeletonCampaign({isloading}:{isloading : boolean}) {

  return (
    <div className="flex flex-col gap-3">
      <Card className=" space-y-5 pb-4" radius="lg">
        <Skeleton isLoaded={isloading} className="rounded-lg" >
          <div className="h-24 rounded-lg bg-[#efefef] min-h-[193.5px] min-w-[257.5px]"></div>
        </Skeleton>
        <div className="space-y-3 pl-2">
          <Skeleton isLoaded={isloading} className="w-3/5 rounded-lg">
            <div className="h-3 w-full rounded-lg bg-[#e4e4e4]"></div>
          </Skeleton>
          <Skeleton isLoaded={isloading} className="w-4/5 rounded-lg">
            <div className="h-3 w-full rounded-lg bg-[#e4e4e4]"></div>
          </Skeleton>
        </div>
      </Card>
    </div>
  );
}
