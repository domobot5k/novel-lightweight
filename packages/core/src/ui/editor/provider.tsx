"use client";

import { createContext } from "react";

export const NovelContext = createContext<{
  completionApi: string;
  // eslint-disable-next-line no-unused-vars
  handleUserImageUpload?: (file: File) => Promise<string | File>;
}>({
  completionApi: "/api/generate",
});
