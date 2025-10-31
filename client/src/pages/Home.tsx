import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Card } from "@/components/ui/card";
import { APP_LOGO, APP_TITLE } from "@/const";
import { useState, useEffect, useMemo } from "react";
import { trpc } from "@/lib/trpc";
import { Loader2, Search, Lock, Eye, Mail, Copy, Check } from "lucide-react";
import { toast } from "sonner";

export default function Home() {
  const [emailAddress, setEmailAddress] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [autoRefresh, setAutoRefresh] = useState(false);
  const [countdown, setCountdown] = useState(14);
  const [selectedEmailId, setSelectedEmailId] = useState<number | null>(null);
  const [copiedOtp, setCopiedOtp] = useState(false);

  const searchEmailsMutation = trpc.email.search.useMutation({
    onSuccess: () => {
      setIsSearching(true);
      setCountdown(14);
    },
    onError: (error: any) => {
      toast.error(error.message);
    },
  });

  const { data: emails = [], refetch, isLoading } = trpc.email.list.useQuery(
    { emailAddress },
    { enabled: isSearching && !!emailAddress }
  );

  const { data: selectedEmail } = trpc.email.getById.useQuery(
    { id: selectedEmailId! },
    { enabled: !!selectedEmailId }
  );

  useEffect(() => {
    if (autoRefresh && isSearching && countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (autoRefresh && isSearching && countdown === 0) {
      refetch();
      setCountdown(14);
    }
  }, [autoRefresh, isSearching, countdown, refetch]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailAddress.trim()) {
      toast.error("Please enter an email address");
      return;
    }
    searchEmailsMutation.mutate({ emailAddress });
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleString("en-US", {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  // Extract OTP from email content
  const extractOTP = (text: string): string | null => {
    // Common OTP patterns: 4-8 digits
    const patterns = [
      /\b(\d{4,8})\b/g,  // Basic 4-8 digit numbers
      /code[:\s]+(\d{4,8})/gi,  // "code: 123456"
      /verification[:\s]+(\d{4,8})/gi,  // "verification: 123456"
      /OTP[:\s]+(\d{4,8})/gi,  // "OTP: 123456"
      /PIN[:\s]+(\d{4,8})/gi,  // "PIN: 123456"
    ];

    for (const pattern of patterns) {
      const matches = text.match(pattern);
      if (matches && matches.length > 0) {
        // Extract just the digits
        const digits = matches[0].match(/\d{4,8}/);
        if (digits) return digits[0];
      }
    }
    return null;
  };

  const detectedOTP = useMemo(() => {
    if (!selectedEmail) return null;
    const content = selectedEmail.textContent || selectedEmail.htmlContent || '';
    return extractOTP(content);
  }, [selectedEmail]);

  const copyOTP = () => {
    if (detectedOTP) {
      navigator.clipboard.writeText(detectedOTP);
      setCopiedOtp(true);
      toast.success('OTP copied to clipboard!');
      setTimeout(() => setCopiedOtp(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-950/50 backdrop-blur">
        <div className="container py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Mail className="w-8 h-8 text-blue-500" />
            <h1 className="text-2xl font-bold text-white">{APP_TITLE}</h1>
          </div>
        </div>
      </header>

      <main className="container py-12">
        {!isSearching ? (
          <>
            {/* Hero Section */}
            <div className="text-center mb-12 max-w-4xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                Set up your domain mail{" "}
                <span className="text-blue-500">effortlessly</span> with a
              </h2>
              <p className="text-xl text-slate-300 leading-relaxed">
                <span className="text-blue-500 font-semibold">fast</span> and{" "}
                <span className="text-blue-500 font-semibold">secure</span>{" "}
                mailbox—Stay{" "}
                <span className="text-blue-500 font-semibold">efficient</span>,
                always{" "}
                <span className="text-blue-500 font-semibold">accessible</span>.
              </p>
            </div>

            {/* Search Form */}
            <form
              onSubmit={handleSubmit}
              className="max-w-3xl mx-auto mb-16 space-y-6"
            >
              <Input
                type="email"
                placeholder="Enter email address"
                value={emailAddress}
                onChange={(e) => setEmailAddress(e.target.value)}
                className="h-14 text-lg bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500"
              />
              <div className="flex items-center justify-center gap-4">
                <Button
                  type="submit"
                  size="lg"
                  disabled={searchEmailsMutation.isPending}
                  className="px-8"
                >
                  {searchEmailsMutation.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Searching...
                    </>
                  ) : (
                    "Submit"
                  )}
                </Button>
                <div className="flex items-center gap-2">
                  <Switch
                    checked={autoRefresh}
                    onCheckedChange={setAutoRefresh}
                    id="auto-refresh"
                  />
                  <label
                    htmlFor="auto-refresh"
                    className="text-sm text-slate-300 cursor-pointer"
                  >
                    Auto Refresh
                  </label>
                </div>
              </div>
            </form>

            {/* Features */}
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              <Card className="p-6 bg-slate-800/30 border-slate-700 hover:bg-slate-800/50 transition-colors">
                <Search className="w-10 h-10 text-blue-500 mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">
                  Easy Search
                </h3>
                <p className="text-slate-400">
                  Enter your email address to see all related emails.
                </p>
              </Card>

              <Card className="p-6 bg-slate-800/30 border-slate-700 hover:bg-slate-800/50 transition-colors">
                <Lock className="w-10 h-10 text-blue-500 mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">
                  Secure Access
                </h3>
                <p className="text-slate-400">
                  Equipped with a secure PIN system for emails.
                </p>
              </Card>

              <Card className="p-6 bg-slate-800/30 border-slate-700 hover:bg-slate-800/50 transition-colors">
                <Eye className="w-10 h-10 text-blue-500 mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">
                  Complete View
                </h3>
                <p className="text-slate-400">
                  View email content in HTML or text format easily
                </p>
              </Card>
            </div>
          </>
        ) : (
          <>
            {/* Email Search Results */}
            <div className="max-w-5xl mx-auto">
              <div className="mb-8">
                <div className="bg-slate-800/50 rounded-lg p-6 mb-6">
                  <Input
                    type="email"
                    value={emailAddress}
                    onChange={(e) => setEmailAddress(e.target.value)}
                    className="h-12 text-lg bg-slate-900/50 border-slate-700 text-white mb-4"
                  />
                  <div className="flex items-center justify-between">
                    <Button onClick={() => refetch()}>Submit</Button>
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={autoRefresh}
                        onCheckedChange={setAutoRefresh}
                        id="auto-refresh-2"
                      />
                      <label
                        htmlFor="auto-refresh-2"
                        className="text-sm text-slate-300"
                      >
                        Auto Refresh
                      </label>
                    </div>
                  </div>
                  {autoRefresh && (
                    <div className="mt-4">
                      <div className="flex items-center justify-between text-sm text-slate-400 mb-2">
                        <span>Next refresh in {countdown}s</span>
                      </div>
                      <div className="w-full bg-slate-700 rounded-full h-1.5">
                        <div
                          className="bg-blue-500 h-1.5 rounded-full transition-all duration-1000"
                          style={{ width: `${(countdown / 14) * 100}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>

                {isLoading ? (
                  <div className="flex items-center justify-center py-12">
                    <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
                  </div>
                ) : emails.length === 0 ? (
                  <Card className="p-8 bg-slate-800/30 border-slate-700 text-center">
                    <p className="text-slate-400">
                      No emails found for this address yet.
                    </p>
                  </Card>
                ) : (
                  <div className="space-y-4">
                    {emails.map((email: any) => (
                      <Card
                        key={email.id}
                        className="p-6 bg-slate-800/30 border-slate-700 hover:bg-slate-800/50 transition-colors"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold text-white mb-2">
                              {email.subject || "(No Subject)"}
                            </h3>
                            <p className="text-sm text-slate-400 mb-1">
                              From: {email.fromAddress}
                            </p>
                            <p className="text-sm text-slate-400">
                              Date: {formatDate(email.receivedAt)}
                            </p>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setSelectedEmailId(email.id)}
                          >
                            Text
                          </Button>
                        </div>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </main>

      {/* Email Detail Modal */}
      {selectedEmail && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50"
          onClick={() => setSelectedEmailId(null)}
        >
          <Card
            className="max-w-4xl w-full max-h-[80vh] overflow-auto bg-slate-900 border-slate-700"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex items-start justify-between mb-6">
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-white mb-2">
                    {selectedEmail.subject || "(No Subject)"}
                  </h2>
                  <p className="text-sm text-slate-400">
                    From: {selectedEmail.fromAddress}
                  </p>
                  <p className="text-sm text-slate-400">
                    Date: {formatDate(selectedEmail.receivedAt)}
                  </p>
                  {detectedOTP && (
                    <div className="mt-4 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xs text-blue-400 mb-1">Detected OTP Code</p>
                          <p className="text-2xl font-mono font-bold text-blue-300 tracking-wider">
                            {detectedOTP}
                          </p>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={copyOTP}
                          className="ml-4"
                        >
                          {copiedOtp ? (
                            <>
                              <Check className="w-4 h-4 mr-2" />
                              Copied
                            </>
                          ) : (
                            <>
                              <Copy className="w-4 h-4 mr-2" />
                              Copy
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
                <Button
                  variant="ghost"
                  onClick={() => setSelectedEmailId(null)}
                  className="ml-4"
                >
                  Close
                </Button>
              </div>
              <div className="prose prose-invert max-w-none">
                {selectedEmail.htmlContent ? (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: selectedEmail.htmlContent,
                    }}
                  />
                ) : (
                  <pre className="whitespace-pre-wrap text-slate-300">
                    {selectedEmail.textContent}
                  </pre>
                )}
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-950/50 backdrop-blur mt-20">
        <div className="container py-6 text-center text-sm text-slate-500">
          © 2024-2025 {APP_TITLE}. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
