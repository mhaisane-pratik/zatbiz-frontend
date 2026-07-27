'use client';

import React, { useState } from 'react';
import { MEDICAL_NICHES, getNiche } from '@/components/preview/medical/medicalNiches';
import { PreviewBar } from '@/components/preview/medical/_shared';
import MedicalNicheSelector from '@/components/preview/medical/MedicalNicheSelector';
import MedicalLogin from '@/components/preview/medical/MedicalLogin';
import RetailLanding from '@/components/preview/medical/landings/RetailLanding';
import AyurvedicLanding from '@/components/preview/medical/landings/AyurvedicLanding';
import SurgicalLanding from '@/components/preview/medical/landings/SurgicalLanding';
import PediatricLanding from '@/components/preview/medical/landings/PediatricLanding';
import WellnessLanding from '@/components/preview/medical/landings/WellnessLanding';

type View = 'selector' | 'landing' | 'login';

const LANDINGS: Record<string, React.ComponentType<{ onLogin: () => void }>> = {
  retail: RetailLanding,
  ayurvedic: AyurvedicLanding,
  surgical: SurgicalLanding,
  pediatric: PediatricLanding,
  wellness: WellnessLanding,
};

export default function MedicalPreviewPage() {
  const [view, setView] = useState<View>('selector');
  const [nicheId, setNicheId] = useState<string>(MEDICAL_NICHES[0].id);
  const niche = getNiche(nicheId);

  if (view === 'selector') {
    return (
      <MedicalNicheSelector
        onSelect={(id) => {
          setNicheId(id);
          setView('landing');
          window.scrollTo({ top: 0 });
        }}
      />
    );
  }

  if (view === 'login') {
    return (
      <div>
        <PreviewBar
          nicheName={niche.name}
          accent={niche.accent}
          onBack={() => setView('selector')}
          right={
            <button
              onClick={() => { setView('landing'); window.scrollTo({ top: 0 }); }}
              className="rounded-full bg-white/10 px-3 py-1.5 text-xs font-bold text-white transition hover:bg-white/20"
            >
              View storefront
            </button>
          }
        />
        <MedicalLogin niche={niche} onBack={() => setView('landing')} />
      </div>
    );
  }

  // landing
  const Landing = LANDINGS[nicheId] || RetailLanding;
  return (
    <div>
      <PreviewBar
        nicheName={niche.name}
        accent={niche.accent}
        onBack={() => setView('selector')}
        right={
          <button
            onClick={() => { setView('login'); window.scrollTo({ top: 0 }); }}
            className="rounded-full px-4 py-1.5 text-xs font-black text-white transition hover:opacity-90"
            style={{ backgroundColor: niche.accent }}
          >
            View login page
          </button>
        }
      />
      <Landing onLogin={() => { setView('login'); window.scrollTo({ top: 0 }); }} />
    </div>
  );
}
