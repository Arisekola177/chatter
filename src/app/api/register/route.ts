import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';


export async function POST(req:Request) {
  const body = await req.json();

  const { email, password, name } = body;

  const hassPassword = await bcrypt.hash(password, 10);

  const defaultImageUrl = "https://randomuser.me/api/portraits/men/1.jpg";

  const user = await prisma.user.create({
    data: {
      name,
      email,
      hassPassword,
      image: defaultImageUrl,
    },
  });

  return NextResponse.json(user);
}




         
  
