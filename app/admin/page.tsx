"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Plus, Edit, Trash2, LogOut } from "lucide-react";

interface Show {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  address: string;
  ticketLink: string;
}

const showSchema = z.object({
  title: z.string().min(1, "Title is required"),
  date: z.string().min(1, "Date is required"),
  time: z.string().min(1, "Time is required"),
  location: z.string().min(1, "Location is required"),
  address: z.string().min(1, "Address is required"),
  ticketLink: z.string().url("Must be a valid URL"),
});

type ShowFormValues = z.infer<typeof showSchema>;

export default function AdminDashboard() {
  const router = useRouter();
  const [shows, setShows] = useState<Show[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [editingShow, setEditingShow] = useState<Show | null>(null);
  const [deletingShowId, setDeletingShowId] = useState<number | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ShowFormValues>({
    resolver: zodResolver(showSchema),
  });

  // Check authentication
  useEffect(() => {
    checkAuth();
  }, []);

  // Load shows
  useEffect(() => {
    if (isAuthenticated) {
      loadShows();
    }
  }, [isAuthenticated]);

  const checkAuth = async () => {
    try {
      const response = await fetch("/api/auth/check");
      const data = await response.json();
      if (data.authenticated) {
        setIsAuthenticated(true);
      } else {
        router.push("/admin/login");
      }
    } catch (error) {
      router.push("/admin/login");
    } finally {
      setIsLoading(false);
    }
  };

  const loadShows = async () => {
    try {
      const response = await fetch("/api/shows");
      const data = await response.json();
      setShows(data);
    } catch (error) {
      toast.error("Failed to load shows");
    }
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.push("/admin/login");
    } catch (error) {
      toast.error("Logout failed");
    }
  };

  const openAddDialog = () => {
    setEditingShow(null);
    reset();
    setIsDialogOpen(true);
  };

  const openEditDialog = (show: Show) => {
    setEditingShow(show);
    reset({
      title: show.title,
      date: show.date,
      time: show.time,
      location: show.location,
      address: show.address,
      ticketLink: show.ticketLink,
    });
    setIsDialogOpen(true);
  };

  const onSubmit = async (data: ShowFormValues) => {
    try {
      if (editingShow) {
        // Update existing show
        const response = await fetch("/api/shows", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: editingShow.id,
            ...data,
          }),
        });

        if (response.ok) {
          toast.success("Show updated successfully!");
          setIsDialogOpen(false);
          loadShows();
        } else {
          const error = await response.json();
          toast.error(error.error || "Failed to update show");
        }
      } else {
        // Add new show
        const response = await fetch("/api/shows", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        if (response.ok) {
          toast.success("Show added successfully!");
          setIsDialogOpen(false);
          reset();
          loadShows();
        } else {
          const error = await response.json();
          toast.error(error.error || "Failed to add show");
        }
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    }
  };

  const handleDeleteClick = (id: number) => {
    setDeletingShowId(id);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!deletingShowId) return;

    try {
      const response = await fetch(`/api/shows?id=${deletingShowId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        toast.success("Show deleted successfully!");
        setIsDeleteDialogOpen(false);
        setDeletingShowId(null);
        loadShows();
      } else {
        const error = await response.json();
        toast.error(error.error || "Failed to delete show");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-3xl font-bold">Admin Panel</CardTitle>
                <CardDescription className="mt-2">
                  Manage your upcoming shows
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <Button onClick={openAddDialog} className="gap-2">
                  <Plus className="h-4 w-4" />
                  Add Show
                </Button>
                <Button onClick={handleLogout} variant="outline" className="gap-2">
                  <LogOut className="h-4 w-4" />
                  Logout
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {shows.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No shows yet. Add your first show!</p>
              </div>
            ) : (
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Time</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {shows.map((show) => (
                      <TableRow key={show.id}>
                        <TableCell className="font-medium">{show.title}</TableCell>
                        <TableCell>{formatDate(show.date)}</TableCell>
                        <TableCell>{show.time}</TableCell>
                        <TableCell>{show.location}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => openEditDialog(show)}
                              className="gap-2"
                            >
                              <Edit className="h-4 w-4" />
                              Edit
                            </Button>
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => handleDeleteClick(show.id)}
                              className="gap-2"
                            >
                              <Trash2 className="h-4 w-4" />
                              Delete
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Add/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingShow ? "Edit Show" : "Add New Show"}</DialogTitle>
            <DialogDescription>
              {editingShow
                ? "Update the show information below."
                : "Fill in the details to add a new upcoming show."}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                placeholder="Show title"
                {...register("title")}
              />
              {errors.title && (
                <p className="text-sm text-destructive">{errors.title.message}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="date">Date *</Label>
                <Input
                  id="date"
                  type="date"
                  {...register("date")}
                />
                {errors.date && (
                  <p className="text-sm text-destructive">{errors.date.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="time">Time *</Label>
                <Input
                  id="time"
                  placeholder="e.g., 7:30 PM"
                  {...register("time")}
                />
                {errors.time && (
                  <p className="text-sm text-destructive">{errors.time.message}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location *</Label>
              <Input
                id="location"
                placeholder="Venue name"
                {...register("location")}
              />
              {errors.location && (
                <p className="text-sm text-destructive">{errors.location.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Address *</Label>
              <Input
                id="address"
                placeholder="Full address"
                {...register("address")}
              />
              {errors.address && (
                <p className="text-sm text-destructive">{errors.address.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="ticketLink">Ticket Link *</Label>
              <Input
                id="ticketLink"
                type="url"
                placeholder="https://..."
                {...register("ticketLink")}
              />
              {errors.ticketLink && (
                <p className="text-sm text-destructive">{errors.ticketLink.message}</p>
              )}
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit">{editingShow ? "Update" : "Add"} Show</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the show.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

