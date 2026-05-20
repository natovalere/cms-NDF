import { useState } from "react";
import { User, Phone, Mail, FileText, Clock, AlertCircle } from "lucide-react";

interface Appointment {
  id: number;
  patient: string;
  phone: string;
  email: string;
  service: string;
  date: string;
  message: string;
  time: string;
  status: "pending" | "waiting" | "confirmed";
}

export function AppointmentPage() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    service: "",
    date: "",
    message: "",
  });

  const [errors, setErrors] = useState({
    phone: "",
    email: "",
  });

  const phoneRegex = /^\+228\d{8}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setErrors({
      ...errors,
      [e.target.name]: "",
    });
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = {
      phone: "",
      email: "",
    };

    if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = "Numéro invalide. Exemple : +22890123456";
      valid = false;
    }

    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = "Adresse email invalide.";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const existingAppointments = localStorage.getItem("appointments");
      let appointments: Appointment[] = [];

      if (existingAppointments) {
        appointments = JSON.parse(existingAppointments);
      }

      const newAppointment: Appointment = {
        id: Date.now(),
        patient: formData.name,
        phone: formData.phone,
        email: formData.email,
        service: formData.service,
        date: formData.date,
        message: formData.message,
        time: "À confirmer",
        status: "pending",
      };

      const updatedAppointments = [...appointments, newAppointment];
      localStorage.setItem("appointments", JSON.stringify(updatedAppointments));

      alert("Votre demande de rendez-vous a été enregistrée avec succès.");

      setFormData({
        name: "",
        phone: "",
        email: "",
        service: "",
        date: "",
        message: "",
      });
    } catch (error) {
      console.error(error);
      alert("Une erreur est survenue. Veuillez réessayer.");
    }
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl mb-4 text-[#1F2937]">Prendre rendez-vous</h1>
          <p className="text-xl text-[#6B7280]">
            Remplissez le formulaire ci-dessous.
          </p>
        </div>

        <div className="bg-yellow-50 border border-yellow-300 rounded-xl p-4 mb-6 flex items-start gap-3">
          <AlertCircle className="w-6 h-6 text-yellow-600 mt-1" />
          <p className="text-yellow-800">
            Nous sommes disponibles
            <strong> 24h/24 et 7j/7</strong>.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="flex items-center gap-2 mb-2">
                <User className="w-5 h-5 text-[#2563EB]" />
                Nom complet *
              </label>

              <input
                id="name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border-2 rounded-xl"
              />
            </div>

            <div>
              <label htmlFor="phone" className="flex items-center gap-2 mb-2">
                <Phone className="w-5 h-5 text-[#10B981]" />
                Téléphone *
              </label>

              <input
                id="phone"
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                placeholder="+228 90123456"
                className="w-full px-4 py-3 border-2 rounded-xl"
              />

              {errors.phone && (
                <p className="text-amber-700 text-sm mt-1">{errors.phone}</p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="flex items-center gap-2 mb-2">
                <Mail className="w-5 h-5 text-[#10B981]" />
                Email
              </label>

              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="exemple@gmail.com"
                className="w-full px-4 py-3 border-2 rounded-xl"
              />

              {errors.email && (
                <p className="text-amber-700 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            <div>
              <label htmlFor="service" className="flex items-center gap-2 mb-2">
                <FileText className="w-5 h-5 text-[#2563EB]" />
                Service *
              </label>

              <select
                id="service"
                name="service"
                value={formData.service}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border-2 rounded-xl"
              >
                <option value="">Sélectionnez un service</option>
                <option value="Consultation générale">
                  Consultation générale
                </option>
                <option value="Pédiatrie">Pédiatrie</option>
                <option value="Echographie">Echographie</option>
                <option value="Gynécologie">Gynécologie</option>
                <option value="Ophtalmologie">Ophtalmologie</option>
                <option value="Cardiologie">Cardiologie</option>
                <option value="Dermatologie">Dermatologie</option>
                <option value="Rhumatologie">Rhumatologie</option>
                <option value="Maternité">Maternité</option>
                <option value="Kinésithérapie">Kinésithérapie</option>
                <option value="Hospitalisation">Hospitalisation</option>
              </select>
            </div>

            <div>
              <label htmlFor="message" className="flex items-center gap-2 mb-2">
                <FileText className="w-5 h-5 text-[#2563EB]" />
                Message
              </label>

              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-3 border-2 rounded-xl"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-[#2563EB] to-[#10B981] text-white py-4 rounded-xl"
            >
              Demander un rendez-vous
            </button>
          </form>
        </div>

        <div className="bg-white rounded-xl p-6 border-2 mt-8">
          <div className="flex items-center gap-3 mb-3">
            <Clock className="w-6 h-6 text-[#2563EB]" />
            <h3 className="text-xl">Horaires</h3>
          </div>

          <p>
            Consultation générale :<strong> 24h/24, 7j/7</strong>
          </p>
        </div>
      </div>
    </div>
  );
}
