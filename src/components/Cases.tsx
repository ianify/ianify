import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const cases = [
    {
        title: "Hypera pharma",
        href: "https://www.hypera.com.br",
        description: "One of Brazil’s largest pharmaceutical companies, focused on the development, manufacturing, and commercialization of branded prescription drugs, consumer health (OTC) products, dermatology treatments, and generics.",
        image: "/case-hypera.svg",
    },
    {
        title: "Mantecorp Skincare",
        href: "https://www.mantecorpskincare.com.br",
        description: "A leading Brazilian dermocosmetics brand focused on developing high-efficacy, dermatologist-recommended products tailored to the specific needs of Brazilian skin.",
        image: "/case-mantecorp.svg",
    },
    {
        title: "Cocari - Digital Unit",
        href: "https://play.google.com/store/apps/details?id=br.com.cocari.produtor.app",
        description: "A digital platform serving more than 11,000 farmers, offering features such as commodity price quotes, financial transactions, and invoice issuance, enabling digital access to the cooperative’s services.",
        image: "/case-cocari.svg",
    },
    {
        title: "Áurea",
        href: "https://aurea.app",
        description: "A Brazilian educational platform, providing digital content and learning tools for undergraduate and postgraduate programs.",
        image: "/case-aurea.svg",
    },
    {
        title: "Smart Fit",
        href: "https://www.smartfit.com.br",
        description: "The largest fitness chain in Latin America, with more than 1,400 gyms across the region.",
        image: "/case-smartfit.svg",
    },
];

// Animation variants for the sliding effect
const variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 100 : -100,
    opacity: 0
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 100 : -100,
    opacity: 0
  })
};

export default function Cases() {
    // We track direction ([0] is index, [1] is direction: 1 for next, -1 for prev)
    const [[page, direction], setPage] = useState([0, 0]);

    const paginate = (newDirection: number) => {
        let nextIndex = page + newDirection;
        if (nextIndex < 0) nextIndex = cases.length - 1;
        if (nextIndex >= cases.length) nextIndex = 0;
        
        setPage([nextIndex, newDirection]);
    };

    const { title, href, description, image } = cases[page];

    return (
        <section className="relative w-full mx-auto p-4 overflow-hidden">
            {/* AnimatePresence allows components to animate out when they're removed from the DOM.
                The 'custom' prop passes the direction to our variants.
            */}
            <AnimatePresence initial={false} custom={direction} mode="wait">
                <motion.div
                    key={page} // Key change triggers the animation
                    custom={direction}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                        x: { type: "spring", stiffness: 300, damping: 30 },
                        opacity: { duration: 0.2 }
                    }}
                    className="flex flex-col items-center md:flex-row gap-8"
                >
                    {/* Image Section */}
                    <div className="flex-[2] w-full rounded-lg shadow-xl overflow-hidden">
                        <img src={image} alt={title} className="w-full h-[300px] object-cover" />
                    </div>

                    {/* Content Section */}
                    <div className="flex-1 flex flex-col gap-4">
                        <h3 className="text-2xl font-bold">{title}</h3>
                        <a href={href} className="text-accent underline" target="_blank" rel="noreferrer">Visit the website</a>
                        <p className="text-gray-600">{description.substring(0,100)}...</p>
                        
                        <div className="flex gap-4 mt-4 justify-center md:justify-start">
                            <button onClick={() => paginate(-1)} className="px-4 py-2 bg-gray-200 rounded-xs">Prev</button>
                            <button onClick={() => paginate(1)} className="px-4 py-2 bg-black text-white rounded-xs">Next</button>
                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>

            {/* Dots */}
            <div className="flex justify-center gap-2 mt-8">
                {cases.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setPage([index, index > page ? 1 : -1])}
                        className={`h-2 transition-all rounded-full ${index === page ? "bg-black w-6" : "bg-gray-300 w-2"}`}
                    />
                ))}
            </div>
        </section>
    );
}