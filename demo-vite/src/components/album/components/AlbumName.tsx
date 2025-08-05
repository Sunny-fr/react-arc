import React from 'react';
import {album, type AlbumProps} from "../arc/album.arc.ts";
import {cn} from "@/lib/utils.ts";

import {useARC} from "../../../../../src";


export const AlbumName: React.FC<AlbumProps> = ((props) => {

  const {
    error,
    data: model,
    loaded
  } = useARC({
    ARCConfig: album,
    props
  })
  if (error) return (
    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 border border-red-200 shadow-sm">
    ! </span>
  );

  if (!loaded) return (
    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 border border-gray-200 animate-pulse">
      ...
    </span>
  );

  return (
    <span className={cn(
      "inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium",
      "bg-gradient-to-r from-blue-50 to-indigo-50 text-indigo-700 border border-indigo-200",
      "shadow-sm transition-all hover:shadow hover:bg-indigo-100 cursor-default"
    )}>
      {model?.title}
    </span>
  );
});

export default AlbumName;
