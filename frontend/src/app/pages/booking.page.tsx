"use client";

import type React from "react";

import { useState } from "react";
import { CalendarIcon, CheckCircle } from "lucide-react";
import { format } from "date-fns";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Label } from "../components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../components/ui/popover";
import { Calendar } from "../components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";

const FormSchema = z.object({
  datetime: z.date({
    required_error: "Date & time is required!.",
  }),
});

export default function BookingPage() {
  const [date, setDate] = useState<Date | undefined>(undefined);
  // const [timeSlot, setTimeSlot] = useState<string | undefined>(undefined);
  const [service, setService] = useState<string | undefined>(undefined);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [isNewPatient, setIsNewPatient] = useState<string | undefined>(
    undefined
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [time, setTime] = useState<string>("05:00");
  const [doctor, setDoctor] = useState<string>("");
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  // Available time slots
  // const timeSlots = [
  //   "9:00 AM",
  //   "9:30 AM",
  //   "10:00 AM",
  //   "10:30 AM",
  //   "11:00 AM",
  //   "11:30 AM",
  //   "1:00 PM",
  //   "1:30 PM",
  //   "2:00 PM",
  //   "2:30 PM",
  //   "3:00 PM",
  //   "3:30 PM",
  //   "4:00 PM",
  //   "4:30 PM",
  // ];

  const doctors = [
    "Doctor 1",
    "Doctor 2",
    "Doctor 3",
    "Doctor 4",
    "Doctor 5",
    "Doctor 6",
  ];

  // Available services
  const services = [
    "Regular Check-up",
    "Teeth Cleaning",
    "Teeth Whitening",
    "Filling",
    "Root Canal",
    "Extraction",
    "Consultation",
    "Others",
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // In a real app, you would handle booking here
    console.log({
      date,
      service,
      firstName,
      lastName,
      email,
      phone,
      notes,
      isNewPatient,
      time,
    });

    setIsLoading(false);
    setIsSuccess(true);
  };

  if (isSuccess) {
    return (
      <div className="container flex items-center justify-center min-h-[calc(100vh-8rem)] py-12">
        <Card className="mx-auto max-w-md w-full">
          <CardHeader className="space-y-1 text-center">
            <div className="flex justify-center mb-4">
              <CheckCircle className="h-16 w-16 text-green-500" />
            </div>
            <CardTitle className="text-2xl font-bold">
              Appointment Confirmed!
            </CardTitle>
            <CardDescription>
              Your appointment has been successfully scheduled
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-center">
            <div className="space-y-1">
              <p className="font-medium">Date & Time:</p>
              <p>
                {/* {date ? format(date, "PPPP") : ""} at {timeSlot} */}
                {date ? format(date, "PPPP") : ""} at {time}
              </p>
            </div>
            <div className="space-y-1">
              <p className="font-medium">Service:</p>
              <p>{service}</p>
            </div>
            <div className="space-y-1">
              <p className="font-medium">Patient:</p>
              <p>
                {firstName} {lastName}
              </p>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-2">
            <Button asChild className="w-full bg-sky-600 hover:bg-sky-700">
              <a href="/">Return to Home</a>
            </Button>
            <Button variant="outline" asChild className="w-full">
              <a href="/account">View My Appointments</a>
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="container py-12 m-auto">
      <div className="mx-auto max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">Book Your Appointment</h1>
          <p className="text-muted-foreground mt-2">
            Schedule your dental visit in just a few simple steps
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Appointment Details</CardTitle>
                <CardDescription>
                  Select your preferred date, time, and service
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex w-full gap-4">
                  <Form {...form}>
                    <FormField
                      control={form.control}
                      name="datetime"
                      render={({ field }) => (
                        <FormItem className="flex flex-col w-full">
                          <FormLabel>Date</FormLabel>
                          <Popover open={isOpen} onOpenChange={setIsOpen}>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant={"outline"}
                                  className={cn(
                                    "w-full font-normal",
                                    !field.value && "text-muted-foreground"
                                  )}
                                >
                                  {field.value ? (
                                    `${format(field.value, "PPP")}, ${time}`
                                  ) : (
                                    <span>Pick a date</span>
                                  )}
                                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent
                              className="w-auto p-0"
                              align="start"
                            >
                              <Calendar
                                mode="single"
                                captionLayout="dropdown"
                                selected={date || field.value}
                                onSelect={(selectedDate) => {
                                  const [hours, minutes] = time.split(":")!;
                                  selectedDate?.setHours(
                                    parseInt(hours),
                                    parseInt(minutes)
                                  );
                                  setDate(selectedDate!);
                                  field.onChange(selectedDate);
                                }}
                                onDayClick={() => setIsOpen(false)}
                                fromYear={2000}
                                toYear={new Date().getFullYear()}
                                // disabled={(date) =>
                                //   Number(date) < Date.now() - 1000 * 60 * 60 * 24 ||
                                //   Number(date) > Date.now() + 1000 * 60 * 60 * 24 * 30
                                // }
                                defaultMonth={field.value}
                              />
                            </PopoverContent>
                          </Popover>
                          <FormDescription>
                            Set your date and time.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="datetime"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>Time</FormLabel>
                          <FormControl>
                            <Select
                              defaultValue={time!}
                              onValueChange={(e) => {
                                setTime(e);
                                if (date) {
                                  const [hours, minutes] = e.split(":");
                                  const newDate = new Date(date.getTime());
                                  newDate.setHours(
                                    parseInt(hours),
                                    parseInt(minutes)
                                  );
                                  setDate(newDate);
                                  field.onChange(newDate);
                                }
                              }}
                            >
                              <SelectTrigger className="font-normal focus:ring-0 w-[120px] focus:ring-offset-0">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <ScrollArea className="h-[15rem]">
                                  {Array.from({ length: 96 }).map((_, i) => {
                                    const hour = Math.floor(i / 4)
                                      .toString()
                                      .padStart(2, "0");
                                    const minute = ((i % 4) * 15)
                                      .toString()
                                      .padStart(2, "0");
                                    return (
                                      <SelectItem
                                        key={i}
                                        value={`${hour}:${minute}`}
                                      >
                                        {hour}:{minute}
                                      </SelectItem>
                                    );
                                  })}
                                </ScrollArea>
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </Form>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="doctor">Doctor</Label>
                  <Select value={doctor} onValueChange={setDoctor}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your preferred doctor" />
                    </SelectTrigger>
                    <SelectContent>
                      {doctors.map((doctor) => (
                        <SelectItem key={doctor} value={doctor}>
                          {doctor}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="service">Service</Label>
                  <Select value={service} onValueChange={setService}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a service" />
                    </SelectTrigger>
                    <SelectContent>
                      {services.map((svc) => (
                        <SelectItem key={svc} value={svc}>
                          {svc}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Are you a new patient?</Label>
                  <RadioGroup
                    value={isNewPatient}
                    onValueChange={setIsNewPatient}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="new-yes" />
                      <Label htmlFor="new-yes">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="new-no" />
                      <Label htmlFor="new-no">No</Label>
                    </div>
                  </RadioGroup>
                </div>
              </CardContent>
            </Card>

            {/* Left column - Appointment details */}
            {/* <Card>
              <CardHeader>
                <CardTitle>Appointment Details</CardTitle>
                <CardDescription>
                  Select your preferred date, time, and service
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="date">Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : "Select a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      {/* <Calendar
                        mode="single"
                        captionLayout="dropdown"
                        selected={date || field.value}
                        onSelect={(selectedDate) => {
                          const [hours, minutes] = time.split(":")!;
                          selectedDate?.setHours(
                            parseInt(hours),
                            parseInt(minutes)
                          );
                          setDate(selectedDate!);
                          field.onChange(selectedDate);
                        }}
                        onDayClick={() => setIsOpen(false)}
                        fromYear={2000}
                        toYear={new Date().getFullYear()}
                        defaultMonth={field.value}
                        disabled={(date) => {
                          // Disable weekends and past dates
                          const day = date.getDay();
                          const isPastDate =
                            date < new Date(new Date().setHours(0, 0, 0, 0));
                          return day === 0 || day === 6 || isPastDate;
                        }}
                      /> */}
            {/* </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="time">Time</Label>
                  <Select value={timeSlot} onValueChange={setTimeSlot}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a time slot" />
                    </SelectTrigger>
                    <SelectContent>
                      {timeSlots.map((slot) => (
                        <SelectItem key={slot} value={slot}>
                          {slot}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="service">Service</Label>
                  <Select value={service} onValueChange={setService}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a service" />
                    </SelectTrigger>
                    <SelectContent>
                      {services.map((svc) => (
                        <SelectItem key={svc} value={svc}>
                          {svc}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Are you a new patient?</Label>
                  <RadioGroup
                    value={isNewPatient}
                    onValueChange={setIsNewPatient}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="new-yes" />
                      <Label htmlFor="new-yes">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="new-no" />
                      <Label htmlFor="new-no">No</Label>
                    </div>
                  </RadioGroup>
                </div>
              </CardContent>
            </Card> */}

            {/* Right column - Personal information */}
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>
                  Please provide your contact details
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="first-name">First Name</Label>
                    <Input
                      id="first-name"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="last-name">Last Name</Label>
                    <Input
                      id="last-name"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">Additional Notes (Optional)</Label>
                  <Textarea
                    id="notes"
                    placeholder="Any specific concerns or questions?"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="min-h-[100px]"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-6 flex justify-center">
            <Button
              type="submit"
              className="w-full max-w-md bg-sky-600 hover:bg-sky-700"
              disabled={
                isLoading ||
                !date ||
                // !timeSlot ||
                !time ||
                !service ||
                !firstName ||
                !lastName ||
                !email ||
                !phone ||
                !isNewPatient
              }
            >
              {isLoading ? "Booking Appointment..." : "Book Appointment"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
