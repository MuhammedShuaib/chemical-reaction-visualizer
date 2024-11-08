import React from 'react';

const ProductVisualization = ({ reactionDetails }) => {
  if (!reactionDetails) return null;

  return (
    <div className="reaction-visualization">
      <h2>Reaction Visualization</h2>
      <p><strong>Reactants:</strong> {reactionDetails.reactant1} + {reactionDetails.reactant2}</p>
      <p><strong>Conditions:</strong> {reactionDetails.conditions.join(", ")}</p>
      <p><strong>Products:</strong> {Object.values(reactionDetails.products).join(" / ")}</p>
    </div>
  );
};

export default ProductVisualization;
