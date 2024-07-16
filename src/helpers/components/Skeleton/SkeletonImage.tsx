"use client"
import React from "react";
import {Card, Skeleton} from "@nextui-org/react";

export default function SkeletonImage({isLoading}:any) {

  return (
    <div className="flex flex-col gap-3 bg-[var(--pagebg)]">
      <Card className=" space-y-5 pb-4" radius="lg">
        <Skeleton isLoaded={isLoading} className="rounded-lg" >
          <div className="h-24 rounded-lg bg-[#efefef] min-h-[193.5px] min-w-[257.5px]"></div>
        </Skeleton>
      </Card>
    </div>
  );
}
