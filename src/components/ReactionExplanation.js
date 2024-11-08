import React from 'react';

const ReactionExplanation = ({ explanation }) => {
  if (!explanation) return null;

  return (
    <div className="reaction-explanation">
      <h3>Reaction Explanation</h3>
      <p>{explanation}</p>
    </div>
  );
};

export default ReactionExplanation;
