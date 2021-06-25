export type FactoryType = 'lumber mill' | 'mine' | 'farm';
export type RefineryType = 'blacksmith' | 'carpenter' | 'kitchen';
export type ProductionTier = 'base' | 'intermediate' | 'finished';
export type BaseGood = 'lumber' | 'iron ore' | 'food';
export type IntermediateGood = 'equipment' | 'furniture' | 'meals';
export type GoodsOutput = { good: BaseGood; amount: number };
export type CharacterStatus = 'conscious' | 'unconscious' | 'dead';
