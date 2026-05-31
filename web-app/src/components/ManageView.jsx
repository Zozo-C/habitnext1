"use client";
import TaskCard from './TaskCard';
import PlanGroup from './PlanGroup';

const ManageView = ({
    tasks, groupedTasks, soloTasks, loading,
    onTaskClick, onTaskDelete, onDeleteAssignment, onUpdateProgress,
    onOpenTemplateExplorer, onOpenFormModal,
}) => (
    <div className="p-4">
        <h2 className="text-2xl font-black text-gray-800 mb-6">計畫總覽</h2>
        <div className="space-y-4 pb-24 md:pb-0">
            {loading && <div className="text-center py-10 text-gray-400">載入中...</div>}

            {!loading && tasks.length === 0 && (
                <div className="text-center py-20">
                    <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl">🌵</div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">還沒有習慣</h3>
                    <p className="text-gray-500 mb-6">開始建立你的第一個習慣，或是探索專家計畫</p>
                    <div className="flex justify-center gap-4">
                        <button
                            onClick={onOpenTemplateExplorer}
                            className="text-emerald-500 font-bold hover:underline active:opacity-70 transition-opacity"
                        >探索計畫</button>
                        <button
                            onClick={onOpenFormModal}
                            className="text-indigo-500 font-bold hover:underline active:opacity-70 transition-opacity"
                        >建立習慣</button>
                    </div>
                </div>
            )}

            {groupedTasks.map(group => (
                <PlanGroup
                    key={group.id}
                    assignment={group}
                    tasks={group.tasks}
                    onDelete={onDeleteAssignment}
                    onTaskClick={onTaskClick}
                    onTaskEdit={onTaskClick}
                    onTaskDelete={onTaskDelete}
                    onUpdate={onUpdateProgress}
                />
            ))}

            {soloTasks.map(task => (
                <TaskCard
                    key={task.id}
                    task={task}
                    onClick={() => onTaskClick(task)}
                    onUpdate={onUpdateProgress}
                />
            ))}
        </div>
    </div>
);

export default ManageView;
