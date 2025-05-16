"use client";

import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Calendar,
  Clock,
  FileText,
  HeartPulse,
  MoreHorizontal,
  Stethoscope,
  Trash2,
} from "lucide-react";
import { format } from "date-fns";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "./ui/badge";
import type { IAppointment } from "@/interfaces/appointment.interface";
import type { IDoctor } from "@/interfaces/doctor.interface";
import { DentalServices } from "@/constants/services.constants";
import { useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { setAppointment } from "@/store/slices/appointment.slice";
import { getDoctors } from "@/api/doctor.api";
import { cancelAppointment, getAppointments } from "@/api/appointment.api";
import { toast } from "sonner";

const getServiceName = (name: string) => {
  const service = DentalServices.find((svc) => svc.name === name);
  return service ? service.text : "Unknown Service";
};

const getStatusBadge = (status: string) => {
  switch (status) {
    case "confirmed":
      return <Badge className="bg-green-500 h-[36px] w-20">Confirmed</Badge>;
    case "completed":
      return <Badge className="bg-blue-500 h-[36px] w-20">Completed</Badge>;
    case "cancelled":
      return <Badge className="bg-red-500 h-[36px] w-20">Cancelled</Badge>;
    default:
      return <Badge>Unknown</Badge>;
  }
};

export default function Appointments() {
  const [appointments, setAppointments] = useState<{
    upcoming: IAppointment[];
    past: IAppointment[];
  }>({
    upcoming: [],
    past: [],
  });
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  const [appointmentToCancel, setAppointmentToCancel] = useState<string | null>(
    null
  );
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] =
    useState<IAppointment | null>(null);
  const [doctors, setDoctors] = useState<IDoctor[]>([]);

  const patientId = useAppSelector((state) => state.UserReducer.id);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const fetchDoctors = useCallback(async () => {
    try {
      const result = await getDoctors();
      setDoctors(result);
    } catch (error) {
      console.error("Error loading doctors:", error);
    }
  }, []);

  const fetchAppointment = useCallback(async () => {
    const userId = patientId ? patientId : localStorage.getItem("userId");
    if (!userId) return;
    const resAppointments = await getAppointments(userId);
    const filteredAppointments = resAppointments.reduce(
      (
        acc: { upcoming: IAppointment[]; past: IAppointment[] },
        appointment: IAppointment
      ) => {
        if (
          appointment.status === "completed" ||
          appointment.status === "cancelled"
        ) {
          acc.past.push(appointment);
        } else {
          acc.upcoming.push(appointment);
        }
        return acc;
      },
      { upcoming: [], past: [] }
    );

    setAppointments(filteredAppointments);
  }, [patientId]);

  const confirmCancelAppointment = useCallback(async () => {
    await cancelAppointment(appointmentToCancel ?? "");
    await fetchAppointment();

    setCancelDialogOpen(false);
    setAppointmentToCancel(null);
    toast.success("Appointment successfully cancelled.");
  }, [appointmentToCancel, fetchAppointment]);

  const handleCancelAppointment = (id: string) => {
    setAppointmentToCancel(id);
    setCancelDialogOpen(true);
  };

  const viewAppointmentDetails = (appointment: IAppointment) => {
    setSelectedAppointment(appointment);
    setDetailsDialogOpen(true);
  };

  const handelReschedule = (appointment: IAppointment) => {
    dispatch(setAppointment(appointment));
    navigate("/appointment/booking", { replace: true });
  };

  const getDoctorName = (id: string) => {
    const doctor = doctors.find((doctor) => doctor.id === id);
    return doctor
      ? `Dr. ${doctor.first_name} ${doctor.last_name}`
      : "Unknown Doctor";
  };

  const handleNewBooking = () => {
    navigate("/appointment/booking", { replace: true });
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");
    if (!(token && username)) {
      navigate("/login", { replace: true });
      toast.info("Please log in or sign up to see appointments.");
    }
  }, [navigate]);

  useEffect(() => {
    fetchAppointment();
    fetchDoctors();
  }, [fetchDoctors, fetchAppointment]);

  return (
    <div className="container py-12 m-auto">
      <div className="mx-auto max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">My Appointments</h1>
          <p className="text-muted-foreground mt-2">
            View and manage your dental appointments
          </p>
        </div>

        <div className="flex justify-end mb-4">
          <Button asChild className="bg-sky-600 hover:bg-sky-700">
            <div className="cursor-pointer" onClick={handleNewBooking}>
              Book New Appointment
            </div>
          </Button>
        </div>

        <Tabs defaultValue="upcoming" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="past">Past</TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming">
            {appointments.upcoming.length === 0 ? (
              <div className="text-center py-12">
                <h3 className="text-lg font-medium mb-2">
                  No upcoming appointments
                </h3>
                <p className="text-muted-foreground mb-4">
                  You don't have any scheduled appointments.
                </p>
                <Button asChild className="bg-sky-600 hover:bg-sky-700">
                  <div className="cursor-pointer" onClick={handleNewBooking}>
                    Book New Appointment
                  </div>
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {appointments.upcoming.map((appointment) => (
                  <Card key={appointment.id}>
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row justify-between">
                        <div className="flex flex-row space-y-2-between">
                          <div className="flex flex-col align-middle w-[300px] m-0">
                            <div className="flex items-center space-x-2">
                              <Calendar className="h-5 w-5 text-sky-600" />
                              <span className="font-medium">
                                {format(appointment.date, "PPPP")}
                              </span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Clock className="h-5 w-5 text-sky-600" />
                              <span>{format(appointment.date, "h:mm a")}</span>
                            </div>
                          </div>
                          <div>
                            <div className="flex items-center space-x-2">
                              <HeartPulse className="h-5 w-5 text-sky-600" />
                              <span>{getServiceName(appointment.service)}</span>
                            </div>
                            <div className="flex items-center space-x-2 text-muted-foreground">
                              <Stethoscope className="h-5 w-5 text-sky-600" />
                              <span>
                                {getDoctorName(appointment.doctor_id)}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-start mt-4 md:mt-0 space-x-2">
                          {getStatusBadge(appointment.status)}
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-5 w-5" />
                                <span className="sr-only">Actions</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem
                                onClick={() =>
                                  viewAppointmentDetails(appointment)
                                }
                              >
                                <FileText className="mr-2 h-4 w-4" />
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem asChild>
                                <div
                                  onClick={() => handelReschedule(appointment)}
                                >
                                  <Calendar className="mr-2 h-4 w-4" />
                                  Reschedule
                                </div>
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                className="text-red-600"
                                onClick={() =>
                                  handleCancelAppointment(appointment.id)
                                }
                              >
                                <Trash2 className="mr-2 h-4 w-4" />
                                Cancel
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="past">
            {appointments.past.length === 0 ? (
              <div className="text-center py-12">
                <h3 className="text-lg font-medium">No past appointments</h3>
                <p className="text-muted-foreground">
                  You don't have any past appointments.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {appointments.past.map((appointment) => (
                  <Card key={appointment.id}>
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row justify-between">
                        <div className="flex flex-row space-y-2-between">
                          <div className="flex flex-col align-middle w-[300px] m-0">
                            <div className="flex items-center space-x-2">
                              <Calendar className="h-5 w-5 text-sky-600" />
                              <span className="font-medium">
                                {format(appointment.date, "PPPP")}
                              </span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Clock className="h-5 w-5 text-sky-600" />
                              <span>{format(appointment.date, "h:mm a")}</span>
                            </div>
                          </div>
                          <div>
                            <div className="flex items-center space-x-2">
                              <HeartPulse className="h-5 w-5 text-sky-600" />
                              <span>{getServiceName(appointment.service)}</span>
                            </div>
                            <div className="flex items-center space-x-2 text-muted-foreground">
                              <Stethoscope className="h-5 w-5 text-sky-600" />
                              <span>
                                {getDoctorName(appointment.doctor_id)}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-start mt-4 md:mt-0 space-x-2">
                          {getStatusBadge(appointment.status)}
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => viewAppointmentDetails(appointment)}
                          >
                            <FileText className="h-5 w-5" />
                            <span className="sr-only">View Details</span>
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>

        {/* Cancel Appointment Dialog */}
        <Dialog open={cancelDialogOpen} onOpenChange={setCancelDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Cancel Appointment</DialogTitle>
              <DialogDescription>
                Are you sure you want to cancel this appointment? This action
                cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setCancelDialogOpen(false)}
              >
                Keep Appointment
              </Button>
              <Button variant="destructive" onClick={confirmCancelAppointment}>
                Yes, Cancel Appointment
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Appointment Details Dialog */}
        <Dialog open={detailsDialogOpen} onOpenChange={setDetailsDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Appointment Details</DialogTitle>
            </DialogHeader>
            {selectedAppointment && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground">
                      Date
                    </h4>
                    <p>{format(selectedAppointment.date, "PPPP")}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground">
                      Time
                    </h4>
                    <p>{format(selectedAppointment.date, "h:mm a")}</p>
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">
                    Service
                  </h4>
                  <p>{getServiceName(selectedAppointment.service)}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">
                    Dentist
                  </h4>
                  <p>{getDoctorName(selectedAppointment.doctor_id)}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">
                    Status
                  </h4>
                  <div className="mt-1">
                    {getStatusBadge(selectedAppointment.status)}
                  </div>
                </div>
                {selectedAppointment.status === "confirmed" && (
                  <div className="flex gap-2 pt-2">
                    <Button asChild variant="outline" className="flex-1">
                      <div
                        onClick={() => handelReschedule(selectedAppointment)}
                      >
                        Reschedule
                      </div>
                    </Button>
                    <Button
                      variant="destructive"
                      className="flex-1"
                      onClick={() => {
                        setDetailsDialogOpen(false);
                        handleCancelAppointment(selectedAppointment.id);
                      }}
                    >
                      Cancel
                    </Button>
                  </div>
                )}
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
