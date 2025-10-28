/**
 * AI Coming Soon Page - Server Component
 *
 * Performance optimizations:
 * - Server Component (no "use client")
 * - All static marketing content rendered on server
 * - Massive bundle size reduction (1106 lines of JSX)
 * - Better SEO and initial page load
 */

import {
  AlertCircle,
  BarChart3,
  Bell,
  Bot,
  Brain,
  Calendar,
  CheckCircle2,
  Clock,
  CreditCard,
  Database,
  DollarSign,
  FileText,
  HeadphonesIcon,
  MessageSquare,
  Phone,
  PhoneCall,
  PhoneForwarded,
  PhoneIncoming,
  PhoneOutgoing,
  Search,
  Send,
  Shield,
  Sparkles,
  TrendingUp,
  UserCheck,
  Users,
  Wrench,
  Zap,
} from "lucide-react";

export function AIComingSoon() {
  return (
    <div className="relative space-y-10 py-8 md:py-12">
      {/* Background gradient blobs */}
      <div className="-z-10 pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 size-96 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute right-1/4 bottom-1/4 size-96 rounded-full bg-primary/5 blur-3xl" />
      </div>

      {/* Main content */}
      <div className="mx-auto w-full max-w-5xl space-y-10 text-center">
        {/* Status badge */}
        <div className="flex justify-center">
          <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-5 py-2 text-sm backdrop-blur-sm">
            <Clock className="mr-2 size-4" />
            <span className="font-medium">Coming Soon</span>
          </div>
        </div>

        {/* Icon with gradient background */}
        <div className="flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 animate-pulse rounded-full bg-gradient-to-r from-primary/20 to-primary/10 blur-2xl" />
            <div className="relative flex size-24 items-center justify-center rounded-full border border-primary/20 bg-gradient-to-br from-primary/10 to-primary/5 backdrop-blur-sm">
              <Brain className="size-12 text-primary" strokeWidth={1.5} />
            </div>
          </div>
        </div>

        {/* Main heading with gradient */}
        <div className="space-y-3">
          <h1 className="font-bold text-4xl tracking-tight md:text-5xl">
            AI Assistant with{" "}
            <span className="bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text font-extrabold text-transparent dark:from-blue-400 dark:to-blue-300">
              Complete System Control
            </span>
          </h1>
          <p className="mx-auto max-w-3xl text-foreground/60 text-lg leading-relaxed">
            An intelligent assistant that can do anything you can do in the
            system. Ask it to send invoices, create quotes, update customers,
            schedule jobs, and more - all through natural conversation. Plus, it
            monitors your business 24/7 to catch errors before they become
            problems.
          </p>
        </div>

        {/* PRIMARY: AI Chat Assistant Capabilities */}
        <div className="mx-auto max-w-5xl space-y-8 pt-4">
          <div>
            <h2 className="mb-5 font-semibold text-xl">
              Ask Anything, Get It Done
            </h2>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              <div className="group hover:-translate-y-1 rounded-xl border border-primary/10 bg-gradient-to-br from-blue-500/5 to-transparent p-5 text-left transition-all duration-300 hover:border-blue-500/20 hover:shadow-blue-500/10 hover:shadow-lg">
                <div className="mb-4 flex justify-center">
                  <div className="flex size-12 items-center justify-center rounded-full bg-blue-500/10">
                    <MessageSquare className="size-6 text-blue-600 dark:text-blue-400" />
                  </div>
                </div>
                <h3 className="mb-2 font-semibold text-base">
                  &quot;Send invoice to John&quot;
                </h3>
                <p className="text-muted-foreground text-sm">
                  AI finds John&apos;s job, creates invoice, and sends it via
                  email and SMS
                </p>
              </div>

              <div className="group hover:-translate-y-1 rounded-xl border border-primary/10 bg-gradient-to-br from-green-500/5 to-transparent p-5 text-left transition-all duration-300 hover:border-green-500/20 hover:shadow-green-500/10 hover:shadow-lg">
                <div className="mb-4 flex justify-center">
                  <div className="flex size-12 items-center justify-center rounded-full bg-green-500/10">
                    <DollarSign className="size-6 text-green-600 dark:text-green-400" />
                  </div>
                </div>
                <h3 className="mb-2 font-semibold text-base">
                  &quot;What&apos;s my profit today?&quot;
                </h3>
                <p className="text-muted-foreground text-sm">
                  AI calculates revenue minus costs and shows profit breakdown
                  by job
                </p>
              </div>

              <div className="group hover:-translate-y-1 rounded-xl border border-primary/10 bg-gradient-to-br from-purple-500/5 to-transparent p-5 text-left transition-all duration-300 hover:border-purple-500/20 hover:shadow-lg hover:shadow-purple-500/10">
                <div className="mb-4 flex justify-center">
                  <div className="flex size-12 items-center justify-center rounded-full bg-purple-500/10">
                    <FileText className="size-6 text-purple-600 dark:text-purple-400" />
                  </div>
                </div>
                <h3 className="mb-2 font-semibold text-base">
                  &quot;Create 3 quote options&quot;
                </h3>
                <p className="text-muted-foreground text-sm">
                  AI generates good/better/best pricing options ready to send
                </p>
              </div>

              <div className="group hover:-translate-y-1 rounded-xl border border-primary/10 bg-gradient-to-br from-orange-500/5 to-transparent p-5 text-left transition-all duration-300 hover:border-orange-500/20 hover:shadow-lg hover:shadow-orange-500/10">
                <div className="mb-4 flex justify-center">
                  <div className="flex size-12 items-center justify-center rounded-full bg-orange-500/10">
                    <Calendar className="size-6 text-orange-600 dark:text-orange-400" />
                  </div>
                </div>
                <h3 className="mb-2 font-semibold text-base">
                  &quot;Schedule Sarah tomorrow at 2pm&quot;
                </h3>
                <p className="text-muted-foreground text-sm">
                  AI finds best tech, creates appointment, notifies everyone
                </p>
              </div>

              <div className="group hover:-translate-y-1 rounded-xl border border-primary/10 bg-gradient-to-br from-pink-500/5 to-transparent p-5 text-left transition-all duration-300 hover:border-pink-500/20 hover:shadow-lg hover:shadow-pink-500/10">
                <div className="mb-4 flex justify-center">
                  <div className="flex size-12 items-center justify-center rounded-full bg-pink-500/10">
                    <Users className="size-6 text-pink-600 dark:text-pink-400" />
                  </div>
                </div>
                <h3 className="mb-2 font-semibold text-base">
                  &quot;Update Mike&apos;s phone number&quot;
                </h3>
                <p className="text-muted-foreground text-sm">
                  AI finds customer record and updates contact information
                  instantly
                </p>
              </div>

              <div className="group hover:-translate-y-1 rounded-xl border border-primary/10 bg-gradient-to-br from-teal-500/5 to-transparent p-5 text-left transition-all duration-300 hover:border-teal-500/20 hover:shadow-lg hover:shadow-teal-500/10">
                <div className="mb-4 flex justify-center">
                  <div className="flex size-12 items-center justify-center rounded-full bg-teal-500/10">
                    <Search className="size-6 text-teal-600 dark:text-teal-400" />
                  </div>
                </div>
                <h3 className="mb-2 font-semibold text-base">
                  &quot;Show unpaid invoices&quot;
                </h3>
                <p className="text-muted-foreground text-sm">
                  AI finds all outstanding invoices and shows aging breakdown
                </p>
              </div>

              <div className="group hover:-translate-y-1 rounded-xl border border-primary/10 bg-gradient-to-br from-indigo-500/5 to-transparent p-5 text-left transition-all duration-300 hover:border-indigo-500/20 hover:shadow-indigo-500/10 hover:shadow-lg">
                <div className="mb-4 flex justify-center">
                  <div className="flex size-12 items-center justify-center rounded-full bg-indigo-500/10">
                    <Phone className="size-6 text-indigo-600 dark:text-indigo-400" />
                  </div>
                </div>
                <h3 className="mb-2 font-semibold text-base">
                  &quot;Call all pending quotes&quot;
                </h3>
                <p className="text-muted-foreground text-sm">
                  AI creates call list with context for follow-up conversations
                </p>
              </div>

              <div className="group hover:-translate-y-1 rounded-xl border border-primary/10 bg-gradient-to-br from-yellow-500/5 to-transparent p-5 text-left transition-all duration-300 hover:border-yellow-500/20 hover:shadow-lg hover:shadow-yellow-500/10">
                <div className="mb-4 flex justify-center">
                  <div className="flex size-12 items-center justify-center rounded-full bg-yellow-500/10">
                    <BarChart3 className="size-6 text-yellow-600 dark:text-yellow-400" />
                  </div>
                </div>
                <h3 className="mb-2 font-semibold text-base">
                  &quot;Compare this month vs last&quot;
                </h3>
                <p className="text-muted-foreground text-sm">
                  AI analyzes revenue, jobs, and trends with visual charts
                </p>
              </div>
            </div>
          </div>

          {/* Complete System Access */}
          <div>
            <h2 className="mb-5 font-semibold text-xl">
              Complete System Access
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="flex flex-col items-center gap-2 rounded-xl border border-primary/10 bg-gradient-to-br from-primary/5 to-transparent p-4">
                <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
                  <Users className="size-5 text-primary" />
                </div>
                <span className="font-medium text-sm">Customers</span>
                <span className="text-center text-muted-foreground text-xs">
                  Create, update, search
                </span>
              </div>

              <div className="flex flex-col items-center gap-2 rounded-xl border border-primary/10 bg-gradient-to-br from-primary/5 to-transparent p-4">
                <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
                  <Wrench className="size-5 text-primary" />
                </div>
                <span className="font-medium text-sm">Jobs</span>
                <span className="text-center text-muted-foreground text-xs">
                  Schedule, assign, update
                </span>
              </div>

              <div className="flex flex-col items-center gap-2 rounded-xl border border-primary/10 bg-gradient-to-br from-primary/5 to-transparent p-4">
                <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
                  <FileText className="size-5 text-primary" />
                </div>
                <span className="font-medium text-sm">Invoices</span>
                <span className="text-center text-muted-foreground text-xs">
                  Create, send, track
                </span>
              </div>

              <div className="flex flex-col items-center gap-2 rounded-xl border border-primary/10 bg-gradient-to-br from-primary/5 to-transparent p-4">
                <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
                  <CreditCard className="size-5 text-primary" />
                </div>
                <span className="font-medium text-sm">Payments</span>
                <span className="text-center text-muted-foreground text-xs">
                  Process, refund, track
                </span>
              </div>

              <div className="flex flex-col items-center gap-2 rounded-xl border border-primary/10 bg-gradient-to-br from-primary/5 to-transparent p-4">
                <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
                  <Calendar className="size-5 text-primary" />
                </div>
                <span className="font-medium text-sm">Schedule</span>
                <span className="text-center text-muted-foreground text-xs">
                  Book, reschedule, optimize
                </span>
              </div>

              <div className="flex flex-col items-center gap-2 rounded-xl border border-primary/10 bg-gradient-to-br from-primary/5 to-transparent p-4">
                <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
                  <BarChart3 className="size-5 text-primary" />
                </div>
                <span className="font-medium text-sm">Reports</span>
                <span className="text-center text-muted-foreground text-xs">
                  Generate, analyze, export
                </span>
              </div>

              <div className="flex flex-col items-center gap-2 rounded-xl border border-primary/10 bg-gradient-to-br from-primary/5 to-transparent p-4">
                <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
                  <TrendingUp className="size-5 text-primary" />
                </div>
                <span className="font-medium text-sm">Marketing</span>
                <span className="text-center text-muted-foreground text-xs">
                  Campaigns, ads, tracking
                </span>
              </div>

              <div className="flex flex-col items-center gap-2 rounded-xl border border-primary/10 bg-gradient-to-br from-primary/5 to-transparent p-4">
                <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
                  <Database className="size-5 text-primary" />
                </div>
                <span className="font-medium text-sm">Everything</span>
                <span className="text-center text-muted-foreground text-xs">
                  Complete business context
                </span>
              </div>
            </div>
          </div>

          {/* Intelligent Monitoring System */}
          <div>
            <h2 className="mb-5 font-semibold text-xl">
              24/7 Intelligent Monitoring
            </h2>
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="rounded-xl border border-red-500/20 bg-gradient-to-br from-red-500/10 to-transparent p-5 text-left">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex size-12 items-center justify-center rounded-lg bg-red-500/10">
                    <AlertCircle className="size-6 text-red-600 dark:text-red-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Price Changes</h3>
                    <p className="text-muted-foreground text-sm">
                      Catches unauthorized discounts
                    </p>
                  </div>
                </div>
                <p className="mb-3 text-muted-foreground text-sm">
                  &quot;Technician changed $1,250 HVAC repair to $800. This is
                  30% below price book. Would you like to review?&quot;
                </p>
                <div className="flex items-center gap-1 text-red-600 text-xs dark:text-red-400">
                  <Bell className="size-3" />
                  <span>Alerts you instantly</span>
                </div>
              </div>

              <div className="rounded-xl border border-orange-500/20 bg-gradient-to-br from-orange-500/10 to-transparent p-6 text-left">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex size-12 items-center justify-center rounded-lg bg-orange-500/10">
                    <Shield className="size-6 text-orange-600 dark:text-orange-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Missing Photos</h3>
                    <p className="text-muted-foreground text-sm">
                      Ensures documentation quality
                    </p>
                  </div>
                </div>
                <p className="mb-3 text-muted-foreground text-sm">
                  &quot;Job #1247 completed but no before/after photos uploaded.
                  Sending reminder to technician.&quot;
                </p>
                <div className="flex items-center gap-1 text-orange-600 text-xs dark:text-orange-400">
                  <Zap className="size-3" />
                  <span>Automatic reminders</span>
                </div>
              </div>

              <div className="rounded-xl border border-yellow-500/20 bg-gradient-to-br from-yellow-500/10 to-transparent p-6 text-left">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex size-12 items-center justify-center rounded-lg bg-yellow-500/10">
                    <Clock className="size-6 text-yellow-600 dark:text-yellow-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Late Jobs</h3>
                    <p className="text-muted-foreground text-sm">
                      Tracks efficiency issues
                    </p>
                  </div>
                </div>
                <p className="mb-3 text-muted-foreground text-sm">
                  &quot;Tech #3 is 45 minutes over scheduled time on current
                  job. Next appointment may be affected.&quot;
                </p>
                <div className="flex items-center gap-1 text-xs text-yellow-600 dark:text-yellow-400">
                  <TrendingUp className="size-3" />
                  <span>Proactive scheduling</span>
                </div>
              </div>

              <div className="rounded-xl border border-blue-500/20 bg-gradient-to-br from-blue-500/10 to-transparent p-5 text-left">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex size-12 items-center justify-center rounded-lg bg-blue-500/10">
                    <FileText className="size-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Inconsistencies</h3>
                    <p className="text-muted-foreground text-sm">
                      Finds data mismatches
                    </p>
                  </div>
                </div>
                <p className="mb-3 text-muted-foreground text-sm">
                  &quot;Invoice total doesn&apos;t match work order. Line items
                  add to $1,450 but total shows $1,350.&quot;
                </p>
                <div className="flex items-center gap-1 text-blue-600 text-xs dark:text-blue-400">
                  <CheckCircle2 className="size-3" />
                  <span>Prevents errors</span>
                </div>
              </div>

              <div className="rounded-xl border border-purple-500/20 bg-gradient-to-br from-purple-500/10 to-transparent p-5 text-left">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex size-12 items-center justify-center rounded-lg bg-purple-500/10">
                    <Wrench className="size-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Low Inventory</h3>
                    <p className="text-muted-foreground text-sm">
                      Auto-orders materials
                    </p>
                  </div>
                </div>
                <p className="mb-3 text-muted-foreground text-sm">
                  &quot;Truck #2 has only 3 HVAC filters left (below 10-unit
                  threshold). Warehouse stock also low at 8 units. Auto-ordering
                  50 units from supplier.&quot;
                </p>
                <div className="flex items-center gap-1 text-purple-600 text-xs dark:text-purple-400">
                  <Zap className="size-3" />
                  <span>Never run out</span>
                </div>
              </div>

              <div className="rounded-xl border border-green-500/20 bg-gradient-to-br from-green-500/10 to-transparent p-5 text-left">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex size-12 items-center justify-center rounded-lg bg-green-500/10">
                    <DollarSign className="size-6 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Smart Savings</h3>
                    <p className="text-muted-foreground text-sm">
                      Optimizes cash flow
                    </p>
                  </div>
                </div>
                <p className="mb-3 text-muted-foreground text-sm">
                  &quot;Your savings is getting low. Transferring $13,450 from
                  checking account. We noticed you had this to spare after
                  reviewing bills and existing totals.&quot;
                </p>
                <div className="flex items-center gap-1 text-green-600 text-xs dark:text-green-400">
                  <TrendingUp className="size-3" />
                  <span>Intelligent finance</span>
                </div>
              </div>

              <div className="rounded-xl border border-cyan-500/20 bg-gradient-to-br from-cyan-500/10 to-transparent p-5 text-left">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex size-12 items-center justify-center rounded-lg bg-cyan-500/10">
                    <Users className="size-6 text-cyan-600 dark:text-cyan-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">No-Show Patterns</h3>
                    <p className="text-muted-foreground text-sm">
                      Identifies risky customers
                    </p>
                  </div>
                </div>
                <p className="mb-3 text-muted-foreground text-sm">
                  &quot;Customer Sarah M. has missed 3 appointments in the past
                  2 months. Recommend requiring deposit for future
                  bookings.&quot;
                </p>
                <div className="flex items-center gap-1 text-cyan-600 text-xs dark:text-cyan-400">
                  <Shield className="size-3" />
                  <span>Protect revenue</span>
                </div>
              </div>

              <div className="rounded-xl border border-pink-500/20 bg-gradient-to-br from-pink-500/10 to-transparent p-5 text-left">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex size-12 items-center justify-center rounded-lg bg-pink-500/10">
                    <Calendar className="size-6 text-pink-600 dark:text-pink-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Warranty Expiring</h3>
                    <p className="text-muted-foreground text-sm">
                      Catches revenue opportunities
                    </p>
                  </div>
                </div>
                <p className="mb-3 text-muted-foreground text-sm">
                  &quot;HVAC system installed for Johnson family expires in 14
                  days. Extended warranty conversion rate is 67%. Should we
                  reach out?&quot;
                </p>
                <div className="flex items-center gap-1 text-pink-600 text-xs dark:text-pink-400">
                  <TrendingUp className="size-3" />
                  <span>Upsell opportunities</span>
                </div>
              </div>

              <div className="rounded-xl border border-indigo-500/20 bg-gradient-to-br from-indigo-500/10 to-transparent p-5 text-left">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex size-12 items-center justify-center rounded-lg bg-indigo-500/10">
                    <CreditCard className="size-6 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Payment Failures</h3>
                    <p className="text-muted-foreground text-sm">
                      Prevents revenue loss
                    </p>
                  </div>
                </div>
                <p className="mb-3 text-muted-foreground text-sm">
                  &quot;Card ending in 4523 declined for monthly maintenance
                  plan ($89). Customer&apos;s card may have expired. Sending
                  update request.&quot;
                </p>
                <div className="flex items-center gap-1 text-indigo-600 text-xs dark:text-indigo-400">
                  <Bell className="size-3" />
                  <span>Auto recovery</span>
                </div>
              </div>

              <div className="rounded-xl border border-teal-500/20 bg-gradient-to-br from-teal-500/10 to-transparent p-5 text-left">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex size-12 items-center justify-center rounded-lg bg-teal-500/10">
                    <BarChart3 className="size-6 text-teal-600 dark:text-teal-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Unusual Activity</h3>
                    <p className="text-muted-foreground text-sm">
                      Detects anomalies
                    </p>
                  </div>
                </div>
                <p className="mb-3 text-muted-foreground text-sm">
                  &quot;Tech #5 has completed 12 jobs today vs usual average of
                  6. Job quality may be compromised. Running quality
                  check.&quot;
                </p>
                <div className="flex items-center gap-1 text-teal-600 text-xs dark:text-teal-400">
                  <AlertCircle className="size-3" />
                  <span>Quality assurance</span>
                </div>
              </div>

              <div className="rounded-xl border border-rose-500/20 bg-gradient-to-br from-rose-500/10 to-transparent p-5 text-left">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex size-12 items-center justify-center rounded-lg bg-rose-500/10">
                    <Phone className="size-6 text-rose-600 dark:text-rose-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Missed Follow-ups</h3>
                    <p className="text-muted-foreground text-sm">
                      Tracks communication gaps
                    </p>
                  </div>
                </div>
                <p className="mb-3 text-muted-foreground text-sm">
                  &quot;Quote #892 sent 5 days ago with no follow-up call. Close
                  rate drops 40% after 3 days. Creating follow-up task for
                  you.&quot;
                </p>
                <div className="flex items-center gap-1 text-rose-600 text-xs dark:text-rose-400">
                  <Zap className="size-3" />
                  <span>Never miss revenue</span>
                </div>
              </div>

              <div className="rounded-xl border border-amber-500/20 bg-gradient-to-br from-amber-500/10 to-transparent p-5 text-left">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex size-12 items-center justify-center rounded-lg bg-amber-500/10">
                    <Database className="size-6 text-amber-600 dark:text-amber-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Duplicate Records</h3>
                    <p className="text-muted-foreground text-sm">
                      Maintains data integrity
                    </p>
                  </div>
                </div>
                <p className="mb-3 text-muted-foreground text-sm">
                  &quot;Found 3 customer records with same phone number
                  (555-0123). Names: John Smith, J. Smith, Jonathan Smith.
                  Should we merge?&quot;
                </p>
                <div className="flex items-center gap-1 text-amber-600 text-xs dark:text-amber-400">
                  <CheckCircle2 className="size-3" />
                  <span>Clean database</span>
                </div>
              </div>
            </div>
          </div>

          {/* Automation Features (Secondary) */}
          <div>
            <h2 className="mb-5 font-semibold text-xl">
              Smart Automation Built-In
            </h2>
            <div className="grid gap-5 sm:grid-cols-3">
              <div className="rounded-xl border border-primary/10 bg-gradient-to-br from-primary/5 to-transparent p-6 text-left">
                <div className="mb-3 flex size-10 items-center justify-center rounded-lg bg-primary/10">
                  <Bot className="size-5 text-primary" />
                </div>
                <h3 className="mb-2 font-semibold">24/7 AI Answering</h3>
                <p className="text-muted-foreground text-sm">
                  AI handles calls, books appointments, answers questions -
                  never miss a lead
                </p>
              </div>

              <div className="rounded-xl border border-primary/10 bg-gradient-to-br from-primary/5 to-transparent p-6 text-left">
                <div className="mb-3 flex size-10 items-center justify-center rounded-lg bg-primary/10">
                  <Send className="size-5 text-primary" />
                </div>
                <h3 className="mb-2 font-semibold">Auto Follow-ups</h3>
                <p className="text-muted-foreground text-sm">
                  Automatically send reminders, confirmations, and thank you
                  messages
                </p>
              </div>

              <div className="rounded-xl border border-primary/10 bg-gradient-to-br from-primary/5 to-transparent p-6 text-left">
                <div className="mb-3 flex size-10 items-center justify-center rounded-lg bg-primary/10">
                  <Sparkles className="size-5 text-primary" />
                </div>
                <h3 className="mb-2 font-semibold">Smart Dispatch</h3>
                <p className="text-muted-foreground text-sm">
                  AI assigns jobs to best-fit techs based on skills, location,
                  availability
                </p>
              </div>
            </div>
          </div>

          {/* AI Phone System - Outbound Calling */}
          <div>
            <h2 className="mb-5 font-semibold text-xl">
              AI-Initiated Outbound Calling
            </h2>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              <div className="hover:-translate-y-1 rounded-xl border border-primary/10 bg-gradient-to-br from-blue-500/5 to-transparent p-6 text-left transition-all duration-300 hover:border-blue-500/20 hover:shadow-blue-500/10 hover:shadow-lg">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex size-12 items-center justify-center rounded-lg bg-blue-500/10">
                    <PhoneOutgoing className="size-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">
                      Proactive Follow-ups
                    </h3>
                    <p className="text-muted-foreground text-xs">
                      AI calls customers automatically
                    </p>
                  </div>
                </div>
                <p className="mb-3 text-muted-foreground text-sm">
                  AI automatically calls customers who received quotes 3+ days
                  ago, asks about their decision, answers questions, and
                  schedules appointments - all without human intervention.
                </p>
                <div className="flex items-center gap-1 text-blue-600 text-xs dark:text-blue-400">
                  <CheckCircle2 className="size-3" />
                  <span>Never miss follow-up timing</span>
                </div>
              </div>

              <div className="hover:-translate-y-1 rounded-xl border border-primary/10 bg-gradient-to-br from-purple-500/5 to-transparent p-6 text-left transition-all duration-300 hover:border-purple-500/20 hover:shadow-lg hover:shadow-purple-500/10">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex size-12 items-center justify-center rounded-lg bg-purple-500/10">
                    <Calendar className="size-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">
                      Appointment Reminders
                    </h3>
                    <p className="text-muted-foreground text-xs">
                      Reduce no-shows by 80%
                    </p>
                  </div>
                </div>
                <p className="mb-3 text-muted-foreground text-sm">
                  AI calls customers 24 hours before scheduled appointments to
                  confirm, reschedule if needed, and provide technician details.
                  Natural conversation that feels personal.
                </p>
                <div className="flex items-center gap-1 text-purple-600 text-xs dark:text-purple-400">
                  <Clock className="size-3" />
                  <span>Perfectly timed calls</span>
                </div>
              </div>

              <div className="hover:-translate-y-1 rounded-xl border border-primary/10 bg-gradient-to-br from-green-500/5 to-transparent p-6 text-left transition-all duration-300 hover:border-green-500/20 hover:shadow-green-500/10 hover:shadow-lg">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex size-12 items-center justify-center rounded-lg bg-green-500/10">
                    <UserCheck className="size-6 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">
                      Payment Collection
                    </h3>
                    <p className="text-muted-foreground text-xs">
                      Recover overdue payments
                    </p>
                  </div>
                </div>
                <p className="mb-3 text-muted-foreground text-sm">
                  AI calls customers with overdue invoices, politely requests
                  payment, offers payment plan options, and processes payments
                  over the phone - recovering revenue automatically.
                </p>
                <div className="flex items-center gap-1 text-green-600 text-xs dark:text-green-400">
                  <DollarSign className="size-3" />
                  <span>Increase cash flow</span>
                </div>
              </div>
            </div>
          </div>

          {/* AI Phone System - Inbound Handling */}
          <div>
            <h2 className="mb-5 font-semibold text-xl">
              24/7 Intelligent Call Handling
            </h2>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              <div className="hover:-translate-y-1 rounded-xl border border-primary/10 bg-gradient-to-br from-cyan-500/5 to-transparent p-6 text-left transition-all duration-300 hover:border-cyan-500/20 hover:shadow-cyan-500/10 hover:shadow-lg">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex size-12 items-center justify-center rounded-lg bg-cyan-500/10">
                    <PhoneIncoming className="size-6 text-cyan-600 dark:text-cyan-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">After-Hours Calls</h3>
                    <p className="text-muted-foreground text-xs">
                      Never miss emergency leads
                    </p>
                  </div>
                </div>
                <p className="mb-3 text-muted-foreground text-sm">
                  AI answers every call after hours, identifies emergencies,
                  books urgent appointments, quotes pricing for standard jobs,
                  and captures lead information - available 24/7/365.
                </p>
                <div className="flex items-center gap-1 text-cyan-600 text-xs dark:text-cyan-400">
                  <Clock className="size-3" />
                  <span>Round-the-clock availability</span>
                </div>
              </div>

              <div className="hover:-translate-y-1 rounded-xl border border-primary/10 bg-gradient-to-br from-orange-500/5 to-transparent p-6 text-left transition-all duration-300 hover:border-orange-500/20 hover:shadow-lg hover:shadow-orange-500/10">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex size-12 items-center justify-center rounded-lg bg-orange-500/10">
                    <PhoneForwarded className="size-6 text-orange-600 dark:text-orange-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">
                      Smart Call Routing
                    </h3>
                    <p className="text-muted-foreground text-xs">
                      Escalate when needed
                    </p>
                  </div>
                </div>
                <p className="mb-3 text-muted-foreground text-sm">
                  AI handles routine calls independently but intelligently
                  escalates complex issues to CSR or managers. Knows when human
                  intervention is needed and transfers seamlessly with full
                  context.
                </p>
                <div className="flex items-center gap-1 text-orange-600 text-xs dark:text-orange-400">
                  <PhoneForwarded className="size-3" />
                  <span>Context-aware transfers</span>
                </div>
              </div>

              <div className="hover:-translate-y-1 rounded-xl border border-primary/10 bg-gradient-to-br from-pink-500/5 to-transparent p-6 text-left transition-all duration-300 hover:border-pink-500/20 hover:shadow-lg hover:shadow-pink-500/10">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex size-12 items-center justify-center rounded-lg bg-pink-500/10">
                    <HeadphonesIcon className="size-6 text-pink-600 dark:text-pink-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">
                      Homeowner Questions
                    </h3>
                    <p className="text-muted-foreground text-xs">
                      Instant, accurate answers
                    </p>
                  </div>
                </div>
                <p className="mb-3 text-muted-foreground text-sm">
                  AI answers pricing questions, provides service availability,
                  explains warranty terms, and accesses customer history to give
                  personalized responses - just like talking to your best CSR.
                </p>
                <div className="flex items-center gap-1 text-pink-600 text-xs dark:text-pink-400">
                  <Brain className="size-3" />
                  <span>Context-aware responses</span>
                </div>
              </div>
            </div>
          </div>

          {/* Advanced AI Calling Features */}
          <div>
            <h2 className="mb-5 font-semibold text-xl">
              Advanced Calling Intelligence
            </h2>
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="rounded-xl border border-indigo-500/20 bg-gradient-to-br from-indigo-500/10 to-transparent p-6 text-left">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex size-12 items-center justify-center rounded-lg bg-indigo-500/10">
                    <PhoneCall className="size-6 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Campaign Calling</h3>
                    <p className="text-muted-foreground text-sm">
                      Automated marketing outreach
                    </p>
                  </div>
                </div>
                <p className="mb-3 text-muted-foreground text-sm">
                  AI initiates targeted calling campaigns for seasonal services,
                  warranty renewals, or maintenance reminders. Personalizes each
                  conversation based on customer history and preferences.
                </p>
                <div className="flex items-center gap-1 text-indigo-600 text-xs dark:text-indigo-400">
                  <TrendingUp className="size-3" />
                  <span>Drive revenue growth</span>
                </div>
              </div>

              <div className="rounded-xl border border-teal-500/20 bg-gradient-to-br from-teal-500/10 to-transparent p-6 text-left">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex size-12 items-center justify-center rounded-lg bg-teal-500/10">
                    <MessageSquare className="size-6 text-teal-600 dark:text-teal-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">
                      Voicemail Intelligence
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      AI processes and responds
                    </p>
                  </div>
                </div>
                <p className="mb-3 text-muted-foreground text-sm">
                  When customers leave voicemails, AI transcribes, categorizes
                  urgency, extracts key information, and automatically calls
                  them back with relevant information or schedules callbacks.
                </p>
                <div className="flex items-center gap-1 text-teal-600 text-xs dark:text-teal-400">
                  <Zap className="size-3" />
                  <span>Lightning-fast response</span>
                </div>
              </div>

              <div className="rounded-xl border border-rose-500/20 bg-gradient-to-br from-rose-500/10 to-transparent p-6 text-left">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex size-12 items-center justify-center rounded-lg bg-rose-500/10">
                    <Bell className="size-6 text-rose-600 dark:text-rose-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">
                      Emergency Detection
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      Prioritize urgent situations
                    </p>
                  </div>
                </div>
                <p className="mb-3 text-muted-foreground text-sm">
                  AI recognizes emergency keywords in conversations, immediately
                  prioritizes the call, dispatches the nearest available
                  technician, and alerts on-call managers - all within seconds.
                </p>
                <div className="flex items-center gap-1 text-rose-600 text-xs dark:text-rose-400">
                  <AlertCircle className="size-3" />
                  <span>Instant emergency response</span>
                </div>
              </div>

              <div className="rounded-xl border border-amber-500/20 bg-gradient-to-br from-amber-500/10 to-transparent p-6 text-left">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex size-12 items-center justify-center rounded-lg bg-amber-500/10">
                    <BarChart3 className="size-6 text-amber-600 dark:text-amber-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Call Analytics</h3>
                    <p className="text-muted-foreground text-sm">
                      Track performance metrics
                    </p>
                  </div>
                </div>
                <p className="mb-3 text-muted-foreground text-sm">
                  AI analyzes every conversation, tracks conversion rates,
                  identifies common objections, measures customer sentiment, and
                  provides insights to improve your sales process.
                </p>
                <div className="flex items-center gap-1 text-amber-600 text-xs dark:text-amber-400">
                  <TrendingUp className="size-3" />
                  <span>Continuous improvement</span>
                </div>
              </div>
            </div>
          </div>

          {/* Multi-Channel Communication */}
          <div>
            <h2 className="mb-5 font-semibold text-xl">
              Omnichannel Communication Hub
            </h2>
            <div className="grid gap-5 sm:grid-cols-3">
              <div className="rounded-xl border border-primary/10 bg-gradient-to-br from-primary/5 to-transparent p-6 text-left">
                <div className="mb-3 flex size-10 items-center justify-center rounded-lg bg-primary/10">
                  <Phone className="size-5 text-primary" />
                </div>
                <h3 className="mb-2 font-semibold">Voice Calls</h3>
                <p className="text-muted-foreground text-sm">
                  AI handles incoming and outgoing calls with natural
                  conversation
                </p>
              </div>

              <div className="rounded-xl border border-primary/10 bg-gradient-to-br from-primary/5 to-transparent p-6 text-left">
                <div className="mb-3 flex size-10 items-center justify-center rounded-lg bg-primary/10">
                  <MessageSquare className="size-5 text-primary" />
                </div>
                <h3 className="mb-2 font-semibold">SMS Messages</h3>
                <p className="text-muted-foreground text-sm">
                  Automated text confirmations, reminders, and two-way messaging
                </p>
              </div>

              <div className="rounded-xl border border-primary/10 bg-gradient-to-br from-primary/5 to-transparent p-6 text-left">
                <div className="mb-3 flex size-10 items-center justify-center rounded-lg bg-primary/10">
                  <Send className="size-5 text-primary" />
                </div>
                <h3 className="mb-2 font-semibold">Email Follow-ups</h3>
                <p className="text-muted-foreground text-sm">
                  Smart email sequences based on customer actions and
                  preferences
                </p>
              </div>
            </div>
          </div>

          {/* ROI Impact Section */}
          <div>
            <h2 className="mb-5 font-semibold text-xl">Real Business Impact</h2>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-xl border border-green-500/20 bg-gradient-to-br from-green-500/10 to-transparent p-5 text-center">
                <div className="mb-2 flex justify-center">
                  <div className="flex size-12 items-center justify-center rounded-full bg-green-500/10">
                    <TrendingUp className="size-6 text-green-600 dark:text-green-400" />
                  </div>
                </div>
                <div className="mb-1 font-bold text-2xl text-green-600 dark:text-green-400">
                  35%
                </div>
                <p className="text-muted-foreground text-sm">
                  More leads converted
                </p>
              </div>

              <div className="rounded-xl border border-blue-500/20 bg-gradient-to-br from-blue-500/10 to-transparent p-5 text-center">
                <div className="mb-2 flex justify-center">
                  <div className="flex size-12 items-center justify-center rounded-full bg-blue-500/10">
                    <Clock className="size-6 text-blue-600 dark:text-blue-400" />
                  </div>
                </div>
                <div className="mb-1 font-bold text-2xl text-blue-600 dark:text-blue-400">
                  80%
                </div>
                <p className="text-muted-foreground text-sm">Fewer no-shows</p>
              </div>

              <div className="rounded-xl border border-purple-500/20 bg-gradient-to-br from-purple-500/10 to-transparent p-5 text-center">
                <div className="mb-2 flex justify-center">
                  <div className="flex size-12 items-center justify-center rounded-full bg-purple-500/10">
                    <DollarSign className="size-6 text-purple-600 dark:text-purple-400" />
                  </div>
                </div>
                <div className="mb-1 font-bold text-2xl text-purple-600 dark:text-purple-400">
                  $15K
                </div>
                <p className="text-muted-foreground text-sm">
                  Average monthly recovery
                </p>
              </div>

              <div className="rounded-xl border border-orange-500/20 bg-gradient-to-br from-orange-500/10 to-transparent p-5 text-center">
                <div className="mb-2 flex justify-center">
                  <div className="flex size-12 items-center justify-center rounded-full bg-orange-500/10">
                    <Phone className="size-6 text-orange-600 dark:text-orange-400" />
                  </div>
                </div>
                <div className="mb-1 font-bold text-2xl text-orange-600 dark:text-orange-400">
                  24/7
                </div>
                <p className="text-muted-foreground text-sm">
                  Never miss a call
                </p>
              </div>
            </div>
          </div>

          {/* Call Quality Assurance */}
          <div>
            <h2 className="mb-5 font-semibold text-xl">
              Enterprise-Grade Call Quality
            </h2>
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="rounded-xl border border-primary/10 bg-gradient-to-br from-primary/5 to-transparent p-6 text-left">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex size-12 items-center justify-center rounded-lg bg-primary/10">
                    <Shield className="size-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Brand Consistency</h3>
                    <p className="text-muted-foreground text-sm">
                      Every call matches your voice
                    </p>
                  </div>
                </div>
                <p className="text-muted-foreground text-sm">
                  AI is trained on your company values, tone, and messaging.
                  Every conversation represents your brand perfectly - no off
                  days, no script deviations, just consistent excellence.
                </p>
              </div>

              <div className="rounded-xl border border-primary/10 bg-gradient-to-br from-primary/5 to-transparent p-6 text-left">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex size-12 items-center justify-center rounded-lg bg-primary/10">
                    <Database className="size-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">
                      Full Recording & Transcription
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      Complete audit trail
                    </p>
                  </div>
                </div>
                <p className="text-muted-foreground text-sm">
                  Every call is recorded, transcribed, and searchable. Review
                  conversations, train your team on best practices, and have
                  complete documentation for compliance and quality assurance.
                </p>
              </div>
            </div>
          </div>

          {/* What to Expect */}
          <div className="rounded-2xl border border-primary/10 bg-gradient-to-br from-primary/5 to-transparent p-8">
            <div className="mb-6 flex justify-center">
              <div className="flex size-16 items-center justify-center rounded-full bg-primary/10">
                <Brain className="size-8 text-primary" />
              </div>
            </div>
            <h2 className="mb-4 font-semibold text-2xl">
              Why This Changes Everything
            </h2>
            <div className="mx-auto max-w-3xl space-y-3 text-left text-muted-foreground">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-green-600 dark:text-green-400" />
                <p className="text-sm">
                  <span className="font-medium text-foreground">
                    Natural Language Commands:
                  </span>{" "}
                  No more clicking through menus. Just tell the AI what you want
                  and it handles everything
                </p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-green-600 dark:text-green-400" />
                <p className="text-sm">
                  <span className="font-medium text-foreground">
                    Complete Business Context:
                  </span>{" "}
                  AI knows your customers, jobs, payments, inventory, ads - even
                  banking info. It understands your business completely
                </p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-green-600 dark:text-green-400" />
                <p className="text-sm">
                  <span className="font-medium text-foreground">
                    Both Assistant AND Monitor:
                  </span>{" "}
                  While you ask it to do things, it&apos;s also watching for
                  errors, inconsistencies, and problems
                </p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-green-600 dark:text-green-400" />
                <p className="text-sm">
                  <span className="font-medium text-foreground">
                    Catches Expensive Mistakes:
                  </span>{" "}
                  Unauthorized discounts, missing documentation, billing errors
                  - AI alerts you before they cost you money
                </p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-green-600 dark:text-green-400" />
                <p className="text-sm">
                  <span className="font-medium text-foreground">
                    Works Like a Team Member:
                  </span>{" "}
                  If you can do it in the system, the AI can do it. Create,
                  update, delete, search, analyze - unlimited capabilities
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Call to action */}
        <div className="flex items-center justify-center gap-2 pt-4 text-muted-foreground text-sm">
          <Sparkles className="size-4" />
          <p>
            In the meantime, explore the platform and reach out if you need help
          </p>
        </div>
      </div>
    </div>
  );
}
