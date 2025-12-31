import { Alert } from '@/components/alerts/AlertsList';

// This is a mock implementation. In a real app, this would be dynamic and based on user data.
type DashboardSummary = {
  balances: number;
  income: number;
  expenses: number;
  savings: number;
  goals: number;
};
type DashboardBill = {
  id: number;
  name: string;
  category: string;
  amount: number;
  dueDate: string;
  recurring: boolean;
  autoPay: boolean;
};
type DashboardActivity = {
  type: string;
  description: string;
  amount: number;
  date: string;
};
type DashboardData = {
  summary: DashboardSummary;
  bills?: DashboardBill[];
  recentActivity?: DashboardActivity[];
};

export function getDashboardAlerts(data: DashboardData): Alert[] {
  const alerts: Alert[] = [];
  // Use the most recent activity date as a static reference for alert dates
  const staticDate =
    data?.recentActivity && data.recentActivity.length > 0
      ? data.recentActivity[0].date
      : '2025-12-28';

  // Spending alert: expenses > income
  if (data?.summary?.expenses > data?.summary?.income) {
    alerts.push({
      id: 1,
      type: 'spending',
      message: 'Your expenses exceed your income this month.',
      severity: 'critical',
      date: staticDate,
    });
  } else if (data?.summary?.expenses > data?.summary?.income * 0.9) {
    alerts.push({
      id: 2,
      type: 'spending',
      message: 'You are close to exceeding your income for this month.',
      severity: 'warning',
      date: staticDate,
    });
  }
  // Bill reminder: any bill due in next 7 days
  if (data?.bills) {
    // Use a static reference date for SSR safety
    const now = new Date(staticDate);
    data.bills.forEach((bill, idx) => {
      const due = new Date(bill.dueDate);
      const diff = (due.getTime() - now.getTime()) / (1000 * 60 * 60 * 24);
      if (diff >= 0 && diff <= 7) {
        alerts.push({
          id: 100 + idx,
          type: 'bill',
          message: `Upcoming bill: ${bill.name} due on ${bill.dueDate}`,
          severity: diff <= 2 ? 'critical' : 'warning',
          date: bill.dueDate,
        });
      }
    });
  }
  // Goal progress: goals < 2 (mock logic)
  if (data?.summary?.goals < 2) {
    alerts.push({
      id: 200,
      type: 'goal',
      message: 'You have less than 2 active savings goals. Consider setting more goals.',
      severity: 'info',
      date: staticDate,
    });
  }
  // Overdraft warning: balances < 0
  if (data?.summary?.balances < 0) {
    alerts.push({
      id: 300,
      type: 'overdraft',
      message: 'Your account is overdrawn!',
      severity: 'critical',
      date: staticDate,
    });
  }
  return alerts;
}
