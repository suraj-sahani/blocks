import ImageKit from "imagekit";
import { NextResponse } from "next/server";

const imagekit = new ImageKit({
  publicKey: process.env.NEXT_PUBLIC_IAMGEKIT_PUBLIC_KEY!,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY!,
  urlEndpoint: process.env.NEXT_PUBLIC_IAMGEKIT_URL_ENDPOINT!,
});

export async function GET() {
  return NextResponse.json(imagekit.getAuthenticationParameters());
}
