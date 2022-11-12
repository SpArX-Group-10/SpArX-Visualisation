import {Position } from 'reactflow';
export const nodes = [
    // Input layer
    {
      id: '1',
      className: 'circle',
      data: { label: 'X1' },
      position: { x: 0, y: 50 },
      type: 'input',
      sourcePosition: Position.Right,
      targetPosition: Position.Left,
      layer: 1,
      hidden: true,
    },
    {
      id: '2',
      data: { label: 'X2' },
      className: 'circle',
      position: { x: 0, y: 150 },
      type: 'input',
      sourcePosition: Position.Right,
      targetPosition: Position.Left,
      layer: 1,
      hidden: true,
    },
    {
      id: '3',
      data: { label: 'X3' },
      className: 'circle',
      position: { x: 0, y: 250 },
      type: 'input',
      sourcePosition: Position.Right,
      targetPosition: Position.Left,
      layer: 1,
      hidden: true,
    },
    // Hidden Layer 1
    {
      id: '4',
      data: { label: 'C1' },
      className: 'circle',
      position: { x: 200, y: 0 },
      sourcePosition: Position.Right,
      targetPosition: Position.Left,
      layer: 2,
      hidden: true,
    },
    {
      id: '5',
      data: { label: 'C2' },
      className: 'circle',
      position: { x: 200, y: 100 },
      sourcePosition: Position.Right,
      targetPosition: Position.Left,
      layer: 2,
      hidden: true,
    },
    {
      id: '6',
      data: { label: 'C3' },
      className: 'circle',
      position: { x: 200, y: 200 },
      sourcePosition: Position.Right,
      targetPosition: Position.Left,
      layer: 2,
      hidden: true,
    },
    {
      id: '7',
      data: { label: 'C4' },
      className: 'circle',
      position: { x: 200, y: 300 },
      sourcePosition: Position.Right,
      targetPosition: Position.Left,
      layer: 2,
      hidden: true,
    },
    // Hidden Layer 2
    {
      id: '8',
      data: { label: 'C5' },
      className: 'circle',
      position: { x: 400, y: 0 },
      sourcePosition: Position.Right,
      targetPosition: Position.Left,
      layer: 3,
      hidden: true,
    },
    {
      id: '9',
      data: { label: 'C6' },
      className: 'circle',
      position: { x: 400, y: 100 },
      sourcePosition: Position.Right,
      targetPosition: Position.Left,
      layer: 3,
      hidden: true,
    },
    {
      id: '10',
      className: 'circle',
      data: { label: 'C7' },
      position: { x: 400, y: 200 },
      sourcePosition: Position.Right,
      targetPosition: Position.Left,
      layer: 3,
      hidden: true,
    },
    {
      id: '11',
      className: 'circle',
      data: { label: 'C8' },
      position: { x: 400, y: 300 },
      sourcePosition: Position.Right,
      targetPosition: Position.Left,
      layer: 3,
      hidden: true,
    },
    // Output Layer
    {
      id: '12',
      className: 'circle',
      data: { label: 'O1' },
      position: { x: 600, y: 50 },
      type: 'output',
      sourcePosition: Position.Right,
      targetPosition: Position.Left,
      layer: 4
    },
    {
      id: '13',
      className: 'circle',
      data: { label: 'O2' },
      position: { x: 600, y: 150 },
      type: 'output',
      sourcePosition: Position.Right,
      targetPosition: Position.Left,
      layer: 4
    },
    {
      id: '14',
      className: 'circle',
      data: { label: 'O3' },
      position: { x: 600, y: 250 },
      type: 'output',
      sourcePosition: Position.Right,
      targetPosition: Position.Left,
      layer: 4
    },
  ];

export const edges = [
  { id: '1-4', source: '1', target: '4', label: 'to the', type: 'straight', hidden: true, layer: 1 },
  { id: '1-5', source: '1', target: '5', label: 'to the', type: 'straight', hidden: true, layer: 1 },
  { id: '1-6', source: '1', target: '6', label: 'to the', type: 'straight', hidden: true, layer: 1 },
  { id: '5-7', source: '5', target: '8', label: 'to the', type: 'straight', hidden: true, layer: 1 },

  { id: '8-12', source: '8', target: '12', label: 'to the', type: 'straight', hidden: true, layer: 3 },
  { id: '9-12', source: '9', target: '12', label: 'to the', type: 'straight', hidden: true, layer: 3 },
  { id: '10-12', source: '10', target: '12', label: 'to the', type: 'straight', hidden: true, layer: 3 },
  { id: '11-12', source: '11', target: '12', label: 'to the', type: 'straight', hidden: true, layer: 3 },

  { id: '8-13', source: '8', target: '13', label: 'to the', type: 'straight', hidden: true, layer: 3 },
  { id: '9-13', source: '9', target: '13', label: 'to the', type: 'straight', hidden: true, layer: 3 },
  { id: '10-13', source: '10', target: '13', label: 'to the', type: 'straight', hidden: true, layer: 3 },
  { id: '11-13', source: '11', target: '13', label: 'to the', type: 'straight', hidden: true, layer: 3 },

  { id: '8-14', source: '8', target: '14', label: 'to the', type: 'straight', hidden: true, layer: 3 },
  { id: '9-14', source: '9', target: '14', label: 'to the', type: 'straight', hidden: true, layer: 3 },
  { id: '10-14', source: '10', target: '14', label: 'to the', type: 'straight', hidden: true, layer: 3 },
  { id: '11-14', source: '11', target: '14', label: 'to the', type: 'straight', hidden: true, layer: 3 },
];

