import QRCode from "qrcode";

const generateQR = async (data) => {
  try {
    const stringData = JSON.stringify(data);

    const qrCodeString = await QRCode.toDataURL(stringData);

    return qrCodeString;
  } catch (error) {
    console.log("Can not generate QR: ", error);
    return null;
  }
};

export { generateQR };
