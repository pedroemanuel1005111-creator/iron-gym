import { useState, FormEvent } from 'react';
import { Plus, Clock, Calendar, Activity, Flame, Trash2, X, Dumbbell, TrendingUp, Award } from 'lucide-react';
import { useWorkouts } from '../hooks/useWorkouts';
import type { User } from '../hooks/useAuth';

interface WorkoutLogProps {
  user: User;
}

const exerciseSuggestions = [
  'Supino reto',
  'Agachamento',
  'Levantamento terra',
  'Rosca direta',
  'Tríceps testa',
  'Puxada alta',
  'Remada curvada',
  'Leg press',
  'Cadeira extensora',
  'Mesa flexora',
  'Desenvolvimento militar',
  'Elevação lateral',
  'Esteira',
  'Bike',
  'Elíptico',
  'Abdominais',
  'Funcional',
  'HIIT',
];

function todayDate(): string {
  return new Date().toISOString().split('T')[0];
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr + 'T00:00:00');
  return date.toLocaleDateString('pt-BR', {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
}

function formatDateShort(dateStr: string): string {
  const date = new Date(dateStr + 'T00:00:00');
  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
  });
}

export default function WorkoutLog({ user }: WorkoutLogProps) {
  const { workouts, addWorkout, deleteWorkout, stats } = useWorkouts(user.email);
  const [showForm, setShowForm] = useState(false);
  const [date, setDate] = useState(todayDate());
  const [duration, setDuration] = useState('');
  const [exercises, setExercises] = useState('');
  const [notes, setNotes] = useState('');
  const [error, setError] = useState('');

  const resetForm = () => {
    setDate(todayDate());
    setDuration('');
    setExercises('');
    setNotes('');
    setError('');
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError('');

    const dur = parseInt(duration, 10);
    if (!date) return setError('Selecione uma data.');
    if (!dur || dur < 1) return setError('Informe o tempo de treino em minutos.');
    if (dur > 600) return setError('Tempo máximo é 600 minutos (10h).');
    if (!exercises.trim()) return setError('Descreva o que você treinou.');

    addWorkout({
      date,
      duration: dur,
      exercises: exercises.trim(),
      notes: notes.trim() || undefined,
    });

    resetForm();
    setShowForm(false);
  };

  const addExerciseChip = (exercise: string) => {
    const current = exercises.trim();
    if (current.includes(exercise)) return;
    setExercises(current ? `${current}, ${exercise}` : exercise);
  };

  return (
    <section id="meus-treinos" className="py-16 md:py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-iron-gray/50 via-iron-dark to-iron-gray/50"></div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-iron-red/5 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-iron-red font-oswald text-sm tracking-[0.3em] uppercase flex items-center justify-center gap-2">
            <Activity size={14} /> Diário de Treinos
          </span>
          <h2 className="font-oswald text-4xl md:text-5xl lg:text-6xl font-bold mt-2 mb-4">
            MEUS <span className="text-gradient">TREINOS</span>
          </h2>
          <div className="w-20 h-1 bg-iron-red mx-auto rounded-full"></div>
          <p className="text-gray-400 mt-6 max-w-2xl mx-auto">
            Registre seus treinos e acompanhe sua evolução dia após dia.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          <StatCard
            icon={Dumbbell}
            label="Total de treinos"
            value={stats.totalWorkouts.toString()}
            sublabel="registrados"
          />
          <StatCard
            icon={Clock}
            label="Tempo total"
            value={stats.totalHours > 0 ? `${stats.totalHours}h` : `${stats.totalMinutes}min`}
            sublabel={stats.totalHours > 0 ? `${stats.remainingMinutes}min` : 'treinados'}
          />
          <StatCard
            icon={TrendingUp}
            label="Esta semana"
            value={stats.workoutsThisWeek.toString()}
            sublabel="treinos"
          />
          <StatCard
            icon={Flame}
            label="Sequência"
            value={stats.streak.toString()}
            sublabel={stats.streak === 1 ? 'dia consecutivo' : 'dias consecutivos'}
            highlight={stats.streak >= 3}
          />
        </div>

        {/* Add Button */}
        <div className="flex justify-center mb-8">
          <button
            onClick={() => {
              resetForm();
              setShowForm(true);
            }}
            className="red-gradient text-white font-oswald text-base tracking-wider px-8 py-3.5 rounded-xl uppercase font-semibold hover:scale-105 transition-all duration-300 flex items-center gap-2 shadow-lg shadow-iron-red/30"
          >
            <Plus size={20} />
            Registrar Novo Treino
          </button>
        </div>

        {/* Workout List */}
        {workouts.length === 0 ? (
          <div className="text-center py-12 bg-iron-dark/60 rounded-2xl border border-white/5 max-w-2xl mx-auto">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-iron-red/10 mb-4">
              <Dumbbell size={36} className="text-iron-red" />
            </div>
            <h3 className="font-oswald text-xl font-bold text-white mb-2">Nenhum treino registrado</h3>
            <p className="text-gray-400 text-sm">Comece agora! Registre seu primeiro treino e acompanhe sua evolução.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-4 max-w-5xl mx-auto">
            {workouts.map((workout) => (
              <div
                key={workout.id}
                className="bg-iron-dark/60 backdrop-blur-sm rounded-2xl border border-white/5 p-6 hover:border-iron-red/30 transition-all duration-300 group relative"
              >
                <button
                  onClick={() => {
                    if (confirm('Deseja excluir este treino?')) deleteWorkout(workout.id);
                  }}
                  className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-gray-500 hover:text-red-400 hover:bg-red-500/10 transition-all opacity-0 group-hover:opacity-100"
                  aria-label="Excluir treino"
                >
                  <Trash2 size={14} />
                </button>

                <div className="flex items-start gap-4 mb-4">
                  <div className="w-14 h-14 rounded-xl red-gradient flex flex-col items-center justify-center flex-shrink-0">
                    <span className="text-white font-oswald text-lg font-bold leading-none">
                      {formatDateShort(workout.date).split('/')[0]}
                    </span>
                    <span className="text-white/80 text-[10px] uppercase tracking-wider leading-none mt-1">
                      {new Date(workout.date + 'T00:00:00').toLocaleDateString('pt-BR', { month: 'short' })}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-oswald text-base font-semibold capitalize truncate">
                      {formatDate(workout.date).split(',')[0]}
                    </p>
                    <div className="flex items-center gap-3 mt-1">
                      <div className="flex items-center gap-1.5 text-iron-red text-sm font-semibold">
                        <Clock size={14} />
                        {workout.duration} min
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">Exercícios</p>
                    <p className="text-gray-200 text-sm leading-relaxed">{workout.exercises}</p>
                  </div>
                  {workout.notes && (
                    <div>
                      <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">Observações</p>
                      <p className="text-gray-400 text-sm italic leading-relaxed">"{workout.notes}"</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal Form */}
      {showForm && (
        <div
          className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-sm flex items-center justify-center px-4 py-8 animate-fade-in"
          onClick={() => setShowForm(false)}
        >
          <div
            className="bg-iron-dark border border-white/10 rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-6 border-b border-white/5 sticky top-0 bg-iron-dark z-10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl red-gradient flex items-center justify-center">
                  <Dumbbell size={18} className="text-white" />
                </div>
                <div>
                  <h3 className="font-oswald text-xl font-bold text-white uppercase tracking-wider">Novo Treino</h3>
                  <p className="text-gray-500 text-xs">Registre seu treino de hoje</p>
                </div>
              </div>
              <button
                onClick={() => setShowForm(false)}
                className="w-8 h-8 rounded-full hover:bg-white/5 flex items-center justify-center text-gray-400 hover:text-white transition-all"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              {/* Date */}
              <div>
                <label className="block text-gray-400 text-xs font-medium uppercase tracking-wider mb-2">
                  <Calendar size={14} className="inline mr-1.5 -mt-0.5" />
                  Data do Treino
                </label>
                <input
                  type="date"
                  value={date}
                  max={todayDate()}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full bg-iron-gray/50 border border-white/5 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-iron-red/50 focus:ring-2 focus:ring-iron-red/20 transition-all [color-scheme:dark]"
                />
              </div>

              {/* Duration */}
              <div>
                <label className="block text-gray-400 text-xs font-medium uppercase tracking-wider mb-2">
                  <Clock size={14} className="inline mr-1.5 -mt-0.5" />
                  Tempo de Treino (minutos)
                </label>
                <input
                  type="number"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  placeholder="Ex: 60"
                  min="1"
                  max="600"
                  className="w-full bg-iron-gray/50 border border-white/5 rounded-xl px-4 py-3.5 text-white placeholder-gray-600 focus:outline-none focus:border-iron-red/50 focus:ring-2 focus:ring-iron-red/20 transition-all"
                />
                <div className="flex gap-2 mt-2 flex-wrap">
                  {[30, 45, 60, 90, 120].map((min) => (
                    <button
                      key={min}
                      type="button"
                      onClick={() => setDuration(min.toString())}
                      className="px-3 py-1.5 text-xs bg-iron-gray/50 text-gray-400 rounded-lg hover:bg-iron-red/20 hover:text-iron-red transition-all"
                    >
                      {min}min
                    </button>
                  ))}
                </div>
              </div>

              {/* Exercises */}
              <div>
                <label className="block text-gray-400 text-xs font-medium uppercase tracking-wider mb-2">
                  <Activity size={14} className="inline mr-1.5 -mt-0.5" />
                  O que você treinou?
                </label>
                <textarea
                  value={exercises}
                  onChange={(e) => setExercises(e.target.value)}
                  placeholder="Ex: Supino reto 4x10, Agachamento 4x12..."
                  rows={3}
                  className="w-full bg-iron-gray/50 border border-white/5 rounded-xl px-4 py-3.5 text-white placeholder-gray-600 focus:outline-none focus:border-iron-red/50 focus:ring-2 focus:ring-iron-red/20 transition-all resize-none"
                />
                <div className="mt-2">
                  <p className="text-gray-500 text-xs mb-2">Sugestões rápidas:</p>
                  <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto">
                    {exerciseSuggestions.map((ex) => (
                      <button
                        key={ex}
                        type="button"
                        onClick={() => addExerciseChip(ex)}
                        className="px-2.5 py-1 text-xs bg-iron-gray/50 text-gray-400 rounded-md hover:bg-iron-red/20 hover:text-iron-red transition-all border border-white/5"
                      >
                        + {ex}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-gray-400 text-xs font-medium uppercase tracking-wider mb-2">
                  <Award size={14} className="inline mr-1.5 -mt-0.5" />
                  Observações <span className="text-gray-600 normal-case">(opcional)</span>
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Como se sentiu? Algum recorde pessoal?"
                  rows={2}
                  className="w-full bg-iron-gray/50 border border-white/5 rounded-xl px-4 py-3.5 text-white placeholder-gray-600 focus:outline-none focus:border-iron-red/50 focus:ring-2 focus:ring-iron-red/20 transition-all resize-none"
                />
              </div>

              {error && (
                <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm text-center">
                  {error}
                </div>
              )}

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="flex-1 border-2 border-white/10 text-white font-oswald text-sm tracking-wider py-3.5 rounded-xl uppercase font-semibold hover:border-iron-red transition-all"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 red-gradient text-white font-oswald text-sm tracking-wider py-3.5 rounded-xl uppercase font-semibold hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
                >
                  <Plus size={16} />
                  Salvar Treino
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}

interface StatCardProps {
  icon: any;
  label: string;
  value: string;
  sublabel: string;
  highlight?: boolean;
}

function StatCard({ icon: Icon, label, value, sublabel, highlight }: StatCardProps) {
  return (
    <div className={`p-5 rounded-2xl border transition-all ${
      highlight
        ? 'bg-gradient-to-br from-iron-red/20 to-iron-dark/60 border-iron-red/30'
        : 'bg-iron-dark/60 border-white/5 hover:border-iron-red/20'
    }`}>
      <div className="flex items-center justify-between mb-3">
        <span className="text-gray-500 text-xs uppercase tracking-wider">{label}</span>
        <Icon size={18} className={highlight ? 'text-iron-red animate-pulse' : 'text-iron-red'} />
      </div>
      <p className="font-oswald text-3xl md:text-4xl font-bold text-white leading-none mb-1">{value}</p>
      <p className="text-gray-500 text-xs">{sublabel}</p>
    </div>
  );
}
