'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { ArrowTopRightOnSquareIcon, CheckIcon, ClipboardDocumentIcon, CodeBracketIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline';
import { CardPageConfig } from '@/types/page';

const markdownComponents = {
    p: ({ children }: React.ComponentProps<'p'>) => <p className="mb-[0.25rem] last:mb-0">{children}</p>,
    ul: ({ children }: React.ComponentProps<'ul'>) => <ul className="list-disc list-inside mb-3 space-y-1">{children}</ul>,
    ol: ({ children }: React.ComponentProps<'ol'>) => <ol className="list-decimal list-inside mb-3 space-y-1">{children}</ol>,
    li: ({ children }: React.ComponentProps<'li'>) => <li className="mb-1">{children}</li>,
    a: ({ ...props }) => (
        <a
            {...props}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent font-medium transition-all duration-200 rounded hover:bg-accent/10 hover:shadow-sm"
        />
    ),
    blockquote: ({ children }: React.ComponentProps<'blockquote'>) => (
        <blockquote className="border-l-4 border-accent/50 pl-4 italic my-4 text-neutral-600 dark:text-neutral-500">
            {children}
        </blockquote>
    ),
    strong: ({ children }: React.ComponentProps<'strong'>) => <strong className="font-semibold text-primary">{children}</strong>,
    em: ({ children }: React.ComponentProps<'em'>) => <em className="italic">{children}</em>,
    code: ({ children }: React.ComponentProps<'code'>) => (
        <code className="px-1.5 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-[0.95em]">{children}</code>
    ),
};

