import { Locale, locales } from "@/i18n.config";
import { getDictionary } from "@/lib/i18n";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import Providers from "@/components/Providers";
import Link from "next/link";
import { GlobalBlogBanner } from "@/components/GlobalBlogBanner";

// 静的パラメータ生成
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: Locale }>;
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  const footerText = dict.home?.footer || "© 2026 推しチェッカー";

  return (
    <Providers>
      <main className="max-w-md mx-auto px-4 py-4 safe-top safe-bottom min-h-screen flex flex-col">
        {/* ヘッダー */}
        <header className="header">
          <Link 
            href={`/${locale}`}
            className="text-sm font-semibold text-gray-600 hover:text-gray-800 transition-colors"
          >
            {dict.common.appName}
          </Link>
          <LanguageSwitcher currentLocale={locale} />
        </header>
        
        {/* コンテンツ */}
        <div className="flex-1 w-full">
          {children}
        </div>

        {/* ブログバナー（全ページ下部、バトル中は非表示） */}
        <GlobalBlogBanner />

        {/* フッター */}
        <p className="mt-3 text-gray-400 text-xs text-center">{footerText}</p>
      </main>
    </Providers>
  );
}
