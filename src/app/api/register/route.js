import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';


export async function POST(req) {
  const body = await req.json();

  const { email, password, name } = body;

  const hassPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      hassPassword,
    },
  });

  return NextResponse.json(user);
}




         
  
