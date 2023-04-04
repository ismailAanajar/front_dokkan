import React from 'react';

import { Section } from '@dokkan/components';
import ProfileLayout from '@dokkan/components/Layouts/ProfileLayout';
import withAuth from '@dokkan/utils/withAuth';

function profile() {
  return (
    <Section>
       <ProfileLayout page='account'>
          profile
       </ProfileLayout>
    </Section>
  )
}

export default withAuth(profile)