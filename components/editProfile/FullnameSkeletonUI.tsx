import { MotiView } from "moti";
import { Skeleton } from "moti/skeleton";
import React from "react";

type FullnameSkeletonUIProps = {
  isLoading: boolean;
};

const FullnameSkeletonUI: React.FC<FullnameSkeletonUIProps> = ({ isLoading }) => {
  return (
    <>
      {/* Skeleton */}
      <MotiView style={{ alignItems: "center" }}>
        <Skeleton show={isLoading} colorMode="light" width={"40%"}></Skeleton>
      </MotiView>
    </>
  );
};

export default FullnameSkeletonUI;
