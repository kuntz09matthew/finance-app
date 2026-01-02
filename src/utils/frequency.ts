// Utility to convert expected income amount to monthly equivalent based on frequency
export function getMonthlyEquivalent(expectedAmount: number, frequency: string): number {
  switch (frequency) {
    case 'weekly':
      return (expectedAmount * 52) / 12;
    case 'bi-weekly':
      return (expectedAmount * 26) / 12;
    case 'monthly':
      return expectedAmount;
    case 'annual':
      return expectedAmount / 12;
    case 'one-time':
      return 0; // or could be expectedAmount/12 if you want to spread it
    default:
      return expectedAmount;
  }
}
