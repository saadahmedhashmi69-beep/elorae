"use client";

import { useEffect } from "react";
import { siteConfig } from "@/lib/config";
import { trackViewContent } from "@/lib/analytics";

export function ViewContentTracker() {
  useEffect(() => {
    trackViewContent({ contentName: siteConfig.product.displayName, value: siteConfig.pricing.price });
  }, []);
  return null;
}
