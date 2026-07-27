'use client';

import React from 'react';
import { Project, Block, Product } from '@/types';
import BlockMarkup from '@/components/preview/BlockMarkup';

interface MedicalShopLandingProps {
  projectId: number;
  project: Project;
  currentPageBlocks: Block[];
  dbProducts: Product[];
  cartCountQuantity: number;
  customerSession: any;
  openProductDetail: (p: Product) => void;
  handleAddToCart: (p: Product, size?: string, color?: string, qty?: number) => void;
  gymInfo?: any;
}

export default function MedicalShopLanding({
  projectId,
  project,
  currentPageBlocks,
  dbProducts,
  cartCountQuantity,
  customerSession,
  openProductDetail,
  handleAddToCart,
  gymInfo,
}: MedicalShopLandingProps) {
  return (
    <main className="divide-y divide-slate-100 bg-white">
      {currentPageBlocks.length === 0 ? (
        <div className="text-center py-32 text-slate-400">
          <span className="text-4xl block mb-4">💊</span>
          <h2 className="text-lg font-bold text-slate-900 mb-1">Medical Shop & Pharmacy Site</h2>
          <p className="text-xs max-w-xs mx-auto">
            Open the dashboard editor and construct pharmacy page layouts.
          </p>
        </div>
      ) : (
        currentPageBlocks.map((block) => (
          <section key={block.id}>
            <BlockMarkup
              block={block}
              projectId={String(projectId)}
              dbProducts={dbProducts}
              cartCount={cartCountQuantity}
              onAddToCart={(p: Product) => handleAddToCart(p, 'M', 'Black', 1)}
              onProductClick={openProductDetail}
              gymInfo={gymInfo}
            />
          </section>
        ))
      )}
    </main>
  );
}
