import { advocateData } from "../../../db/seed/advocates";
// Using the seeded data only for time constraint purposes

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = parseInt(searchParams.get("limit") || "10", 10);

  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;

  const paginatedData = advocateData.slice(startIndex, endIndex);

  return new Response(
    JSON.stringify({
      data: paginatedData,
      currentPage: page,
      totalPages: Math.ceil(advocateData.length / limit),
    }),
    { status: 200, headers: { "Content-Type": "application/json" } }
  );
}

