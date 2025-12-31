import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store';
import { setOrder, WidgetId } from '@/features/dashboard/dashboardWidgetsSlice';

export function useDashboardWidgetOrder() {
  const order = useSelector((state: RootState) => state.dashboardWidgets.order);
  const dispatch = useDispatch();
  const setWidgetOrder = (newOrder: WidgetId[]) => dispatch(setOrder(newOrder));
  return { order, setWidgetOrder };
}
