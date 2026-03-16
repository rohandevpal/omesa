import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

/* ---------- slug helper ---------- */

const SERVICE_TAB_MAP = {
  1: "Advertising & Brand Consulting",
  2: "Exhibition Design & Turnkey Solutions",
  3: "Events, Conferences & Hospitality",
  4: "Murals & Installations",
  5: "Digital & Media Production",
  6: "Interactive Exhibits & Displays",
  7: "Omesa Arts",
};
const toSlug = (text) =>
  text
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const ServiceDetailPage = () => {
  const { id } = useParams(); // slug / id from URL
  const [service, setService] = useState(null);

  const token = import.meta.env.VITE_NOCODB_ACCESS_TOKEN;

  /* ---------- stable image url ---------- */
  const getImageUrl = (recordId, column = "image") => {
    return `https://app.nocodb.com/api/v2/tables/m97nb4rvj291dg7/records/${recordId}/download/${column}?access_token=${token}`;
  };

  /* ---------- fetch service ---------- */
  useEffect(() => {
    const fetchService = async () => {
      try {
        const res = await axios.get(
          `https://app.nocodb.com/api/v2/tables/m97nb4rvj291dg7/records/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const item = res.data;

        if (item) {
          setService({
            id: item.Id,
            title: item.Title,
            oneLiner: item.OneLiner,
            description: item.description,
            longDesc: item.Long_Description,
            related: item.Related_services,
            image: item.image ? getImageUrl(item.Id, "image") : null,
          });
        }
      } catch (error) {
        console.error("❌ Error fetching service:", error);
      }
    };

    fetchService();
  }, [id, token]);

  if (!service) {
    return <div className="text-white p-10">Loading service details...</div>;
  }

  return (
    <div className="h-full w-full bg-[#010616]">
      {/* HEADER */}
      <div className="h-60 bg-gradient-to-r from-[#03051E] via-[#0e1f4b] to-[#1D53B7]" />

      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* MAIN CONTENT */}
          <div className="lg:col-span-2 space-y-8">
            {/* IMAGE */}
            <img
              src={
                service.image ||
                "https://kit.wof-pack.com/sirion/wp-content/uploads/sites/6/2025/02/developers-searching-for-bugs-1024x682.jpg"
              }
              alt={service.title}
              className="w-full h-[400px] object-cover rounded-lg"
            />

            {/* TEXT */}
            <div className="space-y-4">
              <h3 className="bg-gradient-to-r from-gray-500 via-neutral-300 to-slate-200 bg-clip-text text-transparent font-[heading] text-3xl leading-loose">
                {service.oneLiner}
              </h3>

              <p className="text-gray-300 leading-loose text-lg font-[textFont]">
                {service.longDesc}
              </p>
            </div>

            {/* PORTFOLIO BUTTON */}
            <Link
              to={`/portfolio${SERVICE_TAB_MAP[id]
                  ? `?tab=${encodeURIComponent(SERVICE_TAB_MAP[id])}`
                  : ""
                }`}
            >
              <button className="bg-white rounded-full py-2 px-7 border-2 font-[textFont] border-gray-300 text-gray-950 hover:bg-transparent hover:text-white transition">
                Portfolio
                <i className="fa-solid fa-arrow-right pl-2"></i>
              </button>
            </Link>
          </div>

          {/* SIDEBAR */}
          <div className="space-y-6">
            {/* RELATED SERVICES */}
            <div className="bg-slate-900 border border-slate-800 rounded-lg">
              <div className="p-6">
                <h3 className="text-xl font-[heading] text-gray-300 mb-6">
                  Related Services
                </h3>

                <ul className="list-disc ml-5">
                  {service.related
                    ?.split("\n")
                    .filter(Boolean)
                    .map((item, index) => (
                      <li key={index} className="py-2">
                        <Link
                          to={`/service/details/${toSlug(item)}`}
                          className="text-gray-300 text-xl font-normal font-[textFont] hover:text-blue-600 transition"
                        >
                          {item}
                        </Link>
                      </li>
                    ))}
                </ul>
              </div>
            </div>

            {/* INQUIRY FORM */}
            <div className="bg-slate-900 border border-slate-800 rounded-lg">
              <div className="p-6">
                <h3 className="text-xl font-[heading] text-white mb-4">
                  Send Us An Inquiry
                </h3>

                <form className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      placeholder="Your Name"
                      className="bg-slate-800 border border-slate-700 text-white p-2 rounded"
                    />
                    <input
                      type="email"
                      placeholder="Your Email"
                      className="bg-slate-800 border border-slate-700 text-white p-2 rounded"
                    />
                  </div>

                  <input
                    placeholder="Subject"
                    className="bg-slate-800 border border-slate-700 text-white p-2 rounded w-full"
                  />

                  <textarea
                    rows={4}
                    placeholder="Your Message"
                    className="bg-slate-800 border border-slate-700 text-white p-2 rounded w-full"
                  />

                  <button
                    type="submit"
                    className="bg-gradient-to-r from-[#03051E] via-[#0e1f4b] to-[#1D53B7] text-gray-300 px-4 py-2 rounded"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetailPage;
