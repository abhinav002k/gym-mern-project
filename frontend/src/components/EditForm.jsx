import "./EditForm.css";
import { useContext, useEffect, useState } from "react"
import { WorkoutContext } from "../context/WorkoutContext";

function EditForm({ open, onClose, workout }) {
    
    const { dispatch } = useContext(WorkoutContext);
    const[title,setTitle]=useState('');
    const[load,setLoad]=useState('');
    const[reps,setReps]=useState('');

    useEffect(() => {
        if (workout) {
            setTitle(workout.title);
            setLoad(workout.load);
            setReps(workout.reps);
        }
    }, [workout]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        // Handle form submission to update workout
        const res = await fetch(`/api/workouts/${workout._id}`, {
            method: "PATCH",
            body: JSON.stringify({title, load, reps}),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const json = await res.json();
        if (res.ok) {
            // Dispatch the update action
            dispatch({ type: "UPDATE_WORKOUT", payload: json });
            onClose();
        }
    };


  if (!open) return null;

  return (
    <>
      {open && (
        <div className="modal">
          <div onClick={onClose} className="overlay"></div>
          <div className="modal-content">
            <h2>Edit Excersize</h2>
            <span className="material-symbols-outlined" onClick={onClose}>
              Cancel
            </span>

            <form onSubmit={handleSubmit}>
              <label htmlFor="excersize-input">Excersize Title: </label>
              <input
                type="text"
                id="excersize-input"
                placeholder="Enter the Excersize"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
              />

              <label htmlFor="load-input">Excersize Load (in kg): </label>
              <input
                type="number"
                id="load-input"
                placeholder="Enter the Load"
                onChange={(e) => setLoad(e.target.value)}
                value={load}
              />

              <label htmlFor="reps-input">Excersize Reps: </label>
              <input
                type="number"
                id="reps-input"
                placeholder="Enter the No. of Reps"
                onChange={(e) => setReps(e.target.value)}
                value={reps}
              />

              <button className="material-symbols-outlined">Check</button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default EditForm;
