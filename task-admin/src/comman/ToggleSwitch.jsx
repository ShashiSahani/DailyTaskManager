import React, { useState } from "react";
import axios from "axios";

const ToggleSwitch = ({ checked, id, endpoint, onUpdate }) => {
  const [isChecked, setIsChecked] = useState(checked);
  const [loading, setLoading] = useState(false);

  const handleToggle = async () => {
    const updatedValue = !isChecked;
    setIsChecked(updatedValue);
    setLoading(true);

    try {
      const res = await axios.put(`${endpoint}/${id}`, {
        completed: updatedValue,
      });
      onUpdate?.(res.data);
    } catch (err) {
      console.error("Toggle failed:", err);
      setIsChecked(!updatedValue); // Revert if failed
    } finally {
      setLoading(false);
    }
  };

  return (
    <label className="inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        className="sr-only peer"
        checked={isChecked}
        onChange={handleToggle}
        disabled={loading}
      />
      <div className="w-11 h-6 bg-gray-300 peer-checked:bg-blue-600 rounded-full relative transition-colors duration-300">
        <div className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform duration-300 transform peer-checked:translate-x-5" />
      </div>
    </label>
  );
};

export default ToggleSwitch;
