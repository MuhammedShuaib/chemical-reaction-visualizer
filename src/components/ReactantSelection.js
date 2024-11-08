import React, { useState } from "react";
import Select from "react-select";
import { reactions } from "../database";

const customSelectStyles = {
  control: (provided) => ({
    ...provided,
    backgroundColor: "rgba(255, 255, 255, 0.6)",
    color: "#333",
  }),
  placeholder: (provided) => ({
    ...provided,
    color: "#555",
    fontSize: "1rem",
    opacity: 0.9,
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected
      ? "#4b7d3b"
      : state.isFocused
      ? "#8ba44e"
      : "transparent",
    color: state.isSelected || state.isFocused ? "#fff" : "#333",
  }),
  singleValue: (provided) => ({
    ...provided,
    color: "#333",
  }),
};

const ReactantSelection = ({ setReactionDetails }) => {
  const [reactant1, setReactant1] = useState("");
  const [reactant2, setReactant2] = useState("");
  const [filteredReactants, setFilteredReactants] = useState([]);

  // Extract unique reactants from the database
  const getUniqueReactants = (reactionKey) => {
    const reactants = reactions.map((reaction) => reaction[reactionKey]);
    return [...new Set(reactants)];
  };

  const reactant1Options = getUniqueReactants("reactant1").map((reactant) => ({
    label: reactant,
    value: reactant,
  }));

  const handleReactant1Change = (selectedOption) => {
    const selectedReactant = selectedOption.value;
    setReactant1(selectedReactant);

    // Filter `reactions` to find valid `reactant2` options for the selected `reactant1`
    const reactant2Map = new Map();

    const validReactants = reactions
      .filter((reaction) => reaction.reactant1 === selectedReactant)
      .map((reaction) => {
        const key = `${reaction.reactant2}-${reaction.condition || "default"}`;

        // Append the condition to the label if it exists
        const label = reaction.condition
          ? `${reaction.reactant2} (${reaction.condition})`
          : reaction.reactant2;

        // Store each unique reactant-condition pair in the map
        if (!reactant2Map.has(key)) {
          reactant2Map.set(key, { label, value: reaction.reactant2 });
        }
        return null;
      });

    // Convert the map to an array for react-select options
    setFilteredReactants(Array.from(reactant2Map.values()));
  };

  const handleReactant2Change = (selectedOption) => {
    const selectedReactant = selectedOption.value;
    setReactant2(selectedReactant);

    // Find the reaction details based on selected reactants
    const reaction = reactions.find(
      (reaction) =>
        reaction.reactant1 === reactant1 &&
        reaction.reactant2 === selectedReactant
    );
    setReactionDetails(reaction);
  };

  // Reset function to clear all selections
  const handleReset = () => {
    setReactant1("");
    setReactant2("");
    setFilteredReactants([]);
    setReactionDetails(null);
  };

  return (
    <div className="reactant-selection">
      <Select
        styles={customSelectStyles}
        options={reactant1Options}
        onChange={handleReactant1Change}
        value={reactant1 ? { label: reactant1, value: reactant1 } : null}
        placeholder="Select Reactant 1"
      />

      {reactant1 && (
        <Select
          styles={customSelectStyles}
          options={filteredReactants}
          onChange={handleReactant2Change}
          value={reactant2 ? { label: reactant2, value: reactant2 } : null}
          placeholder="Select Reactant 2"
        />
      )}

      {reactant1 && reactant2 && (
        <button className="reset-button" onClick={handleReset}>
          Reset
        </button>
      )}
    </div>
  );
};

export default ReactantSelection;
