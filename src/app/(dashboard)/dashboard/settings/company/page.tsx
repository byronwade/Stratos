"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  Building2,
  Check,
  Clock,
  Copy,
  Globe,
  HelpCircle,
  Loader2,
  Mail,
  MapPin,
  Phone,
  Plus,
  Radius,
  Save,
  Trash2,
  Upload,
  X,
} from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import {
import { usePageLayout } from "@/hooks/use-page-layout";
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// Constants
const MIN_NAME_LENGTH = 2;
const MIN_PHONE_LENGTH = 10;
const MAX_DESCRIPTION_LENGTH = 1000;
const SIMULATED_API_DELAY = 1500;
const NOON_HOUR = 12;
const HOURS_IN_DAY = 24;
const MAX_PREVIEW_AREAS = 3;

const DAYS_OF_WEEK = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
] as const;

const TIME_OPTIONS = Array.from({ length: HOURS_IN_DAY }, (_, i) => ({
  value: `${i.toString().padStart(2, "0")}:00`,
  label: formatHour(i),
}));

function formatHour(hour: number): string {
  if (hour === 0) {
    return "12:00 AM";
  }
  if (hour < NOON_HOUR) {
    return `${hour}:00 AM`;
  }
  if (hour === NOON_HOUR) {
    return "12:00 PM";
  }
  return `${hour - NOON_HOUR}:00 PM`;
}

const operatingHoursSchema = z.object({
  enabled: z.boolean(),
  openTime: z.string().optional(),
  closeTime: z.string().optional(),
});

const companyProfileSchema = z.object({
  companyName: z
    .string()
    .min(
      MIN_NAME_LENGTH,
      `Company name must be at least ${MIN_NAME_LENGTH} characters`
    ),
  legalName: z.string().optional(),
  industry: z.string().min(1, "Please select an industry"),
  email: z.string().email("Please enter a valid email address"),
  phone: z
    .string()
    .min(
      MIN_PHONE_LENGTH,
      `Phone number must be at least ${MIN_PHONE_LENGTH} digits`
    ),
  website: z.string().optional().or(z.literal("")),
  taxId: z.string().optional(),
  description: z
    .string()
    .max(
      MAX_DESCRIPTION_LENGTH,
      `Description must be less than ${MAX_DESCRIPTION_LENGTH} characters`
    )
    .optional(),
  address: z.string().min(1, "Address is required"),
  address2: z.string().optional(),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  zipCode: z.string().min(1, "ZIP code is required"),
  country: z.string().min(1, "Country is required"),
  serviceAreaType: z.enum(["radius", "locations"]),
  serviceRadius: z.number().min(1).max(500),
  serviceAreas: z.array(z.string()),
  hoursOfOperation: z.object({
    monday: operatingHoursSchema,
    tuesday: operatingHoursSchema,
    wednesday: operatingHoursSchema,
    thursday: operatingHoursSchema,
    friday: operatingHoursSchema,
    saturday: operatingHoursSchema,
    sunday: operatingHoursSchema,
  }),
});

type CompanyProfileFormData = z.infer<typeof companyProfileSchema>;

function capitalizeDay(day: string): string {
  return day.charAt(0).toUpperCase() + day.slice(1);
}

