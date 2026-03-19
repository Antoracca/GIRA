"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Globe, TrendingUp, Users } from "lucide-react";

const avantages = [
  { icon: Globe, titre: "Projets à fort impact", texte: "Vous travaillerez sur des projets stratégiques aux côtés de gouvernements, bailleurs et investisseurs internationaux." },
  { icon: TrendingUp, titre: "Développement accéléré", texte: "Mentorat par des profils seniors, exposition directe aux décideurs, missions variées en Afrique et à l'international." },
  { icon: Users, titre: "Réseau d'exception", texte: "Intégrez un réseau de 45+ experts de haut niveau issus de la diaspora africaine et des institutions internationales." },
];

const schema = z.object({
  nom: z.string().min(2, "Nom requis"),
  prenom: z.string().min(2, "Prénom requis"),
  email: z.string().email("Email invalide"),
  telephone: z.string().optional(),
  poste: z.string().min(1, "Veuillez sélectionner un poste"),
  message: z.string().min(20, "Message trop court (20 caractères min.)"),
});
type FormData = z.infer<typeof schema>;

export default function CarrieresContent() {
  const [submitted, setSubmitted] = useState(false);
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (_data: FormData) => {
    await new Promise((r) => setTimeout(r, 800));
    setSubmitted(true);
    reset();
  };

  return (
    <>
      {/* Section avantages */}
      <section className="py-20 md:py-28" style={{ backgroundColor: "#F5F5F0" }}>
        <div className="max-w-screen-2xl mx-auto px-6 md:px-12 lg:px-24">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-14 max-w-xl">
            <p className="text-xs uppercase tracking-widest mb-3 font-medium" style={{ color: "#C9A84C", fontFamily: "var(--font-inter)" }}>Pourquoi nous rejoindre ?</p>
            <h2 className="text-3xl md:text-4xl font-bold leading-tight" style={{ color: "#0D0D0D", fontFamily: "var(--font-montserrat)" }}>
              Rejoindre GIRA, c&apos;est choisir l&apos;impact
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {avantages.map((a, i) => {
              const Icon = a.icon;
              return (
                <motion.div
                  key={a.titre}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.12 }}
                  className="bg-white rounded-2xl p-8 shadow-sm border-l-4"
                  style={{ borderLeftColor: "#C9A84C" }}
                >
                  <div className="inline-flex items-center justify-center w-11 h-11 rounded-xl mb-5" style={{ backgroundColor: "rgba(201,168,76,0.1)" }}>
                    <Icon size={20} style={{ color: "#C9A84C" }} />
                  </div>
                  <h3 className="font-bold mb-2" style={{ color: "#0D0D0D", fontFamily: "var(--font-montserrat)" }}>{a.titre}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "#666666", fontFamily: "var(--font-inter)" }}>{a.texte}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Profils */}
      <section className="py-20 md:py-28" style={{ backgroundColor: "#1A1A2E" }}>
        <div className="max-w-screen-2xl mx-auto px-6 md:px-12 lg:px-24">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-14 max-w-xl">
            <p className="text-xs uppercase tracking-widest mb-3 font-medium" style={{ color: "#C9A84C", fontFamily: "var(--font-inter)" }}>Nos parcours</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight" style={{ fontFamily: "var(--font-montserrat)" }}>Deux profils recherchés</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                titre: "Consultant Généraliste",
                description: "Vous intervenez sur l'ensemble des problématiques du cabinet : structuration de projets, analyses sectorielles, préparation de supports pour les investisseurs, suivi de l'exécution.",
                competences: ["Solide culture économique et sectorielle", "Compétences en analyse, structuration et problem solving", "Connaissance pratique des projets de développement"],
              },
              {
                titre: "Project Manager & Expert",
                description: "Avec plusieurs années d'expérience, vous pilotez des projets complexes et coordonnez les parties prenantes : ministères, agences, bailleurs, partenaires privés.",
                competences: ["Gestion de projets complexes multi-acteurs", "Responsabilité des livrables, délais et qualité", "Coordination avec décideurs publics et privés"],
              },
            ].map((profil, i) => (
              <motion.div
                key={profil.titre}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="p-8 rounded-2xl border border-white/10"
                style={{ backgroundColor: "rgba(255,255,255,0.03)" }}
              >
                <h3 className="text-xl font-bold text-white mb-4" style={{ fontFamily: "var(--font-montserrat)" }}>{profil.titre}</h3>
                <p className="text-sm leading-relaxed mb-6" style={{ color: "#AAAAAA", fontFamily: "var(--font-inter)" }}>{profil.description}</p>
                <ul className="space-y-2">
                  {profil.competences.map((c) => (
                    <li key={c} className="flex items-start gap-2 text-sm" style={{ color: "#CCCCCC", fontFamily: "var(--font-inter)" }}>
                      <span style={{ color: "#C9A84C" }}>—</span> {c}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Formulaire candidature */}
      <section className="py-20 md:py-28" style={{ backgroundColor: "#F5F5F0" }}>
        <div className="max-w-screen-2xl mx-auto px-6 md:px-12 lg:px-24">
          <div className="max-w-2xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10">
              <p className="text-xs uppercase tracking-widest mb-3 font-medium" style={{ color: "#C9A84C", fontFamily: "var(--font-inter)" }}>Candidature</p>
              <h2 className="text-2xl md:text-3xl font-bold mb-2" style={{ color: "#0D0D0D", fontFamily: "var(--font-montserrat)" }}>Envoyer ma candidature</h2>
              <p className="text-sm" style={{ color: "#666666", fontFamily: "var(--font-inter)" }}>
                Joignez votre CV et lettre de motivation à{" "}
                <a href="mailto:recrutement@gira-cf.com" style={{ color: "#C9A84C" }}>recrutement@gira-cf.com</a>{" "}
                ou remplissez le formulaire ci-dessous.
              </p>
            </motion.div>

            {submitted ? (
              <div className="p-8 rounded-2xl border" style={{ borderColor: "rgba(201,168,76,0.3)", backgroundColor: "rgba(201,168,76,0.05)" }}>
                <p className="text-base font-medium mb-2" style={{ color: "#0D0D0D", fontFamily: "var(--font-montserrat)" }}>Candidature reçue !</p>
                <p className="text-sm" style={{ color: "#666666", fontFamily: "var(--font-inter)" }}>Notre équipe RH vous recontactera sous 5 jours ouvrés.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {[
                    { name: "nom" as const, label: "Nom *" },
                    { name: "prenom" as const, label: "Prénom *" },
                  ].map((f) => (
                    <div key={f.name}>
                      <label className="block text-xs mb-1 font-medium" style={{ color: "#444444", fontFamily: "var(--font-inter)" }}>{f.label}</label>
                      <input {...register(f.name)} className="w-full px-4 py-3 text-sm rounded-sm border outline-none" style={{ borderColor: "#E0E0E0", fontFamily: "var(--font-inter)", fontSize: "16px" }} />
                      {errors[f.name] && <p className="text-xs mt-1" style={{ color: "#dc2626" }}>{errors[f.name]?.message}</p>}
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs mb-1 font-medium" style={{ color: "#444444", fontFamily: "var(--font-inter)" }}>Email *</label>
                    <input {...register("email")} type="email" className="w-full px-4 py-3 text-sm rounded-sm border outline-none" style={{ borderColor: "#E0E0E0", fontFamily: "var(--font-inter)", fontSize: "16px" }} />
                    {errors.email && <p className="text-xs mt-1" style={{ color: "#dc2626" }}>{errors.email.message}</p>}
                  </div>
                  <div>
                    <label className="block text-xs mb-1 font-medium" style={{ color: "#444444", fontFamily: "var(--font-inter)" }}>Téléphone (optionnel)</label>
                    <input {...register("telephone")} type="tel" className="w-full px-4 py-3 text-sm rounded-sm border outline-none" style={{ borderColor: "#E0E0E0", fontFamily: "var(--font-inter)", fontSize: "16px" }} />
                  </div>
                </div>
                <div>
                  <label className="block text-xs mb-1 font-medium" style={{ color: "#444444", fontFamily: "var(--font-inter)" }}>Poste visé *</label>
                  <select {...register("poste")} className="w-full px-4 py-3 text-sm rounded-sm border outline-none" style={{ borderColor: "#E0E0E0", fontFamily: "var(--font-inter)", fontSize: "16px" }}>
                    <option value="">Sélectionner un profil</option>
                    <option value="consultant">Consultant Généraliste</option>
                    <option value="pm">Project Manager & Expert</option>
                    <option value="autre">Autre / Candidature spontanée</option>
                  </select>
                  {errors.poste && <p className="text-xs mt-1" style={{ color: "#dc2626" }}>{errors.poste.message}</p>}
                </div>
                <div>
                  <label className="block text-xs mb-1 font-medium" style={{ color: "#444444", fontFamily: "var(--font-inter)" }}>Message de motivation *</label>
                  <textarea {...register("message")} rows={5} className="w-full px-4 py-3 text-sm rounded-sm border outline-none resize-none" style={{ borderColor: "#E0E0E0", fontFamily: "var(--font-inter)", fontSize: "16px" }} />
                  {errors.message && <p className="text-xs mt-1" style={{ color: "#dc2626" }}>{errors.message.message}</p>}
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 text-sm font-semibold transition-all duration-200 disabled:opacity-60"
                  style={{ backgroundColor: "#C9A84C", color: "#0D0D0D", fontFamily: "var(--font-inter)" }}
                >
                  {isSubmitting ? "Envoi en cours..." : "Envoyer ma candidature"}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
