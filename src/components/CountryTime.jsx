import { useState, useEffect } from "react";

export default function CountryTime({ timezones }) {
  const [times, setTimes] = useState([]);

  useEffect(() => {
    if (!timezones || timezones.length === 0) return;

    const update = () => {
      const now = new Date();
      const result = timezones.slice(0, 3).map((tz) => {
        // tz viene como "UTC+05:30" o "UTC-03:00" o "UTC"
        try {
          // Convertir "UTC+05:30" a offset en minutos
          const match = tz.match(/UTC([+-])(\d{2}):(\d{2})/);
          let offsetMinutes = 0;
          if (match) {
            const sign = match[1] === '+' ? 1 : -1;
            offsetMinutes = sign * (parseInt(match[2]) * 60 + parseInt(match[3]));
          }
          const utcMs = now.getTime() + now.getTimezoneOffset() * 60000;
          const local = new Date(utcMs + offsetMinutes * 60000);
          return {
            tz,
            time: local.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
            date: local.toLocaleDateString('es-ES', { weekday: 'short', day: 'numeric', month: 'short' }),
          };
        } catch {
          return { tz, time: '--:--:--', date: '---' };
        }
      });
      setTimes(result);
    };

    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [timezones]);

  if (!times.length) return null;

  return (
    <div className="country-time">
      <span className="detail-label">🕐 Hora actual:</span>
      <div className="time-list">
        {times.map((t) => (
          <div key={t.tz} className="time-item">
            <span className="time-tz">{t.tz}</span>
            <span className="time-value">{t.time}</span>
            <span className="time-date">{t.date}</span>
          </div>
        ))}
      </div>
    </div>
  );
}