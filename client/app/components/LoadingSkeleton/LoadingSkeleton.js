import React from 'react';
import Skeleton from 'react-loading-skeleton';

export default function LoadingSkeleton() {
    return (
        <div>
            <Skeleton count={5} height={20} />
            <Skeleton width={200} height={200} />
            <Skeleton width={150} height={10} />
            <Skeleton width={100} height={10} />
        </div>
    );
}

//experimental pending ...
