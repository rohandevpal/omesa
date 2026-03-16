import React, { useState, useEffect } from "react";

const testimonials = [
  {
    id: 1,
    quote:
      "Omesa transformed our pavilion at India Energy Week into a vibrant, interactive space that truly reflected GAIL’s commitment to innovation and sustainability. Visitors were impressed, and so were we.",
    author: "S. R. Gupta",
    position: "General Manager – Marketing",
    company: "GAIL (India) Ltd",
    trustBadge: "TRUSTED AGENCY",
    trustTitle: "Trusted by the industry leaders.",
    trustDescription:
      "We create immersive spaces that leave lasting impressions for brands across industries.",
    reviewCount: "128 K+",
    reviewLabel: "Reviews",
    avatars: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
  },
  {
    id: 2,
    quote:
      "The LT Foods booth at World Food India felt less like an exhibit and more like a living brand experience. Omesa’s attention to detail and storytelling approach set a new benchmark for us.",
    author: "Rohit Anand",
    position: "Head of Branding",
    company: "LT Foods",
    trustBadge: "AWARD WINNING",
    trustTitle: "Recognized for excellence worldwide.",
    trustDescription:
      "Our design and branding solutions consistently set new benchmarks at global events.",
    reviewCount: "95 K+",
    reviewLabel: "Happy Clients",
    avatars: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
  },
  {
    id: 3,
    quote:
      "At Gastech, Omesa gave Greenko a global-ready presence. The design was bold yet minimal, creating a perfect backdrop for engaging conversations with international delegates.",
    author: "Arjun Reddy",
    position: "Director – Corporate Communications",
    company: "Greenko Group",
    trustBadge: "INDUSTRY LEADER",
    trustTitle: "Setting new standards in design.",
    trustDescription:
      "We deliver bold yet minimal design solutions that stand out in competitive spaces.",
    reviewCount: "200 K+",
    reviewLabel: "Projects",
    avatars: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
  },
  {
    id: 4,
    quote:
      "Our vision for AM Green’s hydrogen pavilion came to life beautifully at ICGH 2024. Omesa created an inviting and thoughtful space that made complex ideas easy to grasp.",
    author: "Kavita Mehra",
    position: "VP – Marketing",
    company: "AM Green",
    trustBadge: "SUSTAINABILITY",
    trustTitle: "Bringing innovation to life.",
    trustDescription:
      "We simplify complex ideas into engaging brand experiences for global audiences.",
    reviewCount: "150 K+",
    reviewLabel: "Visitors Engaged",
    avatars: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
  },
  {
    id: 5,
    quote:
      "The interactive kiosks Omesa developed for our exhibition were a crowd magnet. Visitors loved engaging with our product stories in a fresh, intuitive way.",
    author: "Priya Bhatia",
    position: "Marketing Manager",
    company: "Solis Pharma (India)",
    trustBadge: "INNOVATION",
    trustTitle: "Engaging audiences through tech.",
    trustDescription:
      "Interactive experiences that attract and engage audiences at every event.",
    reviewCount: "75 K+",
    reviewLabel: "Interactions",
    avatars: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
  },
  {
    id: 6,
    quote:
      "Omesa designed a mural for our Bangalore office that has completely transformed the space. It’s not just décor — it’s a conversation starter for every visitor.",
    author: "Ramesh Iyer",
    position: "CEO",
    company: "Navtara Tech Pvt Ltd (India)",
    trustBadge: "CREATIVITY",
    trustTitle: "Designs that spark conversations.",
    trustDescription:
      "Our creative design transforms spaces into memorable experiences.",
    reviewCount: "60 K+",
    reviewLabel: "Engaged Visitors",
    avatars: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
  },
  {
    id: 7,
    quote:
      "The corporate film they produced for us struck the perfect balance between storytelling and professionalism. It worked wonders across our digital campaigns.",
    author: "Nikita Kapoor",
    position: "Digital Lead",
    company: "FreshHarvest Foods (India)",
    trustBadge: "DIGITAL EXCELLENCE",
    trustTitle: "Storytelling with impact.",
    trustDescription:
      "We produce films and content that connect emotionally and drive results.",
    reviewCount: "110 K+",
    reviewLabel: "Campaign Views",
    avatars: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
  },
  {
    id: 8,
    quote:
      "At the Milan Food Expo, Omesa’s design for our booth helped us stand out in a sea of global competitors. The seamless blend of technology and design was impressive.",
    author: "Luca Romano",
    position: "Export Director",
    company: "Bella Vita Foods (Italy)",
    trustBadge: "GLOBAL IMPACT",
    trustTitle: "Blending technology with design.",
    trustDescription:
      "We craft experiences that resonate globally with innovation and creativity.",
    reviewCount: "180 K+",
    reviewLabel: "Expo Visitors",
    avatars: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
  },
  {
    id: 9,
    quote:
      "Our annual leadership summit was executed flawlessly by Omesa. From logistics to branding, every element reflected precision and creativity.",
    author: "Deepak Verma",
    position: "VP Operations",
    company: "IndusPower Solutions (India)",
    trustBadge: "PRECISION",
    trustTitle: "Flawless execution, every time.",
    trustDescription:
      "From logistics to branding, we ensure events reflect creativity and precision.",
    reviewCount: "85 K+",
    reviewLabel: "Summit Attendees",
    avatars: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
  },
  {
    id: 10,
    quote:
      "The interactive wall Omesa built for our cultural centre in Singapore has become a major attraction. Their ability to merge art and technology is outstanding.",
    author: "Amelia Tan",
    position: "Curator",
    company: "Urban Arts Collective (Singapore)",
    trustBadge: "ART & TECH",
    trustTitle: "Merging creativity with technology.",
    trustDescription:
      "We bring art and technology together to create unforgettable attractions.",
    reviewCount: "140 K+",
    reviewLabel: "Visitors Engaged",
    avatars: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
  },
];


