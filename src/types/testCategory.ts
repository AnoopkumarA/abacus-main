export interface TestCategory {
  id: string;
  name: string;
  level: number;
  description: string;
}

export const TEST_CATEGORIES: TestCategory[] = [
  {
    id: 'A',
    name: 'Category A',
    level: 1,
    description: 'First level - Single digit numbers with single digit answers'
  },
  {
    id: 'B',
    name: 'Category B',
    level: 2,
    description: 'Second level - Single digit numbers with single digit answers'
  },
  {
    id: 'C',
    name: 'Category C',
    level: 3,
    description: 'Third level - Single digit numbers with double digit answers'
  },
  {
    id: 'D',
    name: 'Category D',
    level: 4,
    description: 'Fourth level - Single digit numbers with double digit answers'
  },
  {
    id: 'E',
    name: 'Category E',
    level: 5,
    description: 'Fifth level - Advanced calculations'
  }
]; 