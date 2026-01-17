import { MotiView } from "moti";
import { Skeleton } from "moti/skeleton";
import React from "react";

type BioSkeletonUIProps = {
  isLoading: boolean;
};

const BioSkeletonUI: React.FC<BioSkeletonUIProps> = ({ isLoading }) => {
  return (
    <>
      {/* Skeleton */}
      <MotiView style={{ marginTop: 20, alignItems: "center" }}>
        <Skeleton show={isLoading} colorMode="light" width={"60%"} height={100}></Skeleton>
      </MotiView>
    </>
  );
};

export default BioSkeletonUI;
