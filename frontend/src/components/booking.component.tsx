"use client";

import type React from "react";

import { useCallback, useEffect, useState } from "react";
import { CalendarIcon, CheckCircle } from "lucide-react";
import { format } from "date-fns";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Calendar } from "./ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
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
import { useAppSelector } from "@/store/hooks";
import type { IDoctor } from "@/interfaces/doctor.interface";
import { DentalServices } from "@/constants/services.constants";
import type { IAppointment } from "@/interfaces/appointment.interface";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/store/hooks";
import { clearAppointment } from "@/store/slices/appointment.slice";

const FormSchema = z.object({
  datetime: z.date({
    required_error: "Date & time is required!.",
  }),
});

function convertTo12HourFormat(time: string): string {
  const [hourStr, minuteStr] = time.split(":");
  let hour = parseInt(hourStr, 10);
  const minute = parseInt(minuteStr, 10);

  const period = hour >= 12 ? "PM" : "AM";
  hour = hour % 12;
  if (hour === 0) hour = 12;

  return `${hour}:${minute.toString().padStart(2, "0")} ${period}`;
}

const getServiceName = (name: string) => {
  const service = DentalServices.find((svc) => svc.name === name);
  return service ? service.text : "Unknown Service";
};

export default function BookingForm() {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [service, setService] = useState<string>("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [time, setTime] = useState<string>("");
  const [doctor, setDoctor] = useState<string>("");
  const [doctors, setDoctors] = useState<IDoctor[]>([]);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });
  const [bookedDoctors, setBookedDoctors] = useState<string[]>([]);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.UserReducer);
  const editAppointment = useAppSelector((state) => state.AppointmentReducer);

  const createAppointment = async (appointmentBody: Partial<IAppointment>) => {
    const modAppointmentBody = {
      ...appointmentBody,
      date: appointmentBody.date?.toISOString(),
    };
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/appointment/book`,
      {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(modAppointmentBody),
      }
    );

    const data = await response.json();
    setDoctors(data.data);
    // dispatch(setUser(data.data));
  };

  const updateAppointment = async (appointmentBody: Partial<IAppointment>) => {
    const modAppointmentBody = {
      ...appointmentBody,
      date: appointmentBody.date?.toISOString(),
      id: editAppointment.id,
    };
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/appointment/update`,
      {
        method: "put",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(modAppointmentBody),
      }
    );

    const data = await response.json();
    setDoctors(data.data);
    // dispatch(setUser(data.data));
  };

  const getDoctors = useCallback(async () => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/doctor`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    const data = await response.json();
    setDoctors(data.data);
    // dispatch(setUser(data.data));
  }, []);

  const getAppointmentsByTime = useCallback(async () => {
    if (!date) return;
    const time = date?.toISOString();
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/appointment/time/${time}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );

    const data = await response.json();
    const bookedAppointmentsData: IAppointment[] = data.data;
    const bookDoctors = bookedAppointmentsData.map(
      (n: IAppointment) => n.doctor_id
    );
    setBookedDoctors(bookDoctors);
  }, [date]);

  useEffect(() => {
    getAppointmentsByTime();
  }, [getAppointmentsByTime]);

  useEffect(() => {
    setFirstName(user.first_name);
    setLastName(user.last_name);
    setEmail(user.email);
    getDoctors();

    const temp = { ...editAppointment };
    if (editAppointment.id) {
      setNotes(temp.notes ?? "");
      setDate(temp.date ? new Date(temp.date) : undefined);
      setTime(temp.time ?? "");
      setDoctor(temp.doctor_id ?? "");
      setService(temp.service ?? "");
    }
  }, [user, getDoctors, editAppointment]);

  // Available services

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const appointmentDetails: Partial<IAppointment> = {
      date: date ? new Date(date) : new Date(),
      service,
      patient_id: user.id,
      doctor_id: doctor,
      time: time,
      notes: notes,
      status: "confirmed",
    };

    if (editAppointment.id) {
      updateAppointment(appointmentDetails);
      dispatch(clearAppointment());
    } else {
      createAppointment(appointmentDetails);
    }

    setIsLoading(false);
    setIsSuccess(true);
  };

  if (isSuccess) {
    return (
      <div className="container flex items-center justify-center min-h-[calc(100vh-8rem)] py-12 w-screen m-auto">
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
              <p className="font-bold">Date & Time:</p>
              <p>
                {date ? format(date, "PPPP") : ""} at {time ?? "09:00"}
              </p>
            </div>
            <div className="space-y-1">
              <p className="font-bold">Service:</p>
              <p>{getServiceName(service)}</p>
            </div>
            <div className="space-y-1">
              <p className="font-bold">Patient:</p>
              <p>
                {firstName} {lastName}
              </p>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-2">
            <Button
              asChild
              className="w-full bg-sky-600 hover:bg-sky-700 cursor-pointer"
            >
              <div onClick={() => navigate("/", { replace: true })}>
                Return to Home
              </div>
            </Button>
            <Button variant="outline" asChild className="w-full cursor-pointer">
              <div onClick={() => navigate("/appointment", { replace: true })}>
                View My Appointments
              </div>
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
                      disabled
                      className="font-bold"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="last-name">Last Name</Label>
                    <Input
                      id="last-name"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      required
                      disabled
                      className="font-bold"
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
                    disabled
                    className="font-bold"
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
                                    `${format(field.value, "PP")}${
                                      time == "" ? "" : ","
                                    } ${
                                      time ? convertTo12HourFormat(time) : ""
                                    }`
                                  ) : date ? (
                                    format(date, "PP")
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
                                selected={date ?? field.value}
                                onSelect={(selectedDate) => {
                                  setDate(selectedDate!);
                                  field.onChange(selectedDate);
                                }}
                                onDayClick={() => setIsOpen(false)}
                                fromYear={2000}
                                toYear={new Date().getFullYear()}
                                disabled={(date) =>
                                  Number(date) < Date.now() ||
                                  Number(date) >
                                    Date.now() + 1000 * 60 * 60 * 24 * 30 ||
                                  new Date(date).getDay() === 0
                                }
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
                              value={time!}
                              onValueChange={(e) => {
                                setTime(e);
                                if (date) {
                                  const tempDate = new Date(date);
                                  const [hours, minutes] = e
                                    ? e.split(":")
                                    : time.split(":");
                                  const newDate = new Date(tempDate.getTime());
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
                                <SelectValue placeholder="Select Time" />
                              </SelectTrigger>
                              <SelectContent>
                                <ScrollArea className="h-[15rem]">
                                  {Array.from({ length: 96 })
                                    .map((_, i) => {
                                      const hour = Math.floor(i / 2)
                                        .toString()
                                        .padStart(2, "0");
                                      const minute = i % 2 === 0 ? "00" : "30";
                                      return { i, hour, minute };
                                    })
                                    .filter(({ i }) => i >= 18 && i < 34) // Adjust
                                    .map(({ i, hour, minute }) => (
                                      <SelectItem
                                        key={i}
                                        value={`${hour}:${minute}`}
                                      >
                                        {convertTo12HourFormat(
                                          `${hour}:${minute}`
                                        )}
                                      </SelectItem>
                                    ))}
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
                        <SelectItem
                          key={doctor.id}
                          value={doctor.id}
                          disabled={bookedDoctors.includes(doctor.id)}
                        >
                          {"Dr. "} {doctor.first_name} {doctor.last_name}
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
                      {DentalServices.map((svc) => (
                        <SelectItem key={svc.value} value={svc.name}>
                          {svc.text}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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
                !time ||
                !service ||
                !firstName ||
                !lastName ||
                !email
              }
            >
              {isLoading
                ? "Booking Appointment..."
                : `${editAppointment.id ? "Reschedule" : "Book"} Appointment`}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
