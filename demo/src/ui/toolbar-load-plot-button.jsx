import React from 'react';
import PropTypes from 'prop-types';
import { MdHome } from 'react-icons/md';
import { ReactPlannerComponents } from 'react-planner';
import { loadSullurpetaPlan } from '../sullurpeta/load-plan';

const { ToolbarButton } = ReactPlannerComponents.ToolbarComponents;

export default function ToolbarLoadPlotButton(props, { store }) {
  let onClick = event => {
    event.preventDefault();
    // replaces the drawing; use Undo or a saved .json to go back
    store.dispatch(loadSullurpetaPlan());
  };

  return (
    <ToolbarButton active={false} tooltip="Reset to my plot plan (24' x 60') — replaces current drawing" onClick={onClick}>
      <MdHome/>
    </ToolbarButton>
  );
}

ToolbarLoadPlotButton.contextTypes = {
  store: PropTypes.object.isRequired,
};
