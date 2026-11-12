import React from 'react';
import * as Three from 'three';

// A plain opening in a wall (no shutter): cuts the wall in 2D and 3D.
export default {
  name: 'opening',
  prototype: 'holes',

  info: {
    title: 'opening',
    tag: ['opening', 'arch'],
    description: 'Opening in a wall without a door',
    image: require('../door/door.png')
  },

  properties: {
    width: {
      label: 'Width',
      type: 'length-measure',
      defaultValue: { length: 120 }
    },
    height: {
      label: 'Height',
      type: 'length-measure',
      defaultValue: { length: 213 }
    },
    altitude: {
      label: 'Altitude',
      type: 'length-measure',
      defaultValue: { length: 0 }
    },
    thickness: {
      label: 'Thickness',
      type: 'length-measure',
      defaultValue: { length: 30 }
    }
  },

  render2D: function (element, layer, scene) {
    let width = element.properties.get('width').get('length');
    let line = layer.lines.get(element.line);
    let t = line ? line.getIn(['properties', 'thickness', 'length']) : 20;
    let stroke = element.selected ? '#99c3fb' : '#8a8a8a';
    return (
      <g transform={`translate(${-width / 2}, 0)`}>
        <rect x={0} y={-t / 2 - 1} width={width} height={t + 2} style={{fill: '#ffffff'}}/>
        <line x1={0} y1={-t / 2} x2={0} y2={t / 2} style={{stroke, strokeWidth: '2px'}}/>
        <line x1={width} y1={-t / 2} x2={width} y2={t / 2} style={{stroke, strokeWidth: '2px'}}/>
        <line x1={0} y1={0} x2={width} y2={0} style={{stroke, strokeWidth: '1px', strokeDasharray: '6,4'}}/>
      </g>
    );
  },

  render3D: function (element, layer, scene) {
    return Promise.resolve(new Three.Object3D());
  }
};
