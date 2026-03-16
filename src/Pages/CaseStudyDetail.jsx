import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function CaseStudyDetail() {
  const { id } = useParams();
  const [study, setStudy] = useState(null);

  const token = import.meta.env.VITE_NOCODB_ACCESS_TOKEN;
  const TABLE_ID = "mnw2o8jh7xtlid3";
  const API_BASE = "https://app.nocodb.com/api/v2";

  const getImageUrl = (recordId, column = "image") =>
    `${API_BASE}/tables/${TABLE_ID}/records/${recordId}/download/${column}?access_token=${token}`;

  useEffect(() => {
    const fetchStudy = async () => {
      try {
        const res = await axios.get(
          `${API_BASE}/tables/${TABLE_ID}/records/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const item = res.data;

        setStudy({
          id: item.Id,
          title: item.Title,
          description: item.description,
          longDesc: item.LongDescription || "",
          descs: [
            item.desc1,
            item.desc2,
            item.desc3,
            item.desc4,
            item.desc5,
            item.desc6,
          ].filter(Boolean),
          image: item.image ? getImageUrl(item.Id) : null,
        });
      } catch (err) {
        console.error("❌ Case study fetch error", err);
      }
    };

    fetchStudy();
  }, [id, token]);

  if (!study) return <div className="text-white p-10">Loading...</div>;

  return (
    <div className="h-full w-full bg-[#010616]">
      {/* Banner (same as portfolio) */}
      <div className="h-60 bg-gradient-to-r from-[#03051E] via-[#0e1f4b] to-[#1D53B7]" />

      <div className="text-white p-4 md:p-8">
        {/* Info Section */}
        <div className="max-w-6xl mx-auto border border-gray-800 rounded-lg p-6 mb-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <h3 className="font-[HeadingFont] text-fs-20 font-semibold mb-2">
                Case Study
              </h3>
              <p className="text-gray-400">{study.title}</p>
            </div>
            <div>
              <h3 className="font-[HeadingFont] text-fs-20 font-semibold mb-2">
                Type
              </h3>
              <p className="text-gray-400">Case Study</p>
            </div>
            <div>
              <h3 className="font-[HeadingFont] text-fs-20 font-semibold mb-2">
                Category
              </h3>
              <p className="text-gray-400">Design / Development</p>
            </div>
          </div>
        </div>

        {/* Overview Section (SAME AS PORTFOLIO) */}
        <div className="max-w-6xl mx-auto mb-24">
          <div className="flex flex-col md:flex-row gap-12">
            <div className="md:w-1/4">
              <span className="inline-block mt-5 py-2 px-4 rounded-full text-fs-12 font-semibold border border-gray-500">
                CASE STUDY OVERVIEW
              </span>
            </div>

            <div className="md:w-3/4" id="caseStudyMain">
              <h2 className="text-fs-32 md:text-4xl text-gray-300 font-[HeadingFont] mb-6">
                {study.title}
              </h2>

              <p className="text-gray-400 mb-8">
                {study.description}
              </p>

              {/* Extra descriptions */}
              <div className="space-y-4 text-gray-400 text-fs-18">
                {study.descs.map((d, i) => (
                  <p key={i}>{d}</p>
                ))}
              </div>

              {/* Image */}
              {/* {study.image && (
                <div className="mt-10 rounded-lg overflow-hidden">
                  <img
                    src={study.image}
                    alt={study.title}
                    className="w-full h-auto object-cover"
                  />
                </div>
              )} */}

              {/* Long Description */}
              {study.longDesc && (
                <p className="mt-10 text-gray-400 text-fs-18">
                  {study.longDesc}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
