import React, { useState } from "react";

const SetTimeSlots = () => {
    const [timeSlots, setTimeSlots] = useState([]);
    const [newSlot, setNewSlot] = useState("");

    const addTimeSlot = () => {
        if (newSlot.trim() !== "") {
            setTimeSlots([...timeSlots, newSlot]);
            setNewSlot("");
        }
    };

    const removeSlot = (index) => {
        setTimeSlots(timeSlots.filter((_, i) => i !== index));
    };

    return (
        <div>
            <h3>Set Available Time Slots</h3>
            <input
                type="time"
                value={newSlot}
                onChange={(e) => setNewSlot(e.target.value)}
            />
            <button onClick={addTimeSlot}>Add Slot</button>

            <ul>
                {timeSlots.map((slot, index) => (
                    <li key={index}>
                        {slot} <button onClick={() => removeSlot(index)}>Remove</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SetTimeSlots;
