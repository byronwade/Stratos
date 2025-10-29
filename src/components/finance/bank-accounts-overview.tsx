/**
 * Bank Accounts Overview - Server Component
 *
 * Performance optimizations:
 * - Server Component by default (no "use client")
 * - Static content rendered on server
 * - Reduced JavaScript bundle size
 * - Split view showing checking/savings separately
 */

import { Wallet } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type BankAccount = {
  id: string;
  bankName: string;
  accountName: string;
  accountType: "checking" | "savings" | "credit";
  lastFour: string;
  balance: number;
};

// Mock data - replace with actual data fetching
const accounts: BankAccount[] = [
  {
    id: "1",
    bankName: "Chase Bank",
    accountName: "Business Checking",
    accountType: "checking",
    lastFour: "4521",
    balance: 125_450,
  },
  {
    id: "3",
    bankName: "Wells Fargo",
    accountName: "Operating Checking",
    accountType: "checking",
    lastFour: "2341",
    balance: 42_800,
  },
  {
    id: "2",
    bankName: "Bank of America",
    accountName: "Business Savings",
    accountType: "savings",
    lastFour: "8832",
    balance: 75_000,
  },
];

export function BankAccountsOverview() {
  const checkingAccounts = accounts.filter(
    (acc) => acc.accountType === "checking"
  );
  const savingsAccounts = accounts.filter(
    (acc) => acc.accountType === "savings"
  );

  const totalChecking = checkingAccounts.reduce(
    (sum, acc) => sum + acc.balance,
    0
  );
  const totalSavings = savingsAccounts.reduce(
    (sum, acc) => sum + acc.balance,
    0
  );

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {/* Checking Accounts */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Wallet className="h-5 w-5 text-blue-500" />
                Checking
              </CardTitle>
              <CardDescription>Business operating accounts</CardDescription>
            </div>
            <Button asChild size="sm" variant="ghost">
              <Link href="/dashboard/settings/finance/bank-accounts">
                Manage
              </Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Total Checking */}
          <div className="rounded-lg border-2 border-blue-500/20 bg-blue-500/5 p-4">
            <p className="text-muted-foreground text-sm">Total Checking</p>
            <p className="font-bold text-3xl">
              ${totalChecking.toLocaleString()}
            </p>
            <p className="text-muted-foreground text-xs">
              {checkingAccounts.length} account
              {checkingAccounts.length !== 1 ? "s" : ""}
            </p>
          </div>

          {/* Individual Checking Accounts */}
          <div className="space-y-2">
            {checkingAccounts.map((account) => (
              <div
                key={account.id}
                className="flex items-center justify-between rounded-lg border p-3"
              >
                <div>
                  <p className="font-medium text-sm">{account.accountName}</p>
                  <p className="text-muted-foreground text-xs">
                    {account.bankName} •••• {account.lastFour}
                  </p>
                </div>
                <p className="font-semibold text-sm">
                  ${account.balance.toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Savings Accounts */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Wallet className="h-5 w-5 text-green-500" />
                Savings
              </CardTitle>
              <CardDescription>Business savings accounts</CardDescription>
            </div>
            <Button asChild size="sm" variant="ghost">
              <Link href="/dashboard/settings/finance/bank-accounts">
                Manage
              </Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Total Savings */}
          <div className="rounded-lg border-2 border-green-500/20 bg-green-500/5 p-4">
            <p className="text-muted-foreground text-sm">Total Savings</p>
            <p className="font-bold text-3xl">
              ${totalSavings.toLocaleString()}
            </p>
            <p className="text-muted-foreground text-xs">
              {savingsAccounts.length} account
              {savingsAccounts.length !== 1 ? "s" : ""}
            </p>
          </div>

          {/* Individual Savings Accounts */}
          <div className="space-y-2">
            {savingsAccounts.map((account) => (
              <div
                key={account.id}
                className="flex items-center justify-between rounded-lg border p-3"
              >
                <div>
                  <p className="font-medium text-sm">{account.accountName}</p>
                  <p className="text-muted-foreground text-xs">
                    {account.bankName} •••• {account.lastFour}
                  </p>
                </div>
                <p className="font-semibold text-sm">
                  ${account.balance.toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
