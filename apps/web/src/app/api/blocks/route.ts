import { blockQuery } from "@repo/web/server/data/block/block.query";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const blocks = await blockQuery.listAll();

  return NextResponse.json(blocks);
}
