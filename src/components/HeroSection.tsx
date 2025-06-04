import { Button } from "@/components/ui/button";
import { ArrowRight, Droplets, Calendar, Camera } from "lucide-react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="bg-gradient-to-br from-plant-neutral to-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-8 items-center">
          <div className="mb-8 lg:mb-0">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-plant-text mb-6 font-poppins leading-tight">
              Your plants deserve the
              <span className="text-plant-primary"> best care</span>
            </h1>
            <p className="text-lg text-plant-text/70 mb-8 font-poppins">
              Never forget to water your plants again. Track care schedules,
              browse plant guides, and build your perfect indoor garden with
              SproutHub.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/plant-catalog">
                <Button className="bg-plant-primary hover:bg-plant-primary/90 text-white px-8 py-3 rounded-xl font-medium text-lg">
                  Start Growing
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="bg-white rounded-3xl shadow-xl p-8 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-plant-secondary/5 to-plant-primary/5 rounded-3xl"></div>
              <div className="relative">
                <img
                  src="https://res.cloudinary.com/dojdglovh/image/upload/v1749047653/ChatGPT_Image_Jun_4_2025_10_31_01_AM_b4iog6.png"
                  alt="Person watering a plant"
                  className="w-full aspect-video object-cover rounded-2xl mb-6"
                />
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-plant-secondary/20 rounded-full flex items-center justify-center">
                      <Droplets className="w-5 h-5 text-plant-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-plant-text">
                        Smart Watering Reminders
                      </p>
                      <p className="text-sm text-plant-text/60">
                        Never miss watering again
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-plant-secondary/20 rounded-full flex items-center justify-center">
                      <Calendar className="w-5 h-5 text-plant-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-plant-text">
                        Care Tracking
                      </p>
                      <p className="text-sm text-plant-text/60">
                        Log and monitor plant health
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-plant-secondary/20 rounded-full flex items-center justify-center">
                      <Camera className="w-5 h-5 text-plant-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-plant-text">
                        Plant Library
                      </p>
                      <p className="text-sm text-plant-text/60">
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
