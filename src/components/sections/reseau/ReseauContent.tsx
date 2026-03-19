"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { User } from "lucide-react";
import { GIRA } from "@/lib/constants";

const secteurs = ["Tous", "Finance", "Énergie", "Santé", "Agriculture", "Technologies & Télécoms", "Mines"];

const schema = z.object({
  nom: z.string().min(2, "Nom requis"),
  email: z.string().email("Email invalide"),
  expertise: z.string().min(3, "Expertise requise"),
});
type FormData = z.infer<typeof schema>;

export default function ReseauContent() {
  const [filtre, setFiltre] = useState("Tous");
  const [submitted, setSubmitted] = useState(false);

  const experts = filtre === "Tous"
    ? GIRA.experts
    : GIRA.experts.filter((e) => e.secteur === filtre);

  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (_data: FormData) => {
    setSubmitted(true);
    reset();
  };

  return (
    <>
      {/* Intro éditoriale */}
      <section className="py-20 md:py-28" style={{ backgroundColor: "#1A1A2E" }}>
        <div className="max-w-screen-2xl mx-auto px-6 md:px-12 lg:px-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <p className="text-xs uppercase tracking-widest mb-3 font-medium" style={{ color: "#C9A84C", fontFamily: "var(--font-inter)" }}>Un capital humain d&apos;exception</p>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6" style={{ fontFamily: "var(--font-montserrat)" }}>
                La diaspora, acteur stratégique du développement
              </h2>
              <p className="text-base leading-relaxed mb-4" style={{ color: "#AAAAAA", fontFamily: "var(--font-inter)" }}>
                GIRA s&apos;appuie sur un réseau de professionnels de haut niveau issus de la diaspora africaine, ainsi que sur des experts internationaux évoluant dans des secteurs variés : agro-industrie, finance, infrastructure, énergie, santé, technologies, IA, aéronautique et diplomatie.
              </p>
              <p className="text-base leading-relaxed" style={{ color: "#AAAAAA", fontFamily: "var(--font-inter)" }}>
                Nous considérons la diaspora comme un acteur stratégique du développement : expertise technique de rang international, connaissance fine des réalités locales, et capacité à faire le lien entre les pays d&apos;origine et les centres de décision internationaux.
              </p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.15 }}>
              {[
                "Expertise technique et sectorielle de rang international.",
                "Connaissance fine des réalités locales et des enjeux politiques, économiques et sociaux.",
                "Capacité à faire le lien entre les pays d'origine et les centres de décision internationaux.",
                "Structure et animation du réseau vers des projets concrets alignés sur les priorités des États.",
              ].map((b, i) => (
                <div key={i} className="flex items-start gap-4 mb-5">
                  <span className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-xs font-bold" style={{ backgroundColor: "rgba(201,168,76,0.2)", color: "#C9A84C" }}>{i + 1}</span>
                  <p className="text-sm leading-relaxed" style={{ color: "#CCCCCC", fontFamily: "var(--font-inter)" }}>{b}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Grille experts */}
      <section className="py-20 md:py-28" style={{ backgroundColor: "#F5F5F0" }}>
        <div className="max-w-screen-2xl mx-auto px-6 md:px-12 lg:px-24">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-6" style={{ color: "#0D0D0D", fontFamily: "var(--font-montserrat)" }}>Quelques-uns de nos experts</h2>
            {/* Filtres */}
            <div className="flex flex-wrap gap-2">
              {secteurs.map((s) => (
                <button
                  key={s}
                  onClick={() => setFiltre(s)}
                  className="px-4 py-2 text-xs font-medium transition-all duration-200 rounded-sm"
                  style={{
                    fontFamily: "var(--font-inter)",
                    backgroundColor: filtre === s ? "#C9A84C" : "white",
                    color: filtre === s ? "#0D0D0D" : "#666666",
                    border: filtre === s ? "1px solid #C9A84C" : "1px solid #E0E0E0",
                  }}
                >
                  {s}
                </button>
              ))}
            </div>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {experts.map((expert, i) => (
              <motion.div
                key={expert.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-white rounded-2xl p-6 shadow-sm"
              >
                <div className="w-12 h-12 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: "rgba(201,168,76,0.12)" }}>
                  <User size={20} style={{ color: "#C9A84C" }} />
                </div>
                <h3 className="font-bold text-sm mb-0.5" style={{ color: "#0D0D0D", fontFamily: "var(--font-montserrat)" }}>{expert.nom}</h3>
                <p className="text-xs mb-1" style={{ color: "#C9A84C", fontFamily: "var(--font-inter)" }}>{expert.pays}</p>
                <p className="text-xs font-medium mb-3" style={{ color: "#888888", fontFamily: "var(--font-inter)" }}>{expert.domaine}</p>
                <p className="text-xs leading-relaxed" style={{ color: "#666666", fontFamily: "var(--font-inter)" }}>{expert.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Formulaire rejoindre le réseau */}
      <section className="py-20 md:py-28" style={{ backgroundColor: "#0D0D0D" }}>
        <div className="max-w-screen-2xl mx-auto px-6 md:px-12 lg:px-24">
          <div className="max-w-lg mx-auto text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <p className="text-xs uppercase tracking-widest mb-3 font-medium" style={{ color: "#C9A84C", fontFamily: "var(--font-inter)" }}>Rejoindre le réseau</p>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4" style={{ fontFamily: "var(--font-montserrat)" }}>
                Vous êtes expert et souhaitez rejoindre le réseau GIRA ?
              </h2>
              <p className="text-sm mb-8" style={{ color: "#888888", fontFamily: "var(--font-inter)" }}>
                Partagez votre profil avec nous et notre équipe vous contactera.
              </p>

              {submitted ? (
                <div className="p-6 rounded-2xl border" style={{ borderColor: "rgba(201,168,76,0.3)", backgroundColor: "rgba(201,168,76,0.08)" }}>
                  <p className="text-sm font-medium" style={{ color: "#C9A84C", fontFamily: "var(--font-inter)" }}>
                    Merci ! Votre demande a été envoyée. Notre équipe vous contactera prochainement.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-left">
                  {[
                    { name: "nom" as const, label: "Nom complet", type: "text" },
                    { name: "email" as const, label: "Email professionnel", type: "email" },
                    { name: "expertise" as const, label: "Domaine d'expertise", type: "text" },
                  ].map((field) => (
                    <div key={field.name}>
                      <label className="block text-xs mb-1 font-medium" style={{ color: "#AAAAAA", fontFamily: "var(--font-inter)" }}>{field.label}</label>
                      <input
                        {...register(field.name)}
                        type={field.type}
                        className="w-full px-4 py-3 text-sm rounded-sm outline-none"
                        style={{ backgroundColor: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "white", fontFamily: "var(--font-inter)", fontSize: "16px" }}
                      />
                      {errors[field.name] && (
                        <p className="text-xs mt-1" style={{ color: "#ff6b6b", fontFamily: "var(--font-inter)" }}>{errors[field.name]?.message}</p>
                      )}
                    </div>
                  ))}
                  <button
                    type="submit"
                    className="w-full py-3 text-sm font-semibold transition-all duration-200"
                    style={{ backgroundColor: "#C9A84C", color: "#0D0D0D", fontFamily: "var(--font-inter)" }}
                  >
                    Rejoindre le réseau
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
