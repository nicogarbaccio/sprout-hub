import { Button } from "@/components/ui/button";
import { ArrowRight, Droplets, Calendar, Camera } from "lucide-react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="bg-background dark:bg-sprout-dark py-16 md:py-20 lg:py-24 dark:shadow-lg dark:shadow-sprout-cream/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 md:gap-8 md:items-center lg:grid-cols-2 lg:gap-8 xl:gap-10 lg:items-center">
          <div className="mb-6 sm:mb-8 md:col-span-7 lg:col-span-6 lg:mb-0 text-center md:text-left max-w-xl md:max-w-2xl lg:max-w-[720px] mx-auto md:mx-0">
            <h1 className="text-4xl md:text-5xl lg:text-7xl xl:text-8xl font-bold text-foreground dark:text-sprout-white mb-5 md:mb-6 font-poppins leading-tight">
              <span className="block">Your plants deserve the</span>
              <span className="text-sprout-success dark:text-sprout-cream">best</span>
              <span className="block">care</span>
            </h1>
            <p className="text-lg lg:text-xl text-sprout-neutral-dark/80 dark:text-sprout-neutral mb-6 md:mb-7 lg:max-w-[48ch] font-poppins">
              Never forget to water your plants again. Track care schedules,
              browse plant guides, and build your perfect indoor garden with
              SproutHub.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center md:justify-start lg:mt-2">
              <Link to="/plant-catalog">
                <Button className="bg-sprout-dark hover:bg-sprout-primary dark:bg-sprout-cream dark:hover:bg-sprout-cream/90 text-sprout-white dark:text-sprout-dark px-6 py-2.5 md:px-7 md:py-3 lg:px-8 lg:py-3 rounded-xl font-medium text-lg">
                  Start Growing
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>

          <div className="relative md:col-span-5 lg:col-span-6 md:mx-0 lg:flex lg:justify-start">
            <div className="bg-card/80 dark:bg-sprout-dark rounded-3xl ring-1 ring-white/10 shadow-2xl p-4 md:p-5 lg:p-8 relative overflow-hidden w-full lg:w-auto max-w-sm sm:max-w-md md:max-w-md lg:min-w-[400px] lg:max-w-[640px] xl:max-w-[720px] mx-auto lg:mx-0">
              <div className="absolute inset-0 bg-gradient-to-br from-plant-secondary/5 to-plant-primary/5 rounded-3xl"></div>
              <div className="relative">
                <img
                  src="https://res.cloudinary.com/dojdglovh/image/upload/v1749047653/ChatGPT_Image_Jun_4_2025_10_31_01_AM_b4iog6.png"
                  alt="Person watering a plant"
                  width="1200"
                  height="900"
                  className="w-full aspect-[4/3] md:h-72 lg:h-80 lg:object-contain object-cover rounded-2xl mb-4"
                  data-testid="hero-image"
                />
                <div className="space-y-4 lg:space-y-5">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-sprout-dark rounded-xl flex items-center justify-center">
                      <Droplets className="w-5 h-5 text-sprout-white" />
                    </div>
                    <div>
                      <p className="font-medium text-sprout-neutral-dark dark:text-white">
                        Smart Watering Reminders
                      </p>
                      <p className="text-sm text-sprout-neutral-dark/70 dark:text-white/80">
                        Never miss watering again
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-sprout-dark rounded-xl flex items-center justify-center">
                      <Calendar className="w-5 h-5 text-sprout-white" />
                    </div>
                    <div>
                      <p className="font-medium text-sprout-neutral-dark dark:text-white">
                        Care Tracking
                      </p>
                      <p className="text-sm text-sprout-neutral-dark/70 dark:text-white/80">
                        Log and monitor plant health
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-sprout-dark rounded-xl flex items-center justify-center">
                      <Camera className="w-5 h-5 text-sprout-white" />
                    </div>
                    <div>
                      <p className="font-medium text-sprout-neutral-dark dark:text-white">
                        Plant Library
                      </p>
                      <p className="text-sm text-sprout-neutral-dark/70 dark:text-white/80">
                        Extensive care guides
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
