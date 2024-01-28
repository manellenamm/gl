import React from "react";
import { useForm } from "react-hook-form";
import { useLocation, useParams } from 'react-router-dom';
import "react-datepicker/dist/react-datepicker.css";
import "./Appointment.css";
import Header from "../New folder/search section/header/header";

export default function Appointment(props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { id_client, id_avocat } = useParams();
  const location = useLocation();
  console.log("id_client:", id_client);
  console.log("id_avocat:", id_avocat);

  const onSubmit = (data) => {
    fetch(`http://127.0.0.1:8000/appointments/${id_avocat}/${id_client}/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // Assurez-vous d'envoyer les données au format JSON
      },
      body: JSON.stringify({
        date_time: data.appointmentDate,
        time: data.appointmentTime,
      }),
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        // Vous pouvez ajouter une redirection ou effectuer d'autres actions après la création de l'appointment
      })
      .catch(error => {
        console.error('Error creating appointment:', error);
      });
  };

  return (
    <section>
      <Header />
      <div className="register">
        <div className="col-2">
          <img src="/images/appointment.jpg" alt="appointment" />
        </div>
        <div className="col-1">
          <h2>Make an appointment</h2>
          <form
            id="form"
            className="flex flex-col"
            onSubmit={handleSubmit(onSubmit)}
          >
            {/* Champ d'heure */}
            <select {...register("appointmentTime", { required: true })}>
            <option value="" disabled selected>Select a time</option>
            <option value="8:00">8:00</option>
            <option value="9:00">9:00</option>
            <option value="10:00">10:00</option>
            <option value="11:00">11:00</option>
            <option value="13:00">13:00</option>
            <option value="14:00">14:00</option>
            <option value="15:00">15:00</option>
          </select>
          {errors.appointmentTime?.type === "required" && "Time is required"}

            {/* Champ de date */}
            <div>
              <div>
                <input
                  type='date'
                  {...register("appointmentDate", { required: true })}
                  className="w-96 text-3xl rounded-lg"
                />
                {errors.appointmentDate?.type === "required" && "Date is required"}
              </div>
            </div>

            <button type="submit" className="btn">Sign In</button>
          </form>
        </div>
      </div>
    </section>
  );
}