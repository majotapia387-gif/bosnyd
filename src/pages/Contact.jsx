import { useState } from "react";
import { supabase } from "../lib/supabaseClient";

function Contact() {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [feedbackType, setFeedbackType] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setLoading(true);
    setFeedback("");
    setFeedbackType("");

    try {
      const { error } = await supabase
        .from("contact_requests")
        .insert([formData]);

      if (error) {
        console.error("Error al enviar la solicitud:", error.message);
        setFeedback(
          "No pudimos enviar tu solicitud. Inténtalo nuevamente."
        );
        setFeedbackType("error");
        return;
      }

      setFeedback("Tu solicitud fue enviada correctamente.");
      setFeedbackType("success");

      setFormData({
        full_name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      console.error("Error inesperado:", error);

      setFeedback(
        "Ocurrió un error al enviar tu solicitud. Inténtalo nuevamente."
      );
      setFeedbackType("error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="contact" id="contact-form">
      <div className="contact__container">
        <div className="contact__header">
          <p className="contact__eyebrow">ESTAMOS PARA TI</p>

          <h2>Hablemos.</h2>

          <p className="contact__description">
            ¿Tienes alguna pregunta sobre BOSNYD?
            Escríbenos y estaremos encantados de atenderte.
          </p>

          <div className="contact__signature">
            BOSNYD — Hecho para destacar en el día a día.
          </div>
        </div>

        <form className="contact__form" onSubmit={handleSubmit}>
          <div className="contact__field">
            <label htmlFor="full_name">Nombre completo</label>

            <input
              id="full_name"
              name="full_name"
              type="text"
              autoComplete="name"
              placeholder="Escribe tu nombre"
              value={formData.full_name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="contact__field">
            <label htmlFor="email">Correo electrónico</label>

            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="nombre@correo.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="contact__field">
            <label htmlFor="phone">Teléfono (opcional)</label>

            <input
              id="phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              placeholder="Tu número de contacto"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>

          <div className="contact__field">
            <label htmlFor="subject">Motivo de contacto</label>

            <select
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
            >
              <option value="">Selecciona una opción</option>
              <option value="Información sobre productos">
                Información sobre productos
              </option>
              <option value="Pedidos">Pedidos</option>
              <option value="Disponibilidad">Disponibilidad</option>
              <option value="Otro">Otro</option>
            </select>
          </div>

          <div className="contact__field contact__field--full">
            <label htmlFor="message">Mensaje</label>

            <textarea
              id="message"
              name="message"
              rows="5"
              placeholder="Cuéntanos cómo podemos ayudarte..."
              value={formData.message}
              onChange={handleChange}
              required
            />
          </div>

          <div className="contact__actions">
            <button
              className="contact__button"
              type="submit"
              disabled={loading}
            >
              {loading ? "Enviando..." : "Enviar solicitud"}
            </button>

            {feedback && (
              <p
                className={`contact__feedback contact__feedback--${feedbackType}`}
                role="status"
              >
                {feedback}
              </p>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}

export default Contact;