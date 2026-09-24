import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import {
  emptyState, loadState, saveState, clearState, importPhoto, removePhoto,
} from './lib/storage';

const ThreadContext = createContext(null);

const daysAgo = n => new Date(Date.now() - n * 86400000).toISOString();

// The tour data from the design, so "have a look around" shows a lived-in thread.
const SAMPLE = () => {
  const dob = new Date();
  dob.setMonth(dob.getMonth() - 14);
  return {
    ...emptyState(),
    profile: { name: 'Marlowe', gender: 'girl', status: 'born', date: dob.toISOString().slice(0, 10) },
    sample: true,
    progress: {
      p2a: 2, p2b: 3, p3a: 2, p3b: 1, m0a: 2, m0b: 3, m0c: 2, m1a: 3, m1b: 3, m1c: 3,
      m2a: 3, m2b: 2, m3a: 2, m3b: 3, m3c: 3, m4a: 3, m4b: 3, m5a: 2, m5b: 2, m5c: 3,
      m6a: 3, m6b: 3, m7a: 4, m7b: 3, m8a: 3, m8b: 3, m8c: 1, m9a: 2, m9b: 4, m9c: 3,
      m10a: 3, m10b: 2, m11a: 3, m11b: 3, m11c: 2, m12a: 2, m12b: 1, m12c: 2, m12d: 1,
    },
    results: {
      m9x: { o: 'loved', note: 'Followed my finger to the window — every time.', at: daysAgo(9) },
      m7x: { o: 'nearly', note: 'Found it under one cup, gave up on two.', at: daysAgo(34) },
      m8x: { o: 'loved', note: 'Went straight back to cloth A. Textbook.', at: daysAgo(96) },
    },
    notes: { m12a: 'Straight for the dog bowl.' },
  };
};

export const ThreadProvider = ({ children }) => {
  const [ready, setReady] = useState(false);
  const [state, setState] = useState(emptyState);
  const [celebrate, setCelebrate] = useState(null);

  useEffect(() => {
    loadState().then(s => {
      setState(s);
      setReady(true);
    });
  }, []);

  // Persist on every change once the first load has landed, so nothing is
  // lost to a swipe-away.
  useEffect(() => {
    if (!ready) return;
    saveState(state);
  }, [ready, state]);

  const patch = useCallback(fn => {
    setState(prev => fn(prev));
  }, []);

  const setLevel = useCallback((milestone, index) => {
    patch(prev => {
      const cur = prev.progress[milestone.id] || 0;
      const next = cur === index + 1 ? index : index + 1;
      if (prev.settings.celebrations && next === milestone.lv.length && cur !== next) {
        const first = (prev.profile?.name || 'They').split(' ')[0];
        setTimeout(
          () => setCelebrate({
            kicker: 'Milestone complete',
            title: milestone.t,
            blurb: `${first} can do it on their own now — logged to the thread.`,
          }),
          160,
        );
      }
      return { ...prev, progress: { ...prev.progress, [milestone.id]: next } };
    });
  }, [patch]);

  const setResult = useCallback((activity, outcomeId) => {
    patch(prev => {
      const results = { ...prev.results };
      const cur = results[activity.id];
      if (cur && cur.o === outcomeId) delete results[activity.id];
      else results[activity.id] = { o: outcomeId, note: cur ? cur.note : '', at: new Date().toISOString() };
      return { ...prev, results };
    });
  }, [patch]);

  const setResultNote = useCallback((activityId, note) => {
    patch(prev => {
      const cur = prev.results[activityId];
      return {
        ...prev,
        results: {
          ...prev.results,
          [activityId]: { o: cur?.o || 'loved', at: cur?.at || new Date().toISOString(), ...cur, note },
        },
      };
    });
  }, [patch]);

  const setNote = useCallback((milestoneId, note) => {
    patch(prev => ({ ...prev, notes: { ...prev.notes, [milestoneId]: note } }));
  }, [patch]);

  const addPhoto = useCallback(async (milestoneId, uri) => {
    const record = await importPhoto(milestoneId, uri);
    patch(prev => {
      removePhoto(prev.photos[milestoneId]);
      return { ...prev, photos: { ...prev.photos, [milestoneId]: record } };
    });
  }, [patch]);

  const clearPhoto = useCallback(milestoneId => {
    patch(prev => {
      const photos = { ...prev.photos };
      removePhoto(photos[milestoneId]);
      delete photos[milestoneId];
      return { ...prev, photos };
    });
  }, [patch]);

  const saveProfile = useCallback(draft => {
    patch(prev => ({
      ...prev,
      sample: false,
      profile: {
        name: draft.name.trim(),
        status: draft.status,
        date: draft.date,
        gender: draft.gender,
      },
    }));
  }, [patch]);

  const setSetting = useCallback((key, value) => {
    patch(prev => ({ ...prev, settings: { ...prev.settings, [key]: value } }));
  }, [patch]);

  const loadSample = useCallback(() => setState(SAMPLE()), []);

  const replaceState = useCallback(next => {
    setState({ ...emptyState(), ...next, sample: false });
  }, []);

  const resetAll = useCallback(async () => {
    await clearState();
    setState(emptyState());
  }, []);

  const value = useMemo(() => ({
    ready, state, celebrate, setCelebrate,
    setLevel, setResult, setResultNote, setNote,
    addPhoto, clearPhoto, saveProfile, setSetting,
    loadSample, replaceState, resetAll,
  }), [ready, state, celebrate, setLevel, setResult, setResultNote, setNote,
    addPhoto, clearPhoto, saveProfile, setSetting, loadSample, replaceState, resetAll]);

  return <ThreadContext.Provider value={value}>{children}</ThreadContext.Provider>;
};

export const useThread = () => {
  const ctx = useContext(ThreadContext);
  if (!ctx) throw new Error('useThread must be used inside <ThreadProvider>');
  return ctx;
};
