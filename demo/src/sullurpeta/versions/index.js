// Named floor-plan versions. Open one with  #P1 … #P5  at the end of the planner link.
import P1 from './P1';
import P2 from './P2';
import P3 from './P3';
import P4 from './P4';
import P5 from './P5';

export const PLAN_VERSIONS = [
  { id: 'P1', name: 'Starter 2BHK, front parking', date: '12 Nov 2026', data: P1,
    summary: 'First layout: 8 ft parking/sit-out in front, house behind it, 3 ft rear setback.' },
  { id: 'P2', name: 'Back garden, no front parking', date: '12 Nov 2026', data: P2,
    summary: 'House moved to the 6 ft front setback; 11 ft back garden; same rooms.' },
  { id: 'P3', name: 'Modern entrance', date: '12 Nov 2026', data: P3,
    summary: 'Wide left gate, porch, stone pillar, feature and stair windows, front planter.' },
  { id: 'P4', name: 'Recessed entrance bay', date: '12 Nov 2026', data: P4,
    summary: 'Porch recessed 4 ft, right window block forward and taller (reference photo 1).' },
  { id: 'P5', name: 'Royal Mahal plan', date: '12 Nov 2026', data: P5, latest: true,
    summary: 'Matches exterior E3: arch porch, solid stair front (no glass), carved door, garden beds.' }
];
export const LATEST_ID = 'P5';
export const findVersion = (id) => PLAN_VERSIONS.find((v) => v.id === id) || PLAN_VERSIONS.find((v) => v.latest);
