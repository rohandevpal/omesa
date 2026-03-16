import { useState, useEffect } from "react";
import axios from "axios";

export default function ClientSlider() {
  const [logos, setLogos] = useState([]);

  const tableId = "m382v6jmtock4gv";
  const token = import.meta.env.VITE_NOCODB_ACCESS_TOKEN;

  useEffect(() => {
    const fetchData = async () => {
      const url = `https://app.nocodb.com/api/v2/tables/${tableId}/records`;
      try {
        const res = await axios.get(url, {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log("🔍 Raw API Response:", res.data);

        const list = res?.data?.list;
        if (!list || !Array.isArray(list)) {
          console.error("⚠️ 'list' missing or not an array:", res.data);
          return;
        }

        const formatted = list.map((row) => {
          // defensive extraction of name
          const name = row?.logoname || row?.name || "client";

          // row.logoImage can be:
          // - an array of file objects: [{ signedUrl: '...', url: '...' }, ...]
          // - a single object: { signedUrl: '...' }
          // - sometimes a string (rare)
          let logo = "";

          if (Array.isArray(row?.logoImage) && row.logoImage.length > 0) {
            const first = row.logoImage[0];
            logo = first?.signedUrl || first?.url || "";
          } else if (row?.logoImage && typeof row.logoImage === "object") {
            logo = row.logoImage?.signedUrl || row.logoImage?.url || "";
          } else if (typeof row?.logoImage === "string") {
            logo = row.logoImage;
          }

          return {
            id: row?.Id ?? row?.id ?? Math.random().toString(36).slice(2, 9),
            name,
            logo,
          };
        });

        console.log("✨ Formatted logos:", formatted);
        setLogos(formatted);
      } catch (error) {
        console.error("❌ Failed to fetch logos:", error);
      }
    };

    fetchData();
  }, [tableId, token]);

  // Duplicate for marquee effect
  const extendedCompanies = [...logos, ...logos];

  return (
    <div className="w-full bg-[#010616] py-16 overflow-hidden">
      <div className="max-w-6xl mx-auto px-2">
        <h2 className="text-2xl md:text-3xl font-[heading] text-white mb-12 text-center md:text-left">
          Trusted by Companies
        </h2>

        <div className="relative overflow-hidden">
          <div className="marquee-track">
            <div className="marquee-content">
              {extendedCompanies.map((company, index) => (
                <div key={`${company.id}-${index}`} className="logo-item">
                  {company.logo ? (
                    <img
                      src={company.logo}
                      alt={`${company.name} logo`}
                      className="h-12 w-auto object-contain opacity-80 grayscale transition duration-300 hover:opacity-100 hover:grayscale-0"
                      onError={(e) => {
                        // hide broken images
                        e.currentTarget.style.display = "none";
                      }}
                    />
                  ) : (
                    <span className="text-gray-400 text-sm">{company.name}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .marquee-track {
          overflow: hidden;
          position: relative;
          width: 100%;
        }

        .marquee-content {
          display: flex;
          gap: 2rem;
          width: max-content;
          animation: scroll-marquee 40s linear infinite;
        }

        .logo-item {
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          min-width: 150px;
        }

        @keyframes scroll-marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  );
}
