import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useAuth, d as api } from "./router-D_sUj32p.mjs";
import { H as Html5QrcodeScanner } from "../_libs/html5-qrcode.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
import "../_libs/tanstack__react-router.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "crypto";
import "async_hooks";
import "util";
import "stream";
import "../_libs/isbot.mjs";
import "../_libs/axios.mjs";
import "../_libs/form-data.mjs";
import "fs";
import "../_libs/combined-stream.mjs";
import "../_libs/delayed-stream.mjs";
import "path";
import "http";
import "https";
import "url";
import "../_libs/mime-types.mjs";
import "../_libs/mime-db.mjs";
import "../_libs/asynckit.mjs";
import "../_libs/es-set-tostringtag.mjs";
import "../_libs/get-intrinsic.mjs";
import "../_libs/es-object-atoms.mjs";
import "../_libs/es-errors.mjs";
import "../_libs/math-intrinsics.mjs";
import "../_libs/gopd.mjs";
import "../_libs/es-define-property.mjs";
import "../_libs/has-symbols.mjs";
import "../_libs/get-proto.mjs";
import "../_libs/dunder-proto.mjs";
import "../_libs/call-bind-apply-helpers.mjs";
import "../_libs/function-bind.mjs";
import "../_libs/hasown.mjs";
import "../_libs/has-tostringtag.mjs";
import "../_libs/proxy-from-env.mjs";
import "../_libs/https-proxy-agent.mjs";
import "net";
import "tls";
import "assert";
import "../_libs/debug.mjs";
import "../_libs/ms.mjs";
import "tty";
import "../_libs/supports-color.mjs";
import "os";
import "../_libs/has-flag.mjs";
import "../_libs/agent-base.mjs";
import "events";
import "http2";
import "../_libs/follow-redirects.mjs";
import "zlib";
import "../_libs/lucide-react.mjs";
function GuardScanPage() {
  const [scanResult, setScanResult] = reactExports.useState(null);
  const [loading, setLoading] = reactExports.useState(false);
  const {
    user
  } = useAuth();
  reactExports.useEffect(() => {
    if (!user || user.role !== "guard") return;
    let scanner = new Html5QrcodeScanner(
      "reader",
      {
        fps: 10,
        qrbox: {
          width: 250,
          height: 250
        }
      },
      /* verbose= */
      false
    );
    scanner.render(async (decodedText) => {
      scanner.pause();
      try {
        let bookingId = decodedText;
        try {
          const data = JSON.parse(decodedText);
          if (data.bookingId) bookingId = data.bookingId;
        } catch (e) {
        }
        setLoading(true);
        const res = await api.post("/bookings/verify-qr", {
          bookingId
        });
        setScanResult({
          bookingId,
          details: res.data.data
        });
        toast.success("QR Verified Successfully");
      } catch (error) {
        toast.error(error?.response?.data?.message || "Invalid QR Code");
        scanner.resume();
      } finally {
        setLoading(false);
      }
    }, (error) => {
    });
    return () => {
      scanner.clear().catch(console.error);
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
    } catch (error) {
      toast.error(error?.response?.data?.message || "Exit failed");
    } finally {
      setLoading(false);
    }
  };
  if (user?.role !== "guard") {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-10 text-center", children: "Unauthorized. Guards only." });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-h-[calc(100vh-4rem)] flex-col items-center bg-[#F5F3EE] px-4 py-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mb-6 text-2xl font-bold uppercase tracking-widest text-[#0D0D0D]", children: "Scanner Dashboard" }),
    !scanResult && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-md rounded-3xl border border-black/10 bg-white p-6 shadow-xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { id: "reader", className: "w-full overflow-hidden rounded-xl border border-black/10" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-center text-sm font-medium text-gray-500", children: "Point camera at customer's QR code" })
    ] }),
    scanResult && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-md rounded-3xl border border-black/10 bg-white p-8 shadow-xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mb-6 text-xl font-bold text-green-600 text-center", children: "Verification Successful" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8 space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between border-b border-black/10 pb-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-bold uppercase tracking-wider text-gray-500", children: "Vehicle No" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-lg", children: scanResult.details.vehicleNumber })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between border-b border-black/10 pb-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-bold uppercase tracking-wider text-gray-500", children: "Type" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold capitalize", children: scanResult.details.vehicleType })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between border-b border-black/10 pb-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-bold uppercase tracking-wider text-gray-500", children: "Slot" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-bold", children: [
            scanResult.details.floor,
            "-",
            scanResult.details.slot
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between pt-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-bold uppercase tracking-wider text-gray-800", children: "Amount to Collect" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-black text-2xl text-red-600", children: [
            "₹",
            scanResult.details.fare
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: confirmExit, disabled: loading, className: "w-full rounded-xl bg-[#0D0D0D] py-4 text-sm font-bold uppercase tracking-widest text-white transition-colors hover:bg-gray-800 disabled:opacity-50", children: loading ? "Processing..." : "Confirm Payment & Exit" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => window.location.reload(), className: "mt-4 w-full py-2 text-sm font-medium text-gray-500 hover:text-black", children: "Cancel & Scan Again" })
    ] })
  ] });
}
export {
  GuardScanPage as component
};
