import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

/* ================= IMAGE MODAL ================= */
const ImageModal = ({ image, onClose }) => {
  if (!image) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center">
      <button
        onClick={onClose}
        className="absolute top-6 right-6 text-white text-3xl font-[textFont]"
      >
        ✕
      </button>

      <img
        src={image}
        alt="Preview"
        className="max-w-[90%] max-h-[90%] rounded-lg shadow-xl"
      />
    </div>
  );
};

/* ================= MAIN COMPONENT ================= */
export default function CaseStudies() {
  const [caseStudies, setCaseStudies] = useState([]);
  const [previewImage, setPreviewImage] = useState(null);

  const token = import.meta.env.VITE_NOCODB_ACCESS_TOKEN;

  /* ---------- helper: signed url ---------- */
  const signedUrlFor = (att) => {
    if (!att || typeof att !== "object") return null;

    return (
      att.signedUrl ||
      att.signed_url ||
      att.thumbnails?.card_cover?.signedUrl ||
      att.thumbnails?.small?.signedUrl ||
      att.thumbnails?.tiny?.signedUrl ||
      null
    );
  };

  /* ---------- fetch data ---------- */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          "https://app.nocodb.com/api/v2/tables/mnw2o8jh7xtlid3/records",
          {
            headers: {
              "xc-token": token,
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const list = res.data?.list || [];

        const formatted = list.map((item) => {
          const rawImages = item.image || item.images || [];

          return {
            id: item.Id,
            title: item.Title,
            shortDesc: item.shortDesc,
            image:
              Array.isArray(rawImages) && rawImages.length > 0
                ? signedUrlFor(rawImages[0])
                : null,
          };
        });

        setCaseStudies(formatted);
      } catch (err) {
        console.error("❌ CaseStudies error:", err);
      }
    };

    if (token) fetchData();
  }, [token]);

  return (
    <section className="bg-[#010616] min-h-screen pt-32 pb-32 mt-32">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {caseStudies.map((study, index) => (
            <div
              key={study.id}
              className={`group cursor-pointer ${
                index % 2 === 0
                 ? "mt-12 lg:mt-1"
                          : "mt-0 lg:-mt-16"
              }`}
            >
              {/* IMAGE CARD */}
              <div className="relative rounded-2xl overflow-hidden">
                <img
                  src={study.image || "/placeholder.svg"}
                  alt={study.title}
                  className="w-full h-72 sm:h-80 lg:h-[420px] object-cover"
                />

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/55 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-6">
                  <h3 className="text-white text-xl font-[heading] mb-2">
                    {study.title}
                  </h3>

                  <p className="text-gray-300 text-sm mb-4 line-clamp-3 font-[textFont]">
                    {study.shortDesc}
                  </p>

                  <div className="flex justify-end">
                    <Link
                      to={`/case-studies/${study.id}`}
                      className="w-14 h-14 border border-white/40 rounded-full flex items-center justify-center text-white"
                    >
                      <i className="fa-solid fa-arrow-right"></i>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* IMAGE MODAL */}
      <ImageModal
        image={previewImage}
        onClose={() => setPreviewImage(null)}
      />
    </section>
  );
}