export default function TestimonialSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
  };

  const currentTestimonial = testimonials[currentSlide];

  return (
    <div id="testBox" className="bg-gradient-to-r from-[#03051E] via-[#0e1f4b] to-[#1D53B7] ">
      <div className=" max-w-6xl mx-auto relative z-10 container min-h-[80vh] lg:min-h-[80vh] flex flex-col justify-center">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center min-h-[80vh]">
          {/* Trust Section - Left Side */}
          <div className="space-y-8 text-white order-2 lg:order-1">
            <div className="space-y-6">
              <div className="inline-block">
                <span className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium tracking-wider border border-white/20">
                  {currentTestimonial.trustBadge}
                </span>
              </div>

              <h2 className="text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight">
                {currentTestimonial.trustTitle}
              </h2>

              <p className="text-lg lg:text-xl text-white/80 leading-relaxed max-w-lg">
                {currentTestimonial.trustDescription}
              </p>
            </div>

            {/* Stats Section */}
            <div className="flex items-center space-x-6">
              <div className="flex -space-x-3">
                {currentTestimonial.avatars.map((avatar, index) => (
                  <div key={index} className="relative">
                    <img
                      src={avatar || "/placeholder.svg"}
                      alt={`User ${index + 1}`}
                      width={50}
                      height={50}
                      className="w-12 h-12 lg:w-14 lg:h-14 rounded-full border-3 border-white object-cover"
                      style={{ aspectRatio: "50/50", objectFit: "cover" }}
                    />
                  </div>
                ))}
              </div>

              <div>
                <div className="text-3xl lg:text-4xl font-bold">{currentTestimonial.reviewCount}</div>
                <div className="text-white/70 text-sm lg:text-base">{currentTestimonial.reviewLabel}</div>
              </div>
            </div>
          </div>

          {/* Testimonial Section - Right Side */}
          <div id="testBox" className="relative order-1 lg:order-2">
            <div  className="relative bg-white/10 backdrop-blur-lg rounded-3xl p-8 lg:p-12 border border-white/20 shadow-2xl">
              {/* Quote */}
              <div className="space-y-6 text-white">
                <blockquote className="text-xl lg:text-2xl xl:text-3xl font-light italic leading-relaxed">
                  "{currentTestimonial.quote}"
                </blockquote>

                <div className="space-y-1">
                  <div className="font-semibold text-lg lg:text-xl">{currentTestimonial.author}</div>
                  <div className="text-white/70 text-sm lg:text-base">
                    {currentTestimonial.position} {currentTestimonial.company}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Controls */}
        <div className="flex items-center justify-center space-x-4 mt-12">
          <button
            onClick={prevSlide}
            className="p-3 rounded-full bg-white/10 border border-white/20 text-white hover:bg-white/20 backdrop-blur-sm"
          >
            <i className="fas fa-chevron-left"></i>
          </button>

          {/* Dots Indicator */}
          <div className="flex space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide ? "bg-white scale-125" : "bg-white/40 hover:bg-white/60"
                }`}
              />
            ))}
          </div>

          <button
            onClick={nextSlide}
            className="p-3 rounded-full bg-white/10 border border-white/20 text-white hover:bg-white/20 backdrop-blur-sm"
          >
            <i className="fas fa-chevron-right"></i>
          </button>
        </div>
      </div>
    </div>
  );
}
