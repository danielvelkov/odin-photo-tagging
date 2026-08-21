import BankSeq from '../../../assets/images/bankruptcy_sequence.webp';
import HomoUnderground from '../../../assets/images/homosexual_underground.webp';
import VolShitCompressor from '../../../assets/images/volumetric_shit_compressor.webp';

export const MOCK_thoughts = [
  { id: 1, name: 'Bankruptcy Sequence', image: BankSeq },
  { id: 2, name: 'Homosexual Underground', image: HomoUnderground },
  { id: 3, name: 'Volumetric Shit Compressor', image: VolShitCompressor },
];

export async function getLeaderboard() {}

export async function getThoughts() {
  return new Promise((resolve) => resolve(MOCK_thoughts));
}