export default function CompanyProfilePage() {
  usePageLayout({
    maxWidth: "7xl",
    padding: "md",
    gap: "md",
    showToolbar: true,
    showSidebar: true,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [serviceAreaInput, setServiceAreaInput] = useState("");
  const [bulkHoursMode, setBulkHoursMode] = useState(false);
  const [bulkHours, setBulkHours] = useState({
    openTime: "08:00",
    closeTime: "17:00",
  });

  const form = useForm<CompanyProfileFormData>({
    resolver: zodResolver(companyProfileSchema),
    defaultValues: {
      companyName: "Stratos Field Services",
      legalName: "Stratos Field Services LLC",
      industry: "Field Service Management",
      email: "contact@stratos.com",
      phone: "+1 (555) 123-4567",
      website: "https://stratos.com",
      taxId: "12-3456789",
      description:
        "Leading provider of field service management solutions for HVAC, plumbing, and electrical contractors.",
      address: "123 Business Center Dr",
      address2: "Suite 200",
      city: "San Francisco",
      state: "CA",
      zipCode: "94102",
      country: "United States",
      serviceAreaType: "locations",
      serviceRadius: 25,
      serviceAreas: [
        "San Francisco, CA",
        "Oakland, CA",
        "San Jose, CA",
        "Palo Alto, CA",
      ],
      hoursOfOperation: {
        monday: { enabled: true, openTime: "08:00", closeTime: "17:00" },
        tuesday: { enabled: true, openTime: "08:00", closeTime: "17:00" },
        wednesday: { enabled: true, openTime: "08:00", closeTime: "17:00" },
        thursday: { enabled: true, openTime: "08:00", closeTime: "17:00" },
        friday: { enabled: true, openTime: "08:00", closeTime: "17:00" },
        saturday: { enabled: false, openTime: "09:00", closeTime: "14:00" },
        sunday: { enabled: false, openTime: "", closeTime: "" },
      },
    },
  });

  async function onSubmit(_values: CompanyProfileFormData) {
    setIsSubmitting(true);
    await new Promise((resolve) => {
      setTimeout(resolve, SIMULATED_API_DELAY);
    });
    setHasChanges(false);
    setIsSubmitting(false);
  }

  function addServiceArea() {
    if (!serviceAreaInput.trim()) {
      return;
    }
    const currentAreas = form.getValues("serviceAreas") || [];
    form.setValue("serviceAreas", [...currentAreas, serviceAreaInput.trim()]);
    setServiceAreaInput("");
    setHasChanges(true);
  }

  function removeServiceArea(index: number) {
    const currentAreas = form.getValues("serviceAreas") || [];
    form.setValue(
      "serviceAreas",
      currentAreas.filter((_, i) => i !== index)
    );
    setHasChanges(true);
  }

  function applyBulkHours() {
    const days = DAYS_OF_WEEK.filter((day) =>
      form.watch(`hoursOfOperation.${day}.enabled`)
    );
    for (const day of days) {
      form.setValue(`hoursOfOperation.${day}.openTime`, bulkHours.openTime);
      form.setValue(`hoursOfOperation.${day}.closeTime`, bulkHours.closeTime);
    }
    setHasChanges(true);
    setBulkHoursMode(false);
  }

  function copyWeekdaysToWeekend() {
    const mondayHours = form.getValues("hoursOfOperation.monday");
    form.setValue("hoursOfOperation.saturday", mondayHours);
    form.setValue("hoursOfOperation.sunday", mondayHours);
    setHasChanges(true);
  }

  const serviceAreas = form.watch("serviceAreas") || [];
  const serviceAreaType = form.watch("serviceAreaType");

  return (
    <TooltipProvider>
      <div className="space-y-8 py-8">
        {/* Header */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <h1 className="font-bold text-4xl tracking-tight">
                Company Profile
              </h1>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    className="flex items-center justify-center rounded-full hover:bg-muted"
                    type="button"
                  >
                    <HelpCircle className="h-5 w-5 text-muted-foreground" />
                  </button>
                </TooltipTrigger>
                <TooltipContent className="max-w-sm">
                  <p className="font-semibold">Company information</p>
                  <p className="mt-2 text-sm">
                    This information appears on invoices, estimates, and your
                    customer portal. Keep it accurate and up to date.
                  </p>
                </TooltipContent>
              </Tooltip>
            </div>
            {hasChanges && (
              <Badge className="bg-amber-600" variant="default">
                Unsaved Changes
              </Badge>
            )}
          </div>
          <p className="text-lg text-muted-foreground">
            Manage your company information and business details
          </p>
        </div>

        <Form {...form}>
          <form
            className="space-y-8"
            onChange={() => {
              setHasChanges(true);
            }}
            onSubmit={form.handleSubmit(onSubmit)}
          >
            {/* Company Logo Section */}
            <div className="rounded-xl border bg-card p-8 shadow-sm">
              <div className="flex items-start gap-8">
                <div className="flex flex-col items-center space-y-4">
                  <div className="relative">
                    <div className="flex h-32 w-32 items-center justify-center rounded-lg border-4 border-background bg-muted shadow-lg">
                      <Building2 className="h-16 w-16 text-muted-foreground" />
                    </div>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          className="absolute right-0 bottom-0 h-10 w-10 rounded-full shadow-md"
                          size="icon"
                          type="button"
                        >
                          <Upload className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Upload logo</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                </div>

                <div className="flex-1 space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <h2 className="font-semibold text-xl">Company Logo</h2>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <button
                            className="flex items-center justify-center"
                            type="button"
                          >
                            <HelpCircle className="h-4 w-4 text-muted-foreground" />
                          </button>
                        </TooltipTrigger>
                        <TooltipContent className="max-w-xs">
                          <p className="text-sm">
                            Your company logo appears on invoices, estimates,
                            customer portal, and email communications.
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                    <p className="text-muted-foreground text-sm">
                      Upload your company logo for professional branding
                    </p>
                  </div>

                  <div className="flex gap-3">
                    <Button type="button" variant="outline">
                      <Upload className="mr-2 h-4 w-4" />
                      Upload New Logo
                    </Button>
                    <Button type="button" variant="ghost">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Remove
                    </Button>
                  </div>

                  <p className="text-muted-foreground text-xs">
                    Recommended: PNG or SVG format, max 2MB, at least 400x400
                    pixels for crisp display
                  </p>
                </div>
              </div>
            </div>

            {/* Company Information */}
            <div className="rounded-xl border bg-card p-8 shadow-sm">
              <div className="mb-6 space-y-2">
                <div className="flex items-center gap-2">
                  <Building2 className="h-5 w-5 text-muted-foreground" />
                  <h2 className="font-semibold text-xl">Company Information</h2>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button
                        className="flex items-center justify-center"
                        type="button"
                      >
                        <HelpCircle className="h-4 w-4 text-muted-foreground" />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent className="max-w-xs">
                      <p className="text-sm">
                        Essential business information for legal documents and
                        customer communications.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <p className="text-muted-foreground text-sm">
                  Basic details about your business
                </p>
              </div>

              <div className="space-y-6">
                {/* Company Names */}
                <div className="grid gap-6 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="companyName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          Company Name
                          <span className="text-destructive">*</span>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <button type="button">
                                <HelpCircle className="h-3.5 w-3.5 text-muted-foreground" />
                              </button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="max-w-xs text-sm">
                                Business name as customers see it
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="ABC Services" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="legalName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          Legal Name
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <button type="button">
                                <HelpCircle className="h-3.5 w-3.5 text-muted-foreground" />
                              </button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="max-w-xs text-sm">
                                Official registered business name (LLC, Inc,
                                etc.)
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="ABC Services LLC" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Industry */}
                <FormField
                  control={form.control}
                  name="industry"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        Industry
                        <span className="text-destructive">*</span>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <button type="button">
                              <HelpCircle className="h-3.5 w-3.5 text-muted-foreground" />
                            </button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="max-w-xs text-sm">
                              Your primary industry or service type
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Field Service Management"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Contact Information */}
                <div className="grid gap-6 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <Mail className="h-3.5 w-3.5" />
                          Company Email
                          <span className="text-destructive">*</span>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <button type="button">
                                <HelpCircle className="h-3.5 w-3.5 text-muted-foreground" />
                              </button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="max-w-xs text-sm">
                                Main email for customer communications and
                                invoices
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="contact@company.com"
                            type="email"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Appears on all customer communications
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <Phone className="h-3.5 w-3.5" />
                          Company Phone
                          <span className="text-destructive">*</span>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <button type="button">
                                <HelpCircle className="h-3.5 w-3.5 text-muted-foreground" />
                              </button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="max-w-xs text-sm">
                                Main phone number for customer inquiries
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="+1 (555) 123-4567"
                            type="tel"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Include country code for international
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Website and Tax ID */}
                <div className="grid gap-6 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="website"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <Globe className="h-3.5 w-3.5" />
                          Website
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <button type="button">
                                <HelpCircle className="h-3.5 w-3.5 text-muted-foreground" />
                              </button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="max-w-xs text-sm">
                                Your company website URL
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="https://yourcompany.com"
                            type="url"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="taxId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          Tax ID / EIN
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <button type="button">
                                <HelpCircle className="h-3.5 w-3.5 text-muted-foreground" />
                              </button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="max-w-xs text-sm">
                                Tax identification number for invoices and legal
                                documents
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="12-3456789" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Description */}
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        Company Description
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <button type="button">
                              <HelpCircle className="h-3.5 w-3.5 text-muted-foreground" />
                            </button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="max-w-xs text-sm">
                              Brief description of your business and services
                              offered
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          className="min-h-[120px] resize-y"
                          placeholder="Tell customers about your business and services..."
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        {field.value?.length || 0} / {MAX_DESCRIPTION_LENGTH}{" "}
                        characters
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Service Areas with Map */}
            <div className="rounded-xl border bg-card p-8 shadow-sm">
              <div className="mb-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-muted-foreground" />
                    <h2 className="font-semibold text-xl">Service Areas</h2>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button
                          className="flex items-center justify-center"
                          type="button"
                        >
                          <HelpCircle className="h-4 w-4 text-muted-foreground" />
                        </button>
                      </TooltipTrigger>
                      <TooltipContent className="max-w-xs">
                        <p className="text-sm">
                          Define the geographic areas where you provide
                          services. This helps customers know if you service
                          their location.
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                </div>
                <p className="text-muted-foreground text-sm">
                  Define your service coverage area
                </p>

                {/* Service Area Type Toggle */}
                <FormField
                  control={form.control}
                  name="serviceAreaType"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <RadioGroup
                          className="grid grid-cols-2 gap-4"
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <Label
                            className="flex cursor-pointer flex-col items-center justify-between rounded-lg border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary"
                            htmlFor="radius"
                          >
                            <RadioGroupItem
                              className="sr-only"
                              id="radius"
                              value="radius"
                            />
                            <Radius className="mb-3 h-6 w-6" />
                            <div className="space-y-1 text-center">
                              <p className="font-medium text-sm">
                                Radius Coverage
                              </p>
                              <p className="text-muted-foreground text-xs">
                                Service area around your location
                              </p>
                            </div>
                          </Label>
                          <Label
                            className="flex cursor-pointer flex-col items-center justify-between rounded-lg border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary"
                            htmlFor="locations"
                          >
                            <RadioGroupItem
                              className="sr-only"
                              id="locations"
                              value="locations"
                            />
                            <MapPin className="mb-3 h-6 w-6" />
                            <div className="space-y-1 text-center">
                              <p className="font-medium text-sm">
                                Specific Locations
                              </p>
                              <p className="text-muted-foreground text-xs">
                                List cities, counties, or ZIP codes
                              </p>
                            </div>
                          </Label>
                        </RadioGroup>
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              {serviceAreaType === "radius" ? (
                <div className="space-y-6">
                  <div className="rounded-lg border bg-muted/30 p-6">
                    <FormField
                      control={form.control}
                      name="serviceRadius"
                      render={({ field }) => (
                        <FormItem>
                          <div className="flex items-center justify-between">
                            <FormLabel className="font-semibold text-base">
                              Service Radius
                            </FormLabel>
                            <div className="rounded-md bg-primary px-3 py-1 font-bold text-primary-foreground text-sm">
                              {field.value} miles
                            </div>
                          </div>
                          <FormControl>
                            <Slider
                              className="mt-6"
                              max={500}
                              min={1}
                              onValueChange={(vals) => {
                                field.onChange(vals[0]);
                              }}
                              step={5}
                              value={[field.value]}
                            />
                          </FormControl>
                          <FormDescription className="mt-4">
                            We will service customers within {field.value} miles
                            of your business address
                          </FormDescription>
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Visual radius indicator */}
                  <div className="rounded-lg border bg-gradient-to-br from-blue-50 to-indigo-100 p-6 dark:from-blue-950 dark:to-indigo-950">
                    <div className="flex items-center justify-center gap-4">
                      <div className="text-center">
                        <div className="relative mx-auto h-32 w-32">
                          <div className="absolute inset-0 animate-pulse rounded-full border-4 border-blue-500 opacity-30" />
                          <div
                            className="absolute inset-0 rounded-full border-2 border-blue-500 border-dashed opacity-50"
                            style={{
                              animation:
                                "ping 2s cubic-bezier(0, 0, 0.2, 1) infinite",
                            }}
                          />
                          <div className="absolute inset-0 flex items-center justify-center">
                            <MapPin className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                          </div>
                        </div>
                        <p className="mt-4 font-semibold">Your Location</p>
                        <p className="text-muted-foreground text-sm">
                          {form.watch("city")}, {form.watch("state")}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="grid gap-6 lg:grid-cols-2">
                  {/* Service Area Input */}
                  <div className="space-y-4">
                    <div className="flex gap-2">
                      <Input
                        onChange={(e) => {
                          setServiceAreaInput(e.target.value);
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            addServiceArea();
                          }
                        }}
                        placeholder="Enter city, county, or ZIP code"
                        value={serviceAreaInput}
                      />
                      <Button onClick={addServiceArea} type="button">
                        <Plus className="mr-2 h-4 w-4" />
                        Add
                      </Button>
                    </div>

                    {serviceAreas.length > 0 && (
                      <div className="space-y-2">
                        <p className="font-medium text-sm">
                          Current Service Areas
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {serviceAreas.map((area) => (
                            <Badge
                              className="gap-2 px-3 py-1.5"
                              key={`service-area-${area}`}
                              variant="secondary"
                            >
                              {area}
                              <button
                                className="rounded-full hover:bg-destructive/20"
                                onClick={() => {
                                  const currentAreas =
                                    form.getValues("serviceAreas") || [];
                                  const index = currentAreas.indexOf(area);
                                  if (index > -1) {
                                    removeServiceArea(index);
                                  }
                                }}
                                type="button"
                              >
                                <X className="h-3 w-3" />
                              </button>
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    <p className="text-muted-foreground text-xs">
                      Add cities, counties, or ZIP codes where you provide
                      services
                    </p>
                  </div>

                  {/* Interactive Map Preview */}
                  <div className="rounded-lg border bg-muted/30 p-4">
                    <div className="aspect-video w-full overflow-hidden rounded-lg bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-950 dark:to-indigo-950">
                      {serviceAreas.length > 0 ? (
                        <div className="flex h-full flex-col items-center justify-center gap-4 p-6">
                          <MapPin className="h-12 w-12 text-blue-600 dark:text-blue-400" />
                          <div className="text-center">
                            <p className="font-semibold text-lg">
                              {serviceAreas.length} Service{" "}
                              {serviceAreas.length === 1 ? "Area" : "Areas"}
                            </p>
                            <p className="text-muted-foreground text-sm">
                              Map integration available with Google Maps API
                            </p>
                          </div>
                          <div className="mt-4 grid max-w-xs gap-2">
                            {serviceAreas
                              .slice(0, MAX_PREVIEW_AREAS)
                              .map((area) => (
                                <div
                                  className="flex items-center gap-2 rounded-md bg-white/50 px-3 py-2 text-sm dark:bg-black/20"
                                  key={`map-area-${area}`}
                                >
                                  <div className="h-2 w-2 rounded-full bg-blue-600 dark:bg-blue-400" />
                                  {area}
                                </div>
                              ))}
                            {serviceAreas.length > MAX_PREVIEW_AREAS && (
                              <p className="text-center text-muted-foreground text-xs">
                                +{serviceAreas.length - MAX_PREVIEW_AREAS} more
                                locations
                              </p>
                            )}
                          </div>
                        </div>
                      ) : (
                        <div className="flex h-full items-center justify-center">
                          <div className="text-center">
                            <MapPin className="mx-auto mb-4 h-12 w-12 text-muted-foreground/50" />
                            <p className="text-muted-foreground text-sm">
                              Add service areas to see map preview
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Hours of Operation */}
            <div className="rounded-xl border bg-card p-8 shadow-sm">
              <div className="mb-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-muted-foreground" />
                    <h2 className="font-semibold text-xl">
                      Hours of Operation
                    </h2>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button
                          className="flex items-center justify-center"
                          type="button"
                        >
                          <HelpCircle className="h-4 w-4 text-muted-foreground" />
                        </button>
                      </TooltipTrigger>
                      <TooltipContent className="max-w-xs">
                        <p className="text-sm">
                          Set your business hours so customers know when you are
                          available for service calls and inquiries.
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      onClick={copyWeekdaysToWeekend}
                      size="sm"
                      type="button"
                      variant="outline"
                    >
                      <Copy className="mr-2 h-3 w-3" />
                      Copy to Weekend
                    </Button>
                    <Button
                      onClick={() => {
                        setBulkHoursMode(!bulkHoursMode);
                      }}
                      size="sm"
                      type="button"
                      variant="outline"
                    >
                      <Clock className="mr-2 h-3 w-3" />
                      Bulk Edit
                    </Button>
                  </div>
                </div>
                <p className="text-muted-foreground text-sm">
                  When your business is available for service
                </p>

                {/* Bulk Edit Mode */}
                {bulkHoursMode && (
                  <div className="rounded-lg border bg-muted/30 p-4">
                    <div className="space-y-4">
                      <p className="font-medium text-sm">
                        Apply hours to all enabled days
                      </p>
                      <div className="flex items-center gap-4">
                        <Select
                          onValueChange={(val) => {
                            setBulkHours({ ...bulkHours, openTime: val });
                          }}
                          value={bulkHours.openTime}
                        >
                          <SelectTrigger className="flex-1">
                            <SelectValue placeholder="Open time" />
                          </SelectTrigger>
                          <SelectContent>
                            {TIME_OPTIONS.map((option) => (
                              <SelectItem
                                key={option.value}
                                value={option.value}
                              >
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <span className="text-muted-foreground">to</span>
                        <Select
                          onValueChange={(val) => {
                            setBulkHours({ ...bulkHours, closeTime: val });
                          }}
                          value={bulkHours.closeTime}
                        >
                          <SelectTrigger className="flex-1">
                            <SelectValue placeholder="Close time" />
                          </SelectTrigger>
                          <SelectContent>
                            {TIME_OPTIONS.map((option) => (
                              <SelectItem
                                key={option.value}
                                value={option.value}
                              >
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          className="flex-1"
                          onClick={applyBulkHours}
                          type="button"
                        >
                          Apply to Enabled Days
                        </Button>
                        <Button
                          onClick={() => {
                            setBulkHoursMode(false);
                          }}
                          type="button"
                          variant="outline"
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-3">
                {DAYS_OF_WEEK.map((day) => {
                  const isEnabled = form.watch(
                    `hoursOfOperation.${day}.enabled`
                  );
                  const openTime = form.watch(
                    `hoursOfOperation.${day}.openTime`
                  );
                  const closeTime = form.watch(
                    `hoursOfOperation.${day}.closeTime`
                  );
                  return (
                    <div
                      className={`flex items-center gap-4 rounded-lg border p-4 transition-colors ${isEnabled ? "bg-muted/30" : "bg-background"}`}
                      key={day}
                    >
                      <div className="flex w-36 items-center gap-3">
                        <FormField
                          control={form.control}
                          name={`hoursOfOperation.${day}.enabled`}
                          render={({ field }) => (
                            <FormItem className="space-y-0">
                              <FormControl>
                                <Switch
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        <FormLabel className="cursor-pointer font-semibold text-base">
                          {capitalizeDay(day)}
                        </FormLabel>
                      </div>

                      {isEnabled ? (
                        <div className="flex flex-1 items-center gap-3">
                          <FormField
                            control={form.control}
                            name={`hoursOfOperation.${day}.openTime`}
                            render={({ field }) => (
                              <FormItem className="flex-1 space-y-0">
                                <Select
                                  onValueChange={field.onChange}
                                  value={field.value}
                                >
                                  <FormControl>
                                    <SelectTrigger className="h-9">
                                      <SelectValue placeholder="Open" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    {TIME_OPTIONS.map((option) => (
                                      <SelectItem
                                        key={option.value}
                                        value={option.value}
                                      >
                                        {option.label}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <span className="text-muted-foreground text-sm">
                            -
                          </span>
                          <FormField
                            control={form.control}
                            name={`hoursOfOperation.${day}.closeTime`}
                            render={({ field }) => (
                              <FormItem className="flex-1 space-y-0">
                                <Select
                                  onValueChange={field.onChange}
                                  value={field.value}
                                >
                                  <FormControl>
                                    <SelectTrigger className="h-9">
                                      <SelectValue placeholder="Close" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    {TIME_OPTIONS.map((option) => (
                                      <SelectItem
                                        key={option.value}
                                        value={option.value}
                                      >
                                        {option.label}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <div className="w-32 text-right">
                            <Badge variant="secondary">
                              {openTime && closeTime ? (
                                <>
                                  {
                                    TIME_OPTIONS.find(
                                      (t) => t.value === openTime
                                    )?.label.split(" ")[0]
                                  }{" "}
                                  -{" "}
                                  {
                                    TIME_OPTIONS.find(
                                      (t) => t.value === closeTime
                                    )?.label.split(" ")[0]
                                  }
                                </>
                              ) : (
                                "Set hours"
                              )}
                            </Badge>
                          </div>
                        </div>
                      ) : (
                        <div className="flex flex-1 items-center">
                          <Badge className="bg-muted" variant="outline">
                            Closed
                          </Badge>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Business Address */}
            <div className="rounded-xl border bg-card p-8 shadow-sm">
              <div className="mb-6 space-y-2">
                <div className="flex items-center gap-2">
                  <Building2 className="h-5 w-5 text-muted-foreground" />
                  <h2 className="font-semibold text-xl">Business Address</h2>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button
                        className="flex items-center justify-center"
                        type="button"
                      >
                        <HelpCircle className="h-4 w-4 text-muted-foreground" />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent className="max-w-xs">
                      <p className="text-sm">
                        Physical location of your business. Required for
                        invoices and legal documents.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <p className="text-muted-foreground text-sm">
                  Your business location information
                </p>
              </div>

              <div className="space-y-6">
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        Street Address
                        <span className="text-destructive">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="123 Main Street" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="address2"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address Line 2</FormLabel>
                      <FormControl>
                        <Input placeholder="Suite, Unit, Building" {...field} />
                      </FormControl>
                      <FormDescription>
                        Optional: Suite, unit, or building number
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid gap-6 md:grid-cols-3">
                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          City
                          <span className="text-destructive">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="San Francisco" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="state"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          State / Province
                          <span className="text-destructive">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="CA" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="zipCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          ZIP / Postal Code
                          <span className="text-destructive">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="94102" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        Country
                        <span className="text-destructive">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="United States" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Action Bar - Sticky */}
            <div className="sticky bottom-0 z-10 rounded-xl border bg-card p-6 shadow-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {hasChanges ? (
                    <>
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-100 dark:bg-amber-900/30">
                        <div className="h-2 w-2 animate-pulse rounded-full bg-amber-600" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">Unsaved Changes</p>
                        <p className="text-muted-foreground text-xs">
                          Save your changes or cancel to discard
                        </p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
                        <Check className="h-4 w-4 text-green-600 dark:text-green-500" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">All Changes Saved</p>
                        <p className="text-muted-foreground text-xs">
                          Your company profile is up to date
                        </p>
                      </div>
                    </>
                  )}
                </div>

                <div className="flex gap-3">
                  <Button
                    disabled={isSubmitting || !hasChanges}
                    onClick={() => {
                      form.reset();
                      setHasChanges(false);
                    }}
                    type="button"
                    variant="outline"
                  >
                    Cancel
                  </Button>
                  <Button disabled={isSubmitting || !hasChanges} type="submit">
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        Save Company Profile
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </TooltipProvider>
  );
}
