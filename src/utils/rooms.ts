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

// Room themes for enhanced visual design
export const ROOM_THEMES: Record<string, RoomTheme> = {
  'living-room': {
    background: 'bg-orange-50',
    border: 'border-orange-200',
    iconBg: 'bg-orange-100',
    accent: 'text-orange-600'
  },
  'bedroom': {
    background: 'bg-purple-50',
    border: 'border-purple-200',
    iconBg: 'bg-purple-100',
    accent: 'text-purple-600'
  },
  'kitchen': {
    background: 'bg-red-50',
    border: 'border-red-200',
    iconBg: 'bg-red-100',
    accent: 'text-red-600'
  },
  'bathroom': {
    background: 'bg-blue-50',
    border: 'border-blue-200',
    iconBg: 'bg-blue-100',
    accent: 'text-blue-600'
  },
  'office': {
    background: 'bg-slate-50',
    border: 'border-slate-200',
    iconBg: 'bg-slate-100',
    accent: 'text-slate-600'
  },
  'dining-room': {
    background: 'bg-amber-50',
    border: 'border-amber-200',
    iconBg: 'bg-amber-100',
    accent: 'text-amber-600'
  },
  'balcony': {
    background: 'bg-sky-50',
    border: 'border-sky-200',
    iconBg: 'bg-sky-100',
    accent: 'text-sky-600'
  },
  'garden': {
    background: 'bg-green-50',
    border: 'border-green-200',
    iconBg: 'bg-green-100',
    accent: 'text-green-600'
  },
  'greenhouse': {
    background: 'bg-emerald-50',
    border: 'border-emerald-200',
    iconBg: 'bg-emerald-100',
    accent: 'text-emerald-600'
  },
  'study': {
    background: 'bg-indigo-50',
    border: 'border-indigo-200',
    iconBg: 'bg-indigo-100',
    accent: 'text-indigo-600'
  },
  'unassigned': {
    background: 'bg-gray-50',
    border: 'border-gray-200',
    iconBg: 'bg-gray-100',
    accent: 'text-gray-600'
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
    background: 'bg-neutral-50',
    border: 'border-neutral-200',
    iconBg: 'bg-neutral-100',
    accent: 'text-neutral-600'
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