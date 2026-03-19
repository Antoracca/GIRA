"use client";

import { motion } from "framer-motion";

const secteurs = [
  {
    label: "Eau",
    description: "Gestion intégrée des ressources en eau, accès à l'eau potable, hydraulique et assainissement.",
    image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=600&auto=format&fit=crop",
  },
  {
    label: "Santé",
    description: "Renforcement des systèmes de santé, hôpitaux, soins, digitalisation médicale.",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&auto=format&fit=crop",
  },
  {
    label: "Énergie",
    description: "Électrification, énergies renouvelables et optimisation des réseaux énergétiques.",
    image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=600&auto=format&fit=crop",
  },
  {
    label: "Agriculture",
    description: "Agro-industrie, chaînes de valeur, transformation locale et sécurité alimentaire.",
    image: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=600&auto=format&fit=crop",
  },
  {
    label: "Mines",
    description: "Gouvernance minière avec 45+ experts issus de ministères et institutions financières.",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&auto=format&fit=crop",
  },
  {
    label: "Construction",
    description: "Infrastructures publiques, équipements structurants, logements et génie civil.",
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=600&auto=format&fit=crop",
  },
  {
    label: "Technologies",
    description: "Digitalisation des services publics, télécom, solutions numériques à fort impact.",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&auto=format&fit=crop",
  },
  {
    label: "Transports",
    description: "Routes, aviation, transports urbains, tourisme et logistique pour l'intégration régionale.",
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=600&auto=format&fit=crop",
  },
];

export default function SecteursGrid() {
  return (
    <section className="py-20 md:py-32" style={{ backgroundColor: "#F5F5F0" }}>
      <div className="max-w-screen-2xl mx-auto px-6 md:px-12 lg:px-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {secteurs.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ delay: i * 0.07, duration: 0.5 }}
              whileHover={{ scale: 1.03 }}
              className="relative h-72 rounded-2xl overflow-hidden cursor-default group"
            >
              {/* Image */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={s.image}
                alt={`Secteur ${s.label}`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />

              {/* Default overlay */}
              <div
                className="absolute inset-0 transition-opacity duration-300 group-hover:opacity-70"
                style={{ background: "linear-gradient(to top, rgba(13,13,13,0.85) 0%, rgba(13,13,13,0.2) 60%, transparent 100%)" }}
              />

              {/* Default title (always visible) */}
              <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-0 transition-transform duration-300 group-hover:-translate-y-2">
                <h3
                  className="text-lg font-bold text-white"
                  style={{ fontFamily: "var(--font-montserrat)" }}
                >
                  {s.label}
                </h3>

                {/* Description revealed on hover */}
                <p
                  className="text-xs leading-relaxed mt-2 max-h-0 overflow-hidden opacity-0 transition-all duration-300 group-hover:max-h-20 group-hover:opacity-100"
                  style={{ color: "#E8D5A3", fontFamily: "var(--font-inter)" }}
                >
                  {s.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
