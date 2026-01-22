"use client";

import { usePathname } from "next/navigation";
import { BlogBannerRotator } from "@/components/BlogBannerRotator";

export function GlobalBlogBanner() {
  const pathname = usePathname();

  // バトル中は非表示
  if (pathname && /\/battle(\/|$)/.test(pathname)) {
    return null;
  }

  const locale = pathname ? pathname.split("/")[1] : "ja";
  const headingMap: Record<string, string> = {
    ja: "おすすめブログ",
    ko: "추천 블로그",
    en: "Recommended Blogs",
  };
  const label = headingMap[locale] || headingMap.ja;

  return <BlogBannerRotator label={label} />;
}
