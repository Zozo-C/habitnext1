'use client';

import React from 'react';
import HabitCalendar from '../HabitCalendar';

const DashboardDetailView = ({
  tasks,
  onTaskClick,
  onUpdateProgress,
}) => {
  return (
    <HabitCalendar
      tasks={tasks}
      onUpdate={onUpdateProgress}
      onTaskClick={onTaskClick}
    />
  );
};

export default DashboardDetailView;
