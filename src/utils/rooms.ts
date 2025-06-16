export interface RoomOption {
  value: string;
  label: string;
  icon: string;
}

// Constant for unassigned/no room value
export const NO_ROOM_VALUE = "__no_room__";

export interface RoomTheme {
  background: string;
  border: string;
  iconBg: string;
  accent: string;
}

export const ROOM_OPTIONS: RoomOption[] = [
  { value: 'living-room', label: 'Living Room', icon: '🛋️' },
  { value: 'bedroom', label: 'Bedroom', icon: '🛏️' },
  { value: 'kitchen', label: 'Kitchen', icon: '🍽️' },
  { value: 'bathroom', label: 'Bathroom', icon: '🛁' },
  { value: 'office', label: 'Office', icon: '💼' },
  { value: 'dining-room', label: 'Dining Room', icon: '🍽️' },
  { value: 'balcony', label: 'Balcony', icon: '🌤️' },
  { value: 'garden', label: 'Garden', icon: '🌻' },
  { value: 'greenhouse', label: 'Greenhouse', icon: '🪴' },
  { value: 'study', label: 'Study', icon: '📚' },
];

// Room themes for enhanced visual design with dark mode support
export const ROOM_THEMES: Record<string, RoomTheme> = {
  'living-room': {
    background: 'bg-orange-50 dark:bg-orange-600/20',
    border: 'border-orange-200 dark:border-orange-300/30',
    iconBg: 'bg-orange-100 dark:bg-orange-500/25',
    accent: 'text-orange-600 dark:text-orange-200'
  },
  'bedroom': {
    background: 'bg-purple-50 dark:bg-purple-600/20',
    border: 'border-purple-200 dark:border-purple-300/30',
    iconBg: 'bg-purple-100 dark:bg-purple-500/25',
    accent: 'text-purple-600 dark:text-purple-200'
  },
  'kitchen': {
    background: 'bg-red-50 dark:bg-red-600/20',
    border: 'border-red-200 dark:border-red-300/30',
    iconBg: 'bg-red-100 dark:bg-red-500/25',
    accent: 'text-red-600 dark:text-red-200'
  },
  'bathroom': {
    background: 'bg-blue-50 dark:bg-blue-600/20',
    border: 'border-blue-200 dark:border-blue-300/30',
    iconBg: 'bg-blue-100 dark:bg-blue-500/25',
    accent: 'text-blue-600 dark:text-blue-200'
  },
  'office': {
    background: 'bg-slate-50 dark:bg-slate-600/20',
    border: 'border-slate-200 dark:border-slate-300/30',
    iconBg: 'bg-slate-100 dark:bg-slate-500/25',
    accent: 'text-slate-600 dark:text-slate-200'
  },
  'dining-room': {
    background: 'bg-amber-50 dark:bg-amber-600/20',
    border: 'border-amber-200 dark:border-amber-300/30',
    iconBg: 'bg-amber-100 dark:bg-amber-500/25',
    accent: 'text-amber-600 dark:text-amber-200'
  },
  'balcony': {
    background: 'bg-sky-50 dark:bg-sky-600/20',
    border: 'border-sky-200 dark:border-sky-300/30',
    iconBg: 'bg-sky-100 dark:bg-sky-500/25',
    accent: 'text-sky-600 dark:text-sky-200'
  },
  'garden': {
    background: 'bg-green-50 dark:bg-green-600/20',
    border: 'border-green-200 dark:border-green-300/30',
    iconBg: 'bg-green-800 border-2 border-white/60 dark:bg-green-700 dark:border-white/20',
    accent: 'text-green-600 dark:text-green-200'
  },
  'greenhouse': {
    background: 'bg-emerald-50 dark:bg-emerald-600/20',
    border: 'border-emerald-200 dark:border-emerald-300/30',
    iconBg: 'bg-emerald-100 dark:bg-emerald-500/25',
    accent: 'text-emerald-600 dark:text-emerald-200'
  },
  'study': {
    background: 'bg-indigo-50 dark:bg-indigo-600/20',
    border: 'border-indigo-200 dark:border-indigo-300/30',
    iconBg: 'bg-indigo-100 dark:bg-indigo-500/25',
    accent: 'text-indigo-600 dark:text-indigo-200'
  },
  'unassigned': {
    background: 'bg-gray-50 dark:bg-gray-600/20',
    border: 'border-gray-200 dark:border-gray-300/30',
    iconBg: 'bg-gray-100 dark:bg-gray-500/25',
    accent: 'text-gray-600 dark:text-gray-200'
  }
};

export const getRoomLabel = (roomValue?: string | null): string => {
  if (!roomValue) return 'Unassigned';
  
  const room = ROOM_OPTIONS.find(option => option.value === roomValue);
  return room ? room.label : roomValue.split(/[-_]/).map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');
};

export const getRoomIcon = (roomValue?: string | null): string => {
  if (!roomValue) return '📍';
  
  const room = ROOM_OPTIONS.find(option => option.value === roomValue);
  return room ? room.icon : '🏠'; // Default icon for custom rooms
};

export const getRoomTheme = (roomValue?: string | null): RoomTheme => {
  if (!roomValue) return ROOM_THEMES.unassigned;
  
  return ROOM_THEMES[roomValue] || {
    background: 'bg-neutral-50 dark:bg-neutral-600/20',
    border: 'border-neutral-200 dark:border-neutral-300/30',
    iconBg: 'bg-neutral-100 dark:bg-neutral-500/25',
    accent: 'text-neutral-600 dark:text-neutral-200'
  };
};

export const groupPlantsByRoom = <T extends { room?: string | null }>(plants: T[]) => {
  const grouped = plants.reduce((acc, plant) => {
    const room = plant.room && plant.room !== NO_ROOM_VALUE ? plant.room : 'unassigned';
    if (!acc[room]) acc[room] = [];
    acc[room].push(plant);
    return acc;
  }, {} as Record<string, T[]>);
  
  // Sort rooms alphabetically, but keep 'unassigned' last
  const sortedRooms = Object.keys(grouped).sort((a, b) => {
    if (a === 'unassigned') return 1;
    if (b === 'unassigned') return -1;
    return getRoomLabel(a).localeCompare(getRoomLabel(b));
  });

  const sortedGrouped: Record<string, T[]> = {};
  sortedRooms.forEach(room => {
    sortedGrouped[room] = grouped[room];
  });

  return sortedGrouped;
}; 