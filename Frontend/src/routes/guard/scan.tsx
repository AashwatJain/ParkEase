import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { api } from "@/lib/api/client";
import { Html5Qrcode } from "html5-qrcode";
import { toast } from "sonner";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/guard/scan")({
  component: GuardScanPage,
});

function GuardScanPage() {
  const [scanResult, setScanResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    if (!user || user.role !== "guard") return;

    let html5QrCode: Html5Qrcode | null = null;

    const startScanner = async () => {
      try {
        html5QrCode = new Html5Qrcode("reader");
        await html5QrCode.start(
          { facingMode: "environment" },
          { fps: 10, qrbox: { width: 250, height: 250 } },
          async (decodedText) => {
            if (html5QrCode?.isScanning) {
              await html5QrCode.stop();
            }
            try {
              let bookingId = decodedText;
              try {
                const data = JSON.parse(decodedText);
                if (data.bookingId) bookingId = data.bookingId;
              } catch (e) {}

              setLoading(true);
              const res = await api.post("/bookings/verify-qr", { bookingId });
              setScanResult({ bookingId, details: res.data });
              toast.success("QR Verified Successfully");
            } catch (error: any) {
              toast.error(error?.response?.data?.message || "Invalid QR Code");
              startScanner(); // Restart if invalid
            } finally {
              setLoading(false);
            }
          },
          (error) => {}
        );
      } catch (err) {
        console.error("Camera error:", err);
      }
    };

    startScanner();

    return () => {
      if (html5QrCode?.isScanning) {
        html5QrCode.stop().catch(console.error);
      }
    };
  }, [user]);

  const confirmExit = async () => {
    if (!scanResult) return;
    setLoading(true);
    try {
      await api.patch(`/bookings/exit/${scanResult.bookingId}`);
      toast.success("Vehicle exited successfully!");
      setScanResult(null);
      window.location.reload(); 
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Exit failed");
    } finally {
      setLoading(false);
    }
  };

  if (user?.role !== "guard") {
    return <div className="p-10 text-center">Unauthorized. Guards only.</div>;
  }

  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col items-center bg-[#F5F3EE] px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold uppercase tracking-widest text-[#0D0D0D]">Scanner Dashboard</h1>
      
      {!scanResult && (
        <div className="w-full max-w-md rounded-[2.5rem] bg-white p-6 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] transition-all">
          <div className="relative overflow-hidden rounded-[2rem] bg-black">
            {/* The actual video stream */}
            <div id="reader" className="w-full overflow-hidden border-none [&>video]:w-full [&>video]:object-cover"></div>
            
            {/* Overlay UI */}
            <div className="pointer-events-none absolute inset-0 border-[6px] border-[#F5F3EE]/20 rounded-[2rem]"></div>
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
              <div className="h-48 w-48 rounded-3xl border-2 border-white/50 bg-white/5 backdrop-blur-sm relative">
                <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-white rounded-tl-xl -mt-[2px] -ml-[2px]"></div>
                <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-white rounded-tr-xl -mt-[2px] -mr-[2px]"></div>
                <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-white rounded-bl-xl -mb-[2px] -ml-[2px]"></div>
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-white rounded-br-xl -mb-[2px] -mr-[2px]"></div>
                <div className="absolute left-0 top-1/2 w-full h-[2px] bg-white/40 shadow-[0_0_8px_2px_rgba(255,255,255,0.4)] animate-[scan_2s_ease-in-out_infinite]"></div>
              </div>
            </div>
          </div>
          <div className="mt-6 text-center">
            <h3 className="font-bold text-[#0D0D0D] text-lg">Align QR Code</h3>
            <p className="mt-1 text-sm font-medium text-[#2D2D2D]/60">Scan the customer's exit ticket to view fare</p>
          </div>
        </div>
      )}

      {scanResult && (
        <div className="w-full max-w-md rounded-3xl border border-black/10 bg-white p-8 shadow-xl">
          <h2 className="mb-6 text-xl font-bold text-green-600 text-center">Verification Successful</h2>
          <div className="mb-8 space-y-4">
            <div className="flex justify-between border-b border-black/10 pb-3">
              <span className="text-sm font-bold uppercase tracking-wider text-gray-500">Vehicle No</span>
              <span className="font-bold text-lg">{scanResult.details.vehicleNumber}</span>
            </div>
            <div className="flex justify-between border-b border-black/10 pb-3">
              <span className="text-sm font-bold uppercase tracking-wider text-gray-500">Type</span>
              <span className="font-bold capitalize">{scanResult.details.vehicleType}</span>
            </div>
            <div className="flex justify-between border-b border-black/10 pb-3">
              <span className="text-sm font-bold uppercase tracking-wider text-gray-500">Slot</span>
              <span className="font-bold">{scanResult.details.floor}-{scanResult.details.slot}</span>
            </div>
            <div className="flex justify-between pt-2">
              <span className="text-sm font-bold uppercase tracking-wider text-gray-800">Amount to Collect</span>
              <span className="font-black text-2xl text-red-600">₹{scanResult.details.fare}</span>
            </div>
          </div>
          
          <button
            onClick={confirmExit}
            disabled={loading}
            className="w-full rounded-xl bg-[#0D0D0D] py-4 text-sm font-bold uppercase tracking-widest text-white transition-colors hover:bg-gray-800 disabled:opacity-50"
          >
            {loading ? "Processing..." : "Confirm Payment & Exit"}
          </button>
          
          <button
            onClick={() => window.location.reload()}
            className="mt-4 w-full py-2 text-sm font-medium text-gray-500 hover:text-black"
          >
            Cancel & Scan Again
          </button>
        </div>
      )}
    </div>
  );
}
