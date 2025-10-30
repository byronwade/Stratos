/**
 * Job Financials Widget - Server Component
 *
 * Quick financial summary for the job
 */

import { CircleDollarSign, DollarSign } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import type { Job } from "@/lib/db/schema";

function formatCurrency(cents: number | null): string {
  if (!cents) return "$0.00";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(cents / 100);
}

interface JobFinancialsWidgetProps {
  job: Job;
}

export function JobFinancialsWidget({ job }: JobFinancialsWidgetProps) {
  const totalAmount = job.totalAmount || 0;
  const paidAmount = job.paidAmount || 0;
  const remainingAmount = totalAmount - paidAmount;
  const percentagePaid = totalAmount > 0 ? (paidAmount / totalAmount) * 100 : 0;

  return (
    <div className="space-y-4">
      {/* Total Amount */}
      <div>
        <div className="flex items-center gap-1.5 text-muted-foreground text-xs">
          <CircleDollarSign className="size-3.5" />
          Total Amount
        </div>
        <div className="font-bold text-2xl">{formatCurrency(totalAmount)}</div>
      </div>

      <Separator />

      {/* Payment Breakdown */}
      <div className="space-y-2 text-sm">
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">Paid</span>
          <span className="font-medium text-green-600">
            {formatCurrency(paidAmount)}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">Remaining</span>
          <span className="font-medium text-orange-600">
            {formatCurrency(remainingAmount)}
          </span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="space-y-1">
        <Progress className="h-2" value={percentagePaid} />
        <div className="text-center text-muted-foreground text-xs">
          {Math.round(percentagePaid)}% paid
        </div>
      </div>

      <Separator />

      {/* Actions */}
      <div className="space-y-2">
        <Button asChild className="w-full" size="sm" variant="outline">
          <Link href={`/dashboard/work/${job.id}/invoices/new`}>
            <DollarSign className="mr-2 size-4" />
            Create Invoice
          </Link>
        </Button>
      </div>
    </div>
  );
}
