// src/components/AboutSection.jsx
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { StatItem } from "./StateItems";

export default function AboutSection() {
  const [shouldAnimateStats, setShouldAnimateStats] = useState(false);
  const statsRef = useRef(null);
  const [Data, setData] = useState({});

  // env vars (NocoDB ke liye set karo)
  const token = import.meta.env.VITE_NOCODB_ACCESS_TOKEN;
  

  useEffect(() => {
    const fetchData = async () => {
      const url = `https://app.nocodb.com/api/v2/tables/mhfs6tkzwqmi3jk/records`;

      try {
        const res = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // ✅ Response ko console par print karo

        console.log("NocoDB API Response:", res.data.list);
        // const dataFinalAbout = res.data.list;
        // console.log(dataFinalAbout);

        // Agar list exist karti hai to pehli row ko state me set karo
        if (res.data.list && res.data.list.length > 0) {
          setData(res.data.list[0]);

        }
      } catch (error) {
        console.error("Error fetching from NocoDB:", error);
      }
    };

    fetchData();
  }, [token]);

  // animation useEffect
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShouldAnimateStats(true);
          }
        });
      },
      {
        threshold: 0.3,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    const currentStatsRef = statsRef.current;
    if (currentStatsRef) observer.observe(currentStatsRef);
    return () => {
      if (currentStatsRef) observer.unobserve(currentStatsRef);
    };
  }, []);

  return (
    <section className="bg-[#010616] py-16 px-4 md:py-24">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row text-center md:text-left mb-16 px-4">
          <div className="md:w-1/6 mt-9 mb-6 md:mb-0 flex justify-center md:justify-start">
            <span className="h-fit text-lg md:text-sm text-gray-400 tracking-widest uppercase border border-gray-600 px-4 py-2 rounded-full inline-block">
              About Us
            </span>
          </div>

          <div className="md:w-2/2">
            {/* NocoDB Title & Description */}
            <div className="p-8">
              <h2 className="text-2xl sm:text-3xl lg:text-fs-58 font-[heading] font-semibold leading-normal mb-6 bg-gradient-to-r from-gray-500 via-neutral-400 to-slate-300 bg-clip-text text-transparent">
                {Data?.Heding}
              </h2>
              <div className="text-gray-400 text-lg lg:text-lg sm:text-base md:text-lg leading-relaxed max-w-3xl mb-6 mx-auto md:mx-0 font-[textFont] ">
                {Data?.Description}
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div ref={statsRef} className="space-y-12 lg:px-56 max-auto">
          <StatItem
            id="experience-stat"
            value={Data?.experience || 0}
            suffix=" +"
            label="Years of Experience"
            shouldAnimate={shouldAnimateStats}
            style={{ width: "52%" }}
          />
          <StatItem
            id="projects-stat"
            value={Data?.project || 0}
            suffix=" +"
            label="Successful Projects"
            shouldAnimate={shouldAnimateStats}

          />
          <StatItem
            id="satisfaction-stat"
            value={Data?.satisfaction || 0}
            suffix="%"
            label="Excellence Delivered"
            shouldAnimate={shouldAnimateStats}
          />
        </div>
      </div>
    </section>
  );
}
