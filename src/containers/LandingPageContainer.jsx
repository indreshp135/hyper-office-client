import React from 'react';
import { HeaderNav } from '../components/Header';
import { Faq } from '../components/Landing/FAQ';
import { FeaturesGrid } from '../components/Landing/Features';
import { TopLanding } from '../components/Landing/TopLanding';

export function LandingPageContainer() {
  return (
    <div>
      <HeaderNav opened={false} setOpened={() => {}} />
      <TopLanding />
      <FeaturesGrid />
      <Faq />
    </div>
  );
}
