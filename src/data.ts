import { OrbitGroup, Member, UserWallet } from './types';

export const INITIAL_MEMBERS: Member[] = [
  {
    id: 'user_efe',
    name: 'Efe Adebayo',
    phone: '+234 801 234 5678',
    status: 'active',
    rotationIndex: 2, // 3rd in line
    address: 'GD7R...Z5PL',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
    completedCycles: 4,
    completionRate: 100
  },
  {
    id: 'member_chidi',
    name: 'Chidi Okafor',
    phone: '+234 802 345 6789',
    status: 'active',
    rotationIndex: 0, // 1st in line
    address: 'GC2B...L9XW',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80',
    completedCycles: 8,
    completionRate: 100
  },
  {
    id: 'member_amina',
    name: 'Amina Bello',
    phone: '+234 803 456 7890',
    status: 'active',
    rotationIndex: 1, // 2nd in line
    address: 'GA4F...H7KJ',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
    completedCycles: 3,
    completionRate: 100
  },
  {
    id: 'member_tunde',
    name: 'Tunde Bakare',
    phone: '+234 804 567 8901',
    status: 'active',
    rotationIndex: 3, // 4th in line
    address: 'GB1Y...K2JS',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&auto=format&fit=crop&q=80',
    completedCycles: 5,
    completionRate: 95
  },
  {
    id: 'member_ngozi',
    name: 'Ngozi Nwachukwu',
    phone: '+234 805 678 9012',
    status: 'active',
    rotationIndex: 4, // 5th in line
    address: 'GDS8...F4ND',
    avatar: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=100&auto=format&fit=crop&q=80',
    completedCycles: 11,
    completionRate: 100
  }
];

export const INITIAL_ORBITS: OrbitGroup[] = [
  {
    id: 'orbit_lagos_solar',
    name: 'Lagos Solar Orbit',
    contributionAmount: 50, // USDC ($50 ≈ 75,000 NGN)
    frequency: 'Weekly',
    payoutOrder: 'fixed',
    stakePercentage: 10,
    totalRounds: 5,
    currentRound: 2,
    status: 'active',
    daysToNextContribution: 3,
    livePotBalance: 100, // Round 2 contributions from Chidi and Amina so far (Efe hasn't contributed yet)
    members: INITIAL_MEMBERS,
    roundsHistory: {
      user_efe: [true, false, false, false, false],      // Round 1 done, Round 2 pending
      member_chidi: [true, true, false, false, false],   // Round 1 and 2 done
      member_amina: [true, true, false, false, false],   // Round 1 and 2 done
      member_tunde: [true, false, false, false, false],  // Round 1 done, Round 2 pending
      member_ngozi: [true, false, false, false, false]   // Round 1 done, Round 2 pending
    }
  },
  {
    id: 'orbit_abuja_galaxy',
    name: 'Abuja Galaxy Orbit',
    contributionAmount: 150, // USDC
    frequency: 'Monthly',
    payoutOrder: 'random',
    stakePercentage: 15,
    totalRounds: 5,
    currentRound: 5, // final round!
    status: 'active',
    daysToNextContribution: 12,
    livePotBalance: 450, // Amina, Tunde, Ngozi contributed so far
    members: INITIAL_MEMBERS.map(m => {
      // shuffle payout order or just assign a static rotation order for Abuja Orbit
      const indices = [1, 2, 0, 4, 3]; // different payout order
      return { ...m, rotationIndex: indices[INITIAL_MEMBERS.indexOf(m)] };
    }),
    roundsHistory: {
      user_efe: [true, true, true, true, false],     // Has contributed all rounds except final
      member_chidi: [true, true, true, true, false],
      member_amina: [true, true, true, true, true],   // Contributed final round too
      member_tunde: [true, true, true, true, true],   // Contributed final round too
      member_ngozi: [true, true, true, true, true]    // Contributed final round too
    }
  }
];

export const INITIAL_USER_WALLET: UserWallet = {
  address: 'GD7R...Z5PL',
  phone: '+234 801 234 5678',
  usdcBalance: 25, // Start with a little USDC so they can see they need to buy more/deposit
  nairaBalance: 125000, // 125,000 NGN in bank account
  hasPasskey: true,
  kycStatus: 'completed'
};
