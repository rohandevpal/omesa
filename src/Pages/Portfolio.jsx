import { useState, useEffect } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

/**
 * Portfolio component — uses NocoDB and only uses signedUrl for images.
 */

const ImageModal = ({ image, onClose }) => {
  if (!image) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center">
      <button
        onClick={onClose}
        className="absolute top-8 right-6 text-white text-3xl"
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

const Portfolio = () => {
  const [projects, setProjects] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState("All");
  const [previewImage, setPreviewImage] = useState(null);

  const token = import.meta.env.VITE_NOCODB_ACCESS_TOKEN;

  // helper: return signed url
  const signedUrlFor = (att) => {
    if (!att || typeof att !== "object") return null;

    const top = att.signedUrl || att.signed_url || att.signedURL || null;
    if (top) return top;

    const thumbs = att.thumbnails || att.Thumbnails || null;
    if (thumbs) {
      return (
        thumbs.card_cover?.signedUrl ||
        thumbs.card_cover?.signed_url ||
        thumbs.small?.signedUrl ||
        thumbs.small?.signed_url ||
        thumbs.tiny?.signedUrl ||
        thumbs.tiny?.signed_url ||
        null
      );
    }
    return null;
  };

  // ✅ Fetch portfolio
  useEffect(() => {
    const fetchData = async () => {
      if (!token) return;

      const url = `https://app.nocodb.com/api/v2/tables/mebdphs2dx4f1m3/records`;
      const params = {
        offset: "0",
        limit: "25",
        where: "",
        viewId: "vwal5pb7fqminmz2",
      };

      try {
        const res = await axios.get(url, {
          params,
          headers: {
            "xc-token": token,
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        const list = res.data?.list || [];

        const formatted = list.map((item) => {
          const id = item.Id ?? item.id;
          const title = item.Title || item.title || "";
          const description = item.Description || item.description || "";
          const category = item.Category || item.category || "";

          const rawImages =
            item.images || item.Images || item.image || item.Image || [];

          const images =
            Array.isArray(rawImages) && rawImages.length > 0
              ? rawImages
                  .map((att) => {
                    const signed = signedUrlFor(att);
                    if (!signed) return null;
                    return { url: signed };
                  })
                  .filter(Boolean)
              : [];

          return {
            id,
            title,
            description,
            category,
            images,
          };
        });

        setProjects(formatted);
      } catch (error) {
        console.error("❌ Error fetching portfolio:", error);
      }
    };

    fetchData();
  }, [token]);

  // ✅ Sync tab with URL
  useEffect(() => {
    const tabFromUrl = searchParams.get("tab");

    if (tabFromUrl) {
      const decodedTab = decodeURIComponent(tabFromUrl);
      setActiveTab(decodedTab);
    } else {
      setActiveTab("All");
    }
  }, [searchParams]);

  // Categories
  const categories = [
    "All",
    ...Array.from(
      new Set(projects.map((p) => p.category).filter(Boolean))
    ),
  ];

  const filteredProjects =
    activeTab === "All"
      ? projects
      : projects.filter((p) => p.category === activeTab);

  return (
    <div className="h-full w-full bg-[#010616]">
      {/* Gradient Header */}
      <div className="h-48 sm:h-56 md:h-64 lg:h-72 xl:h-28 w-full bg-gradient-to-r from-[#03051E] via-[#0e1f4b] to-[#1D53B7]"></div>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* ================= TABS SLIDER WITH CUSTOM ARROWS ================= */}
        <nav className="relative mb-8 mt-7">

          {/* 👉 WHITE BOX ARROWS */}
          <div className="absolute right-0 top-12 flex gap-3 z-10">
            <button className="tab-prev w-10 h-10 bg-white rounded flex items-center justify-center">
              ◀
            </button>

            <button className="tab-next w-10 h-10 bg-white rounded flex items-center justify-center">
              ▶
            </button>
          </div>

          <Swiper
            modules={[Navigation]}
            navigation={{
              prevEl: ".tab-prev",
              nextEl: ".tab-next",
            }}
            spaceBetween={10}
            slidesPerView={"auto"}
            className="!px-2"
          >
            {categories.map((category) => (
              <SwiperSlide key={category} style={{ width: "auto" }}>
                <button
                  onClick={() => {
                    setActiveTab(category);

                    if (category === "All") {
                      setSearchParams({});
                    } else {
                      setSearchParams({ tab: category });
                    }
                  }}
                  className={`px-4 py-2 rounded font-[textFont] text-fs-18 font-semibold uppercase transition-colors whitespace-nowrap ${
                    activeTab === category
                      ? "text-blue-600"
                      : "text-slate-300"
                  }`}
                >
                  {category}
                </button>
              </SwiperSlide>
            ))}
          </Swiper>
        </nav>

        {/* ================= PORTFOLIO GRID ================= */}
        <div className="mt-24 columns-1 sm:columns-2 lg:columns-3 gap-6 mb-10">
          {filteredProjects.map((project, index) => {
            const imageUrl =
              project.images && project.images.length > 0
                ? project.images[0].url
                : "/placeholder.svg";

            const height =
              index % 3 === 0
                ? "h-[420px]"
                : index % 3 === 1
                ? "h-[520px]"
                : "h-[360px]";

            return (
              <div
                key={project.id}
                className="mb-6 break-inside-avoid group cursor-pointer"
              >
                <div className="relative rounded-2xl overflow-hidden bg-[#050b24] shadow-lg">
                  <img
                    src={imageUrl}
                    alt={project.title}
                    onError={(e) =>
                      (e.currentTarget.src = "/placeholder.svg")
                    }
                    className={`w-full object-cover transition-transform duration-500 group-hover:scale-105 ${height}`}
                  />

                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end p-5">
                    <div className="flex justify-between items-center w-full">
                      <h3 className="text-white text-lg font-medium">
                        {project.title}
                      </h3>

                      <button
                        onClick={() => setPreviewImage(imageUrl)}
                        className="w-11 h-11 border border-white/40 rounded-full flex items-center justify-center text-white"
                      >
                        👁
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <ImageModal
        image={previewImage}
        onClose={() => setPreviewImage(null)}
      />
    </div>
  );
};

export default Portfolio;
