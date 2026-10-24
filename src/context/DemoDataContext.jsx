import React, { createContext, useContext, useState } from "react";

const DemoDataContext = createContext(null);

let idCounter = 1;
const nextId = () => idCounter++;

export function DemoDataProvider({ children }) {
  const [userName, setUserName] = useState("");
  const [isDemoActive, setIsDemoActive] = useState(false);

  const [symptoms, setSymptoms] = useState([]);
  const [moods, setMoods] = useState([]);
  const [cycleEntries, setCycleEntries] = useState([]);
  const [reminders, setReminders] = useState([
    { id: nextId(), title: "Drink water reminder", frequency: "Every 2 hours", active: true, kind: "wellness" },
    { id: nextId(), title: "Log today's mood", frequency: "Daily, evening", active: true, kind: "mood" },
  ]);
  const [vaultFiles, setVaultFiles] = useState([]);
  const [doctorSessions, setDoctorSessions] = useState([]);
  const [trustedContacts, setTrustedContacts] = useState([]);

  const addSymptom = (entry) => setSymptoms((s) => [{ id: nextId(), date: new Date().toISOString(), ...entry }, ...s]);
  const addMood = (entry) => setMoods((s) => [{ id: nextId(), date: new Date().toISOString(), ...entry }, ...s]);
  const addCycleEntry = (entry) => setCycleEntries((s) => [{ id: nextId(), date: new Date().toISOString(), ...entry }, ...s]);
  const toggleReminder = (id) =>
    setReminders((r) => r.map((item) => (item.id === id ? { ...item, active: !item.active } : item)));
  const addReminder = (entry) => setReminders((r) => [{ id: nextId(), active: true, ...entry }, ...r]);
  const addTrustedContact = (entry) => setTrustedContacts((c) => [{ id: nextId(), ...entry }, ...c]);
  const addDoctorSession = (entry) => setDoctorSessions((d) => [{ id: nextId(), date: new Date().toISOString(), ...entry }, ...d]);

  const startDemo = (name) => {
    setUserName(name || "Friend");
    setIsDemoActive(true);
  };

  const endDemo = () => {
    setIsDemoActive(false);
    setUserName("");
    setSymptoms([]);
    setMoods([]);
    setCycleEntries([]);
    setVaultFiles([]);
    setDoctorSessions([]);
    setTrustedContacts([]);
  };

  const value = {
    userName,
    isDemoActive,
    startDemo,
    endDemo,
    symptoms,
    addSymptom,
    moods,
    addMood,
    cycleEntries,
    addCycleEntry,
    reminders,
    toggleReminder,
    addReminder,
    vaultFiles,
    setVaultFiles,
    doctorSessions,
    addDoctorSession,
    trustedContacts,
    addTrustedContact,
  };

  return <DemoDataContext.Provider value={value}>{children}</DemoDataContext.Provider>;
}

export function useDemoData() {
  const ctx = useContext(DemoDataContext);
  if (!ctx) throw new Error("useDemoData must be used within DemoDataProvider");
  return ctx;
}
