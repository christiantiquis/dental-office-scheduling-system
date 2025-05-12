import { Button } from "@/app/components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-col min-h-full text-center">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-40 lg:py-50 bg-gradient-to-b from-sky-50 to-white">
        <div className="container px-4 md:px-6 m-auto">
          <div className="md:w-1/2 m-auto items-center md:min-w-[500px]">
            <div className="space-y-4">
              <div className="inline-block rounded-lg bg-sky-100 px-3 py-1 text-sm text-sky-800">
                Your Smile Matters
              </div>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-1">
                Smile Brighter
              </h1>
              <h1 className="text-xl font-bold tracking-tighter my-0">with</h1>
              <h1 className="text-4xl font-bold tracking-tighter sm:text-4xl md:text-6xl text-sky-800">
                Chris Dental Clinic
              </h1>
              <p className="text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Our team delivers modern, comprehensive dental care in a warm
                and welcoming setting. Let us help your family smile brighter
                every day.
              </p>
              <div className="flex flex-wrap text-md text-gray-500 gap-2 justify-center">
                <div className="bg-sky-100 text-sm text-sky-800 p-1 rounded-sm">
                  General Checkups & Cleanings
                </div>
                <div className="bg-sky-100 text-sm text-sky-800 p-1 rounded-sm">
                  Cosmetic Dentistry
                </div>
                <div className="bg-sky-100 text-sm text-sky-800 p-1 rounded-sm">
                  Orthodontic Treatments
                </div>
                <div className="bg-sky-100 text-sm text-sky-800 p-1 rounded-sm">
                  Dental Implants
                </div>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row justify-center pt-5">
                <Button
                  asChild
                  size="lg"
                  className="bg-sky-600 hover:bg-sky-700"
                >
                  <a href="/booking">Book Appointment</a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
