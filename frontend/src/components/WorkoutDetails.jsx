// date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'



function WorkoutDetails({workout}){

    const handleClick=async()=>{
        const res=await fetch(`/api/workouts/${workout._id}`,{
            method:'DELETE'
        })
        const json=await res.json()

        if(res.ok){
            console.log(json)
        }
    }

    return(
        <div className="workout-details">
            <h4>{workout.title}</h4>
            <p><strong>Load(kg): </strong>{workout.load}</p>
            <p><strong>Number of reps: </strong>{workout.reps}</p>
            <p>{formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}</p>
            <span className="material-symbols-outlined" onClick={handleClick}>Delete</span>
        </div>
    )
}

export default WorkoutDetails;