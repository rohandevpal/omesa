import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function UpcomingEvents() {
  const [events, setEvents] = useState([]);

  const token = import.meta.env.VITE_NOCODB_ACCESS_TOKEN;
  const TABLE_ID = "mn1rd11ywqupb8x";
  const API_BASE = "https://app.nocodb.com/api/v2";

  /* ---------- helper: extract signedUrl ---------- */
  const signedUrlFor = (att) => {
    if (!att || typeof att !== "object") return null;

    return (
      att.signedUrl ||
      att.signed_url ||
      att.signedURL ||
      att.thumbnails?.card_cover?.signedUrl ||
      att.thumbnails?.small?.signedUrl ||
      att.thumbnails?.tiny?.signedUrl ||
      null
    );
  };

  /* ---------- fetch events ---------- */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `${API_BASE}/tables/${TABLE_ID}/records`,
          {
            headers: {
              "xc-token": token,
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const list = res.data?.list || [];

        const formatted = list.map((item) => {
          const rawImages =
            item.image || item.images || item.Image || [];

          return {
            id: item.Id,
            title: item.Title,
            description: item.description,
            date: item.Date,
            address: item.Address,
            image:
              Array.isArray(rawImages) && rawImages.length > 0
                ? signedUrlFor(rawImages[0])
                : null,
          };
        });

        setEvents(formatted);
      } catch (error) {
        console.error("❌ UpcomingEvents error:", error);
      }
    };

    if (token) fetchData();
  }, [token]);

  return (
    <div className="min-h-screen bg-[#010616] mt-20">
      <main className="px-6 py-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

          {events.map((event) => (
            <div
              key={event.id}
              className="relative group h-80 rounded-lg overflow-hidden shadow-lg"
            >
              {/* IMAGE */}
              <img
                src={event.image || "/placeholder.svg"}
                alt={event.title}
                className="w-full h-full object-cover"
              />

              {/* HOVER OVERLAY */}
              <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition duration-300 flex flex-col justify-end p-6">

                <p className="text-sm text-gray-300 font-[textFont] mb-1">
                  {event.address}
                </p>

                <h3 className="text-xl font-[heading] text-white mb-2">
                  {event.title}
                </h3>

                <p className="text-gray-300 text-sm leading-relaxed font-[textFont] mb-4 line-clamp-3">
                  {event.description}
                </p>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-400 tracking-wider mb-1 font-[textFont]">
                      TIME
                    </p>
                    <p className="text-sm text-white font-[textFont]">
                      {event.date}
                    </p>
                  </div>

                  {/* 👉 DETAIL PAGE LINK */}
                  <Link
                    to={`/events/${event.id}`}
                    className="flex items-center text-sm font-[textFont] text-blue-400 hover:text-blue-300 transition"
                  >
                    VIEW LOCATION
                    <i className="fas fa-plus ml-2 text-xs"></i>
                  </Link>
                </div>
              </div>
            </div>
          ))}

        </div>
      </main>
    </div>
  );
}
