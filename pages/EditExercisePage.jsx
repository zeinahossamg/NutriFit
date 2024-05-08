import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const EditExercisePage = ({ updateExerciseSubmit }) => {
  const exercise = useLoaderData();
  const [title, setTitle] = useState(exercise.title);
  const [muscleGroup, setMuscleGroup] = useState(exercise.muscleGroup);
  const [description, setDescription] = useState(exercise.description);
  const [difficultyLevel, setDifficultyLevel] = useState(exercise.difficultyLevel);
  const [equipmentNeeded, setEquipmentNeeded] = useState(exercise.equipmentNeeded);

  const navigate = useNavigate();
  const { id } = useParams();

  const submitForm = (e) => {
    e.preventDefault();

    const updatedExercise = {
      id,
      title,
      muscleGroup,
      description,
      difficultyLevel,
      equipmentNeeded,
    };

    updateExerciseSubmit(updatedExercise);

    toast.success('Exercise Updated Successfully');

    return navigate(`/exercises/${id}`);
  };

  return (
    <section className="bg-indigo-50">
      <div className="container m-auto max-w-2xl py-24">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <form onSubmit={submitForm}>
            <h2 className="text-3xl text-center font-semibold mb-6">Edit Exercise</h2>



            <div>
              <button
                className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Update Exercise
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default EditExercisePage;
