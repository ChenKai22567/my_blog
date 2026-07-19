'use client';

import { useLocaleStore } from '@/lib/stores/localeStore';
import { useMessages } from '@/lib/i18n/useMessages';

interface FooterProps {
  lastUpdated?: string;
  lastUpdatedByLocale?: Record<string, string | undefined>;
  siteTitle: string;
  siteTitleByLocale?: Record<string, string>;
  defaultLocale?: string;
}

export default function Footer({
  lastUpdated,
  lastUpdatedByLocale,
  siteTitle,
  siteTitleByLocale,
  defaultLocale = 'en',
}: FooterProps) {
  const locale = useLocaleStore((state) => state.locale);
  const messages = useMessages();

  const resolvedLastUpdated =
    lastUpdatedByLocale?.[locale] ||
    (defaultLocale ? lastUpdatedByLocale?.[defaultLocale] : undefined) ||
    lastUpdated ||
    new Date().toLocaleDateString(locale || 'en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  const resolvedSiteTitle =
    siteTitleByLocale?.[locale] ||
    siteTitleByLocale?.[defaultLocale] ||
    siteTitle;
  const copyrightText = locale.startsWith('zh') ? '保留所有权利。' : 'All rights reserved.';

  return (
    <footer className="border-t border-neutral-200/50 bg-neutral-50/50 dark:bg-neutral-900/50 dark:border-neutral-700/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-2">
          <p className="text-xs text-neutral-500">
            {messages.footer.lastUpdated}: {resolvedLastUpdated}
          </p>
          <p className="text-xs text-neutral-500">
            © {new Date().getFullYear()} {resolvedSiteTitle}. {copyrightText}
          </p>
        </div>
      </div>
    </footer>
  );
}
