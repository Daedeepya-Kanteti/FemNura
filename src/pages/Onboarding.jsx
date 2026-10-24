import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, Sparkles, Info } from "lucide-react";
import Logo from "../components/Logo.jsx";
import { Button, Card } from "../components/UI.jsx";
import { useDemoData } from "../context/DemoDataContext.jsx";

const steps = ["welcome", "name", "focus", "ready"];

const focusOptions = [
  "Tracking symptoms & fatigue",
  "Understanding my cycle",
  "Emotional wellness",
  "Getting ready for doctor visits",
  "Organising medical records",
];

export default function Onboarding() {
  const [step, setStep] = useState(0);
  const [name, setName] = useState("");
  const [focus, setFocus] = useState([]);
  const navigate = useNavigate();
  const { startDemo } = useDemoData();

  const toggleFocus = (f) => setFocus((prev) => (prev.includes(f) ? prev.filter((x) => x !== f) : [...prev, f]));

  const finish = () => {
    startDemo(name.trim());
    navigate("/app");
  };

  return (
    <div className="min-h-screen bg-grad-hero flex flex-col items-center justify-center px-6 py-12">
      <div className="mb-10">
        <Logo size="lg" />
      </div>

      <Card className="w-full max-w-xl p-8 sm:p-10 relative overflow-hidden">
        <div className="flex gap-2 mb-8">
          {steps.map((s, i) => (
            <div key={s} className={`h-1.5 flex-1 rounded-full transition-colors ${i <= step ? "bg-plum-600" : "bg-plum-100"}`} />
          ))}
        </div>

        <AnimatePresence mode="wait">
          {step === 0 && (
            <motion.div key="welcome" {...slide}>
              <h1 className="font-display text-2xl sm:text-3xl font-semibold text-plum-800 mb-3">
                Welcome to FemNura
              </h1>
              <p className="text-plum-600 leading-relaxed mb-8">
                A private, calm space to track your health, understand your patterns, and feel prepared for every
                healthcare conversation. This quick setup takes under a minute.
              </p>
              <div className="rounded-2xl bg-lavender-50 border border-lavender-200 p-4 flex gap-3 text-sm text-plum-700 mb-8">
                <Info size={18} className="shrink-0 mt-0.5" />
                <p>
                  This is a live product demo. Your entries are kept only for this session so you can explore every
                  feature freely.
                </p>
              </div>
              <Button variant="primary" className="w-full justify-center" onClick={() => setStep(1)}>
                Begin <ArrowRight size={16} />
              </Button>
            </motion.div>
          )}

          {step === 1 && (
            <motion.div key="name" {...slide}>
              <h1 className="font-display text-2xl font-semibold text-plum-800 mb-3">What should we call you?</h1>
              <p className="text-plum-600 mb-6">We'll use this to personalise your dashboard and reminders.</p>
              <input
                autoFocus
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your first name"
                className="w-full rounded-xl border border-plum-200 px-4 py-3.5 text-plum-800 focus-ring mb-8 bg-ivory/60"
                onKeyDown={(e) => e.key === "Enter" && name.trim() && setStep(2)}
              />
              <StepNav onBack={() => setStep(0)} onNext={() => setStep(2)} nextDisabled={!name.trim()} />
            </motion.div>
          )}

          {step === 2 && (
            <motion.div key="focus" {...slide}>
              <h1 className="font-display text-2xl font-semibold text-plum-800 mb-3">What matters most to you right now?</h1>
              <p className="text-plum-600 mb-6">Choose as many as you like — this helps shape your dashboard.</p>
              <div className="flex flex-col gap-3 mb-8">
                {focusOptions.map((f) => (
                  <button
                    key={f}
                    onClick={() => toggleFocus(f)}
                    className={`text-left px-4 py-3.5 rounded-xl border font-medium text-sm transition-all focus-ring ${
                      focus.includes(f)
                        ? "bg-plum-700 text-white border-plum-700"
                        : "bg-white text-plum-700 border-plum-200 hover:border-plum-400"
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
              <StepNav onBack={() => setStep(1)} onNext={() => setStep(3)} />
            </motion.div>
          )}

          {step === 3 && (
            <motion.div key="ready" {...slide} className="text-center">
              <div className="w-16 h-16 rounded-full bg-sage-100 text-sage-700 flex items-center justify-center mx-auto mb-5">
                <Sparkles size={26} />
              </div>
              <h1 className="font-display text-2xl font-semibold text-plum-800 mb-3">
                You're all set, {name || "Friend"}.
              </h1>
              <p className="text-plum-600 mb-8 leading-relaxed">
                Your FemNura dashboard is ready. Remember — FemNura supports informed decisions but does not replace
                qualified healthcare professionals.
              </p>
              <Button variant="primary" className="w-full justify-center" onClick={finish}>
                Go to my dashboard <ArrowRight size={16} />
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>
    </div>
  );
}

function StepNav({ onBack, onNext, nextDisabled }) {
  return (
    <div className="flex items-center justify-between">
      <button onClick={onBack} className="text-plum-500 hover:text-plum-700 text-sm font-semibold flex items-center gap-1 focus-ring rounded-lg px-2 py-1">
        <ArrowLeft size={15} /> Back
      </button>
      <Button variant="primary" onClick={onNext} disabled={nextDisabled}>
        Continue <ArrowRight size={16} />
      </Button>
    </div>
  );
}

const slide = {
  initial: { opacity: 0, x: 24 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -24 },
  transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
};
