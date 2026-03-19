"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { MapPin, Mail, Phone } from "lucide-react";
import { GIRA } from "@/lib/constants";

const schema = z.object({
  nom: z.string().min(2, "Nom requis"),
  prenom: z.string().min(2, "Prénom requis"),
  organisation: z.string().min(1, "Organisation requise"),
  fonction: z.string().min(1, "Fonction requise"),
  pays: z.string().min(1, "Pays requis"),
  email: z.string().email("Email invalide"),
  telephone: z.string().optional(),
  typeDemande: z.string().min(1, "Type de demande requis"),
  message: z.string().min(20, "Message trop court (20 caractères min.)"),
  rgpd: z.boolean().refine((v) => v === true, "Vous devez accepter la politique RGPD"),
  honeypot: z.string().max(0),
});
type FormData = z.infer<typeof schema>;

export default function ContactContent() {
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState("");

  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { honeypot: "" },
  });

  const onSubmit = async (data: FormData) => {
    setServerError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) {
        setServerError(json.error || "Une erreur est survenue.");
        return;
      }
      setSubmitted(true);
      reset();
    } catch {
      setServerError("Erreur réseau. Vérifiez votre connexion et réessayez.");
    }
  };

  const inputClass = "w-full px-4 py-3 text-sm rounded-sm border border-neutral-200 outline-none focus:border-[#C9A84C] transition-colors duration-200";
  const inputStyle = { fontFamily: "var(--font-inter)", fontSize: "16px", backgroundColor: "white" };
  const labelStyle = { color: "#444444", fontFamily: "var(--font-inter)" };
  const errorStyle = { color: "#dc2626", fontFamily: "var(--font-inter)" };

  return (
    <section className="py-20 md:py-32" style={{ backgroundColor: "#F5F5F0" }}>
      <div className="max-w-screen-2xl mx-auto px-6 md:px-12 lg:px-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Formulaire — col 7 */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7"
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-2" style={{ color: "#0D0D0D", fontFamily: "var(--font-montserrat)" }}>
              Écrivez-nous
            </h2>
            <p className="text-sm mb-8" style={{ color: "#666666", fontFamily: "var(--font-inter)" }}>
              Remplissez le formulaire ci-dessous. Notre équipe vous répondra dans les meilleurs délais.
            </p>

            {submitted ? (
              <div className="p-8 rounded-2xl border bg-white shadow-sm" style={{ borderColor: "rgba(201,168,76,0.3)" }}>
                <p className="text-base font-bold mb-2" style={{ color: "#0D0D0D", fontFamily: "var(--font-montserrat)" }}>
                  Requête sécurisée avec succès.
                </p>
                <p className="text-sm" style={{ color: "#666666", fontFamily: "var(--font-inter)" }}>
                  Nos associés ont bien reçu vos informations. Nous reviendrons vers vous sous 24h avec une première analyse de votre dossier.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
                {/* Honeypot invisible */}
                <input {...register("honeypot")} type="text" tabIndex={-1} aria-hidden="true" className="sr-only" />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {[
                    { name: "nom" as const, label: "Nom *" },
                    { name: "prenom" as const, label: "Prénom *" },
                  ].map((f) => (
                    <div key={f.name}>
                      <label className="block text-xs mb-1 font-medium" style={labelStyle}>{f.label}</label>
                      <input {...register(f.name)} className={inputClass} style={inputStyle} />
                      {errors[f.name] && <p className="text-xs mt-1" style={errorStyle}>{errors[f.name]?.message}</p>}
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs mb-1 font-medium" style={labelStyle}>Organisation *</label>
                    <input {...register("organisation")} className={inputClass} style={inputStyle} />
                    {errors.organisation && <p className="text-xs mt-1" style={errorStyle}>{errors.organisation.message}</p>}
                  </div>
                  <div>
                    <label className="block text-xs mb-1 font-medium" style={labelStyle}>Fonction *</label>
                    <input {...register("fonction")} className={inputClass} style={inputStyle} />
                    {errors.fonction && <p className="text-xs mt-1" style={errorStyle}>{errors.fonction.message}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs mb-1 font-medium" style={labelStyle}>Pays *</label>
                    <input {...register("pays")} className={inputClass} style={inputStyle} />
                    {errors.pays && <p className="text-xs mt-1" style={errorStyle}>{errors.pays.message}</p>}
                  </div>
                  <div>
                    <label className="block text-xs mb-1 font-medium" style={labelStyle}>Email *</label>
                    <input {...register("email")} type="email" className={inputClass} style={inputStyle} />
                    {errors.email && <p className="text-xs mt-1" style={errorStyle}>{errors.email.message}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs mb-1 font-medium" style={labelStyle}>Téléphone (optionnel)</label>
                    <input {...register("telephone")} type="tel" className={inputClass} style={inputStyle} />
                  </div>
                  <div>
                    <label className="block text-xs mb-1 font-medium" style={labelStyle}>Type de demande *</label>
                    <select {...register("typeDemande")} className={inputClass} style={inputStyle}>
                      <option value="">Sélectionner...</option>
                      <option value="Gouvernement">Gouvernement</option>
                      <option value="Investisseur">Investisseur</option>
                      <option value="Institution">Institution</option>
                      <option value="Entreprise">Entreprise</option>
                      <option value="ONG">ONG</option>
                      <option value="Autre">Autre</option>
                    </select>
                    {errors.typeDemande && <p className="text-xs mt-1" style={errorStyle}>{errors.typeDemande.message}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-xs mb-1 font-medium" style={labelStyle}>Message *</label>
                  <textarea {...register("message")} rows={5} className={inputClass} style={{ ...inputStyle, resize: "none" }} />
                  {errors.message && <p className="text-xs mt-1" style={errorStyle}>{errors.message.message}</p>}
                </div>

                {/* RGPD */}
                <div className="flex items-start gap-3">
                  <input
                    {...register("rgpd")}
                    type="checkbox"
                    id="rgpd"
                    className="mt-0.5 w-4 h-4 shrink-0"
                    style={{ accentColor: "#C9A84C" }}
                  />
                  <label htmlFor="rgpd" className="text-xs leading-relaxed" style={{ color: "#666666", fontFamily: "var(--font-inter)" }}>
                    J&apos;accepte que GIRA traite mes données personnelles pour répondre à ma demande, conformément à la{" "}
                    <a href="/politique-confidentialite" style={{ color: "#C9A84C" }}>politique de confidentialité</a>. *
                  </label>
                </div>
                {errors.rgpd && <p className="text-xs" style={errorStyle}>{errors.rgpd.message}</p>}

                {serverError && (
                  <p className="text-sm p-3 rounded-sm" style={{ backgroundColor: "rgba(220,38,38,0.08)", color: "#dc2626", fontFamily: "var(--font-inter)" }}>
                    {serverError}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 text-sm font-semibold transition-all duration-200 disabled:opacity-60"
                  style={{ backgroundColor: "#C9A84C", color: "#0D0D0D", fontFamily: "var(--font-inter)" }}
                >
                  {isSubmitting ? "Sécurisation de la requête..." : "Initier un mandat"}
                </button>
              </form>
            )}
          </motion.div>

          {/* Coordonnées — col 5 */}
          <motion.aside
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="lg:col-span-5"
          >
            <div className="bg-white rounded-2xl p-8 shadow-sm mb-8">
              <h3 className="text-lg font-bold mb-6" style={{ color: "#0D0D0D", fontFamily: "var(--font-montserrat)" }}>
                Nos coordonnées
              </h3>

              <div className="space-y-5">
                <div className="flex items-start gap-3">
                  <MapPin size={18} className="mt-0.5 shrink-0" style={{ color: "#C9A84C" }} />
                  <div>
                    <p className="text-sm font-semibold mb-0.5" style={{ color: "#0D0D0D", fontFamily: "var(--font-inter)" }}>Siège social</p>
                    <p className="text-sm" style={{ color: "#666666", fontFamily: "var(--font-inter)" }}>
                      GIRA — 128, rue de la Boétie<br />75008 Paris — France
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail size={18} className="mt-0.5 shrink-0" style={{ color: "#C9A84C" }} />
                  <div>
                    <p className="text-sm font-semibold mb-0.5" style={{ color: "#0D0D0D", fontFamily: "var(--font-inter)" }}>Email</p>
                    <a href={`mailto:${GIRA.email}`} className="text-sm" style={{ color: "#C9A84C", fontFamily: "var(--font-inter)" }}>
                      {GIRA.email}
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone size={18} className="mt-0.5 shrink-0" style={{ color: "#C9A84C" }} />
                  <div>
                    <p className="text-sm font-semibold mb-0.5" style={{ color: "#0D0D0D", fontFamily: "var(--font-inter)" }}>Recrutement</p>
                    <a href={`mailto:${GIRA.emailRecrut}`} className="text-sm" style={{ color: "#C9A84C", fontFamily: "var(--font-inter)" }}>
                      {GIRA.emailRecrut}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Google Maps embed */}
            <div className="rounded-2xl overflow-hidden shadow-sm">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.4551!2d2.3068!3d48.8736!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66f9c9e4b1a01%3A0x1!2s128+Rue+de+la+Bo%C3%A9tie%2C+75008+Paris!5e0!3m2!1sfr!2sfr!4v1"
                width="100%"
                height="250"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="GIRA — 128 rue de la Boétie, Paris"
              />
            </div>
          </motion.aside>
        </div>
      </div>
    </section>
  );
}
