import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import exercisesData from '../jobs.json';

const AddExercisePage = () => {
  const [title, setTitle] = useState('');
  const [muscleGroup, setMuscleGroup] = useState('');
  const [description, setDescription] = useState('');
  const [difficultyLevel, setDifficultyLevel] = useState('Beginner');
  const [equipmentNeeded, setEquipmentNeeded] = useState('');

  const navigate = useNavigate();

  const submitForm = (e) => {
    e.preventDefault();

    const newExercise = {
      title,
      muscleGroup,
      description,
      difficultyLevel,
      equipmentNeeded,
    };


    fetch('http://localhost:5000/exercises', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newExercise),
    })
      .then(response => response.json())
      .then(exercise => console.log(exercise));


    toast.success('Exercise Added Successfully');

    return navigate('/exercises');
  };

  return (
    <section className="bg-indigo-50">
      <div className="container m-auto max-w-2xl py-24">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">

        </div>
      </div>
    </section>
  );
};

export default AddExercisePage;
