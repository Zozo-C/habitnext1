'use client';

import React from 'react';
import HabitCalendar from '../HabitCalendar';

const DashboardDetailView = ({ tasks, onUpdate, onTaskClick }) => {
  return (
    <HabitCalendar
      tasks={tasks}
      onUpdate={onUpdate}
      onTaskClick={onTaskClick}
    />
  );
};

export default DashboardDetailView;
