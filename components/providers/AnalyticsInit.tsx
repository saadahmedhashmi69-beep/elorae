"use client";

import { useEffect } from "react";
import { captureUtmParams } from "@/lib/analytics";

export function AnalyticsInit() {
  useEffect(() => {
    captureUtmParams();
  }, []);
  return null;
}
