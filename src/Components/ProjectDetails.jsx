import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function ProjectDetail() {
  const { id } = useParams(); // URL se recordId
  const [project, setProject] = useState(null);

  const token = import.meta.env.VITE_NOCODB_ACCESS_TOKEN;
  const TABLE_ID = "mebdphs2dx4f1m3";
  const API_BASE = import.meta.env.VITE_NOCODB_API_BASE || "https://app.nocodb.com/api/v2";

  // Helper: get signedUrl from attachment (top-level -> thumbnails.card_cover -> small -> tiny)
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

  useEffect(() => {
    const fetchProject = async () => {
      if (!token) {
        console.error("⚠️ Missing NocoDB token. Set VITE_NOCODB_ACCESS_TOKEN in .env");
        return;
      }

      try {
        const url = `${API_BASE}/tables/${TABLE_ID}/records/${id}`;
        const res = await axios.get(url, {
          headers: {
            "xc-token": token, // preferred per your earlier usage
            Authorization: `Bearer ${token}`, // harmless fallback
            "Content-Type": "application/json",
          },
        });

        console.log("🔥 Portfolio Detail Response:", res.data);

        const item = res?.data ?? null;
        if (!item) {
          setProject(null);
          return;
        }

        // Defensive extraction of fields
        const title = item.Title || item.title || item.name || "";
        const longDesc = item.LongDescription || item.longdescription || item.description || "";
        const category = item.category || item.Category || "";
        const date = item.date || item.Date || "";

        // attachments are usually in 'images' (lowercase) per your data, but check variants
        const rawImages = item.images || item.Images || item.image || item.Image || [];

        // map to signedUrl-only images array
        const images =
          Array.isArray(rawImages) && rawImages.length > 0
            ? rawImages
                .map((att) => {
                  const signed = signedUrlFor(att);
                  if (!signed) return null; // ignore attachments without signed url
                  return {
                    title: att.title || att.name || null,
                    url: signed,
                    raw: att,
                  };
                })
                .filter(Boolean)
            : [];

        // log for debug
        if (images.length > 0) {
          console.log(`Project ${id} -> signed images:`, images.map((i) => i.url));
        } else {
          console.log(`Project ${id} -> no signed images found`);
        }

        setProject({
          id: item.Id ?? item.id ?? id,
          title,
          longDesc,
          category,
          date,
          images,
          raw: item,
        });
      } catch (error) {
        console.error("❌ Error fetching project detail:", error.response?.data || error);
        setProject(null);
      }
    };

    if (id) fetchProject();
  }, [id, token, TABLE_ID, API_BASE]);

  if (!project)
    return <div className="text-white p-10">Loading project...</div>;

  // Primary image: prefer first signedUrl, fallback to placeholder
  const primaryImage = project.images?.[0]?.url || "/placeholder.svg";

  return (
    <div className="h-full w-full bg-[#010616]">
      {/* Banner */}
      <div className="h-60 bg-gradient-to-r from-[#03051E] via-[#0e1f4b] to-[#1D53B7]"></div>

      <div className="h-full bg-[#010616] text-white p-4 md:p-8">
        {/* Info Section */}
        <div className="max-w-6xl mx-auto border border-gray-800 rounded-lg p-6 mb-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <h3 className="font-[HeadingFont] text-fs-20 font-semibold mb-2">
                Client Name
              </h3>
              <p className="text-gray-400 font-[textFont] text-fs-16 font-light">
                {project.title}
              </p>
            </div>
            <div>
              <h3 className="font-[HeadingFont] text-fs-20 font-semibold mb-2">
                Project Date
              </h3>
              <p className="text-gray-400 font-[textFont] text-fs-16 font-light">
                {project.date}
              </p>
            </div>
            <div>
              <h3 className="font-[HeadingFont] text-fs-20 font-semibold mb-2">
                Project Type
              </h3>
              <p className="text-gray-400 font-[textFont] text-fs-16 font-light">
                {project.category}
              </p>
            </div>
          </div>
        </div>

        {/* Overview Section */}
        <div className="max-w-6xl mx-auto mb-24">
          <div className="flex flex-col md:flex-row lg:gap-12">
            <div className="md:w-1/4">
              <span className="inline-block mt-[20px] py-2 px-4 rounded-full text-fs-12 font-semibold font-[HeadingFont] border-2 border-gray-500 ">
                PROJECT OVERVIEW
              </span>
            </div>
            <div className="md:w-3/4">
              <h2 className="text-fs-32 font-normal md:text-4xl text-gray-300 font-[HeadingFont] mb-6">
                {project.title}
              </h2>
              <p className="text-gray-400 mb-8 text-fs-20 font-[textFont]">
                {project.longDesc}
              </p>

              <div className="grid grid-cols-1">
                <div className="rounded-lg overflow-hidden">
                  <img
                    src={primaryImage}
                    alt={project.title}
                    className="w-full h-auto object-cover"
                    onError={(e) => {
                      e.currentTarget.src = "/placeholder.svg";
                    }}
                    loading="lazy"
                  />
                </div>

                {/* Additional images (if any) */}
                {project.images && project.images.length > 1 && (
                  <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {project.images.slice(1).map((img, idx) => (
                      <img
                        key={idx}
                        src={img.url}
                        alt={img.title || `${project.title} ${idx + 2}`}
                        className="w-full h-44 object-cover rounded"
                        onError={(e) => {
                          e.currentTarget.src = "/placeholder.svg";
                        }}
                        loading="lazy"
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Future: Final Result Section (video etc) */}
      </div>
    </div>
  );
}
