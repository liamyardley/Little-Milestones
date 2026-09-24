import { STAGES, STAGE_MONTHS } from '../data/content';

export const fmtDate = iso => {
  if (!iso) return '';
  const d = new Date(iso + 'T00:00:00');
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
};

export const monthsSince = iso => {
  const d = new Date(iso + 'T00:00:00');
  const n = new Date();
  return (
    (n.getFullYear() - d.getFullYear()) * 12 +
    (n.getMonth() - d.getMonth()) +
    (n.getDate() - d.getDate()) / 30.4
  );
};

export const ageMonthsFor = profile => (profile ? monthsSince(profile.date) : 0);

export const ageLineFor = profile => {
  if (!profile) return '';
  const months = monthsSince(profile.date);
  if (profile.status === 'born') {
    const mo = Math.max(0, Math.floor(months));
    const label =
      mo < 1 ? 'Newborn'
        : mo < 24 ? `${mo} ${mo === 1 ? 'month' : 'months'}`
          : `${Math.floor(mo / 12)}y ${mo % 12}m`;
    return `${label} · born ${fmtDate(profile.date)}`;
  }
  // For an expected baby the stored date is the due date, so `months` is
  // negative until birth; 40 weeks minus the time still to go.
  const weeks = Math.round(40 + months * 4.35);
  return `${Math.min(42, Math.max(4, weeks))} weeks · due ${fmtDate(profile.date)}`;
};

export const currentStageFor = profile => {
  const months = ageMonthsFor(profile);
  if (profile && profile.status === 'expecting') return months < -3 ? 'p2' : 'p3';
  let id = 'm0';
  STAGES.forEach(st => {
    if (STAGE_MONTHS[st.id] <= months) id = st.id;
  });
  return id;
};

// "today", "last week", "in March" — how a logged result reads back later.
export const relativeWhen = iso => {
  if (!iso) return '';
  const then = new Date(iso);
  const days = Math.floor((Date.now() - then.getTime()) / 86400000);
  if (days <= 0) return 'today';
  if (days === 1) return 'yesterday';
  if (days < 7) return `${days} days ago`;
  if (days < 14) return 'last week';
  if (days < 60) return `${Math.round(days / 7)} weeks ago`;
  return then.toLocaleDateString('en-GB', { month: 'long' });
};
