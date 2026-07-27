'use client';

import React from 'react';
import { CorpView, ArrowIcon } from './_shared';
import * as Executive from './templates/consulting/executive';
import * as Boardroom from './templates/consulting/boardroom';
import * as Advisory from './templates/consulting/advisory';
import * as Growth from './templates/consulting/growth';

type ViewProps = { accent: string; onView: (v: CorpView) => void };

export interface ThemeBundle {
  Landing: React.ComponentType<ViewProps>;
  Login: React.ComponentType<ViewProps>;
  Dashboard: React.ComponentType<ViewProps>;
}

/** Placeholder for templates/themes not yet built (Startup, IT, Marketing). */
function makePlaceholder(label: string): ThemeBundle {
  const Coming = ({ accent, onView }: ViewProps) => (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-950 px-6 text-center text-white">
      <div className="text-5xl">🚧</div>
      <h1 className="mt-6 text-3xl font-black">{label}</h1>
      <p className="mt-3 max-w-md text-sm text-slate-400">
        This template + theme is on the way. The Business Consulting template is fully built with all 4 themes — try that one to see the complete landing → login → dashboard flow.
      </p>
      <button onClick={() => onView('landing')} className="mt-8 inline-flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-black text-white" style={{ backgroundColor: accent }}>
        Back to landing <ArrowIcon />
      </button>
    </div>
  );
  return { Landing: Coming, Login: Coming, Dashboard: Coming };
}

/** key = `${templateId}:${themeId}` */
export const REGISTRY: Record<string, ThemeBundle> = {
  'consulting:executive': Executive,
  'consulting:boardroom': Boardroom,
  'consulting:advisory': Advisory,
  'consulting:growth': Growth,
};

export function getBundle(templateId: string, themeId: string, label: string): ThemeBundle {
  return REGISTRY[`${templateId}:${themeId}`] || makePlaceholder(label);
}
