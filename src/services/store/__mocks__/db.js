import BankSeq from '../../../assets/images/bankruptcy_sequence.webp';
import HomoUnderground from '../../../assets/images/homosexual_underground.webp';
import VolShitCompressor from '../../../assets/images/volumetric_shit_compressor.webp';

export const MOCK_thoughts = [
  {
    id: 1,
    name: 'Bankruptcy Sequence',
    image: BankSeq,
    x: 2335,
    y: 2325,
    width: 211,
    height: 135,
  },
  {
    id: 2,
    name: 'Homosexual Underground',
    image: HomoUnderground,
    x: 83,
    y: 1274,
    width: 262,
    height: 226,
  },
  {
    id: 3,
    name: 'Volumetric Shit Compressor',
    image: VolShitCompressor,
    x: 3570,
    y: 1480,
    width: 117,
    height: 228,
  },
];

export async function getLeaderboard() {}

export async function getThoughts() {
  return new Promise((resolve) => resolve(MOCK_thoughts));
}