export default function CardPage({ config, embedded = false }: { config: CardPageConfig; embedded?: boolean }) {
    const [copyStates, setCopyStates] = useState<Record<string, 'copied' | 'error'>>({});
    const groups = config.groups?.length
        ? config.groups
        : [{ title: '', items: config.items || [] }];

    const copySkillPrompt = async (key: string, prompt: string) => {
        try {
            await navigator.clipboard.writeText(prompt);
            setCopyStates((current) => ({ ...current, [key]: 'copied' }));
        } catch {
            setCopyStates((current) => ({ ...current, [key]: 'error' }));
        }
        window.setTimeout(() => {
            setCopyStates((current) => {
                const next = { ...current };
                delete next[key];
                return next;
            });
        }, 2400);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
        >
            <div className={embedded ? "mb-4" : "mb-8"}>
                <h1 className={`${embedded ? "text-2xl" : "text-4xl"} font-serif font-bold text-primary mb-4`}>{config.title}</h1>
                {config.description && (
                    <div className={`${embedded ? "text-base" : "text-lg"} text-neutral-600 dark:text-neutral-500 max-w-2xl leading-relaxed`}>
                        <ReactMarkdown components={markdownComponents}>
                            {config.description}
                        </ReactMarkdown>
                    </div>
                )}
            </div>

            <div className={embedded ? "space-y-8" : "space-y-12"}>
                {groups.map((group, groupIndex) => (
                    <section key={`${group.title}-${groupIndex}`}>
                        {group.title && (
                            <div className={embedded ? "mb-4" : "mb-6"}>
                                <h2 className={`${embedded ? "text-xl" : "text-2xl"} font-serif font-bold text-primary`}>{group.title}</h2>
                                {group.description && (
                                    <div className="mt-2 max-w-2xl text-sm leading-relaxed text-neutral-600 dark:text-neutral-500">
                                        <ReactMarkdown components={markdownComponents}>{group.description}</ReactMarkdown>
                                    </div>
                                )}
                            </div>
                        )}
                        <div className={`grid ${embedded ? "gap-4" : "gap-6"}`}>
                {group.items.map((item, index) => (
                    <motion.div
                        key={`${group.title}-${item.title}-${index}`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.1 * index }}
                        className={`bg-white dark:bg-neutral-900 ${embedded ? "p-4" : "p-6"} rounded-xl shadow-sm border border-neutral-200 dark:border-neutral-800 hover:shadow-lg transition-all duration-200 hover:scale-[1.02]`}
                    >
                        <div className="flex flex-col md:flex-row gap-6">
                            {item.image && (
                                <div className="w-full md:w-48 flex-shrink-0">
                                    <div className="relative h-48 md:h-36 overflow-hidden rounded-lg bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-800">
                                        <Image
                                            src={item.image}
                                            alt={`${item.title} project preview`}
                                            fill
                                            sizes="(min-width: 768px) 192px, 100vw"
                                            className="object-contain"
                                            priority={embedded && groupIndex === 0 && index === 0}
                                        />
                                    </div>
                                </div>
                            )}

                            <div className="flex min-w-0 flex-grow flex-col">
                                <div className="flex flex-col gap-[0.35rem] sm:flex-row sm:items-start sm:justify-between sm:gap-4 mb-[0.45rem]">
                                    <h3 className={`${embedded ? "text-lg" : "text-xl"} font-semibold text-primary leading-tight`}>{item.title}</h3>
                                    {item.date && (
                                        <span className="flex-shrink-0 text-sm text-neutral-500 font-medium tabular-nums">
                                            {item.date}
                                        </span>
                                    )}
                                </div>
                                {item.subtitle && (
                                    <p className={`${embedded ? "text-sm" : "text-base"} text-accent font-medium mb-[0.25rem]`}>{item.subtitle}</p>
                                )}
                                {item.content && (
                                    <div className={`${embedded ? "text-sm" : "text-base"} text-neutral-600 dark:text-neutral-500 leading-relaxed`}>
                                        <ReactMarkdown components={markdownComponents}>
                                            {item.content}
                                        </ReactMarkdown>
                                    </div>
                                )}
                                {item.tags && (
                                    <div className="flex flex-wrap gap-x-[0.7rem] gap-y-[0.9rem] mt-[0.3rem]">
                                        {item.tags.map(tag => (
                                            <span key={tag} className="text-xs text-neutral-500 bg-neutral-50 dark:bg-neutral-800/50 px-2 py-1 rounded border border-neutral-100 dark:border-neutral-800">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                )}
                                {(item.link || item.repository || item.skill_prompt) && (
                                    <div className={`flex flex-wrap gap-[0.55rem] ${item.tags?.length ? "mt-[0.6rem]" : "mt-[0.3rem]"}`}>
                                        {item.link && (
                                            <a
                                                href={item.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center px-3 py-1 rounded-md text-xs font-medium bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-accent hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 transition-colors"
                                            >
                                                <ArrowTopRightOnSquareIcon className="h-3.5 w-3.5 mr-1.5" />
                                                {item.link_label || 'Visit project'}
                                            </a>
                                        )}
                                        {item.repository && (
                                            <a
                                                href={item.repository}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center px-3 py-1 rounded-md text-xs font-medium bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-accent hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 transition-colors"
                                            >
                                                <CodeBracketIcon className="h-3.5 w-3.5 mr-1.5" />
                                                {item.repository_label || 'Source code'}
                                            </a>
                                        )}
                                        {item.skill_prompt && (
                                            <button
                                                type="button"
                                                onClick={() => copySkillPrompt(`${item.title}-${index}`, item.skill_prompt || '')}
                                                className="inline-flex items-center px-3 py-1 rounded-md text-xs font-medium border border-accent/30 bg-accent/5 text-accent hover:bg-accent hover:text-white active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 transition-all duration-200"
                                                aria-live="polite"
                                            >
                                                {copyStates[`${item.title}-${index}`] === 'copied' ? (
                                                    <CheckIcon className="h-3.5 w-3.5 mr-1.5" />
                                                ) : copyStates[`${item.title}-${index}`] === 'error' ? (
                                                    <ExclamationCircleIcon className="h-3.5 w-3.5 mr-1.5" />
                                                ) : (
                                                    <ClipboardDocumentIcon className="h-3.5 w-3.5 mr-1.5" />
                                                )}
                                                {copyStates[`${item.title}-${index}`] === 'copied'
                                                    ? item.skill_copied_label || 'Prompt copied'
                                                    : copyStates[`${item.title}-${index}`] === 'error'
                                                        ? item.skill_error_label || 'Copy failed'
                                                        : item.skill_label || 'Weekly report Skill'}
                                            </button>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                ))}
                        </div>
                    </section>
                ))}
            </div>
        </motion.div>
    );
}
