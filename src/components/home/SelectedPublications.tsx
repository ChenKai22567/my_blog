'use client';

import { motion } from 'framer-motion';
import { Publication } from '@/types/publication';
import { useMessages } from '@/lib/i18n/useMessages';
import FormattedBibTeXText from '@/components/publications/FormattedBibTeXText';

interface SelectedPublicationsProps {
    publications: Publication[];
    title?: string;
}

export default function SelectedPublications({ publications, title }: SelectedPublicationsProps) {
    const messages = useMessages();
    const resolvedTitle = title || messages.home.selectedPublications;

    return (
        <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
        >
            <div className="mb-4">
                <h2 className="text-2xl font-serif font-bold text-primary">{resolvedTitle}</h2>
            </div>
            <div className="grid gap-4">
                {publications.map((pub, index) => (
                    <motion.article
                        key={pub.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.1 * index }}
                        className="bg-white dark:bg-neutral-900 p-4 rounded-xl shadow-sm border border-neutral-200 dark:border-neutral-800 hover:shadow-lg transition-all duration-200 hover:scale-[1.02]"
                    >
                        <div>
                            <div className="flex min-w-0 flex-grow flex-col">
                                <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between sm:gap-4 mb-[0.25rem]">
                                    <h3 className="text-lg font-semibold text-primary leading-tight">
                                        <FormattedBibTeXText nodes={pub.titleNodes} fallback={pub.title} />
                                    </h3>
                                    <span className="flex-shrink-0 text-sm text-neutral-500 font-medium tabular-nums">
                                        {pub.year}
                                    </span>
                                </div>

                                <p className="text-sm text-neutral-600 dark:text-neutral-500 mb-[0.25rem]">
                                    {pub.authors.map((author, idx) => (
                                        <span key={`${author.name}-${idx}`}>
                                            <span className={author.isCoAuthor ? 'underline underline-offset-4 decoration-current' : undefined}>
                                                {author.name}
                                            </span>
                                            {author.isCorresponding && (
                                                <sup className={`ml-0 ${author.isHighlighted ? 'text-accent' : 'text-neutral-600 dark:text-neutral-500'}`}>†</sup>
                                            )}
                                            {idx < pub.authors.length - 1 && ', '}
                                        </span>
                                    ))}
                                </p>

                                <p className="text-sm text-accent font-medium mb-[0.25rem]">
                                    {pub.journal || pub.conference}
                                </p>

                                {pub.description && (
                                    <p className="text-sm text-neutral-600 dark:text-neutral-500 leading-relaxed line-clamp-3">
                                        {pub.description}
                                    </p>
                                )}

                                {pub.tags && pub.tags.length > 0 && (
                                    <div className="flex flex-wrap gap-[0.7rem] mt-[0.3rem]">
                                        {pub.tags.map((tag) => (
                                            <span key={tag} className="text-xs text-neutral-500 bg-neutral-50 dark:bg-neutral-800/50 px-2 py-1 rounded border border-neutral-100 dark:border-neutral-800">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.article>
                ))}
            </div>
        </motion.section>
    );
}
