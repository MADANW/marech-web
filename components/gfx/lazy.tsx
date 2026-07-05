"use client";
import dynamic from "next/dynamic";
import { MarsPlanetStatic } from "./MarsPlanetStatic";

/**
 * Single home for the ssr-less dynamic-import idiom (Next lazy-loading
 * guide: `ssr: false` must live inside a client module). Everything
 * three.js/WebGL loads through here so it stays in async chunks and out
 * of routes that never render it.
 */
export const MarsBackdropLazy = dynamic(() => import("./MarsBackdrop"), {
  ssr: false,
  loading: () => null,
});

export const MarsSetPieceLazy = dynamic(() => import("./MarsSetPiece"), {
  ssr: false,
  loading: () => <MarsPlanetStatic />,
});
