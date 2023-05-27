import prisma from '@/app/lib/prisma';
import bcrypt from 'bcrypt';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
  const body = await req.json();
  const {
    email,
    password,
    name
  } = body
  if(!email || !password) {
    return new Response("invalid credentials", {status: 400});
  }
  const hashedPassword = await bcrypt.hash(password, 12);
  const user = await prisma.user.create({
    data: {
      email,
      name,
      hashedPassword
    }
  });
  return NextResponse.json(user, {status: 200})
}
catch(error:any) {
  console.log(error, 'REGISTER ERROR')
  return new NextResponse("Internal Error", {status: 500});
}
}