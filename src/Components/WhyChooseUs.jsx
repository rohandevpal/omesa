export default function WhyChooseUs() {
  return (
    <section className="bg-[#010616] py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
  <div className="max-w-6xl mx-auto">
    <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
      {/* Left Content */}
      <div className="space-y-6 text-center lg:text-left">
        <div className="inline-block mb-3">
          <span className="text-slate-300 px-3 sm:px-4 py-1.5 sm:py-2 border border-gray-500 rounded-full text-xs sm:text-sm font-normal tracking-wide uppercase">
            Why Choose Us
          </span>
        </div>

        <h2 className="text-2xl sm:text-4xl lg:text-fs-54 font-[HeadingFont] font-semibold leading-tight bg-gradient-to-r from-gray-500 via-neutral-300 to-slate-200 bg-clip-text text-transparent">
          We turn ideas into
          <br /> unforgettable experiences
        </h2>

        <p className="text-white leading-relaxed font-[textFont] text-sm sm:text-base font-light max-w-lg mx-auto lg:mx-0">
          From bold brand campaigns to immersive exhibitions and seamless event execution — we don’t just deliver services, we craft moments that connect, inspire, and stick with your audience.
        </p>
      </div>

      {/* Right Content - Feature Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
        {/* Card */}
        <div
          className="w-full h-auto p-6 border-2 border-[#FFFFFF73] rounded-2xl bg-cover bg-center bg-no-repeat flex flex-col"
          style={{ backgroundImage: "url('/backgroundImages/WhyChoose.jpeg')",height:"95%"  }}
        >
          <i className="fas fa-lightbulb text-white text-3xl sm:text-4xl mb-6"></i>
          <h3 className="font-[HeadingFont] font-semibold text-lg sm:text-xl text-white mb-3">
            Creative Solutions
          </h3>
          <p className="text-white leading-relaxed font-[textFont] text-sm sm:text-base font-light">
            From advertising to brand consulting, we build campaigns that speak loud and clear.
          </p>
        </div>

        <div className="w-full h-auto p-6 border-2 border-[#FFFFFF73] rounded-2xl bg-gradient-to-r from-[#2B2B2B] to-[#00070D] flex flex-col">
          <i className="fas fa-cogs text-white text-3xl sm:text-4xl mb-6"></i>
          <h3 className="font-[HeadingFont] font-semibold text-lg sm:text-xl text-white mb-3">
            Seamless Execution
          </h3>
          <p className="text-white leading-relaxed font-[textFont] text-sm sm:text-base font-light">
            Be it exhibitions or turnkey setups, we handle everything—end to end.
          </p>
        </div>

        <div className="w-full h-auto p-6 border-2 border-[#FFFFFF73] rounded-2xl bg-gradient-to-r from-[#2B2B2B] to-[#00070D] flex flex-col">
          <i className="fas fa-users text-white text-3xl sm:text-4xl mb-6"></i>
          <h3 className="font-[HeadingFont] font-semibold text-lg sm:text-xl text-white mb-3">
            Impactful Experiences
          </h3>
          <p className="text-white leading-relaxed font-[textFont] text-sm sm:text-base font-light">
            From corporate events to large-scale conferences, we manage every detail including hospitality.
          </p>
        </div>

        <div
          className="w-full h-auto p-6 border-2 border-[#FFFFFF73] rounded-2xl bg-cover bg-center bg-no-repeat flex flex-col"
          style={{ backgroundImage: "url('/backgroundImages/WhyChoose.jpeg')", height:"95%" }}
        >
          <i className="fas fa-vr-cardboard text-white text-3xl sm:text-4xl mb-6"></i>
          <h3 className="font-[HeadingFont] font-semibold text-lg sm:text-xl text-white mb-3">
            Bold & Immersive
          </h3>
          <p className="text-white leading-relaxed font-[textFont] text-sm sm:text-base font-light">
            Our murals, installations, and digital media bring stories to life like never before.
          </p>
        </div>
      </div>
    </div>
  </div>
</section>

  );
}
