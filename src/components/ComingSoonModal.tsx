import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@nanostores/react';
import { $lang } from '../store';
import { t } from '../i18n';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const M = motion as any;

interface ComingSoonModalProps {
    isOpen: boolean;
    onClose: () => void;
    type?: 'apple' | 'google';
}

export default function ComingSoonModal({ isOpen, onClose, type = 'apple' }: ComingSoonModalProps) {
    useStore($lang);

    return (
        <AnimatePresence>
            {isOpen && (
                <React.Fragment>
                    {/* Backdrop */}
                    <M.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-md z-[9998]"
                    />

                    {/* Modal Container */}
                    <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-[9999] px-4">
                        <M.div
                            initial={{ opacity: 0, scale: 0.95, y: 15 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 15 }}
                            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                            className="w-full max-w-[340px] bg-gradient-to-b from-[#1a0b2e] to-[#0b0416] border border-[#8427e0]/30 rounded-[28px] p-8 shadow-[0_0_40px_rgba(132,39,224,0.15)] relative pointer-events-auto flex flex-col items-center text-center"
                        >
                            {/* Close Button */}
                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors bg-white/5 p-1.5 rounded-full"
                                aria-label="Close modal"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                            </button>

                            {/* Icon Container with Glow */}
                            <div className="mt-2 mb-6 relative">
                                <div className="absolute inset-0 bg-[#8427e0] blur-[24px] opacity-20 rounded-full"></div>
                                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 flex items-center justify-center relative z-10 shadow-xl">
                                    {type === 'apple' ? (
                                        <svg viewBox="0 0 814 1000" className="w-9 h-9 fill-white drop-shadow-md" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76 0-103.7 40.8-165.9 40.8s-105-57.8-155.5-127.4C46 790.7 0 663 0 541.8c0-207.5 135.4-317.3 269-317.3 70.1 0 128.4 46.4 172.5 46.4 42.8 0 109.6-49 192.5-49 30.9 0 111.2 2.6 168.7 98.3zm-234-181.5c31.1-36.9 53.1-88.1 53.1-139.3 0-7.1-.6-14.3-1.9-20.1-50.6 1.9-110.8 33.7-147.1 75.8-28.5 32.4-55.1 83.6-55.1 135.5 0 7.8 1.3 15.6 1.9 18.1 3.2.6 8.4 1.3 13.6 1.3 45.4 0 102.5-30.4 135.5-71.3z"/>
                                        </svg>
                                    ) : (
                                        <svg viewBox="0 0 512 512" className="w-8 h-8 fill-white drop-shadow-md ml-1" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c17.4-9.7 17.4-34.9-.2-44.8l-1-.9zM104.6 499l280.8-161.2-60.1-60.1L104.6 499z"/>
                                        </svg>
                                    )}
                                </div>
                            </div>

                            {/* Title */}
                            <h2 className="text-[24px] font-bold text-white mb-3 tracking-tight">
                                {t('comingsoon.title') || 'Coming Soon!'}
                            </h2>

                            {/* Description */}
                            <p className="text-[15px] text-gray-300/90 leading-relaxed mb-8 px-1">
                                {type === 'apple' ? t('comingsoon.ios.desc') : t('comingsoon.android.desc')}
                                <br />
                                <span className="text-[#a54fd4] font-medium mt-2 block">{t('comingsoon.stay_tuned') || 'Stay tuned!'}</span>
                            </p>

                            {/* Action Button */}
                            <button
                                onClick={onClose}
                                className="w-full py-3.5 bg-gradient-to-r from-[#8b24c7] via-[#a54fd4] to-[#8b24c7] bg-[length:200%_auto] text-white font-bold text-[15px] rounded-[16px] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-[0_0_20px_rgba(165,79,212,0.3)] hover:shadow-[0_0_30px_rgba(165,79,212,0.5)]"
                            >
                                {t('comingsoon.button') || 'Got it'}
                            </button>
                        </M.div>
                    </div>
                </React.Fragment>
            )}
        </AnimatePresence>
    );
}
