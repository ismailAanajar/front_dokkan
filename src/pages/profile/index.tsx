import React from 'react';

import { Section } from '@dokkan/components';
import ProfileLayout from '@dokkan/components/Layouts/ProfileLayout';
import {
  Account,
  Addresses,
  Orders,
  Wishlist,
} from '@dokkan/components/Profile';

const panels = [Orders, Wishlist, Addresses, Account]

function profile() {
  return (
    <Section>
       <ProfileLayout page='account'>
          profile
       </ProfileLayout>
    </Section>
  )
}

export default profile