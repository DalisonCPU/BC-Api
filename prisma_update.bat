@echo off
npx prisma migrate dev --name init
npx prisma db push
